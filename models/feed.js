const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        min:20,
        max:200
    },
    description:{
        type:String,
        required:true
    },
    image:{
        type:String,
        
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true
    }
    // comment:[{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref:'Comment'
    // }],
    // likes:[
    //     {
    //         user:{
    //             type:Schema.Types.ObjectId,
    //             ref:'User'
    //         }
    //     }
    // ]

});

module.exports =Blog = mongoose.model('Blog',blogSchema);