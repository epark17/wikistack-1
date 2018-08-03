const express = require('express');
const router = express.Router();
const { Page } = require('../models');
const { addPage, wikipage } = require("../views");

router.get('/', (req, res, next) => {
    res.send('got to GET');
});

router.post('/', async (req, res, next) => {
  // res.send('got to POST /wiki/');
  // res.json(req.body);
  const data = req.body;
  try {
    const page = new Page({
      title: data.title,
      content: data.content
    });
    await page.save();
    res.redirect('/wiki/' + page.slug);
  } catch (error) { next(error); }
});

router.get('/add', (req, res, next) => {
  res.send(addPage());
});

router.get('/:slug', async (req, res, next) => {
  try {
    const page =  await Page.findOne({
      where: {
        slug: req.params.slug
      }
    });
    res.send(wikipage(page));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
