var express = require('express');
var router = express.Router();
var Post = require('../models').Post;
var catchErrors = require('../async-error');

// 기본경로 : /posts
// 글 전체 목록
router.get('/', catchErrors(async (req, res) => {
  const posts = await Post.all();
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
      name: req.body.name || post.name,
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
    name: req.body.name,
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