const express = require("express"); 
const admin = require("firebase-admin"); 
const cookieParser = require("cookie-parser"); 
const https = require('https'); 
const fs = require('fs'); 

const firebaseServerConfigs = require('./firebaseConfig');

const app = express(); 
app.use(cookieParser()); 

//const key = firebaseServerConfigs.private_key;

const key = process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n');

if (!key) {
	console.error("Firebase private key is not defined.");
	process.exit(1);
  }

admin.initializeApp({
	credential: admin.credential.cert({
		"private_key": key,
	  //"private_key": key.replace(/\\n/g, '\n'),
	  "client_email": firebaseServerConfigs.client_email,
	  "project_id": firebaseServerConfigs.project_id
	})
  });
  

app.get('/', (req, res) => { 
res.sendFile(__dirname +'/login.html'); 
}); 

app.get('/logout', (req, res) => { 
	res.clearCookie('__session'); 
	res.redirect('/'); 
}); 

app.get('/success', checkCookie, (req, res) => { 
	res.sendFile(__dirname + '/success.html'); 
	console.log("UID of Signed in User is"
			+ req.decodedClaims.uid); 
	 
}); 

app.get('savecookie', (req, res) => { 
	const Idtoken=req.query.token; 
	setCookie(Idtoken, res); 
}); 

function savecookie(idtoken, res) { 

	const expiresIn = 60 * 60 * 24 * 5 * 1000; 
	admin.auth().createSessionCookie(idtoken, {expiresIn}) 
	.then((sessionCookie) => { 
	const options = {maxAge: expiresIn, 
				httpOnly: true, secure: true}; 

	admin.auth().verifyIdToken(idtoken) 
		.then(function(decodedClaims) { 
		res.redirect('/success'); 
	}); 
	}, error => { 
		res.status(401).send("UnAuthorised Request"); 
	}); 
} 

function checkCookie(req, res, next) { 

	const sessionCookie = req.cookies.__session || ''; 
	admin.auth().verifySessionCookie( 
		sessionCookie, true).then((decodedClaims) => { 
			req.decodedClaims = decodedClaims; 
			next(); 
		}) 
		.catch(error => {

		res.redirect('/'); 
		}); 
} 

https.createServer({ 
	key: fs.readFileSync('server.key'), 
	cert: fs.readFileSync('server.cert') 
}, app) 
.listen(3000, function () { 
	console.log('listening on port 3000!'
	+ ' Go to https://localhost:3000/') 
}); 

 