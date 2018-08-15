const express = require('express');
const router = express.Router();
const Post = require('../../models').Post;
const LikeLog = require('../../models').LikeLog;
const catchErrors = require('../../utils/async-error');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const path = require('path');

const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const aws_config = path.resolve(__dirname, '../../config/aws_config.json');
const s3_secret = require('../../config/s3_secret.json');

aws.config.loadFromPath(aws_config);

const s3 = new aws.S3();

const storageS3 = multerS3({
  s3,
  bucket: s3_secret.bucket_name,
  acl: 'public-read',
  key: function (req, file, callback) {
    const fname = Date.now() + '_' + file.originalname;
    callback(null, fname);
  }
});

const uploadImage = multer({storage: storageS3});
// const uploadArray = multer({storage: storageS3}).array('images', 5);

router.get('/mine/:id', catchErrors(async (req, res) => {
  const posts = await Post.findAll({
    where: {
      user_id: req.params.id
    },
    order: [['createdAt', 'DESC']]
  });
  res.status(200).send(posts);
}));

router.get('/others/:id', catchErrors(async (req, res) => {
  const posts = await Post.findAll({
    where: {
      user_id: {
        [Op.ne] : req.params.id
      }
    },
    order: [['createdAt', 'DESC']]
  });
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
      user_name: req.body.user_name || post.user_name,
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
router.post('/', uploadImage.single('image'), catchErrors(async (req, res) => {
  const post = await Post.create({
    title: req.body.title,
    user_id: req.body.user_id,
    user_name: req.body.user_name,
    image: req.file ? req.file.location : null,
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

// 좋아요
router.put('/like/:id', catchErrors(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (post) {
    await post.update({
      heart: Sequelize.literal('heart + 1') }, { where: {id: req.params.id}}
    );

    await LikeLog.create({
      liker_id: req.body.liker_id,
      liker_name: req.body.liker_name,
      owner_id: req.body.owner_id,
      post_id: req.body.post_id,
      img: req.body.img,
    });
    
    res.status(200).send(post);
  } else {
    res.status(400).send({error: 'Not exist id.'});
  }
}));

// 좋아요 로그(나)
router.get('/like/:id', catchErrors(async (req, res) => {
  const likeLogs = await LikeLog.findAll({
    where: {
      owner_id: req.params.id
    },
    order: [['createdAt', 'DESC']]
  });
  res.status(200).send(likeLogs);
}));

// 좋아요 로그(다른사람에 대한)
router.get('/like/other/:id', catchErrors(async (req, res) => {
  const likeLogs = await LikeLog.findAll({
    where: {
      owner_id: {
        [Op.ne] : req.params.id
      },
      liker_id: req.params.id
    }
  });
  res.status(200).send(likeLogs);
}));

// 검색
router.get('/search/:keyword', catchErrors(async (req, res) => {
  const searchResult = await Post.findAll({
    where: {
      [Op.or] : [
        {title: {
          [Op.iLike] : '%' + req.params.keyword + '%'
        }},
        {content: {
          [Op.iLike] : '%' + req.params.keyword + '%'
        }}
      ]
    }
  });
  res.status(200).send(searchResult);
}));


module.exports = router;