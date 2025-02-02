// SPDX-License-Identifier: MIT
pragma solidity  ^0.8.26;
import "./ISchemaRegistry.sol";

contract AIReputationSchemaRegistry {
    ISchemaRegistry private immutable registry;
    
    event SchemaCreated(bytes32 uid, string schema);
    
    constructor(address registryAddress) {
        registry = ISchemaRegistry(registryAddress);
    }
    
    function registerSchema() external returns (bytes32) {
        string memory schema = "uint256 aiId, string messageId, uint256 relevance, uint256 accuracy, uint256 timestamp";
        
        bytes32 uid = registry.register(
            schema,
            ISchemaResolver(address(0)),
            true
        );
        
        emit SchemaCreated(uid, schema);
        return uid;
    }
}