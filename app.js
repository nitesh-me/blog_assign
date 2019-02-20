const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan')
const cors = require('cors');
const app = express();
const mongoURI = 'mongodb://localhost:27017/blog_api'

const blogRoutes = require('./routes/api/feeds');
const userRoutes = require('./routes/api/user');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());

mongoose.connect(mongoURI,{useNewUrlParser:true})
    .then(result=>{
        console.log("Data base is connected");
    })
    .catch(err=>{
        console.log("error is  " +  err)
    });

mongoose.set('useCreateIndex', true);


app.get('/',(req,res)=>{
    res.json({
        name:"nitesh"
    })
});

app.use('/blogs',blogRoutes);
app.use('/users', userRoutes);



module.exports = app;