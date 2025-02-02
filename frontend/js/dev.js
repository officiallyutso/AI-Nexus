let isLoading = false;

        function showLoading() {
            const analysisResults = document.getElementById('analysisResults');
            analysisResults.innerHTML = `
                <div class="loading-container animate__animated animate__fadeIn">
                    <div class="loading-spinner"></div>
                    <p class="loading-text">Processing your request...</p>
                </div>
            `;
        }

        function hideLoading() {
            const loadingContainer = document.querySelector('.loading-container');
            if (loadingContainer) {
                loadingContainer.remove();
            }
        }
        // Codemirror for accha indentation identification
        const editor = CodeMirror(document.getElementById('codeEditor'), {
            mode: 'javascript',
            theme: 'monokai',
            lineNumbers: true,
            autofocus: true,
            tabSize: 2,
            indentWithTabs: false,
            lineWrapping: true,
            foldGutter: true,
            gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
            matchBrackets: true,
            autoCloseBrackets: true,
            styleActiveLine: true
        });

        // code language changer
        document.getElementById('languageSelect').addEventListener('change', (e) => {
            const mode = e.target.value === 'python' ? 'python' :
                        e.target.value === 'javascript' ? 'javascript' :
                        'text/x-java';
            editor.setOption('mode', mode);
        });

        document.getElementById('uploadBtn').addEventListener('click', () => {
            document.getElementById('fileUpload').click();
        });

        document.getElementById('fileUpload').addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = (e) => {
                editor.setValue(e.target.result);
            };
            reader.readAsText(file);
        });

        document.querySelectorAll('.agent-card').forEach(card => {
            card.addEventListener('click', () => {
                card.classList.toggle('active');
            });
        });

        document.getElementById('analyzeBtn').addEventListener('click', async () => {
            const code = editor.getValue();
            const language = document.getElementById('languageSelect').value;
            const activeAgents = Array.from(document.querySelectorAll('.agent-card.active'))
                                    .map(card => card.dataset.agent);

            if (activeAgents.length === 0) {
                showMessage('Please select at least one AI agent', 'error');
                return;
            }

            try {
                const response = await analyzeCode(code, language, activeAgents);
                displayAnalysisResults(response);
            } catch (error) {
                showMessage('Error analyzing code: ' + error.message, 'error');
            }
        });

        document.getElementById('improveBtn').addEventListener('click', async () => {
            const code = editor.getValue();
            const language = document.getElementById('languageSelect').value;

            try {
                const response = await improveCode(code, language);
                editor.setValue(response.improvedCode);
                showMessage('Code improved successfully', 'success');
            } catch (error) {
                showMessage('Error improving code: ' + error.message, 'error');
            }
        });

        document.getElementById('debugBtn').addEventListener('click', async () => {
            const code = editor.getValue();
            const language = document.getElementById('languageSelect').value;

            try {
                const response = await debugCode(code, language);
                displayDebugResults(response);
            } catch (error) {
                showMessage('Error debugging code: ' + error.message, 'error');
            }
        });

        // API calls VVI - pahale app.py & dev.py wala run kro for the local api
        async function analyzeCode(code, language, agents) {
            if (isLoading) return;
            isLoading = true;
            showLoading();
            
            try {
                const response = await fetch('http://localhost:9000/api/analyze', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ code, language, agents })
                });
                return await response.json();
            } catch (error) {
                throw error;
            } finally {
                isLoading = false;
            }
        }
        
        async function improveCode(code, language) {
            if (isLoading) return;
            isLoading = true;
            showLoading();
            
            try {
                const response = await fetch('http://localhost:9000/api/improve', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ code, language })
                });
                return await response.json();
            } catch (error) {
                throw error;
            } finally {
                isLoading = false;
            }
        }

        async function debugCode(code, language) {
            if (isLoading) return;
            isLoading = true;
            showLoading();
            
            try {
                const response = await fetch('http://localhost:9000/api/debug', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ code, language })
                });
                return await response.json();
            } catch (error) {
                throw error;
            } finally {
                isLoading = false;
            }
        }

        // Display results
        function displayAnalysisResults(results) {
            const analysisResults = document.getElementById('analysisResults');
            analysisResults.innerHTML = '';
        
            Object.entries(results).forEach(([agent, analysis]) => {
                const resultCard = document.createElement('div');
                resultCard.className = 'analysis-result animate__animated animate__fadeIn';
                
                let content = `
                    <div class="agent-header">
                        <img src="assets/agents/${agent}.avif" alt="${agent}" class="agent-avatar">
                        <div class="agent-info">
                            <h3>${agent.charAt(0).toUpperCase() + agent.slice(1)} Analysis</h3>
                        </div>
                    </div>
                    <div class="analysis-content">
                `;
        
                if (analysis.analysis) {
                    content += `
                        <div class="analysis-detail">
                            <h4>Detailed Analysis</h4>
                            <p>${analysis.analysis}</p>
                        </div>
                    `;
                }
        
                if (analysis.metrics) {
                    content += `
                        <div class="metrics-section">
                            <h4>Key Metrics</h4>
                            <div class="metrics-grid">
                                ${Object.entries(analysis.metrics).map(([metric, value]) => `
                                    <div class="metric-card">
                                        <div class="metric-header">
                                            <span>${metric}</span>
                                            <span class="metric-value">${value}</span>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    `;
                }
        
                if (analysis.suggestions && analysis.suggestions.length > 0) {
                    content += `
                        <div class="suggestions-section">
                            <h4>Improvement Suggestions</h4>
                            ${analysis.suggestions.map((suggestion, index) => `
                                <div class="suggestion-item">
                                    <div class="suggestion-number">${index + 1}</div>
                                    <div class="suggestion-text">${suggestion}</div>
                                </div>
                            `).join('')}
                        </div>
                    `;
                }
        
                if (analysis.resources && analysis.resources.length > 0) {
                    content += `
                        <div class="resources-section">
                            <h4>Learning Resources</h4>
                            <div class="resources-list">
                                ${analysis.resources.map(resource => `
                                    <a href="${resource.url}" target="_blank" class="resource-link">
                                        <span>${resource.title}</span>
                                        <span>→</span>
                                    </a>
                                `).join('')}
                            </div>
                        </div>
                    `;
                }
        
                content += '</div>';
                resultCard.innerHTML = content;
                analysisResults.appendChild(resultCard);
            });
        }
        

        function displayDebugResults(results) {
            const analysisResults = document.getElementById('analysisResults');
            analysisResults.innerHTML = '';
        
            const debugCard = document.createElement('div');
            debugCard.className = 'analysis-result animate__animated animate__fadeIn';
            
            let content = `
                <h3>Debug Results</h3>
                <div class="analysis-detail">
                    <p>${results.summary || 'Analysis complete.'}</p>
                </div>
            `;
            
            if (results.issues && results.issues.length > 0) {
                content += `
                    <div class="issues-section">
                        <h4>Found Issues</h4>
                        ${results.issues.map(issue => `
                            <div class="suggestion-item">
                                <div class="issue-severity ${issue.severity}">${issue.severity}</div>
                                <div class="issue-content">
                                    <div class="issue-location">Line ${issue.line}</div>
                                    <div class="issue-description">${issue.description}</div>
                                    ${issue.suggestion ? `<div class="issue-suggestion">Suggestion: ${issue.suggestion}</div>` : ''}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                `;
            } else {
                content += '<div class="success-message">No issues found in the code.</div>';
            }
        
            debugCard.innerHTML = content;
            analysisResults.appendChild(debugCard);
            hideLoading();
        }

        function showMessage(message, type) {
            const analysisResults = document.getElementById('analysisResults');
            const messageDiv = document.createElement('div');
            messageDiv.className = `${type}-message animate__animated animate__fadeIn`;
            messageDiv.textContent = message;
            
            analysisResults.insertBefore(messageDiv, analysisResults.firstChild);
            
            setTimeout(() => {
                messageDiv.remove();
            }, 5000);
        }

        // Sample code!!!!! final javascript meh hello world kaam aya XD
        editor.setValue(`// Welcome to AI Nexus Developer Playground
// Start coding or upload your file to begin analysis

function example() {
    console.log("Hello, World!");
}
`);