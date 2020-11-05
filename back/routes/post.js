const express = require('express');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const { isLoggedIn } = require('./middlewares');
const { Post, Comment, User, Image } = require('../models');

const router = express.Router();

try {
  fs.accessSync('uploads');
} catch (e) {
  console.log('uploads 폴더가 없으므로 생성 합니다.');
  fs.mkdirSync('uploads');
}

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, 'uploads');
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      const basename = path.basename(file.originalname, ext);
      done(null, `${basename}_${new Date().getTime()}${ext}`);

    },
  }),
  limits: { fileSize: 20 * 1024 * 1024 },
});

router.post('/', isLoggedIn, upload.none(), async (req, res) => {
  try {
    const { content, image } = req.body;
    const post = await Post.create({
      content,
      UserId: req.user.id,
    });
    if (image) {
      if (Array.isArray(image)) {
        const imageResult = await Promise.all(image.map((image) => Image.create({ src: image })));
        await post.addImage(imageResult);
      } else {
        const imageResult = await Image.create({ src: image });
        await post.addImage(imageResult);
      }
    }
    const fullPost = await Post.findOne({
      where: { id: post.id },
      include: [{
        model: Image,
      }, {
        model: Comment,
      }, {
        model: User,
      }, {
        model: User,
        as: 'Likers',
        attributes: ['id'],
      }],
    });
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
        id: PostId,
      },
    });
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
    });
    res.status(201).json(fullComment);
  } catch (e) {
    console.error(e);
  }
});

router.patch('/:postId/like', isLoggedIn, async (req, res, next) => { // PATCH /post/1/like
  try {
    const post = await Post.findOne({ where: { id: req.params.postId } });
    if (!post) {
      return res.status(403).send('게시글이 존재하지 않습니다.');
    }
    await post.addLikers(req.user.id);
    res.json({ PostId: post.id, UserId: req.user.id });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.delete('/:postId/like', isLoggedIn, async (req, res, next) => { // DELETE /post/1/like
  try {
    const post = await Post.findOne({ where: { id: req.params.postId } });
    if (!post) {
      return res.status(403).send('게시글이 존재하지 않습니다.');
    }
    await post.removeLikers(req.user.id);
    res.json({ PostId: post.id, UserId: req.user.id });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.delete('/:postId', isLoggedIn, async (req, res, next) => { // DELETE /post/1/like
  try {
    const postId = parseInt(req.params.postId, 10);
    await Post.destroy({
      where: {
        id: postId,
        UserId: req.user.id,
      },
    });
    res.json({ PostId: postId });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post('/images', isLoggedIn, upload.array('image'), async (req, res, next) => {
  console.log(req.files);
  res.json(req.files.map((v) => v.filename));
});


module.exports = router;