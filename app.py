from flask import Flask, render_template, jsonify, request
from flask_cors import CORS
import requests  # You will use requests to interact with the external Kapalinga API

app = Flask(__name__)

# Enable CORS for all domains (you may want to restrict this to specific domains in production)
CORS(app)

# Endpoint mapping (similar to the key in JavaScript)
endpoint_map = {
    'english_kapampangan': 'https://kapalinga-api.vercel.app/translate/english_kapampangan',
    'kapampangan_english': 'https://kapalinga-api.vercel.app/translate/kapampangan_english',
    'kapampangan_tagalog': 'https://kapalinga-api.vercel.app/translate/kapampangan_tagalog',
    'tagalog_kapampangan': 'https://kapalinga-api.vercel.app/translate/tagalog_kapampangan',
}

# Function to fetch translation from Kapalinga API
def get_translation(word, endpoint):
    url = f"{endpoint}?word={word}"
    try:
        response = requests.get(url)
        response.raise_for_status()
        if response.status_code == 200:
            data = response.json()
            return data.get('translation', word)  # Return translation or the word itself if unavailable
    except requests.exceptions.RequestException as e:
        print(f"Error fetching translation for {word}: {e}")
    return word  # Return original word in case of failure

# Translation function (similar to the JavaScript logic)
def translate_text(text, from_lang, to_lang):
    key = f"{from_lang}_{to_lang}"
    endpoint = endpoint_map.get(key)
    if not endpoint:
        return text  # Return original text if translation is unavailable

    words = text.split(' ')  # Split the text into words
    translated_words = []
    index = 0

    while index < len(words):
        # Check for 3-word phrases first
        phrase = ' '.join(words[index:index + 3])
        translated_phrase = get_translation(phrase, endpoint)
        if translated_phrase != phrase:
            translated_words.append(translated_phrase)
            index += 3  # Skip the next 2 words
            continue
        
        # If 3-word phrase doesn't exist, check for 2-word phrase
        phrase = ' '.join(words[index:index + 2])
        translated_phrase = get_translation(phrase, endpoint)
        if translated_phrase != phrase:
            translated_words.append(translated_phrase)
            index += 2  # Skip the next word
            continue

        # Finally, check for a single word
        word = words[index]
        translated_word = get_translation(word, endpoint)
        translated_words.append(translated_word)
        index += 1  # Move to the next word

    return ' '.join(translated_words)

# Home route to render the index.html
@app.route('/')
def landing():
    return render_template('index.html')

# Endpoint to handle translation (POST method)
@app.route('/translate', methods=['POST'])
def translate():
    data = request.get_json()
    text = data.get('text')
    from_lang = data.get('from_lang')
    to_lang = data.get('to_lang')

    if not text or not from_lang or not to_lang:
        return jsonify({"translation": "Invalid input"}), 400

    translated_text = translate_text(text, from_lang, to_lang)
    return jsonify({"translation": translated_text})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001)
