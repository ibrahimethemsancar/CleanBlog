const Post=require('../models/Post')
exports.aboutPage=(req, res) => {
    res.render('about');
  }

  exports.addPage=(req, res) => {
    res.render('add_post');
  }

  exports.homePage=async (req, res) => {
    const posts = await Post.find({});
    res.render('index', {
      posts,
    });
  }