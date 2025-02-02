// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// First file: IEAS.sol
interface IEAS {
    struct AttestationRequest {
        bytes32 schema;
        AttestationData data;
    }

    struct AttestationData {
        address recipient;
        uint64 expirationTime;
        bool revocable;
        bytes32 refUID;
        bytes data;
        uint256 value;
    }

    function attest(AttestationRequest calldata request) external payable returns (bytes32);
    function getAttestation(bytes32 uid) external view returns (Attestation memory);
}

struct Attestation {
    bytes32 uid;
    bytes32 schema;
    uint64 time;
    uint64 expirationTime;
    uint64 revocationTime;
    bytes32 refUID;
    address attester;
    address recipient;
    bool revocable;
    bytes data;
}
