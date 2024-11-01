# InSync Voice Translator

# Packages to install:
pip install transformers
sentencepiece
torch torchvision
fasttext-langdetect

# To run, navigate to your project folder

First ensure you have mysql and node.js installed in your computer

# Clone the repo and navigate to the repo folder
cd /path/to/your/project 

# Import the .sql file
mysql -u your_mysql_user -p your_database_name < path/to/user_db.sql

# Create a .env file, and copy the following template in the file
DB_HOST=localhost           # Use localhost for local development
DB_USER=root                 # Replace with your username
DB_PASSWORD="Your mysql password"   # Replace with your MySQL password
DB_NAME=node                # Ensure this matches the name of the imported database
DB_PORT=3306                # Default MySQL port

# Install dependencies
npm install          
# Start the application      
node app.js                

