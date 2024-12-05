from flask import Flask, jsonify, request, send_file
from flask_cors import CORS
from transformers import AutoModelForSeq2SeqLM, AutoTokenizer
from gtts import gTTS
import os
from google.cloud import speech
import os
import io

# Define upload folder
UPLOAD_FOLDER = os.path.join(os.getcwd(), 'uploads')

app = Flask(__name__)
CORS(app)

@app.route('/upload_audio', methods=['POST'])
def upload_audio():
    # Check if the audio file is part of the request
    if 'audio' not in request.files:
        return jsonify({"error": "No audio file part"}), 400

    audio_file = request.files['audio']
    
    if audio_file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    # Create uploads directory if it doesn't exist
    os.makedirs(UPLOAD_FOLDER, exist_ok=True)
    
    # Save file in uploads directory
    file_path = os.path.join(UPLOAD_FOLDER, "recorded_audio.wav")
    audio_file.save(file_path)

    # Return a success message with the saved file path
    return jsonify({"message": "Audio uploaded and saved"}), 200


def convertSpeechtoText():
    #setting Google credential
    os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = os.path.join(os.getcwd(), 'google_secret_key.json')
    # create client instance 
    client = speech.SpeechClient()
    #the path of your audio file
    file_name = os.path.join(UPLOAD_FOLDER, "recorded_audio.wav")
    with io.open(file_name, "rb") as audio_file:
        content = audio_file.read()
        audio = speech.RecognitionAudio(content=content)
    config = speech.RecognitionConfig(
        encoding=speech.RecognitionConfig.AudioEncoding.LINEAR16,
        sample_rate_hertz=16000,
        enable_automatic_punctuation=True,
        audio_channel_count=1,
        language_code="en-US",
    )
    # Sends the request to google to transcribe the audio
    response = client.recognize(request={"config": config, "audio": audio})
    # Reads the response
    for result in response.results:
        transcript = result.alternatives[0].transcript
        print("Transcript:", transcript)
        return transcript
    return "No speech detected"

@app.route('/get_transcript', methods=['GET'])
def get_transcript():
    try:
        transcript = convertSpeechtoText()
        return jsonify({"transcript": transcript}), 200
    except Exception as e:
        print(f"Error getting transcript: {e}")
        return jsonify({"error": str(e)}), 500

# def detect_lang(article):
    # from langdetect import detect
    # result = detect("ሰላም እንደምን አለህ")
    # print(result)

#Initialize translation model
# Initialize translation model

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

# Language mapping from NLLB to gTTS
LANGUAGE_MAP = {
    "spa_Latn": "es",  # Spanish
    "fra_Latn": "fr",  # French
    "rus_Cyrl": "ru",  # Russian
    "amh_Ethi": "am",  # Amharic
    "zho_Hant": "zh",  # Mandarin (Traditional)
    "afr_Latn": "af",  # Afrikaans
    "deu_Latn": "de",  # German
}

@app.route('/translate', methods=['POST'])
def translate():
    try:
        data = request.get_json()
        input_text = data['input']
        target_lang = data['target_lang']

        # Translate text
        translated_text = translate_text(input_text, target_lang)

        # Map NLLB language code to gTTS code
        gtts_lang = LANGUAGE_MAP.get(target_lang, "en") 

        # Generate speech file
        tts = gTTS(translated_text, lang=gtts_lang)
        audio_file = "output.mp3"
        tts.save(audio_file)

        return jsonify({'output': translated_text, 'audio': f'http://127.0.0.1:5000/audio/{audio_file}'})

    except Exception as e:
        print(f"Error: {e}")  # Log the error
        return jsonify({'error': str(e)}), 500


@app.route('/audio/<filename>', methods=['GET'])
def get_audio(filename):
    try:
        return send_file(filename, as_attachment=True)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    if os.path.exists("output.mp3"):
        os.remove("output.mp3")
    app.run(debug=True)
