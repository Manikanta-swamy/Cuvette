# Cuvette Assignment - Job Posting Platform
This project allows companies to register, verify their mobile number via OTP, log in, post jobs, and send job alerts to candidates via email. It includes a frontend built with React and a backend with Node.js, Express.js, MongoDB, Twilio for OTP, and Nodemailer for email automation.
## Prerequisites
Before setting up the project, ensure you have the following:
1.**Node.js** and **npm** installed.
2. **MongoDB Atlas** account (for cloud-based MongoDB).
3. **Twilio** account for OTP verification.
4. **Google App Password** for secure email automation using Gmail.
## Setup Instructions
### 1. Clone the Repository
```git clone https://github.com/your-username/cuvette-assignment.git\ncd cuvette-assignment```
### 2. Create a MongoDB Atlas Account
1. Visit [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and create a free account.
2. Create a new cluster and get the **MongoDB connection string**.
   - Example connection string:
   -    ```plaintext\n   mongodb+srv://<username>:<password>@cluster0.mongodb.net/mydatabase?retryWrites=true&w=majority\n   ```
3. Replace `<username>`, `<password>`, and `mydatabase` with your own values.
4. Add your IP address to the IP whitelist in MongoDB Atlas.
### 3. Set Up Twilio for OTP Verification\n\n1. Visit [Twilio](https://www.twilio.com/) and sign up for a free account.\n2. Get your **Account SID**, **Auth Token**, and **Twilio Phone Number** from the Twilio dashboard.\n3. Verify your phone number in Twilio if you're using a trial account.\n\n
### 4. Create a Google App Password\n\n1. Go to your [Google Account Security](https://myaccount.google.com/security) page.\n2. Under \"Signing in to Google,\" select **App Passwords**.\n3. Generate a new App Password and use it to allow Nodemailer to send emails via Gmail.\n   - More information can be found in the [Google App Password Guide](https://support.google.com/accounts/answer/185833?hl=en).\n\n
### 5. Set Up Environment Variables\n\nCreate a `.env` file in the `backend` folder and add the following:
```
   # MongoDB URI
   MONGODB_URI=your-mongodb-atlas-uri
   # JWT Secret for Authentication
   JWT_SECRET=your-jwt-secret
   # Nodemailer Configuration (Google App Password)
   EMAIL_SERVICE=gmail\nEMAIL_USER=your-email@gmail.com\nEMAIL_PASS=your-google-app-password
   # Twilio Configuration
   TWILIO_ACCOUNT_SID=your-twilio-account-sid
   TWILIO_AUTH_TOKEN=your-twilio-auth-token
   TWILIO_PHONE_NUMBER=your-twilio-phone-number
```
### 6. Install Dependencies
   For the backend:
   ```cd backend npm install```
   For the frontend:
   ```cd cuvette-app >npm install```
### 7. Run the Backend
   ```cd backend > node server.js```
### 8. Run the Frontend
   ```cd cuvette-app> npm start```
### 9. Access the Platform
   Open your browser and navigate to `http://localhost:3000` to access the platform.

## Important Notes
- Ensure both Twilio and Google App Password are set up correctly for OTP and email automation to work.
- Ensure MongoDB Atlas is running and your IP address is whitelisted.
