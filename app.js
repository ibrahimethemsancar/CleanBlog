const express = require('express');
const mongoose=require('mongoose');
const app = express();
const path = require('path');
const Post=require('./models/Post');

//connect DB
mongoose.connect('mongodb://localhost/cleanBlog-db',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
//TEMPLATE ENGINE
app.set("view engine","ejs");

//MIDDLEWARES
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(express.json())

//ROUTES
// app.use('/', express.static(path.join(__dirname, 'index')));

app.get('/', async(req,res)=>{
     const posts=await Post.find({})
    res.render('index',{
        posts
    })
})

app.get('/post/:id', async(req,res)=>{
    const singlePost=await Post.findById(req.params.id);
    res.render('post',{
        singlePost
    })
    
})

app.get('/about',(req,res)=>{
    res.render('about')
})
app.get('/add',(req,res)=>{
    res.render('add_post')
})

app.post('/add_Post',async(req,res)=>{
   await Post.create(req.body);
    res.redirect('/')
})



const port = 3000;

app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı.`);
});
