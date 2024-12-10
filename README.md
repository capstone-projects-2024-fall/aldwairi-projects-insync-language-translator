# InSync Language Translator
InSync Language Translator is an innovative application designed to enhance multilingual communication and learning. It combines real-time translation capabilities with interactive features like voice and text translation, a learn mode, as well as vocabulary-building quizzes and dictionary. The app is built with a user-friendly interface and modern tools to make language learning and communication seamless and engaging.

# Features
- Real time language translation (voice and text)
- Learn Mode (Video tutorials, Flashcards, Quizzes, Auto-Detect Dictionary)
- Translation History
- Editable Account Information

# Installation Prerequisites
- IDE (Visual Studio Code Preferred)
- Python 3.10+ installed
- Homebrew (for macOS users, to install portaudio)

# 1. Setup Instructions
Clone the Repository

Copy code

git clone https://github.com/your-username/insync-language-translator.git

cd insync-language-translator

# 2. Split terminal
Split your terminal in VScode by right clicking on current terminal and selecting split terminal.

# 2. Setup Virtual Environment
Choose one of your terminals to be dedicated for the python script.

Copy code

python3 -m venv venv

On Mac "source venv/bin/activate" 

On Windows, use "venv\Scripts\activate"

# 3. Install Backend Dependencies

Copy code

pip install -r requirements.txt

Install PortAudio (macOS/Linux)

Copy code

brew install portaudio

# Run Backend
Using the terminal with your virutal environemnt, run the following command:

python app.py

# Install Node.js
Mac/Linux:

Copy code

brew install node

Windows:

Download and install Node.js from the official website (https://nodejs.org/en)

Veryify that Node.js is installed

"node -v"  to Check Node.js version

"npm -v"   to Check npm version


# Run Frontend

After waiting for the python script to activate, switch to your other terminal to activate the frontend.

Copy code

npm install

node app.js


# Launching the Application:

Start the backend and frontend servers as described above.

Open your browser at http://localhost:4500.

Interact with the features and enhance your language skills! Enjoy Learning!

-InSync Team


