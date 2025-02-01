from llama_index.llms.ollama import Ollama

llm = Ollama(model = "phi3", request_timeout=30.0)

result = llm.complete("Hello World")
print(result)