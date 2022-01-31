const express = require('express');

const app = express();
const path = require('path');

//TEMPLATE ENGINE
app.set("view engine","ejs");

//MIDDLEWARES
app.use(express.static('public'));

//ROUTES
// app.use('/', express.static(path.join(__dirname, 'index')));

app.get('/',(res,req)=>{
    req.render('index')
})

app.get('/about',(res,req)=>{
    req.render('about')
})
app.get('/add',(res,req)=>{
    req.render('add_post')
})



const port = 3000;

app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı.`);
});
