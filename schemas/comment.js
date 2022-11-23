const mongoose = require('mongoose');

const commentsSchema = new mongoose.Schema({
       commentId: {
              type: Number,
              required: true,
              unique: true
       },
       postId: {
              type: Number,
              required: true,
       },
       content: {
              type: String,
              required: true
       }
},
{timestamps: true})
       
       
module.exports = mongoose.model("Comments", commentsSchema);