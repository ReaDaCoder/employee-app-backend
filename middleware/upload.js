// middleware/upload.js
const multer = require('multer');
const path = require('path');
const storage = multer.memoryStorage();  // Store file in memory (can change to diskStorage if needed)
const upload = multer({ storage: storage });


// Export the upload middleware
module.exports = { upload };
