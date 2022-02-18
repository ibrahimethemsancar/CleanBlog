const Post=require('../models/Post')

exports.singlePost=async (req, res) => {
    const singlePost = await Post.findById(req.params.id);
    res.render('post', {
      singlePost,
    });
  }

exports.addPost=async (req, res) => {
    await Post.create(req.body);
    res.redirect('/');
  }

  exports.deletePost=async (req, res) => {
    const post = await Post.findOne({ _id: req.params.id });
    await Post.findOneAndRemove({ _id: post.id });
    res.redirect('/');
  }

  exports.postEdit=async (req, res) => {
    const post = await Post.findOne({ _id: req.params.id });
    res.render('edit', {
      post,
    });
  }

  exports.updatePost=async (req, res) => {
    const post = await Post.findOne({ _id: req.params.id });
    // console.log(req.body.title);
    post.title = req.body.title;
    post.detail = req.body.detail;
    post.save();
    res.redirect('/');
  }