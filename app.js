const express = require('express');
const mongoose = require('mongoose');
const app = express();
const path = require('path');
const Post = require('./models/Post');
const methodOverride = require('method-override');
const postController=require('./controller/postController')
const pageController=require('./controller/pageController')
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

//PAGE PART
app.get('/', pageController.homePage);
app.get('/about',pageController.aboutPage );
app.get('/add', pageController.addPage);
//POST PART
app.get('/post/:id',postController.singlePost );
app.post('/add_Post', postController.addPost);
app.delete('/post/:id', postController.deletePost);
app.get('/post_edit/:id', postController.postEdit);
app.put('/post_edit/:id', postController.updatePost);

const port = 3000;

app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı.`);
});
