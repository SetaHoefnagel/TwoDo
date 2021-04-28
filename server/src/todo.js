const { nanoid } = require('nanoid');

module.exports = function(app, db) {
    app.get('/todos/:token/todo/', (req, res) => {
        let token = req.params.token;
        let data = JSON.parse(JSON.stringify(db.get(req.session.uuid)));
        return res.send(data.todoLists[token].todos)
    });
    
    app.post('/todos/:token/todo/', (req, res) => {
        let token = req.params.token;
        const todo = { title: req.body.title, id: nanoid(), completed: false };
        let data = JSON.parse(JSON.stringify(db.get(req.session.uuid)));
        console.log(JSON.stringify(data))
        data.todoLists[token].todos.push(todo)
        db.set(req.session.uuid, data)
        return res.send(todo);
    });
    
    app.patch('/todos/:token/todo/:id', (req, res) => {
        let token = req.params.token;
        const id = req.params.id;
        let data = JSON.parse(JSON.stringify(db.get(req.session.uuid)));
        const todos = data.todoLists[token].todos;
        const index = todos.findIndex((todo) => todo.id == id);
        const completed = Boolean(req.body.completed);
        if (index > -1) {
            todos[index].completed = completed;
        }
        db.set(req.session.uuid, data)
        return res.send(todos[index]);
    });
    
    app.delete('/todos/:token/todo/:id', (req, res) => {
        let token = req.params.token;
        const id = req.params.id;
        let data = JSON.parse(JSON.stringify(db.get(req.session.uuid)));
        const todos = data.todoLists[token].todos;
        const index = todos.findIndex((todo) => todo.id == id);
    
        if (index > -1) {
            todos.splice(index, 1);
        }
        db.set(req.session.uuid, data)
        res.send(todos);
    });
};
