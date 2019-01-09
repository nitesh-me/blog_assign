const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Post model
const Post = require('../../models/Post');
// Profile model
const Profile = require('../../models/Profile');

/** 
 * Dummy api endpoint to be deleted
 */
router.get('/test', (req, res) => res.json({
  msg: 'Posts Works'
}));


/**
 * api endpoint for posts/
 * returns array of posts sorted by descending order of their published date
 */
router.get('/', (req, res) => {
  Post.find()
    .sort({
      date: -1
    })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({
      nopostsfound: 'No posts found'
    }));
});

/**
 * 
 */
router.get('/:id', (req, res) => {
  Post.findById(req.params.id)
    .then(post => {
      if (post) {
        res.json(post);
      } else {
        res.status(404).json({
          nopostfound: 'No post found with that ID'
        })
      }
    })
    .catch(err =>
      res.status(404).json({
        nopostfound: 'No post found with that ID'
      })
    );
});


router.post('/', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  const newPost = new Post({
    title: req.body.title,
    content: req.body.content,
    image: req.body.image,
    user: req.user.id
  })
  newPost.save().then(post => res.json(post));
})
/** Deleting the post */

router.delete(
  '/:id',
  passport.authenticate('jwt', {
    session: false
  }),
  (req, res) => {
    Profile.findOne({
      user: req.user.id
    }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          // Check for post owner
          if (post.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({
                notauthorized: 'User not authorized'
              });
          }

          // Delete
          post.remove().then(() => res.json({
            success: true
          }));
        })
        .catch(err => res.status(404).json({
          postnotfound: 'No post found'
        }));
    });
  }
);

/** Like the particular post  */
router.post(
  '/like/:id',
  passport.authenticate('jwt', {
    session: false
  }),
  (req, res) => {
    Profile.findOne({
      user: req.user.id
    }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
            .length > 0
          ) {
            return res
              .status(400)
              .json({
                liked: 'User already liked this post'
              });
          }

          // Add user id to likes array
          post.likes.unshift({
            user: req.user.id
          });

          post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({
          postnotfound: 'No post found'
        }));
    });
  }
);
/**  Unlikig the post */
router.post(
  '/unlike/:id',
  passport.authenticate('jwt', {
    session: false
  }),
  (req, res) => {
    Profile.findOne({
      user: req.user.id
    }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
            .length === 0
          ) {
            return res
              .status(400)
              .json({
                notliked: 'You have not yet liked this post'
              });
          }

          // Get remove index
          const removeIndex = post.likes
            .map(item => item.user.toString())
            .indexOf(req.user.id);

          // Splice out of array
          post.likes.splice(removeIndex, 1);

          // Save
          post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({
          postnotfound: 'No post found'
        }));
    });
  }
);







/**
 * Commenting on a particular post
 */


router.post(
  '/comment/:id',
  passport.authenticate('jwt', {
    session: false
  }),
  (req, res) => {


    Post.findById(req.params.id)
      .then(post => {
        const newComment = {
          text: req.body.text,
          name: req.body.name,
          avatar: req.body.avatar,
          user: req.user.id
        };

        // Add to comments array
        post.comments.unshift(newComment);

        // Save
        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({
        postnotfound: 'No post found'
      }));
  }
);

router.delete(
  '/comment/:id/:comment_id',
  passport.authenticate('jwt', {
    session: false
  }),
  (req, res) => {
    Post.findById(req.params.id)
      .then(post => {
        // Check to see if comment exists
        if (
          post.comments.filter(
            comment => comment._id.toString() === req.params.comment_id
          ).length === 0
        ) {
          return res
            .status(404)
            .json({
              commentnotexists: 'Comment does not exist'
            });
        }

        // Get remove index
        const removeIndex = post.comments
          .map(item => item._id.toString())
          .indexOf(req.params.comment_id);

        // Splice comment out of array
        post.comments.splice(removeIndex, 1);

        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({
        postnotfound: 'No post found'
      }));
  }
);



module.exports = router;