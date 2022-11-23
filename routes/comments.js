// routes/posts.js
const express = require('express');
const Comments = require('../schemas/comment');
const Posts = require('../schemas/post');
const router = express.Router();

//get data
router.get('/comments/:postId', async (req, res) => {
       const {postId} = req.params;
       const comments  = await Comments.find()
       const result = comments.filter(comment => comment.postId === Number(postId))
       res.json({data: result})
});

router.get('/comments', async (req, res) => {
       const comments  = await Comments.find()
       res.json({data: comments})
});


//tambah data
router.post('/comments/:postId', async (req, res) => {
       const { postId } = req.params
       const { commentId, content } = req.body
       const comment = await Comments.find({commentId})
       if (comment.length > 0){
              return res.json({ errorMessage: "Comments id sudah ada!!"})
       }
       if (!content) {
           return res.json({ errorMessage: "Please enter the comment content" })
       }
   
       const createComment = await Comments.create({
           postId,
           commentId,
           content
       })
       return res.json({
           comment: createComment
       })
   })


//Update
router.put('/comments/:commentId', async (req, res) => {
       const { commentId } = req.params
       const { content } = req.body
       const data = await Comments.findOne({ commentId })
   
       if (!data) {
           return res.status(400).json({errorMessage: "Data not found here!"})
       }
   
       if (!content) {
           return res.json({ errorMessage: "Input comment content" })
       }
   
   
       if (data) {
           await Comments.updateOne({ commentId},
               {
                   $set: {
                       content: content
                   }
               })
       }
       return res.json({
           result: 'success',
           success: true,
       })
})


 //delete
 router.delete('/comments/:commentId', async (req, res) => {
       const { commentId } = req.params
       const data = await Comments.findOne({ commentId: commentId })
   
       if (data) {
           await Comments.deleteOne({ commentId: commentId })
       } else {
           return res.status(400).json({
               errorMessage: "Data not found here!"
           })
       }
       return res.json({
           result: 'Delete data success!',
           success: true,
       })
   })

module.exports = router;