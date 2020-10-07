// importing required npm packages
const to = require('await-to-js').to,
    only = require('only');

// import script files
const config = require('../../config'),
    models = require('../models');

module.exports = {
    /**
     * createTodo - create todo item in database
     * @param {OBJECT} body - contains title, description, priority and status of todo item 
     */
    createTodo: function(body){
        return new Promise(async (resolve, reject) => {
            let todo = new models.todos(only(body, "title description priority status"));
            let [error, response] = await to(todo.save());
            if(error) return reject({ status: 500, error });
            resolve({ message: "Todo created successfully", response })
        })
    },
    /**
     * getAllTodos - return all todo list 
     */
    getAllTodos: function(){
        return new Promise(async (resolve, reject) => {
            let [error, response] = await to(models.todos.find({}));
            if(error) return reject({ status: 500, error });
            resolve(response)
        }) 
    },
    /**
     * updateTodo - update todo item by _id
     * @param {OBJECT} body - contains title, description, priority and status of todo item 
     * @param {STRING} id - todo id
     */
    updateTodo: function(body, id){
        return new Promise(async (resolve, reject) => {
            let [error, response] = await to(models.todos.findOneAndUpdate({ _id: id }, { $set: only(body, 'title description priority status') }));
            if(error) return reject({ status: 500, error });
            resolve({ message: "Todo updated successfully", response })
        })
    },
    /**
     * deleteTodo - delete todo item by id
     * @param {STRING} id - todo item objectId 
     */
    deleteTodo: function(id){
        return new Promise(async (resolve, reject) => {
            let [error, response] = await to(models.todos.findByIdAndRemove(id));
            if(error) return reject({ status: 500, error });
            resolve({ message: "Todo deleted successfully", response })
        })
    }
}