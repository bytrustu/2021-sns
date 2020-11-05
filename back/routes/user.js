const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const { User, Post } = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const router = express.Router();

router.get('/',  async (req, res, next) => {
  try {
    if (req.user){
      const fullUserWithoutPassword = await User.findOne({
        where: { id: req.user.id },
        attributes: {
          exclude: ['password']
        },
        include: [{
          model: Post,
          attributes: ['id'],
        }, {
          model: User,
          as: 'Followings',
          attributes: ['id'],
        }, {
          model: User,
          as: 'Followers',
          attributes: ['id'],
        }]
      })
      console.log(fullUserWithoutPassword);
      res.status(200).json(fullUserWithoutPassword);
    } else {
      res.status(200).json(null);
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.post('/', isNotLoggedIn, async (req, res, next) => {
  try {
    const exUser = await User.findOne({
      where: {
        email: req.body.email,
      }
    });
    if (exUser) {
      return res.status(403).send('이미 사용중인 아이디 입니다.');
    }
    const { email, nickname, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      email,
      nickname,
      password: hashedPassword,
    });
    res.status(201).send('ok');
  } catch (e) {
    console.log(e);
    next(e);
  }
});

router.post('/login', isNotLoggedIn, (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.error(err);
      next(err);
    }
    if (info) {
      return res.status(401).send(info.reason);
    }
    return req.login(user, async (loginErr) => {
      if (loginErr) {
        console.error(loginErr);
        return next(loginErr);
      }
      const fullUserWithoutPassword = await User.findOne({
        where: { id: user.id },
        attributes: {
          exclude: ['password']
        },
        include: [{
          model: Post,
          attributes: ['id'],
        }, {
          model: User,
          as: 'Followings',
          attributes: ['id'],
        }, {
          model: User,
          as: 'Followers',
          attributes: ['id'],
        }]
      })
      return res.json(fullUserWithoutPassword);
    })
  })(req, res, next);
});

router.post('/logout', isLoggedIn, (req, res, next) => {
  req.logout();
  req.session.destroy();
  res.send('ok');
});

router.patch('/nickname', isLoggedIn, async (req, res, next) => {
  try {
    const { nickname } = req.body;
    const { id } = req.user;
    await User.update({
      nickname
    }, {
      where: {
        id
      }
    });
    res.status(200).json({ nickname });
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.patch('/:userId/follow', isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.params.userId }});
    if (!user) {
      return res.status(403).send('존재하지 않는 유저 입니다.');
    }
    await user.addFollowers(req.user.id);
    res.status(200).json({ UserId: parseInt(req.params.userId, 10) });
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.delete('/:userId/follow', isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.params.userId }});
    if (!user) {
      return res.status(403).send('존재하지 않는 유저 입니다.');
    }
    await user.removeFollowers(req.user.id);
    res.status(200).json({ UserId: parseInt(req.params.userId, 10) });
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.delete('/:userId/follower', isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.params.userId }});
    if (!user) {
      return res.status(403).send('존재하지 않는 유저 입니다.');
    }
    await user.removeFollowings(req.user.id);
    res.status(200).json({ UserId: parseInt(req.params.userId, 10) });
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.get('/followers', isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.user.id }});
    if (!user) {
      return res.status(403).send('존재 하지 않는 유저 입니다.');
    }
    const followers = await user.getFollowers();
    res.status(200).json(followers);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.get('/followings', isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.user.id }});
    if (!user) {
      return res.status(403).send('존재 하지 않는 유저 입니다.');
    }
    const followings = await user.getFollowings();
    res.status(200).json(followings);
  } catch (e) {
    console.error(e);
    next(e);
  }
});


module.exports = router;