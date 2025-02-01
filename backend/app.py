from flask import Flask, request, jsonify
from flask_cors import CORS
from langchain_community.llms import Ollama

app = Flask(__name__)
CORS(app)

def get_agent_llm():
    return Ollama(model="llama2", temperature=0.1)

def format_response(response):
    """Format and clean the response with proper structure"""
    if not response or len(response.strip()) < 5:
        return "I apologize, but I couldn't generate a proper response. Please try again."
    
    # Remove any extra whitespace and normalize line endings
    response = response.strip()
    
    # Handle bullet points and numbered lists
    lines = response.split('\n')
    formatted_lines = []
    
    for line in lines:
        line = line.strip()
        # Preserve bullet points and numbered lists
        if line.startswith(('- ', '• ', '* ', '1. ', '2. ', '3. ')):
            formatted_lines.append('\n\n' + line)
        # Add proper spacing for paragraphs
        elif line:
            if formatted_lines and formatted_lines[-1]:
                formatted_lines.append('\n\n\n' + line)
            else:
                formatted_lines.append(line)
    
    formatted_response = ' '.join(formatted_lines)
    
    # Ensure proper spacing between sections
    formatted_response = formatted_response.replace('\n\n\n\n', '\n\n\n')
    
    return formatted_response

def create_system_prompt(agent):
    return f"""You are {agent['name']}, an AI assistant specialized in {agent['specialty']}.

Response Guidelines:
1. Use proper formatting:
   - Start each main point on a new line
   - Use bullet points for lists
   - Add blank lines between paragraphs
   - Use proper indentation for sub-points

2. Structure your responses:
   - Begin with a clear introduction
   - Present points in a logical order
   - Use bullet points for multiple items
   - End with a clear conclusion if needed

3. Keep your identity as {agent['name']} and focus on {agent['specialty']}.

4. Format lists and enumerations as:
   • Use bullet points for unordered lists
   1. Use numbers for sequential steps
   2. Indent sub-points properly

Remember to keep responses clear and well-structured."""

@app.route('/api/chat', methods=['POST'])
def chat():
    try:
        data = request.json
        user_message = data['message'].strip()
        agents = data['agents']
        
        responses = {}
        llm = get_agent_llm()
        
        for agent in agents:
            try:
                system_prompt = create_system_prompt(agent)
                final_prompt = f"""{system_prompt}

USER MESSAGE: {user_message}

Ensure your response maintains proper formatting and structure."""

                result = llm.invoke(final_prompt)
                responses[agent['name']] = format_response(result)
                
            except Exception as e:
                print(f"Error for {agent['name']}: {str(e)}")
                responses[agent['name']] = "I apologize, but I encountered an error. Please try again."
        
        return jsonify(responses)
        
    except Exception as e:
        print(f"Error processing request: {str(e)}")
        return jsonify({"error": "An error occurred while processing your request"}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)