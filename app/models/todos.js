const mongoose = require('mongoose');

var schemaOptions = {
    timestamps: true,
    toJSON: {
        virtuals: true
    }
}

/**
 * TodoSchema - todos table schema
 */
const TodoSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        index: true
    },
    priority: {
        type: String,
        required: [true, "Priority is required"]
    },
    description: {
        type: String
    },
    status: {
        type: String,
        default: "open"
    }
}, schemaOptions)


/**
 * Methods
 */

TodoSchema.methods = {}


 /**
  * Statics
  */

 TodoSchema.statics = {}


module.exports = mongoose.model('todos', TodoSchema)
