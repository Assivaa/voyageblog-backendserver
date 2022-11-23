// routes/posts.js
const express = require('express');
const Posts = require('../schemas/post');
const router = express.Router();

//get data
router.get('/posts', async (req, res) => {
       const posts = await Posts.find({}, {_id: 0, postId: 1, title:1, name:1, content:1 }).sort({createdAt: -1})

       res.json({data: posts})

});

router.get('/posts/:postId', async (req, res) => {
       const {postId} = req.params
       const posts = await Posts.find({postId}, {_id: 0, postId: 1, title:1, name:1, content:1 }).sort({createdAt: -1})
       if (posts.length === 0){
              return res.json({ errorMessage: "Post not found!"})
       }
       res.json({data: posts})

});

router.post('/posts', async (req, res) => {
       const {postId, title, name, password, content} = req.body
       const posts = await Posts.find({postId: postId}) //kiri schemas kanan thunder client
       if (posts.length > 0) {
              return res.status(400).json({success: false, errorMessages: 'Post already exists bro!'})  
       }   
       const createpost = await Posts.create({
              postId, title, name, password, content 
       })
       return res.json({post: createpost})
});

//Update
router.put('/posts/:postId', async (req, res) => {
       const {postId} = req.params;
       const data = req.body; 
       const posts = await Posts.find({postId: postId});
       if (posts.length) {
            await Posts.updateOne({ postsId: Number(postId) }, 
       {$set: { title: data.title, name: data.name, content: data.content } });
       }   
       res.json({
              result: 'success',
              success: true,
       });
 });

 //delete
 router.delete('/posts/:postId', async (req, res) => {
       const {postId} = req.params;
       const posts = await Posts.find({postId: postId});
     
       if (posts.length) {              
            await Posts.deleteOne({ postsId: Number(postId)})
            res.json({success: "Succes!"  });  
       } else { 
             res.json({failed: "Failed to delete"  });  
       }
 });

module.exports = router;