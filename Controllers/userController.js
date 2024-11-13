const { v4: uuidv4 } = require('uuid');
const { db, bucket } = require('../Config/configFirebase');
const upload = require('../middleware/upload'); 

const postEmployee = async (req, res) => {
    try {
        const { name, surname, age, idNumber, role } = req.body;
        let photo = '';

        if (req.file) {
            const fileName = `employees/${uuidv4()}_${req.file.originalname}`;
            const blob = bucket.file(fileName);
            const blobStream = blob.createWriteStream();

            blobStream.on('finish', async () => {
                try {
                    
                    const [signedUrl] = await blob.getSignedUrl({
                        action: 'read',
                        expires: '03-01-2500',
                    });

                    
                    photo  = signedUrl;

                    
                    await db.collection('employees').add({
                        name,
                        surname,
                        age,
                        idNumber,
                        role,
                        photo 
                    });

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

            blobStream.end(req.file.buffer); 
        } else {
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

