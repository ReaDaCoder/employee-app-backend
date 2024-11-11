// Imports
const { v4: uuidv4 } = require('uuid'); // UUID for unique filename generation
const { db, bucket } = require('../Config/configFirebase'); // Import Firestore and Storage from config
const upload = require('../middleware/upload'); // Import multer configuration

// Function to handle adding an employee
const postEmployee = async (req, res) => {
    try {
        const { name, surname, age, idNumber, role } = req.body;
        let photo = '';

        if (req.file) {
            // Generate a unique filename for the uploaded photo
            const fileName = `employees/${uuidv4()}_${req.file.originalname}`;
            const blob = bucket.file(fileName);
            const blobStream = blob.createWriteStream();

            blobStream.on('finish', async () => {
                try {
                    // Generate a signed URL
                    const [signedUrl] = await blob.getSignedUrl({
                        action: 'read',
                        expires: '03-01-2500', // Adjust expiration date as needed
                    });

                    // Assign the signed URL to photoUrl
                    photo  = signedUrl;

                    // Save employee data to Firestore with the signed URL
                    await db.collection('employees').add({
                        name,
                        surname,
                        age,
                        idNumber,
                        role,
                        photo 
                    });

                    // Respond with the employee data including photo URL
                    res.status(201).send({
                        message: 'Employee added successfully',
                        employee: {
                            name,
                            surname,
                            age,
                            idNumber,
                            role,
                            photo 
                        }
                    });
                } catch (error) {
                    console.error('Signed URL error:', error);
                    res.status(500).send({ error: 'Failed to generate signed URL', details: error.message });
                }
            });

            blobStream.on('error', (err) => {
                console.error('File upload error:', err);
                res.status(500).send({ error: 'Failed to upload photo', details: err.message });
            });

            blobStream.end(req.file.buffer); // Upload the file buffer
        } else {
            // If no photo is uploaded, save employee data without the photo
            await db.collection('employees').add({
                name,
                surname,
                age,
                idNumber,
                role
            });

            res.status(201).send({
                message: 'Employee added successfully without photo',
                employee: {
                    name,
                    surname,
                    age,
                    idNumber,
                    role
                }
            });
        }
    } catch (error) {
        console.error('Error adding employee:', error);
        res.status(500).send({ error: 'Failed to add employee', details: error.message });
    }
};

module.exports = { postEmployee };

