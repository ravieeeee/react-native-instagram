const express = require('express');
const router = express.Router();
const asyncError = require('../../utils/async-error');
const db = require('../../models');
const nanoid = require('nanoid');

router.get('/', asyncError(async (req, res) => {
  const clients = await db.OAuthClient.findAll();
  res.render('admin/oauth', { clients });
}));

router.post('/', asyncError(async (req, res) => {
  await db.OAuthClient.create({
    clientId: nanoid(),
    clientSecret: nanoid(),
    redirectUri: ""
  });
  
  res.redirect('/admin/oauth');
}));

router.delete('/:id', asyncError(async (req, res) => {
  await db.OAuthClient.destroy({
    where: { id: req.params.id }
  });
  
  res.redirect('/admin/oauth');
}));

module.exports = router;
