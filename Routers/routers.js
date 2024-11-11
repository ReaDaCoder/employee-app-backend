const express = require('express');
const router = express.Router();
const { postEmployee } = require('../Controllers/userController'); // Adjust the path if necessary
const {upload}=require('../middleware/upload')
// Define your routes
router.post('/employees',upload.single('photo'), postEmployee);

// Add more routes as needed, e.g., GET, PUT, DELETE
// router.get('/employees', getEmployees);
// router.put('/employees/:id', updateEmployee);
// router.delete('/employees/:id', deleteEmployee);

module.exports = router;
