
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path'); 
const employeeRouter = require('./Routers/routers');
const { db, bucket } = require('./Config/configFirebase');
const session = require("express-session");



const app = express();
const PORT = process.env.PORT || 3001; 

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); 

app.use(
    session({
        secret: "your-secret-key",
        resave: false,
        saveUninitialized: false,
    })
);



app.use('/api', employeeRouter);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


module.exports = { db, bucket };
