# InSync Voice Translator

Packages to install:
pip install transformers
sentencepiece
torch torchvision
fasttext-langdetect

# To run, navigate to your project folder

First ensure you have mysql and node.js installed in your computer, and make sure mysql is added to system path

# Run the following command to create database "node"

Open Command Prompt (Windows) or Terminal (macOS).

mysql -u root -p

Enter your mysql password

Create database node;

Type exit to leave the mysql prompt

# Import the .sql file from github repo directory
mysql -u your_mysql_user -p node < path/user_db.sql

Then, Enter your mysql password.  

# Go to VScode and edit the .env file according to your user credentials
DB_HOST=localhost           # Use localhost for local development
DB_USER=root                 # Replace with your username
DB_PASSWORD="Your mysql password"   # Replace with your MySQL password
DB_NAME=node                # Database name, ensure it matches the database name you used while creating
DB_PORT=3306                # Default MySQL port

# Install node js dependencies
npm install          
# Start the application      
node app.js                

# Packages to install:
pip install transformers
sentencepiece
torch torchvision
fasttext-langdetect

# To run, navigate to your project folder

First ensure you have mysql and node.js installed in your computer, and make sure mysql is added to system path

# Run the following command to create database "node"

Open Command Prompt (Windows) or Terminal (macOS).

mysql -u root -p

Enter your mysql password

Create database node;

Type exit to leave the mysql prompt

# Import the .sql file from github repo directory
mysql -u your_mysql_user -p node < path/user_db.sql

Then, Enter your mysql password.  

# Go to VScode and edit the .env file according to your user credentials
DB_HOST=localhost           # Use localhost for local development
DB_USER=root                 # Replace with your username
DB_PASSWORD="Your mysql password"   # Replace with your MySQL password
DB_NAME=node                # Database name, ensure it matches the database name you used while creating
DB_PORT=3306                # Default MySQL port

# Install node js dependencies
npm install          
# Start the application      
node app.js                

