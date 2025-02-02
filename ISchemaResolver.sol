// SPDX-License-Identifier: MIT
pragma solidity  ^0.8.26;
import "./IEAS.sol";

interface ISchemaResolver {
    function attest(bytes32 uid, Attestation memory attestation) external returns (bool);
    function multiAttest(bytes32[] memory uids, Attestation[] memory attestations) external returns (bool);
    function revoke(bytes32 uid, Attestation memory attestation) external returns (bool);
    function multiRevoke(bytes32[] memory uids, Attestation[] memory attestations) external returns (bool);
}