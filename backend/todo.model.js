const mongoose = require('mongoose');
const schema = mongoose.Schema;

let Todo = new Schema({
    todo_description: { type:string },

    todo_responsible: { type: string },

    todo_priority: { type: string },

    todo_completed: { type: Boolean }

});
   
module.exports = mongoose.model('Todo', Todo);

