/**
 * This is just a mock server in order to test the frontend. 
 * The actual backend should be made in Django, with proper user authentication.
 */
const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const cors = require('cors');
const { json } = require('body-parser');
const { nanoid } = require('nanoid');
const uuid = require('uuid');

const JSONdb = require('simple-json-db');
const db = new JSONdb('./database.json');
const account_db = new JSONdb('./account_database.json');
var session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const todo = require('./src/todo');
const todos = require('./src/todos');

dotenv.config({ path: './config.env' });

const app = express();

app.use(cors({ origin: ["http://localhost:3000", "http://localhost:3001"], credentials: true }));

app.use(json());


app.set('trust proxy', 1)
app.use(session({secret: '.', resave: false, saveUninitialized: true, cookie  : { maxAge  : new Date(Date.now() + (60 * 1000 * 30)) } }));


app.use((req, res, next) => {
	console.log(req.session)
	
	if(!req.session.uuid){
		req.session.uuid = uuid.v4();
		let todo = {
			id: nanoid(),
			title: 'todo item 1',
			completed: true,
		};
		let todoList = {
			title: 'todo list 1',
			sharedWith: [],
			todos: [todo],
		}
		let user = {
			username: '',
			password: '',
			uuid: req.session.uuid
		};
		db.set(req.session.uuid, {todoLists: [todoList]}) // default todo data
		account_db.set(user.uuid, user)
	}
	next();
});

todo(app, db);
todos(app, db);

const PORT = 3001;

app.listen(PORT, console.log(`Server running on port ${PORT}`.green.bold));
