// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors());

app.use(bodyParser.json({ limit: '10mb' }));
// Подключение к MongoDB с использованием вашего токена
const mongoURI = 'mongodb+srv://root:root@cluster0.10lrxti.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

// Определение схемы и модели для постов
const postSchema = new mongoose.Schema({
  title: String,
  image: String,
  content: String,
});

const Post = mongoose.model('Post', postSchema);

// Роуты для обработки запросов
app.get('/posts', async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/posts', async (req, res) => {
  const { title, image, content } = req.body;

  const post = new Post({
    title,
    image,
    content,
  });

  try {
    const newPost = await post.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
