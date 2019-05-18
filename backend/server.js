const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 4000; 
let Todo = require('./todo.model');

//create an instance of the Express Router
const todoRoutes = express.Router();

app.use('/todos', todoRoutes);
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/todos', {
    useNewUrlParser: true
});

const connection = mongoose.connection;

connection.once('open', function(){
    console.log("MongoDB database connection established seccessfully");
})

app.listen(PORT, function(){
    console.log("Server is running on port : " + PORT);
});

//get all items
todoRoutes.route('/').get(function(req, res){
    Todo.find(function(err, todos){
        if(err){
            console.log(err)
        }else {
            res.json(todos)
        }
    });
});

//findById
todoRoutes.route(':/id').get(function(req, res){
    let id = req.params.id;
    Todo.findById(id, function(err, todo){
        res.json(todo);
    });
});

//add a new item
todoRoutes.route('/add').post(function(req, res) {
    let todo = new Todo(req.body);
    todo.save()
        .then(todo => {
            res.status(200).json({'todo': 'todo added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new todo failed');
        });
});

//update method
todoRoutes.route('/update/:id').post(function(req, res){
    Todo.findById(req.params.id, function(err, todo){
        if(!todo)
            res.status(404).send('data not found');
        else 
            todo.todo_description = req.body.todo_description;
            todo.todo_responsible = req.body.todo_responsible;
            todo.todo_priority = req.body.todo_prioroty;
            todo.todo_completed = req.body.todo_completed;

            //save new todo
            todo.save().then( todo =>{
                res.json('Todo Updated!');
            })
            .catch(err => {
                res.status(400).send('Update failed');
            });
    })
})
