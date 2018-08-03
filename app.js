const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const layout = require('./views/layout');
const { db } = require('./models');
const wikiRouter = require('./routes/wiki');
const userRouter = require('./routes/user');
// const models = require('./models'); //is there a way to combine line 6 & 7?
const app = express();

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, './public')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/wiki', wikiRouter);

app.get('/', (req, res, next) => {
  res.redirect('/wiki');
})

// app.get('/', (req, res, next) => {
//   res.send(layout(''));
// });

const init = async () => {
  // await models.db.sync(); //same as below
  await db.sync();

  const port = 3000;
  app.listen(port, () => {
    console.log(`server listening on port ${port}`);
  });
};
init();

module.exports = app;

