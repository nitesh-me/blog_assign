const express = require('express');
const bcrypt= require('bcrypt');
const cors = require('cors');
const User = require('../../models/user');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.use(cors());


router.post('/signup',(req,res)=>{
    // const email = req.body.email.

    User.find({email:req.body.email.trim().toLowerCase()})
    .then(user=>{
        if(user.length>=1){
            return res.status(409).json({
                message:"email already registered"
        
            })
         }
        else{
            bcrypt.hash(req.body.password.trim(), 10, (err, hash)=>{
                if(err){
                    console.log(err);
                    return res.status(500).json({
                        error:err
                    })
                }
                else{
                    const user= new User({

                        name:req.body.name.trim(),
                        email:req.body.email.toLowerCase(),
                        password:hash,
                        createdAt: Date.now()
                    })
                    user.save().then(result=>{
                        res.status(201).json({
                            message:"user created",
                            userId: result._id
                        })
                    }).catch(err=>{
                        console.log(err);
                        res.status(500).json({
                            error:err
                        })
                    })
                }
            })
}
})
})


// login to the user

router.post('/login',(req,res)=>{
    User.findOne({email:req.body.email.trim().toLowerCase()})
    .then(user=>{
        if(!user){
            return res.status(401).json({
                message:'No user exist '
            })
        }
        bcrypt.compare(req.body.password.trim(), user.password ,(err, result)=>{
            if(err){
                return res.status(401).json({
                    message:"password incorrect"
                })
            }
            if(result){
                const token = jwt.sign({
                    email:user.email,
                    userId:user._id,

                },"secret key",{
                    expiresIn:"1h"
                })
                return  res.status(200).json({
                    message:"Auth successful",
                    token: token,
                    userId: user._id
                })
            }
        })
    }).catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err,
            message:"dfsd"
        });
    })
})


module.exports = router;