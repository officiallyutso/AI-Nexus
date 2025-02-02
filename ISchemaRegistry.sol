// SPDX-License-Identifier: MIT
pragma solidity  ^0.8.26;
import "./ISchemaResolver.sol";

interface ISchemaRegistry {
    function register(string calldata schema, ISchemaResolver resolver, bool revocable) external returns (bytes32);
}