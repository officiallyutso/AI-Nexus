from flask import Flask, request, jsonify
from flask_cors import CORS
from langchain_community.llms import Ollama
import json
import re

app = Flask(__name__)
CORS(app)

# Initialize AI agents with their specialties
DEV_AGENTS = {
    "architect": {
        "name": "Code Architect",
        "specialty": "code structure and design patterns",
        "focus": "analyzing code organization, suggesting architectural improvements"
    },
    "debugger": {
        "name": "Debug Master",
        "specialty": "debugging and error detection",
        "focus": "identifying potential bugs, security issues, and runtime problems"
    },
    "optimizer": {
        "name": "Code Optimizer",
        "specialty": "code optimization and performance",
        "focus": "improving code efficiency, suggesting performance enhancements"
    }
}

def get_agent_llm():
    return Ollama(model="llama2", temperature=0.1)

def create_agent_prompt(agent_type, code, language):
    agent = DEV_AGENTS[agent_type]
    return f"""You are {agent['name']}, an AI specialized in {agent['specialty']}.
Your task is to {agent['focus']}.

CODE ANALYSIS REQUEST:
Language: {language}
Code:
```{language}
{code}
```

Please provide:
1. Detailed analysis of the code
2. Key metrics and quality indicators
3. Specific suggestions for improvement
4. Learning resources for the identified areas of improvement

Format your response as JSON with the following structure:
{{
    "analysis": "detailed analysis text",
    "metrics": {{
        "metric1": "value1",
        "metric2": "value2"
    }},
    "suggestions": ["suggestion1", "suggestion2"],
    "resources": [
        {{"title": "resource1 title", "url": "url1"}},
        {{"title": "resource2 title", "url": "url2"}}
    ]
}}"""

def format_analysis_response(response_text):
    """Extract and format JSON response from AI output"""
    try:
        # Find JSON content using regex
        json_match = re.search(r'\{[\s\S]*\}', response_text)
        if json_match:
            response_json = json.loads(json_match.group())
            return response_json
        return {"error": "Invalid response format"}
    except json.JSONDecodeError:
        return {"error": "Failed to parse response"}

@app.route('/api/analyze', methods=['POST'])
def analyze_code():
    try:
        data = request.json
        code = data['code']
        language = data['language']
        agents = data['agents']
        
        llm = get_agent_llm()
        results = {}
        
        for agent in agents:
            prompt = create_agent_prompt(agent, code, language)
            response = llm.invoke(prompt)
            results[agent] = format_analysis_response(response)
        
        return jsonify(results)
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/improve', methods=['POST'])
def improve_code():
    try:
        data = request.json
        code = data['code']
        language = data['language']
        
        llm = get_agent_llm()
        
        prompt = f"""As a code improvement specialist, analyze and improve the following code.
Make it more efficient, readable, and maintainable while preserving its functionality.

Language: {language}
Code:
```{language}
{code}
```

Provide the improved code and explain the improvements made.
Format your response as JSON with the following structure:
{{
    "improvedCode": "the complete improved code",
    "improvements": ["list of improvements made"],
    "explanation": "detailed explanation of changes"
}}"""
        
        response = llm.invoke(prompt)
        formatted_response = format_analysis_response(response)
        
        return jsonify(formatted_response)
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/debug', methods=['POST'])
def debug_code():
    try:
        data = request.json
        code = data['code']
        language = data['language']
        
        llm = get_agent_llm()
        
        prompt = f"""As a debugging specialist, analyze the following code for potential issues,
bugs, and security vulnerabilities.

Language: {language}
Code:
```{language}
{code}
```

Provide a detailed analysis of potential issues.
Format your response as JSON with the following structure:
{{
    "issues": [
        {{
            "type": "issue type",
            "severity": "high/medium/low",
            "line": "line number",
            "description": "issue description",
            "suggestion": "how to fix"
        }}
    ],
    "summary": "overall analysis summary"
}}"""
        
        response = llm.invoke(prompt)
        formatted_response = format_analysis_response(response)
        
        return jsonify(formatted_response)
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=9000)