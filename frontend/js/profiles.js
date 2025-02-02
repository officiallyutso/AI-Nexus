const agents = [
    {
        id: 1,
        name: "Atlas",
        specialty: "General Intelligence",
        description: "A versatile AI agent capable of handling complex reasoning tasks, creative writing, and sophisticated problem-solving.",
        image: "./assets/agents/atlas.avif",
        reputation: 4.9,
        tokens: 15243789,
        successRate: 98.5,
        responseTime: 0.8,
        accuracy: 96.7,
        monthlyGrowth: [23, 31, 28, 35, 42, 38, 45, 39, 47, 52, 49, 55],
        taskDistribution: {
            reasoning: 35,
            writing: 30,
            analysis: 20,
            problemSolving: 15
        },
        performanceMetrics: {
            problemSolving: 95,
            creativity: 92,
            accuracy: 97,
            speed: 94,
            consistency: 96
        },
        recentActivity: [
            { task: "Complex Analysis", status: "success", time: "2h ago" },
            { task: "Creative Writing", status: "success", time: "4h ago" },
            { task: "Problem Solving", status: "warning", time: "6h ago" },
            { task: "Data Analysis", status: "success", time: "8h ago" }
        ]
    },
    {
        id: 2,
        name: "Nova",
        specialty: "Scientific Research",
        description: "Advanced AI researcher specializing in data analysis, hypothesis testing, and scientific literature synthesis across multiple disciplines.",
        image: "./assets/agents/nova.avif",
        reputation: 4.8,
        tokens: 18567234,
        successRate: 97.8,
        responseTime: 1.2,
        accuracy: 98.9,
        monthlyGrowth: [15, 28, 32, 29, 35, 42, 38, 45, 41, 48, 52, 47],
        taskDistribution: {
            research: 40,
            dataAnalysis: 30,
            hypothesisTesting: 20,
            documentation: 10
        },
        performanceMetrics: {
            accuracy: 99,
            methodology: 97,
            dataHandling: 98,
            reporting: 96,
            peerReview: 95
        },
        recentActivity: [
            { task: "Research Synthesis", status: "success", time: "1h ago" },
            { task: "Data Analysis", status: "success", time: "3h ago" },
            { task: "Literature Review", status: "success", time: "5h ago" },
            { task: "Hypothesis Testing", status: "warning", time: "7h ago" }
        ]
    },
    {
        id: 3,
        name: "Sage",
        specialty: "Education",
        description: "Expert educational AI focused on personalized learning paths, interactive tutorials, and comprehensive subject matter expertise.",
        image: "./assets/agents/sage.avif",
        reputation: 4.7,
        tokens: 12456789,
        successRate: 96.5,
        responseTime: 0.5,
        accuracy: 95.8,
        monthlyGrowth: [18, 22, 25, 21, 28, 32, 29, 35, 38, 36, 41, 39],
        taskDistribution: {
            teaching: 45,
            assessment: 25,
            curriculum: 20,
            mentoring: 10
        },
        performanceMetrics: {
            teaching: 96,
            engagement: 94,
            clarity: 95,
            adaptability: 93,
            assessment: 97
        },
        recentActivity: [
            { task: "Math Tutorial", status: "success", time: "30m ago" },
            { task: "Science Quiz", status: "success", time: "2h ago" },
            { task: "History Lesson", status: "success", time: "4h ago" },
            { task: "Student Assessment", status: "warning", time: "6h ago" }
        ]
    },
    {
        id: 4,
        name: "Minerva",
        specialty: "Education & Tutoring",
        description: "Specialized tutor combining adaptive learning techniques with comprehensive subject expertise to deliver personalized educational experiences.",
        image: "./assets/agents/defailt.avif",
        reputation: 4.6,
        tokens: 10789456,
        successRate: 95.9,
        responseTime: 0.6,
        accuracy: 94.8,
        monthlyGrowth: [12, 15, 19, 22, 18, 25, 28, 24, 31, 29, 34, 32],
        taskDistribution: {
            tutoring: 50,
            homework: 20,
            assessment: 20,
            planning: 10
        },
        performanceMetrics: {
            instruction: 95,
            patience: 98,
            explanation: 96,
            feedback: 94,
            support: 97
        },
        recentActivity: [
            { task: "Physics Tutoring", status: "success", time: "1h ago" },
            { task: "Essay Review", status: "warning", time: "3h ago" },
            { task: "Math Help", status: "success", time: "5h ago" },
            { task: "Study Planning", status: "success", time: "7h ago" }
        ]
    },
    {
        id: 5,
        name: "Nexus",
        specialty: "Code & Development",
        description: "Advanced coding specialist offering expertise in multiple programming languages, software architecture, and development best practices.",
        image: "./assets/agents/sage.avif",
        reputation: 4.9,
        tokens: 20345678,
        successRate: 97.2,
        responseTime: 0.4,
        accuracy: 98.1,
        monthlyGrowth: [28, 35, 32, 38, 42, 45, 41, 48, 52, 47, 55, 51],
        taskDistribution: {
            coding: 40,
            debugging: 25,
            architecture: 20,
            review: 15
        },
        performanceMetrics: {
            codeQuality: 98,
            debugging: 97,
            optimization: 96,
            security: 98,
            documentation: 95
        },
        recentActivity: [
            { task: "Code Review", status: "success", time: "30m ago" },
            { task: "Bug Fix", status: "success", time: "2h ago" },
            { task: "Feature Development", status: "warning", time: "4h ago" },
            { task: "Architecture Design", status: "success", time: "6h ago" }
        ]
    },
    {
        id: 6,
        name: "Aurora",
        specialty: "Creative Arts",
        description: "Innovative AI artist specializing in digital art creation, creative writing, and multimedia content generation with a focus on originality.",
        image: "./assets/agents/archi.jpg",
        reputation: 4.7,
        tokens: 13678945,
        successRate: 94.8,
        responseTime: 1.5,
        accuracy: 93.5,
        monthlyGrowth: [19, 25, 22, 28, 32, 29, 35, 31, 38, 42, 37, 45],
        taskDistribution: {
            artCreation: 35,
            writing: 30,
            design: 20,
            storytelling: 15
        },
        performanceMetrics: {
            creativity: 98,
            originality: 96,
            technique: 94,
            versatility: 95,
            innovation: 97
        },
        recentActivity: [
            { task: "Digital Artwork", status: "success", time: "1h ago" },
            { task: "Story Writing", status: "success", time: "3h ago" },
            { task: "Logo Design", status: "warning", time: "5h ago" },
            { task: "Animation", status: "success", time: "7h ago" }
        ]
    },
    {
        id: 7,
        name: "Pythagoras",
        specialty: "Mathematical Analysis",
        description: "Mathematical expert AI focusing on complex calculations, statistical analysis, and advanced problem-solving in various mathematical fields.",
        image: "./assets/agents/debug.png",
        reputation: 4.9,
        tokens: 16789234,
        successRate: 99.1,
        responseTime: 0.3,
        accuracy: 99.5,
        monthlyGrowth: [25, 31, 28, 35, 38, 42, 37, 45, 48, 43, 51, 47],
        taskDistribution: {
            calculation: 40,
            statistics: 25,
            modeling: 20,
            optimization: 15
        },
        performanceMetrics: {
            accuracy: 99,
            speed: 98,
            complexity: 97,
            visualization: 96,
            explanation: 95
        },
        recentActivity: [
            { task: "Statistical Analysis", status: "success", time: "1h ago" },
            { task: "Math Modeling", status: "success", time: "3h ago" },
            { task: "Optimization", status: "success", time: "5h ago" },
            { task: "Data Processing", status: "warning", time: "7h ago" }
        ]
    },
    {
        id: 8,
        name: "Lexicon",
        specialty: "Language Processing",
        description: "Linguistic expert AI excelling in natural language processing, translation services, and advanced communication analysis across multiple languages.",
        image: "./assets/agents/defailt.avif",
        reputation: 4.8,
        tokens: 14567890,
        successRate: 96.8,
        responseTime: 0.7,
        accuracy: 97.2,
        monthlyGrowth: [21, 25, 28, 24, 31, 35, 32, 38, 42, 37, 45, 41],
        taskDistribution: {
            translation: 35,
            analysis: 25,
            interpretation: 25,
            documentation: 15
        },
        performanceMetrics: {
            accuracy: 97,
            fluency: 96,
            context: 98,
            cultural: 95,
            technical: 96
        },
        recentActivity: [
            { task: "Translation", status: "success", time: "30m ago" },
            { task: "Language Analysis", status: "success", time: "2h ago" },
            { task: "Content Review", status: "warning", time: "4h ago" },
            { task: "Documentation", status: "success", time: "6h ago" }
        ]
    },
    {
        id: 9,
        name: "Terra",
        specialty: "Environmental Science",
        description: "Environmental specialist AI dedicated to climate analysis, sustainability research, and ecological system modeling.",
        image: "./assets/agents/optimizer.png",
        reputation: 4.7,
        tokens: 11234567,
        successRate: 95.6,
        responseTime: 1.0,
        accuracy: 96.3,
        monthlyGrowth: [15, 19, 22, 18, 25, 28, 24, 31, 35, 32, 38, 35],
        taskDistribution: {
            research: 35,
            analysis: 30,
            modeling: 20,
            reporting: 15
        },
        performanceMetrics: {
            accuracy: 96,
            research: 95,
            modeling: 94,
            reporting: 97,
            analysis: 96
        },
        recentActivity: [
            { task: "Climate Analysis", status: "success", time: "1h ago" },
            { task: "Sustainability Report", status: "warning", time: "3h ago" },
            { task: "Ecosystem Modeling", status: "success", time: "5h ago" },
            { task: "Impact Assessment", status: "success", time: "7h ago" }
        ]
    },
    {
        id: 10,
        name: "Quantum",
        specialty: "Business Analytics",
        description: "Strategic business AI analyst specializing in market trend analysis, predictive modeling, and data-driven business optimization.",
        image: "./assets/agents/nova.avif",
        reputation: 4.8,
        tokens: 17890123,
        successRate: 97.4,
        responseTime: 0.9,
        accuracy: 97.8,
        monthlyGrowth: [25, 31, 28, 35, 39, 42, 38, 45, 48, 44, 51, 47],
        taskDistribution: {
            analysis: 40,
            strategy: 25,
            forecasting: 20,
            reporting: 15
        },
        performanceMetrics: {
            accuracy: 98,
            insight: 96,
            prediction: 97,
            reporting: 95,
            strategy: 96
        },
        recentActivity: [
            { task: "Market Analysis", status: "success", time: "30m ago" },
            { task: "Trend Forecasting", status: "success", time: "2h ago" },
            { task: "Strategy Planning", status: "warning", time: "4h ago" },
            { task: "Performance Review", status: "success", time: "6h ago" }
        ]
    },
    {
        id: 11,
        name: "Serena",
        specialty: "Mental Health & Wellness",
        description: "Empathetic wellness AI guide providing support for mental health, stress management, and personal development strategies.",
        image: "./assets/agents/atlas.avif",
        reputation: 4.6,
        tokens: 9876543,
        successRate: 94.2,
        responseTime: 1.1,
        accuracy: 93.9,
        monthlyGrowth: [18, 22, 20, 25, 28, 24, 31, 27, 34, 32, 37, 35],
        taskDistribution: {
            counseling: 40,
            support: 25,
            guidance: 20,
            resources: 15
        },
        performanceMetrics: {
            empathy: 98,
            support: 97,
            guidance: 95,
            resources: 94,
            followup: 96
        },
        recentActivity: [
            { task: "Wellness Session", status: "success", time: "1h ago" },
            { task: "Stress Management", status: "success", time: "3h ago" },
            { task: "Support Chat", status: "warning", time: "5h ago" },
            { task: "Resource Provision", status: "success", time: "7h ago" }
        ]
    }
];


// fillings keliye random data
        const specialties = [
            "Scientific Research", "Education & Tutoring", "Code & Development",
            "Creative Arts", "Mathematical Analysis", "Language Processing",
            "Environmental Science", "Business Analytics", "Mental Health & Wellness"
        ];

        for (let i = 2; i <= 10; i++) {
            const monthlyGrowth = Array.from({length: 12}, () => Math.floor(Math.random() * 40 + 10));
            const taskTypes = ["Analysis", "Processing", "Creation", "Problem Solving"];
            const taskDistribution = {};
            let remaining = 100;
            
            taskTypes.forEach((task, index) => {
                if (index === taskTypes.length - 1) {
                    taskDistribution[task] = remaining;
                } else {
                    const value = Math.floor(Math.random() * (remaining - 10) + 10);
                    taskDistribution[task] = value;
                    remaining -= value;
                }
            });

            const recentActivity = [];
            for (let j = 0; j < 4; j++) {
                const status = Math.random() > 0.8 ? "warning" : "success";
                recentActivity.push({
                    task: taskTypes[Math.floor(Math.random() * taskTypes.length)],
                    status,
                    time: `${j * 2 + 2}h ago`
                });
            }

            agents.push({
                id: i,
                name: `Coming Soon`,
                specialty: specialties[i - 2],
                description: `Specialized AI agent focused on ${specialties[i - 2].toLowerCase()} with advanced capabilities in data processing and analysis.`,
                image: `./assets/agents/defailt.avif`,
                reputation: 0.0,
                tokens: 0.0,
                successRate: 0.0,
                responseTime: 0.0,
                accuracy: 0.0,
                monthlyGrowth,
                taskDistribution,
                performanceMetrics: {
                    problemSolving: 0.0,
                    creativity: 0.0,
                    accuracy: 0.0,
                    speed: 0.0,
                    consistency: 0.0
                },
                recentActivity
            });
        }

        function createProfileCard(agent) {
            const card = document.createElement('div');
            card.className = 'profile-card animate__animated animate__fadeIn';
            card.innerHTML = `
                <div class="profile-header">
                    <button class="close-button">×</button>
                    <img src="${agent.image}" alt="${agent.name}" class="profile-image">
                    <h2 class="profile-name">${agent.name}</h2>
                    <div class="profile-specialty">${agent.specialty}</div>
                    <p>${agent.description}</p>
                </div>

                <div class="profile-stats">
                    <div class="stat-card">
                        <div class="stat-value">${agent.reputation}</div>
                        <div class="stat-label">Reputation</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value">${(agent.tokens / 1000000).toFixed(1)}M</div>
                        <div class="stat-label">Tokens</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value">${agent.successRate}%</div>
                        <div class="stat-label">Success Rate</div>
                    </div>
                </div>

                <div class="expanded-content">
                    <div class="metrics-grid">
                        <div class="metric-card">
    <h3>Monthly Growth</h3>
    <div class="chart-container">
        <canvas id="growthChart-${agent.id}"></canvas>
    </div>
</div>
<div class="metric-card">
    <h3>Task Distribution</h3>
    <div class="chart-container">
        <canvas id="taskChart-${agent.id}"></canvas>
    </div>
</div>
</div>

<div class="performance-metrics">
    <h3 class="mb-4">Performance Metrics</h3>
    ${Object.entries(agent.performanceMetrics).map(([key, value]) => `
        <div class="performance-item">
            <div class="flex justify-between">
                <span>${key.charAt(0).toUpperCase() + key.slice(1)}</span>
                <span>${value}%</span>
            </div>
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${value}%"></div>
            </div>
        </div>
    `).join('')}
</div>

<div class="history-log">
    <h3>Recent Activity</h3>
    ${agent.recentActivity.map(activity => `
        <div class="log-entry">
            <span>${activity.task}</span>
            <div>
                <span class="badge badge-${activity.status}">${activity.status}</span>
                <span class="text-sm ml-2">${activity.time}</span>
            </div>
        </div>
    `).join('')}
</div>
</div>`;


            const setupCharts = () => {
                const growthCtx = document.getElementById(`growthChart-${agent.id}`);
                new Chart(growthCtx, {
                    type: 'line',
                    data: {
                        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                        datasets: [{
                            label: 'Monthly Growth',
                            data: agent.monthlyGrowth,
                            borderColor: '#5d5dff',
                            tension: 0.4,
                            fill: true,
                            backgroundColor: 'rgba(93, 93, 255, 0.1)'
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                display: false
                            }
                        },
                        scales: {
                            y: {
                                beginAtZero: true,
                                grid: {
                                    color: 'rgba(255, 255, 255, 0.1)'
                                },
                                ticks: {
                                    color: '#9498a4'
                                }
                            },
                            x: {
                                grid: {
                                    display: false
                                },
                                ticks: {
                                    color: '#9498a4'
                                }
                            }
                        }
                    }
                });

                const taskCtx = document.getElementById(`taskChart-${agent.id}`);
                new Chart(taskCtx, {
                    type: 'doughnut',
                    data: {
                        labels: Object.keys(agent.taskDistribution),
                        datasets: [{
                            data: Object.values(agent.taskDistribution),
                            backgroundColor: [
                                '#5d5dff',
                                '#4CAF50',
                                '#FFC107',
                                '#FF5252'
                            ]
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                position: 'bottom',
                                labels: {
                                    color: '#9498a4'
                                }
                            }
                        }
                    }
                });
            };

            // yaha se saare event Listeners hai
            card.querySelector('.close-button').addEventListener('click', (e) => {
                e.stopPropagation();
                card.classList.remove('expanded');
                document.getElementById('overlay').classList.remove('active');
                document.body.style.overflow = 'auto';
            });

            card.addEventListener('click', () => {
                if (!card.classList.contains('expanded')) {
                    card.classList.add('expanded');
                    document.getElementById('overlay').classList.add('active');
                    document.body.style.overflow = 'hidden';
                    setTimeout(setupCharts, 500); // charts load keliye delay
                }
            });

            return card;
        }

        const profilesContainer = document.getElementById('profilesContainer');
        const searchInput = document.getElementById('searchInput');
        const overlay = document.getElementById('overlay');

        function renderProfiles(agents) {
            profilesContainer.innerHTML = '';
            agents.forEach((agent, index) => {
                const card = createProfileCard(agent);
                card.style.animationDelay = `${index * 0.1}s`;
                profilesContainer.appendChild(card);
            });
        }

        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const filteredAgents = agents.filter(agent => 
                agent.name.toLowerCase().includes(searchTerm) ||
                agent.specialty.toLowerCase().includes(searchTerm) ||
                agent.description.toLowerCase().includes(searchTerm)
            );
            renderProfiles(filteredAgents);
        });

        overlay.addEventListener('click', () => {
            const expandedCard = document.querySelector('.profile-card.expanded');
            if (expandedCard) {
                expandedCard.classList.remove('expanded');
                overlay.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });

        renderProfiles(agents);