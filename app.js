const express = require('express');
const mongoose = require('mongoose');
const app = express();
const path = require('path');
const Post = require('./models/Post');
const methodOverride = require('method-override');
//connect DB
mongoose.connect('mongodb://localhost/cleanBlog-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
//TEMPLATE ENGINE
app.set('view engine', 'ejs');

//MIDDLEWARES
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
);

//ROUTES
// app.use('/', express.static(path.join(__dirname, 'index')));

app.get('/', async (req, res) => {
  const posts = await Post.find({});
  res.render('index', {
    posts,
  });
});

app.get('/post/:id', async (req, res) => {
  const singlePost = await Post.findById(req.params.id);
  res.render('post', {
    singlePost,
  });
});

app.get('/about', (req, res) => {
  res.render('about');
});
app.get('/add', (req, res) => {
  res.render('add_post');
});

app.post('/add_Post', async (req, res) => {
  await Post.create(req.body);
  res.redirect('/');
});

app.delete('/post/:id', async (req, res) => {
  const post = await Post.findOne({ _id: req.params.id });
  await Post.findOneAndRemove({ _id: post.id });
  res.redirect('/');
});

app.get('/post_edit/:id', async(req, res) => { 
  const post = await Post.findOne({ _id: req.params.id });
  console.log(post)
  res.render('edit', {
    post,
  });
});

app.put('/post_edit/:id', async(req, res) => { 
    const post = await Post.findOne({ _id: req.params.id });
    // console.log(req.body.title);
    post.title= req.body.title;
    post.detail=req.body.detail;
     post.save();
    res.redirect('/')
   
  });


const port = 3000;

app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı.`);
});
