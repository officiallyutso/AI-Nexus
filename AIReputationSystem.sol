// SPDX-License-Identifier: MIT
pragma solidity  ^0.8.26;
import "./IEAS.sol";

contract AIReputationSystem {
    IEAS private immutable eas;
    bytes32 public immutable SCHEMA_UID;
    
    struct Rating {
        uint256 relevance;
        uint256 accuracy;
        bool hasRated;
    }
    
    struct MessageRating {
        uint256 totalRelevance;
        uint256 totalAccuracy;
        uint256 numberOfRatings;
        mapping(address => Rating) userRatings;
    }
    
    struct AIReputation {
        uint256 averageRelevance;
        uint256 averageAccuracy;
        uint256 overallReputation;
        uint256 totalMessages;
    }
    
    mapping(uint256 => AIReputation) public aiReputations;  
    mapping(string => MessageRating) public messageRatings;  
    
    event RatingSubmitted(uint256 aiId, string messageId, uint256 relevance, uint256 accuracy, bytes32 attestationUID);
    event ReputationUpdated(uint256 aiId, uint256 newReputation);
    
    constructor(address easContractAddress, bytes32 schemaUID) {
        eas = IEAS(easContractAddress);
        SCHEMA_UID = schemaUID;
    }
    
    modifier validRating(uint256 rating) {
        require(rating >= 0 && rating <= 5, "Rating must be between 0 and 5");
        _;
    }
    
    function submitRating(
        uint256 aiId,
        string memory messageId,
        uint256 relevance,
        uint256 accuracy
    ) external validRating(relevance) validRating(accuracy) returns (bytes32) {
        require(aiId >= 1 && aiId <= 3, "Invalid AI ID");
        
        MessageRating storage messageRating = messageRatings[messageId];
        Rating storage userRating = messageRating.userRatings[msg.sender];
        
        require(!userRating.hasRated, "User has already rated this message");
        
        userRating.relevance = relevance;
        userRating.accuracy = accuracy;
        userRating.hasRated = true;
        
        messageRating.totalRelevance += relevance;
        messageRating.totalAccuracy += accuracy;
        messageRating.numberOfRatings++;
        
        // Create EAS attestation
        bytes memory encodedData = abi.encode(
            aiId,
            messageId,
            relevance,
            accuracy,
            block.timestamp
        );
        
        bytes32 attestationUID = eas.attest(
            IEAS.AttestationRequest({
                schema: SCHEMA_UID,
                data: IEAS.AttestationData({
                    recipient: address(this),
                    expirationTime: 0,
                    revocable: true,
                    refUID: bytes32(0),
                    data: encodedData,
                    value: 0
                })
            })
        );
        
        updateAIReputation(aiId, messageId);
        
        emit RatingSubmitted(aiId, messageId, relevance, accuracy, attestationUID);
        return attestationUID;
    }
    
    function updateAIReputation(uint256 aiId, string memory messageId) internal {
        AIReputation storage reputation = aiReputations[aiId];
        MessageRating storage messageRating = messageRatings[messageId];
        
        reputation.totalMessages++;
        
        uint256 avgRelevance = messageRating.totalRelevance * 100 / messageRating.numberOfRatings;
        uint256 avgAccuracy = messageRating.totalAccuracy * 100 / messageRating.numberOfRatings;
        
        reputation.averageRelevance = (reputation.averageRelevance * (reputation.totalMessages - 1) + avgRelevance) / reputation.totalMessages;
        reputation.averageAccuracy = (reputation.averageAccuracy * (reputation.totalMessages - 1) + avgAccuracy) / reputation.totalMessages;
        
        reputation.overallReputation = (reputation.averageRelevance + reputation.averageAccuracy) / 2;
        
        emit ReputationUpdated(aiId, reputation.overallReputation);
    }
    
    function getAIReputation(uint256 aiId) external view returns (
        uint256 averageRelevance,
        uint256 averageAccuracy,
        uint256 overallReputation,
        uint256 totalMessages
    ) {
        require(aiId >= 1 && aiId <= 3, "Invalid AI ID");
        AIReputation storage reputation = aiReputations[aiId];
        
        return (
            reputation.averageRelevance / 100,
            reputation.averageAccuracy / 100,
            reputation.overallReputation / 100,
            reputation.totalMessages
        );
    }
    
    function hasUserRatedMessage(string memory messageId, address user) external view returns (bool) {
        return messageRatings[messageId].userRatings[user].hasRated;
    }
}