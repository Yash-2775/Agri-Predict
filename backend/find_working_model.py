import google.generativeai as genai
import sys
import os

# Set encoding to utf-8 for stdout
import io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

def find_model(api_key):
    try:
        genai.configure(api_key=api_key)
        models = [m.name for m in genai.list_models() if 'generateContent' in m.supported_generation_methods]
        print(f"Available models: {models}")
        
        for m_name in models:
            short_name = m_name.replace('models/', '')
            print(f"Testing {short_name}...")
            try:
                model = genai.GenerativeModel(short_name)
                response = model.generate_content("hi", request_options={"timeout": 5})
                if response.text:
                    print(f"SUCCESS: Found working model: {short_name}")
                    return short_name
            except Exception as e:
                print(f"FAILED {short_name}: {str(e)}")
        
        return None
    except Exception as e:
        print(f"CRITICAL ERROR: {e}")
        return None

if __name__ == "__main__":
    key = "AIzaSyDwkK5evmcKbjn0r94WyXZJQM0Hr75rfr8"
    found = find_model(key)
    if found:
        print(f"FINAL_RESULT: {found}")
    else:
        print("FINAL_RESULT: NONE")
