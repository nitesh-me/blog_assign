// const express = require('express');
// const router = express.Router();
// const cors = require('cors');
// const Blog = require('../../models/feed');
// const User = require('../../models/user');
// const Profile = require('../../models/profile');
// const checkAuth = require('../../middleware/check-auth');


// router.get('/',(req,res)=>{
//     Profile.find({})
//     .then(profile=>{
//         res.status(200).json(profile)
//     })
//     .catch(err=>{
//         res.status(500).json({
//             error:err
//         })
//     })
// });


// router.post('/',checkAuth,(req,res)=>{
//     //
// })