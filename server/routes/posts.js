var express = require('express');
var router = express.Router();
var Post = require('../models').Post;
var catchErrors = require('../async-error');
var Sequelize = require('sequelize');
const Op = Sequelize.Op;

// 기본경로 : /posts
router.get('/mine/:id', catchErrors(async (req, res) => {
  const posts = await Post.findAll({
    where: {
      user_id: req.params.id
    }
  });
  res.status(200).send(posts);
}));

router.get('/others/:id', catchErrors(async (req, res) => {
  const posts = await Post.findAll({
    where: {
      user_id: {
        [Op.ne] : req.params.id
      }
    }
  });
  console.log('서버 ', posts);
  res.status(200).send(posts);
}));

// 특정 글 읽기
router.get('/:id', catchErrors(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (post) {
    res.status(200).send(post);
  } else {
    res.status(400).send({error: 'Not exist id.'});
  }
}));

// 글 수정
router.put('/:id', catchErrors(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (post) {
    await post.update({
      title: req.body.title || post.title,
      user_id: req.body.user_id || post.user_id,
      image: req.body.image || post.image,
      heart: req.body.heart || post.heart,
      content: req.body.content || post.content
    });
    res.status(200).send(post);
  } else {
    res.status(400).send({error: 'Not exist id.'});
  }
}));

// 글 등록
router.post('/', catchErrors(async (req, res) => {
  const post = await Post.create({
    title: req.body.title,
    user_id: req.body.user_id,
    image: req.body.image,
    heart: req.body.heart,
    content: req.body.content
  });
  res.status(201).send(post);
}));

// 글 삭제
router.delete('/:id', catchErrors(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (post) {
    await post.destroy();
    res.status(204).send({});
  } else {
    res.status(400).send({error: 'Not exist id.'});
  }
}));

module.exports = router;