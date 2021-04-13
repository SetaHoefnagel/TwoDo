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
var session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

dotenv.config({ path: './config.env' });

const app = express();

app.use(cors({ origin: ["http://localhost:3000", "http://localhost:3001"], credentials: true }));

app.use(json());


app.set('trust proxy', 1)
app.use(session({secret: '.', resave: false, saveUninitialized: true}));


app.use((req, res, next) => {
	console.log(req.session)
	
	if(!req.session.uuid){
		req.session.uuid = uuid.v4();
		db.set(req.session.uuid, [
			{
				id: nanoid(),
				title: 'todo 1',
				completed: true,
			},
			{
				id: nanoid(),
				title: 'todo 2',
				completed: false,
			},
			{
				id: nanoid(),
				title: 'todo 3',
				completed: false,
			},
			{
				id: nanoid(),
				title: 'todo 4',
				completed: false,
			},
			{
				id: nanoid(),
				title: 'todo 5',
				completed: false,
			},
		]
	 ) // default todo data
	}
	next();
});

app.get('/todos', (req, res) => {

	return res.send(db.get(req.session.uuid))
});

app.post('/todos', (req, res) => {
	const todo = [{ title: req.body.title, id: nanoid(), completed: false }];
	return res.send(db.get(req.session.uuid));
});

app.patch('/todos/:id', (req, res) => {
	const id = req.params.id;
	const index = db.get(req.session.uuid).findIndex((todo) => todo.id == id);
	const completed = Boolean(req.body.completed);
	if (index > -1) {
		todos[index].completed = completed;
	}
	return res.send(todos[index]);
});

app.delete('/todos/:id', (req, res) => {
	const id = req.params.id;
	const todos = db.get('todos');
	const index = todos.findIndex((todo) => todo.id == id);

	if (index > -1) {
		todos.splice(index, 1);
	}
	db.set('todos', todos);
	res.send(todos);
});

const PORT = 3001;

app.listen(PORT, console.log(`Server running on port ${PORT}`.green.bold));
