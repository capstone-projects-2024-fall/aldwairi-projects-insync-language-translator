from flask import Flask, jsonify, request
from flask_cors import CORS
from transformers import AutoModelForSeq2SeqLM, AutoTokenizer

app = Flask(__name__)
CORS(app)

# def detect_lang(article):
    # from langdetect import detect
    # result = detect("ሰላም እንደምን አለህ")
    # print(result)

#Initialize translation model
tokenizer = AutoTokenizer.from_pretrained("facebook/nllb-200-distilled-600M")
model = AutoModelForSeq2SeqLM.from_pretrained("facebook/nllb-200-distilled-600M")

# Translation function
def translate_text(article, target_lang):
    inputs = tokenizer(article, return_tensors="pt")

    translated_tokens = model.generate(
        **inputs, forced_bos_token_id=tokenizer.convert_tokens_to_ids(target_lang), max_length=30
    )

    translation = tokenizer.batch_decode(translated_tokens, skip_special_tokens=True)[0]
    return translation

@app.route('/translate', methods=['POST'])
def translate():
    try:
        data = request.get_json()
        input_text = data['input']
        target_lang = data['target_lang']

        # Translate text based on selected language
        translated_text = translate_text(input_text, target_lang)

        return jsonify({'output': translated_text})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
