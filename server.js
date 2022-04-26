const http = require('http');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const headers = require('./headers');
const { successHandle, errorHandle, notFoundHandle } = require('./headles');
const Post = require('./models/posts');

dotenv.config({ path: './config.env' });
const DB = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD);
mongoose.connect(DB)
  .then(() => console.log(' 資料庫連線成功'))
  .catch((err) => { console.log(err) })


const reqListener = async (req, res) => {
  let body = '';
  req.on('data', (chunk) => { body += chunk });

  const { url, method } = req;

  if (url === '/posts' && method === 'GET') {
    try {
      const posts = await Post.find();
      successHandle(res, posts);
    } catch {
      errorHandle(res, '取得資料失敗');
    }
  } else if (url === '/posts' && method === 'POST') {
    req.on('end', async () => {
      try {
        const postData = JSON.parse(body);
        const { name, tags, type, content } = postData;

        if (!name || !tags || !type || !content) {
          errorHandle(res, '欄位填寫不正確');
        } else {
          const newPost = await Post.create({
            name,
            tags,
            type,
            content
          })
          successHandle(res, newPost);
        }

      } catch (err) {
        errorHandle(res, err.message);
      }
    })
  } else if (url === '/posts' && method === 'DELETE') {
    await Post.deleteMany({});
    successHandle(res, '刪除所有資料');
  } else if (url.startsWith('/posts/') && method === 'DELETE') {
    try {
      const postId = url.split('/').pop();
      await Post.findByIdAndDelete(postId);
      successHandle(res, '刪除資料成功');
    } catch {
      errorHandle(res, '刪除資料失敗，無此 ID');
    }
  } else if (url.startsWith('/posts/') && method === 'PATCH') {
    req.on('data', async () => {
      try {
        const postData = JSON.parse(body);
        const { name, tags, type, content } = postData;

        if (!name || !tags || !type || !content) {
          errorHandle(res, '修改資料失敗，欄位填寫不正確');
        } else {
          const postId = url.split('/').pop();
          const editPost = await Post.findById(postId).exec();
          console.log(editPost);
          if (editPost) {
            await Post.findByIdAndUpdate(postId, {
              name,
              tags,
              type,
              content
            });
            successHandle(res, '修改資料成功');
          } else {
            errorHandle(res, '修改資料失敗，無此 ID');
          }
        }

      } catch (err) {
        errorHandle(res, err.message);
      }
    })
  } else if (url === '/posts' && method === 'OPTIONS') {
    successHandle(res, 'OPTIONS');
  } else {
    notFoundHandle(res, '無此路由');
  }
}

http.createServer(reqListener).listen(process.env.PORT);