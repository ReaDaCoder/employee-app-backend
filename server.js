const express = require('express');
const fs = require('node:fs');
//const uuid = require('uuid/v1');
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const router = express.Router();

const app = express();
const port = 4001;

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
  });