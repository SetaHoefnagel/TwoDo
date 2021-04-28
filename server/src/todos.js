const { nanoid } = require('nanoid');

module.exports = function(app, db) {
    app.get('/todos/', (req, res) => {
        //return overview of all todo lists
        return res.send(db.get(req.session.uuid))
    });

    app.post('/todos', (req, res) => {
        //add new todo list
    });
    
    app.patch('/todos/:id', (req, res) => {
        //update todo list
    });
    
    app.delete('/todos/:id', (req, res) => {
        //remove todo list
    });

};
