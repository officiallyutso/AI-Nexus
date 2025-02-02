import { ethers } from 'ethers';
import { CONTRACT_CONFIG } from '../config';

const ABI = [
    "function submitRating(uint256 aiId, string memory messageId, uint256 relevance, uint256 accuracy) external returns (bytes32)",
    "function getAIReputation(uint256 aiId) external view returns (uint256 averageRelevance, uint256 averageAccuracy, uint256 overallReputation, uint256 totalMessages)",
    "function hasUserRatedMessage(string memory messageId, address user) external view returns (bool)"
];

export const getContract = async () => {
    if (!window.ethereum) throw new Error("Please install MetaMask");
    
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    
    return new ethers.Contract(
        CONTRACT_CONFIG.AI_REPUTATION_ADDRESS,
        ABI,
        signer
    );
};

export const submitRating = async (aiId, messageId, relevance, accuracy) => {
    const contract = await getContract();
    const tx = await contract.submitRating(aiId, messageId, relevance, accuracy);
    return await tx.wait();
};

export const getAIReputation = async (aiId) => {
    const contract = await getContract();
    const reputation = await contract.getAIReputation(aiId);
    return {
        averageRelevance: reputation[0].toNumber(),
        averageAccuracy: reputation[1].toNumber(),
        overallReputation: reputation[2].toNumber(),
        totalMessages: reputation[3].toNumber()
    };
};