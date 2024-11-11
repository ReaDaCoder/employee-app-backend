// Required Imports
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path'); // Import 'path'
const employeeRouter = require('./Routers/routers'); // Import the separated router
const { db, bucket } = require('./Config/configFirebase'); // Firestore and Storage imports

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3001; // Use environment variable or default to 3001

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve static files from 'uploads'

// Use the separated router
app.use('/api', employeeRouter);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Export Firestore db and Storage bucket for use in routes if needed
module.exports = { db, bucket };
