// model/posts.js
const mongoose = require('mongoose');

// 建立 Schema
const postsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, '貼文姓名 name 未填寫']
    },
    tags: [
      {
        type: String,
        required: [true, '貼文標籤 tags 未填寫']
      }
    ],
    type: {
      type: String,
      enum: ['group', 'person'],
      required: [true, '貼文類型 type 未填寫']
    },
    image: {
      type: String,
      default: ""
    },
    createAt: {
      type: Date,
      default: Date.now,
      select: false
    },
    content: {
      type: String,
      required: [true, '貼文內容 content 未填寫'],
    },
    likes: {
      type: Number,
      default: 0
    },
    comments: {
      type: Number,
      default: 0
    },
  }, {
    versionKey: false,
  }
);

// 建立 Model
const Posts = mongoose.model(
  'posts',
  postsSchema
);

module.exports = Posts;