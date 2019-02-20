const express = require('express');
const router = express.Router();
const cors = require('cors');
const Blog = require('../../models/feed');
const User = require('../../models/user')
const checkAuth = require('../../middleware/check-auth')
router.use(cors());



//GET request to get all the blog
router.get('/',(req,res)=>{
    Blog.find({}).sort({createdAt:-1})
    .exec()
    .then(docs =>{
        res.json(docs);
    })
    .catch(err=>{
        console.log(err);
    })
})

router.post('/',checkAuth,(req,res)=>{
    // new data from the form
    console.log(req.userData);
    const today = Date.now()
    const blog = new Blog({
        title: req.body.title,
        description:req.body.description,
        image: req.body.image,
        createdAt: today,
         author:req.userData.userId
    })
    blog.save()
   
    .then(blog=>{
        
        

        res.json(blog);
        
    }).catch(err=>{
        console.log(err);
    })
})
/**
 * GET request to get a particular blog
 */
router.get('/:blogId',(req,res)=>{
    Blog.findById({_id:req.params.blogId})
    .then(blog=>{
        if(blog){

            res.status(200).json(blog);
        }
        else{
            res.status(404).json({
                message:"no post for that id"
            })
        }
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    })
});

router.patch('/:blogId',checkAuth,(req,res,next)=>{
    const id= req.params.blogId;
    const updateBlog ={};
    console.log(req.body)

    Blog.findById({_id:id})
    .then(blog=>{
        if(!blog){
            res.status(404).json({
                message:"page not found",
            })
        }
        if(blog.author.toString() != req.userData.userId){
            res.status(403).json({
                message:"Not authorized"
            })
        }
        else{
             Blog.updateOne({_id:id},{$set: {title:req.body.title,description: req.body.description, image:req.body.image, author:req.userData.userId}})
    .exec()
    .then(result=>{
        console.log(result);
        res.status(200).json(result)
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
        }
    })

    // for(const ops of req.body){
    //     updateBlog[ops.propName] = ops.value
    // }
    
   
    // Blog.updateOne({_id:id},{$set: {title:req.body.title,description: req.body.description, image:req.body.image}})
    // .exec()
    // .then(result=>{
    //     console.log(result);
    //     res.status(200).json(result)
    // })
    // .catch(err=>{
    //     console.log(err);
    //     res.status(500).json({
    //         error:err
    //     })
    // })
})


router.delete('/:blogId',checkAuth,(req,res)=>{
    Blog.findById({_id:req.params.blogId})
        .then(blog=>{
            if(!blog){
                res.status(404).json({
                    message:"page not found",
                })
            }
            if(blog.author.toString() != req.userData.userId){
                res.status(403).json({
                    message:"Not authorized to delete"
                })
            }
            else{
                Blog.deleteOne({_id:req.params.blogId})
                .then(result=>{
                    res.status(200).json(result);
                })
                .catch(err=>{
                    res.status(500).json({
                        error: err
                    })
                })
            }
        })
    
})

module.exports = router;