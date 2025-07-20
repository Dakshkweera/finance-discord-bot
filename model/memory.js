const mongoose = require("mongoose");

const messageschema = new mongoose.Schema({
    role : {
        type: String,
        enum : ['user', 'assistant','system'],
        required: true
    },
    content : {
        type: String,
        required : true
    }
});

const memorySchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },
    messages : [messageschema]
})


const Memory = mongoose.model('Memory',memorySchema);

module.exports = Memory;