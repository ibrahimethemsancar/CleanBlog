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

app.get('/', async(res,req)=>{
     const posts=await Post.find({})
    req.render('index',{
        posts
    })
})

app.get('/about',(res,req)=>{
    req.render('about')
})
app.get('/add',(res,req)=>{
    req.render('add_post')
})

app.post('/add_Post',async(req,res)=>{
   await Post.create(req.body);
    res.redirect('/')
})



const port = 3000;

app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı.`);
});
