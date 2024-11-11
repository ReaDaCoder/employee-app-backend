const admin = require('firebase-admin');
const { Storage } = require('@google-cloud/storage');

// Import the credentialsSDK.json from the config folder
const serviceAccount = require('../credentailsSDK.json'); // Adjust this path if necessary

// Console log the serviceAccount to check its content
console.log('Service Account:', serviceAccount);

// Initialize Firebase Admin SDK (if not already initialized)
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        storageBucket: `${serviceAccount.project_id}.appspot.com`,
    });
    console.log('Firebase Admin SDK initialized successfully');
}

// Initialize Firestore and Storage
const db = admin.firestore();
console.log('Firestore initialized successfully');

const storage = new Storage({ keyFilename: '../credentailsSDK.json' }); // Use the credentials file
const bucket = storage.bucket(`${serviceAccount.project_id}.appspot.com`);
console.log('Google Cloud Storage initialized successfully');

// Export Firestore db and Storage bucket
module.exports = { db, bucket };
