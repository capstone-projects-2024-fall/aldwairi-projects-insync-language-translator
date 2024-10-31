from flask import Flask, jsonify
from flask_cors import CORS  # Import the CORS package
from transformers import AutoModelForSeq2SeqLM, AutoTokenizer
from ftlangdetect import detect

# app = Flask(__name__)
# CORS(app)  # Enable CORS for all routes

# def detect_lang(article):
    # from langdetect import detect
    # result = detect("ሰላም እንደምን አለህ")
    # print(result)


# Your translation function
def translate_text(article):
    tokenizer = AutoTokenizer.from_pretrained("facebook/nllb-200-distilled-600M")
    model = AutoModelForSeq2SeqLM.from_pretrained("facebook/nllb-200-distilled-600M")

    # article = "UN Chief says there is no military solution in Syria"

    inputs = tokenizer(article, return_tensors="pt")

    translated_tokens = model.generate(
        **inputs, forced_bos_token_id=tokenizer.convert_tokens_to_ids("fra_Latn"), max_length=30
    )

    translation = tokenizer.batch_decode(translated_tokens, skip_special_tokens=True)[0]
    return translation

# # Route to handle translation
# @app.route('/translate', methods=['GET'])
def translate():
    article=input("Translate here:")
    translation = translate_text(article)
    print(translation)
    # return jsonify({"translation": translation})

if __name__ == '__main__':
    translate()
    # app.run(debug=True)
