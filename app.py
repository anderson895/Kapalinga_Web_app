from flask import Flask, jsonify, request
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)  # Enable CORS for all domains

# API endpoints mapping
ENDPOINT_MAP = {
    'english_kapampangan': 'https://kapalinga-api.vercel.app/translate/english_kapampangan',
    'kapampangan_english': 'https://kapalinga-api.vercel.app/translate/kapampangan_english',
    'kapampangan_tagalog': 'https://kapalinga-api.vercel.app/translate/kapampangan_tagalog',
    'tagalog_kapampangan': 'https://kapalinga-api.vercel.app/translate/tagalog_kapampangan',
}

# Fetch translation from Kapalinga API
def get_translation(phrase, endpoint):
    url = f"{endpoint}?word={phrase.lower()}"
    try:
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()
        return data.get('translation', phrase)  # Return translation or original phrase if unavailable
    except requests.exceptions.RequestException as e:
        print(f"Error fetching translation for '{phrase}': {e}")
    return phrase  # Return original phrase in case of failure

# Translate text based on phrase matching
def translate_text(text, from_lang, to_lang):
    key = f"{from_lang}_{to_lang}"
    endpoint = ENDPOINT_MAP.get(key)
    if not endpoint:
        return text  # Return original text if translation is unavailable

    words = text.split()
    translated_words = []
    index = 0
    phrase_lengths = [6, 5, 4, 3, 2, 1]  # Check phrases from longest to shortest

    while index < len(words):
        for length in phrase_lengths:
            phrase = ' '.join(words[index:index + length])
            translated_phrase = get_translation(phrase, endpoint)
            if translated_phrase != phrase:
                translated_words.append(translated_phrase)
                index += length  # Skip the matched words
                break
        else:
            index += 1  # Move to the next word if no match

    return ' '.join(translated_words)

# API route for translation
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










@app.route('/')
def landing():
     return render_template('translator.html')


@app.route('/learn')
def learn():
    return render_template('learn.html')


@app.route('/learn/common_phrase')  
def common_phrase():  
    return render_template('learn/common_phrase.html')


@app.route('/learn/greetings')  
def greetings():  
    return render_template('learn/greetings.html')


@app.route('/learn/directions')  
def directions():  
    return render_template('learn/directions.html')


@app.route('/learn/transporation')  
def transporation():  
    return render_template('learn/transporation.html')

@app.route('/learn/eating')  
def eating():  
    return render_template('learn/eating.html')



@app.route('/learn/emergency')  
def emergency():  
    return render_template('learn/emergency.html')


@app.route('/learn/numbers')  
def numbers():  
    return render_template('learn/numbers.html')

@app.route('/learn/shopping')  
def shopping():  
    return render_template('learn/shopping.html')

@app.route('/learn/dateTime')  
def dateTime():  
    return render_template('learn/dateTime.html')

@app.route('/events')
def events():
    return render_template('events.html')


@app.route('/events/eventFestival')
def eventFestival():
    return render_template('events/eventFestival.html')

@app.route('/events/foodDelicacies')
def foodDelicacies():
    return render_template('events/foodDelicacies.html')

@app.route('/events/tourist')
def tourist():
    return render_template('events/tourist.html')



# EVENTS AND FESTIVAL
@app.route('/events/view/Hot_Air_Balloon_Festival')
def Hot_Air_Balloon_Festival():
    return render_template('events/view/Hot_Air_Balloon_Festival.html')


@app.route('/events/view/giant_lantern_festival_history')
def giant_lantern_festival_history():
    return render_template('events/view/giant_lantern_festival_history.html')

@app.route('/events/view/auroraFestival')
def auroraFestival():
    return render_template('events/view/auroraFestival.html')

@app.route('/events/view/SinukwanFestival')
def SinukwanFestival():
    return render_template('events/view/SinukwanFestival.html')

@app.route('/events/view/cruxiFestival')
def cruxiFestival():
    return render_template('events/view/cruxiFestival.html')



@app.route('/events/view/pampanga_food_culinary_capital')
def pampanga_food_culinary_capital():
    return render_template('events/view/pampanga_food_culinary_capital.html')



@app.route('/events/view/history')
def history():
    return render_template('events/view/history.html')




@app.route('/events/view/trad')
def trad():
    return render_template('events/view/trad.html')


@app.route('/events/view/Tidtad')
def Tidtad():
    return render_template('events/view/Tidtad.html')

@app.route('/events/view/tocino')
def tocino():
    return render_template('events/view/tocino.html')


@app.route('/events/view/pampangasisig')
def pampangasisig():
    return render_template('events/view/pampangasisig.html')


@app.route('/events/view/RazonsHaloHalo')
def RazonsHaloHalo():
    return render_template('events/view/RazonsHaloHalo.html')

@app.route('/events/view/bringhe')
def bringhe():
    return render_template('events/view/bringhe.html')

@app.route('/events/view/buro')
def buro():
    return render_template('events/view/buro.html')

@app.route('/events/view/pancit_luglug')
def pancit_luglug():
    return render_template('events/view/pancit_luglug.html')


@app.route('/events/view/puning')
def puning():
    return render_template('events/view/puning.html')

@app.route('/events/view/sandbox')
def sandbox():
    return render_template('events/view/sandbox.html')

@app.route('/events/view/skyRanch')
def skyRanch():
    return render_template('events/view/skyRanch.html')


@app.route('/events/view/aqua')
def aqua():
    return render_template('events/view/aqua.html')


@app.route('/events/view/clarkMuseum')
def clarkMuseum():
    return render_template('events/view/clarkMuseum.html')




# Discoveries


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001)
