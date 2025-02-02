import { EAS, SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";
import { ethers } from 'ethers';
import { CONTRACT_CONFIG } from '../config';

export const getEASContract = async () => {
    if (!window.ethereum) throw new Error("Please install MetaMask");
    
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    
    const eas = new EAS(CONTRACT_CONFIG.EAS_CONTRACT_ADDRESS);
    eas.connect(signer);
    
    return eas;
};

export const createAttestation = async (aiId, messageId, relevance, accuracy) => {
    const eas = await getEASContract();
    
    const schemaEncoder = new SchemaEncoder("uint256 aiId, string messageId, uint256 relevance, uint256 accuracy, uint256 timestamp");
    const encodedData = schemaEncoder.encodeData([
        { name: "aiId", value: aiId, type: "uint256" },
        { name: "messageId", value: messageId, type: "string" },
        { name: "relevance", value: relevance, type: "uint256" },
        { name: "accuracy", value: accuracy, type: "uint256" },
        { name: "timestamp", value: Math.floor(Date.now() / 1000), type: "uint256" }
    ]);

    const tx = await eas.attest({
        schema: CONTRACT_CONFIG.SCHEMA_UID,
        data: {
            recipient: CONTRACT_CONFIG.AI_REPUTATION_ADDRESS,
            expirationTime: 0,
            revocable: true,
            data: encodedData,
        },
    });

    return await tx.wait();
};
