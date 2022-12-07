const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const Posts = require('../models/Posts');

module.exports = Router()
  .post('/', [authenticate], async (req, res, next) => {
    try {
      const resp = await Posts.insert({
        email: req.user.email,
        login: req.github_user.login,
        content: req.body.content
      });
      res.json(resp);
    } catch (e) {
      next(e);
    }
  })

  .get('/', [authenticate], async (req, res) => {
    const resp = await Posts.getAll();
    console.log(resp);
    res.json(resp);
  });
  
