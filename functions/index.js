const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const helmet = require('helmet');
const app = express();

require('dotenv').config();
const config = {
	apiKey: process.env.apiKey,
	authDomain: process.env.authDomain,
	databaseURL: process.env.databaseURL,
	projectId: process.env.projectId,
	appId: process.env.appId,
};
admin.initializeApp(config);
const db = admin.firestore();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
	res.setHeader('Content-Type', 'application/json; charset=UTF-8');
	res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
	res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
	res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
	res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
	res.setHeader('Cache-Control', 'private');
	res.setHeader(
		'Content-Security-Policy',
		"default-src 'self' *.firebaseio.com s-usc1c-nss-200.firebaseio.com; frame-ancestors 'self' *.firebaseio.com; object-src 'none'; base-uri 'none';",
	);
	next();
});
app.get('/api/projects/:id', (req, res) => {
	db.collection('users')
		.doc(req.params.id)
		.get()
		.then((doc) => {
			res.json(doc.data().projects);
		})
		.catch((err) => {
			console.log(err);
		});
});
app.post('/api/projects/:id', (req, res) => {
	const json = JSON.stringify(req.body);
	db.collection('users')
		.doc(req.params.id)
		.set({ projects: json }, { merge: true })
		.then(() => {
			res.status(200).send('Success');
		})
		.catch((err) => {
			console.log(err);
		});
});
app.get('/api/todos/:id', (req, res) => {
	db.collection('users')
		.doc(req.params.id)
		.get()
		.then((doc) => {
			res.json(doc.data().todos);
		})
		.catch((err) => {
			console.log(err);
		});
});
app.post('/api/todos/:id', (req, res) => {
	const json = JSON.stringify(req.body);
	db.collection('users')
		.doc(req.params.id)
		.set({ todos: json }, { merge: true })
		.then(() => {
			res.status(200).send('Success');
		})
		.catch((err) => {
			console.log(err);
		});
});
const api = functions.https.onRequest(app);
module.exports = { api };
