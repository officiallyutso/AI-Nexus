import React, { useState, useEffect, useRef } from 'react';
import { ethers } from 'ethers';
import { EAS, SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

const EAS_CONTRACT_ADDRESS = "0xC2679fBD37d54388Ce493F1DB75320D236e1815e"; // Sepolia address
const SCHEMA_UID = "0x0x4d65bdf2d3c9bf7b1a00b9e901b2018adf0f8423ce26b3cd90527f1241b8d968";



const agents = [
    {
        name: "Atlas",
        specialty: "General Intelligence",
        description: "A versatile AI agent for complex reasoning and problem-solving.",
        image: "./assets/agents/atlas.avif"
    },
    {
        name: "Nova",
        specialty: "Scientific Research",
        description: "Specialized in scientific analysis and research synthesis.",
        image: "./assets/agents/nova.avif"
    },
    {
        name: "Sage",
        specialty: "Education",
        description: "Expert in educational content and tutoring.",
        image: "./assets/agents/sage.avif"
    },
    {
        name: "Minerva",
        specialty: "Education & Tutoring",
        description: "A patient and adaptable tutor specializing in personalized learning strategies and comprehensive educational support.",
        image: "./assets/agents/defailt.avif"
    },
    {
        name: "Nexus",
        specialty: "Code & Development",
        description: "Advanced coding specialist with expertise across multiple programming languages and software architecture.",
        image: "./assets/agents/sage.avif"
    },
    {
        name: "Aurora",
        specialty: "Creative Arts",
        description: "An imaginative AI focused on artistic expression, creative writing, and multimedia content creation.",
        image: "./assets/agents/archi.jpg"
    },
    {
        name: "Pythagoras",
        specialty: "Mathematical Analysis",
        description: "Expert in complex mathematical computations, statistical analysis, and mathematical problem-solving.",
        image: "./assets/agents/debug.png"
    },
    {
        name: "Lexicon",
        specialty: "Language Processing",
        description: "Specialized in natural language understanding, translation, and multilingual communication.",
        image: "./assets/agents/defailt.avif"
    },
    {
        name: "Terra",
        specialty: "Environmental Science",
        description: "Dedicated to environmental analysis, sustainability solutions, and climate science research.",
        image: "./assets/agents/optimizer.png"
    },
    {
        name: "Quantum",
        specialty: "Business Analytics",
        description: "Strategic business analyst focusing on market trends, data-driven insights, and business optimization.",
        image: "./assets/agents/nova.avif"
    },
    {
        name: "Serena",
        specialty: "Mental Health & Wellness",
        description: "Compassionate wellness guide offering support for mental health, stress management, and personal development.",
        image: "./assets/agents/atlas.avif"
    }
];

const ratingCategories = ['Accuracy', 'Creation', 'Problem Solving', 'Relevancy', 'Processing', 'Analysis'];

const Playground = () => {
    const [activeAgents, setActiveAgents] = useState(new Set());
    const [isTyping, setIsTyping] = useState(false);
    const [currentRatingAgent, setCurrentRatingAgent] = useState(null);
    const [currentRatingMessageId, setCurrentRatingMessageId] = useState(null);
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [ratings, setRatings] = useState({});
    const [walletConnected, setWalletConnected] = useState(false);
    const [walletAddress, setWalletAddress] = useState('');
    const chatMessagesRef = useRef(null);

    const initializeEAS = async () => {
        try {
            if (typeof window.ethereum === 'undefined') {
                throw new Error('MetaMask is not installed!');
            }

            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            
            const eas = new EAS(EAS_CONTRACT_ADDRESS);
            eas.connect(signer);

            return eas;
        } catch (error) {
            console.error("Error initializing EAS:", error);
            throw error;
        }
    };

    const connectWallet = async () => {
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const accounts = await window.ethereum.request({ method: 'eth_accounts' });
            if (accounts.length > 0) {
                setWalletConnected(true);
                setWalletAddress(accounts[0]);
            }
        } catch (error) {
            console.error(error);
            addMessage('Failed to connect to MetaMask', 'ai');
        }
    };

    const addMessage = (text, type, agent = null) => {
        const newMessage = {
            id: Date.now(),
            text,
            type,
            agent
        };
        setMessages(prev => [...prev, newMessage]);
    };

    const sendMessage = async () => {
        if (!inputMessage.trim() || isTyping || activeAgents.size === 0) return;

        addMessage(inputMessage, 'user');
        setInputMessage('');
        setIsTyping(true);

        try {
            const response = await fetch('http://localhost:5000/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: inputMessage,
                    agents: Array.from(activeAgents)
                })
            });

            const responses = await response.json();
            
            Array.from(activeAgents).forEach((agent, index) => {
                setTimeout(() => {
                    addMessage(responses[agent.name], 'ai', agent);
                }, index * 1000);
            });
        } catch (error) {
            console.error('Error:', error);
            addMessage('An error occurred while generating responses.', 'ai');
        } finally {
            setIsTyping(false);
        }
    };

    const handleAgentAdd = (agentName) => {
        const selectedAgent = agents.find(a => a.name === agentName);
        if (!selectedAgent) return;
        
        if (!Array.from(activeAgents).some(a => a.name === selectedAgent.name)) {
            setActiveAgents(prev => new Set([...prev, selectedAgent]));
            addMessage(`Hello! I'm ${selectedAgent.name}, specialized in ${selectedAgent.specialty}.`, 'ai', selectedAgent);
        }
    };

    const submitRating = async () => {
        try {
            const feedback = document.getElementById('feedback').value;
            const ratingsArray = ratingCategories.map(category => 
                parseInt(ratings[category.toLowerCase().replace(' ', '-')] || 0)
            );

            while (ratingsArray.length < 6) {
                ratingsArray.push(0);
            }

            const ratingData = {
                agentName: currentRatingAgent,
                messageId: currentRatingMessageId,
                ratings: ratingsArray,
                feedback,
                timestamp: Math.floor(Date.now() / 1000)
            };

            const eas = await initializeEAS();
            const schemaEncoder = new SchemaEncoder(
                "string agentName,string messageId,uint8[6] ratings,string feedback,uint256 timestamp"
            );

            const encodedData = schemaEncoder.encodeData([
                { name: "agentName", value: ratingData.agentName, type: "string" },
                { name: "messageId", value: ratingData.messageId, type: "string" },
                { name: "ratings", value: ratingData.ratings, type: "uint8[6]" },
                { name: "feedback", value: ratingData.feedback, type: "string" },
                { name: "timestamp", value: ratingData.timestamp, type: "uint256" }
            ]);

            addMessage('Processing rating submission...', 'ai');

            const tx = await eas.attest({
                schema: SCHEMA_UID,
                data: {
                    recipient: "0x0000000000000000000000000000000000000000",
                    expirationTime: 0,
                    revocable: true,
                    data: encodedData
                }
            });

            const receipt = await tx.wait();
            
            addMessage(`Rating submitted successfully! View it on Sepolia EAS Scan: 
                https://sepolia.easscan.org/attestation/view/${receipt.transactionHash}`, 'ai');
            
            setCurrentRatingAgent(null);
            setCurrentRatingMessageId(null);
            
        } catch (error) {
            console.error('Error submitting rating:', error);
            addMessage('Error submitting rating: ' + error.message, 'ai');
        }
    };

    useEffect(() => {
        addMessage('👋 Welcome to AI Nexus! Select an agent to begin chatting.', 'ai');
    }, []);

    useEffect(() => {
        if (chatMessagesRef.current) {
            chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <div className="min-h-screen bg-[#1f2029] text-[#9498a4] pt-20">
            <nav className="fixed top-0 w-full bg-[#2a2b38] p-4 shadow-lg z-50">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <a href="/" className="text-2xl font-bold text-white">
                        AI<span className="text-[#5d5dff]">Nexus</span>
                    </a>
                    <div className="flex gap-8">
                        <a href="/" className="text-[#9498a4] hover:text-white">Home</a>
                        <a href="/profiles" className="text-[#9498a4] hover:text-white">Profiles</a>
                        <a href="/playground" className="text-[#9498a4] hover:text-white">Playground</a>
                        <a href="/dev" className="text-[#9498a4] hover:text-white">Development</a>
                    </div>
                    <button
                        onClick={connectWallet}
                        className="bg-[#f6851b] text-white px-4 py-2 rounded"
                    >
                        {walletConnected 
                            ? `Connected: ${walletAddress.substring(0, 6)}...${walletAddress.substring(38)}`
                            : 'Connect MetaMask'
                        }
                    </button>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto p-8 grid grid-cols-[250px_1fr] gap-8">
                {/* Sidebar */}
                <Card>
                    <CardHeader>
                        <CardTitle>Agents</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {/* Agent selection and toggles */}
                    </CardContent>
                </Card>

                {/* Chat Container */}
                <Card>
                    <CardContent className="p-0 relative h-[calc(100vh-180px)]">
                        <div 
                            ref={chatMessagesRef}
                            className="overflow-y-auto p-4 h-[calc(100%-80px)]"
                        >
                            {/* Messages */}
                        </div>
                        
                        {/* Input area */}
                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-[#2a2b38] border-t border-[rgba(255,255,255,0.1)]">
                            <div className="flex gap-4 bg-[#1f2029] p-2 rounded-lg">
                                <textarea
                                    value={inputMessage}
                                    onChange={(e) => setInputMessage(e.target.value)}
                                    className="flex-grow bg-transparent text-white p-2 outline-none resize-none min-h-[40px]"
                                    placeholder="Type your message..."
                                    rows="1"
                                />
                                <button
                                    onClick={sendMessage}
                                    disabled={!inputMessage.trim() || isTyping || activeAgents.size === 0}
                                    className="bg-[#5d5dff] text-white px-4 py-2 rounded-lg disabled:bg-[#9498a4]"
                                >
                                    Send
                                </button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Rating Modal */}
            {/* Add rating modal component here */}
        </div>
    );
};

export default Playground;