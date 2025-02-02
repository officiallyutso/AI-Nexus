const EAS_CONTRACT_ADDRESS = "0xC2679fBD37d54388Ce493F1DB75320D236e1815e"; // Sepolia address
        const SCHEMA_UID = "0x0x4d65bdf2d3c9bf7b1a00b9e901b2018adf0f8423ce26b3cd90527f1241b8d968"; // Replace with your actual schema UID after registration
        
        // Initialize EAS SDK
        async function initializeEAS() {
            try {
                // Check if MetaMask is installed
                if (typeof window.ethereum === 'undefined') {
                    throw new Error('MetaMask is not installed!');
                }
        
                // Request account access
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                
                // Create provider and signer
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                
                // Initialize EAS SDK
                const eas = new window.EAS(EAS_CONTRACT_ADDRESS);
                eas.connect(signer);
        
                return eas;
            } catch (error) {
                console.error("Error initializing EAS:", error);
                throw error;
            }
        }


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

        const agentSelect = document.getElementById('agentSelect');
        const addAgentBtn = document.getElementById('addAgent');
        const agentToggles = document.getElementById('agentToggles');
        const chatMessages = document.getElementById('chatMessages');
        const messageInput = document.getElementById('messageInput');
        const sendButton = document.getElementById('sendButton');

        let activeAgents = new Set();
        let isTyping = false;
        let currentRatingAgent = null;
        let currentRatingMessageId = null;
        const ratingCategories = ['Accuracy', 'Creation', 'Problem Solving', 'Relevancy', 'Processing', 'Analysis'];
        const ratings = {};

        agents.forEach(agent => {
            const option = document.createElement('option');
            option.value = agent.name;
            option.textContent = agent.name;
            agentSelect.appendChild(option);
        });

        addAgentBtn.addEventListener('click', () => {
            const selectedAgent = agents.find(a => a.name === agentSelect.value);
            if (!selectedAgent) return;
            
            if (!Array.from(activeAgents).some(a => a.name === selectedAgent.name)) {
                activeAgents.add(selectedAgent);
                createAgentToggle(selectedAgent);
                updateSendButtonState();
                
                addMessage(`Hello! I'm ${selectedAgent.name}, specialized in ${selectedAgent.specialty}.`, 'ai', selectedAgent);
            }
        });

        function createAgentToggle(agent) {
            const toggle = document.createElement('div');
            toggle.className = 'agent-toggle active';
            toggle.innerHTML = `
                <img src="${agent.image}" alt="${agent.name}">
                <span>${agent.name}</span>
            `;

            toggle.addEventListener('click', () => {
                toggle.classList.toggle('active');
                if (toggle.classList.contains('active')) {
                    activeAgents.add(agent);
                } else {
                    activeAgents.delete(agent);
                }
                updateSendButtonState();
            });

            agentToggles.appendChild(toggle);
        }

        messageInput.addEventListener('input', () => {
            messageInput.style.height = 'auto';
            messageInput.style.height = messageInput.scrollHeight + 'px';
            updateSendButtonState();
        });

        messageInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });

        sendButton.addEventListener('click', sendMessage);

        async function sendMessage() {
            const message = messageInput.value.trim();
            if (!message || isTyping || activeAgents.size === 0) return;
        
            addMessage(message, 'user');
            messageInput.value = '';
            messageInput.style.height = 'auto';
            updateSendButtonState();
        
            isTyping = true;
            updateSendButtonState();
            
            try {
                const activeAgentArray = Array.from(activeAgents);
                const response = await fetch('http://localhost:5000/api/chat', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        message: message,
                        agents: activeAgentArray
                    })
                });
        
                const responses = await response.json();
        
                activeAgentArray.forEach((agent, index) => {
                    setTimeout(() => {
                        const agentResponse = responses[agent.name];
                        addMessage(agentResponse, 'ai', agent);
                        
                        if (index === activeAgentArray.length - 1) {
                            isTyping = false;
                            updateSendButtonState();
                        }
                    }, index * 1000);
                });
            } catch (error) {
                console.error('Error:', error);
                addMessage('An error occurred while generating responses.', 'ai');
                isTyping = false;
                updateSendButtonState();
            }
        }

        function generateResponse(agent, userMessage) {
            const responses = [
                `Based on my ${agent.specialty} expertise, I think...`,
                `From a ${agent.specialty} perspective, I'd say...`,
                `Interesting point! In ${agent.specialty}, we often...`,
                `Let me approach this from my ${agent.specialty} background...`
            ];
            return responses[Math.floor(Math.random() * responses.length)] + 
                   " " + userMessage.substring(0, 20) + "...";
        }

        function initializeRatingCategories() {
            const container = document.getElementById('ratingCategories');
            container.innerHTML = '';

            ratingCategories.forEach(category => {
                const div = document.createElement('div');
                div.className = 'rating-category';
                div.innerHTML = `
                    <div>${category}</div>
                    <div class="rating-stars" data-category="${category.toLowerCase().replace(' ', '-')}">
                        ${Array.from({length: 5}, (_, i) => `
                            <span class="star" onclick="setRating('${category.toLowerCase().replace(' ', '-')}', ${i + 1})">★</span>
                        `).join('')}
                    </div>
                `;
                container.appendChild(div);
            });
        }

        function formatMessageText(text) {
            // formatting keliye
            const lines = text.split('\n');
            let formattedContent = '';
            let inList = false;
            let listType = null;
            let listContent = '';

            for (let line of lines) {
                line = line.trim();
                
                // Skip empty lines
                if (!line) {
                    if (inList) {
                        formattedContent += listContent;
                        listContent = '';
                        inList = false;
                    }
                    formattedContent += '<br>';
                    continue;
                }

                // bullet points ke liye
                if (line.startsWith('- ') || line.startsWith('• ') || line.startsWith('* ')) {
                    if (!inList || listType !== 'bullet') {
                        if (inList) {
                            formattedContent += listContent;
                        }
                        listContent = '<div class="bullet-list">';
                        inList = true;
                        listType = 'bullet';
                    }
                    listContent += `<div class="bullet-point">${line.substring(2)}</div>`;
                    continue;
                }

                // numbered points keliye
                if (/^\d+\.\s/.test(line)) {
                    if (!inList || listType !== 'numbered') {
                        if (inList) {
                            formattedContent += listContent;
                        }
                        listContent = '<div class="numbered-list" style="counter-reset: item 0;">';
                        inList = true;
                        listType = 'numbered';
                    }
                    listContent += `<div class="numbered-point">${line.substring(line.indexOf(' ') + 1)}</div>`;
                    continue;
                }

                // VVI CODE BLOCKS XD
                if (line.startsWith('```')) {
                    if (inList) {
                        formattedContent += listContent;
                        listContent = '';
                        inList = false;
                    }
                    formattedContent += '<div class="code-block">';
                    continue;
                }
                if (line.endsWith('```')) {
                    formattedContent += '</div>';
                    continue;
                }

                if (line.startsWith('#')) {
                    if (inList) {
                        formattedContent += listContent;
                        listContent = '';
                        inList = false;
                    }
                    const level = line.match(/^#+/)[0].length;
                    const text = line.substring(level).trim();
                    formattedContent += `<h${level}>${text}</h${level}>`;
                    continue;
                }

                if (!inList) {
                    formattedContent += `<p>${line}</p>`;
                } else {
                    formattedContent += listContent + '</div>';
                    formattedContent += `<p>${line}</p>`;
                    inList = false;
                    listContent = '';
                }
            }

            if (inList) {
                formattedContent += listContent + '</div>';
            }

            return formattedContent;
        }

        // Add message to chat
        function addMessage(text, type, agent = null) {
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${type}-message animate__animated animate__fadeIn`;
            
            if (type === 'ai' && agent) {
                const messageId = `msg-${Date.now()}`;
                messageDiv.setAttribute('data-message-id', messageId);
                
                messageDiv.innerHTML = `
                    <div class="agent-header" style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
                        <img src="${agent.image}" alt="${agent.name}" style="width: 24px; height: 24px; border-radius: 50%;">
                        <span style="color: var(--accent)">${agent.name}</span>
                        <button class="rating-button" onclick="openRatingModal('${agent.name}', '${messageId}')">Rate Response</button>
                    </div>
                    <div class="message-content">
                        ${formatMessageText(text)}
                    </div>
                `;
            } else {
                messageDiv.innerHTML = `
                    <div class="message-content">
                        ${formatMessageText(text)}
                    </div>
                `;
            }
        
            chatMessages.appendChild(messageDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        
        function openRatingModal(agentName, messageId) {
            currentRatingAgent = agentName;
            currentRatingMessageId = messageId;
            document.getElementById('ratingModal').classList.add('active');
            initializeRatingCategories();
            // Reset ratings FUTURE USE KELIYE
            ratingCategories.forEach(category => {
                ratings[category.toLowerCase().replace(' ', '-')] = 0;
            });
            document.getElementById('feedback').value = '';
        }

        function closeRatingModal() {
            document.getElementById('ratingModal').classList.remove('active');
            currentRatingAgent = null;
            currentRatingMessageId = null;
        }

        function setRating(category, value) {
            ratings[category] = value;
            const stars = document.querySelector(`[data-category="${category}"]`).children;
            Array.from(stars).forEach((star, index) => {
                star.classList.toggle('active', index < value);
            });
        }

        async function submitRating() {
            try {
                const feedback = document.getElementById('feedback').value;
                
                // Convert ratings object to array of numbers
                const ratingsArray = ratingCategories.map(category => 
                    parseInt(ratings[category.toLowerCase().replace(' ', '-')] || 0)
                );

                // Ensure we have exactly 6 ratings
                while (ratingsArray.length < 6) {
                    ratingsArray.push(0);
                }
                
                const ratingData = {
                    agentName: currentRatingAgent,
                    messageId: currentRatingMessageId,
                    ratings: ratingsArray,
                    feedback: feedback,
                    timestamp: Math.floor(Date.now() / 1000)
                };

                // Initialize EAS
                const eas = await initializeEAS();

                // Create SchemaEncoder instance
                const schemaEncoder = new window.EAS.SchemaEncoder("string agentName,string messageId,uint8[6] ratings,string feedback,uint256 timestamp");

                // Encode the data
                const encodedData = schemaEncoder.encodeData([
                    { name: "agentName", value: ratingData.agentName, type: "string" },
                    { name: "messageId", value: ratingData.messageId, type: "string" },
                    { name: "ratings", value: ratingData.ratings, type: "uint8[6]" },
                    { name: "feedback", value: ratingData.feedback, type: "string" },
                    { name: "timestamp", value: ratingData.timestamp, type: "uint256" }
                ]);

                // Show loading message
                addMessage('Processing rating submission...', 'ai');

                // Create the attestation
                const tx = await eas.attest({
                    schema: SCHEMA_UID,
                    data: {
                        recipient: "0x0000000000000000000000000000000000000000",
                        expirationTime: 0,
                        revocable: true,
                        data: encodedData
                    }
                });

                // Wait for transaction confirmation
                const receipt = await tx.wait();
                
                console.log("Attestation created:", receipt);
                
                // Show success message
                addMessage(`Rating submitted successfully! View it on Sepolia EAS Scan: 
                    https://sepolia.easscan.org/attestation/view/${receipt.transactionHash}`, 'ai');
                
                closeRatingModal();
                
            } catch (error) {
                console.error('Error submitting rating:', error);
                addMessage('Error submitting rating: ' + error.message, 'ai');
            }
        }
        // Add MetaMask connection button and status
        function addMetaMaskButton() {
            const navContent = document.querySelector('.nav-content');
            const metaMaskDiv = document.createElement('div');
            metaMaskDiv.className = 'metamask-status';
            metaMaskDiv.innerHTML = `
                <button id="connectMetaMask" class="metamask-button">
                    Connect MetaMask
                </button>
                <span id="walletStatus"></span>
            `;
            navContent.appendChild(metaMaskDiv);

            // Add event listener
            document.getElementById('connectMetaMask').addEventListener('click', async () => {
                try {
                    await window.ethereum.request({ method: 'eth_requestAccounts' });
                    const accounts = await window.ethereum.request({ method: 'eth_accounts' });
                    if (accounts.length > 0) {
                        document.getElementById('walletStatus').textContent = 
                            `Connected: ${accounts[0].substring(0, 6)}...${accounts[0].substring(38)}`;
                    }
                } catch (error) {
                    console.error(error);
                    addMessage('Failed to connect to MetaMask', 'ai');
                }
            });
        }

        document.addEventListener('DOMContentLoaded', () => {
            addMetaMaskButton();
            initChat();
        });



        function updateSendButtonState() {
            const hasText = messageInput.value.trim().length > 0;
            const hasAgents = activeAgents.size > 0;
            sendButton.disabled = !hasText || !hasAgents || isTyping;
        }
        updateSendButtonState();
        // Typing indctor blinking wala
        function showTypingIndicator() {
            const indicatorDiv = document.createElement('div');
            indicatorDiv.className = 'typing-indicator';
            indicatorDiv.innerHTML = `
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            `;
            chatMessages.appendChild(indicatorDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        function removeTypingIndicator() {
            const indicator = chatMessages.querySelector('.typing-indicator');
            if (indicator) {
                indicator.remove();
            }
        }

        // thoda sa translation when agent switch kiya
        function animateAgentTransition(agentToggle) {
            agentToggle.style.transform = 'translateX(10px)';
            setTimeout(() => {
                agentToggle.style.transform = 'translateX(0)';
            }, 200);
        }

        function clearChat() {
            while (chatMessages.firstChild) {
                chatMessages.removeChild(chatMessages.firstChild);
            }
            addMessage('Chat cleared. Select agents to start a new conversation.', 'ai');
        }

        let messageCount = 0;

        function updateMessageCount() {
            messageCount++;
            const countDisplay = document.createElement('div');
            countDisplay.style.position = 'absolute';
            countDisplay.style.right = '10px';
            countDisplay.style.top = '10px';
            countDisplay.style.color = 'var(--text)';
            countDisplay.textContent = `Messages: ${messageCount}`;
            chatMessages.appendChild(countDisplay);
        }

        chatMessages.addEventListener('scroll', () => {
            if (chatMessages.scrollTop + chatMessages.clientHeight >= chatMessages.scrollHeight) {
                chatMessages.classList.add('at-bottom');
            } else {
                chatMessages.classList.remove('at-bottom');
            }
        });

        window.addEventListener('resize', () => {
            if (messageInput) {
                messageInput.style.height = 'auto';
                messageInput.style.height = messageInput.scrollHeight + 'px';
            }
        });

        function handleError(error) {
            console.error('Error:', error);
            addMessage('An error occurred. Please try again.', 'ai');
            isTyping = false;
            updateSendButtonState();
        }

        function initChat() {
            clearChat();
            addMessage('👋 Welcome to AI Nexus! Select an agent to begin chatting.', 'ai');
            activeAgents.clear();
            messageCount = 0;
            isTyping = false;
            updateSendButtonState();
            while (agentToggles.firstChild) {
                agentToggles.removeChild(agentToggles.firstChild);
            }
        }

        // initialization of page yaha
        document.addEventListener('DOMContentLoaded', initChat);