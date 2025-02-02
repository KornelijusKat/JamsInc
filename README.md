# JamFactorio API

## Getting Started

### 1. Clone the Repository
```bash
git clone <repository-url>
cd jamfactorio
npm install
```
3. Configure Environment Variables
Create a config.env file in the root directory and add the following:

env
Copy
Edit
NODE_ENV=development
PORT=8000
DATABASE=<YOUR_MONGODB_CONNECTION_STRING>
DATABASE_PASSWORD=<Insert your password>
Replace <YOUR_MONGODB_CONNECTION_STRING> with your MongoDB connection string.

Note, leave PASSWORD unchanged in the mongoDB connection string, since it is replaced by DATABASE_Password in service.js
To run app, in terminal type: npm start





