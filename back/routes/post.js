const express = require('express');
const { isLoggedIn } = require('./middlewares');
const { Post, Comment, User, Image } = require('../models');
const router = express.Router();

router.post('/', isLoggedIn, async (req, res) => {
  try {
    const post = await Post.create({
      content: req.body.content,
      UserId: req.user.id,
    });
    const fullPost = await Post.findOne({
      where: { id: post.id },
      include: [{
        model: Image,
      }, {
        model: Comment,
      }, {
        model: User,
      }]
    })
    res.status(201).json(fullPost);
  } catch (e) {
    console.error(e);
  }
});

router.post('/comment', isLoggedIn, async (req, res) => {
  try {
    const { content, postId: PostId } = req.body;
    const { id: UserId } = req.user;
    const post = await Post.findOne({
      where: {
        id: PostId
      }
    })
    if (!post) {
      return res.status(403).send('존재하지 않는 게시글 입니다.');
    }
    const comment = await Comment.create({
      content,
      PostId,
      UserId,
    });
    const fullComment = await Comment.findOne({
      where: { id: comment.id },
      include: [{
        model: User,
        attributes: ['id', 'nickname'],
      }],
    })
    res.status(201).json(fullComment);
  } catch (e) {
    console.error(e);
  }
})



module.exports = router;