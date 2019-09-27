const express = require('express');
const path = require('path');

const askDatabase = require('./mysqlQueryHandler');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('./assets'));
app.use(express.json());

// 

app.get('/reddit', function(req, res) {
  res.sendFile(path.resolve('views/index.html'));
});

app.get('/posts', function (req, res) {
  askDatabase('SELECT * FROM posts;')
    .then((result) => {
      res.status(200);
      res.setHeader('Content-Type', 'application/json');
      res.render('posts', { parsed: result });
    })
    .catch((err) => {
      console.log(err.message);
      res.sendStatus(500);
    });
});

app.get('/posts/:id', function(req, res) {
  res.sendFile(path.resolve('views/editForm.html'));
});

app.get('/add', function(req, res) {
  res.sendFile(path.resolve('views/addForm.html'))
});

app.post('/posts', function (req, res) {
  askDatabase('INSERT INTO posts SET ?', [req.body])
    .then((insResult) => {
      askDatabase('SELECT * FROM posts WHERE id = ?', [insResult.insertId])
        .then((result) => {
          res.status(200);
          res.setHeader('Content-Type', 'application/json');
          res.send(result[0]);
        })
        .catch((err) => {
          console.log(err.message);
          res.sendStatus(500);
        });
    })
    .catch((err) => {
      console.log(err.message);
      res.sendStatus(500);
    });
});

app.put('/posts/:id/upvote', function(req, res) {
  askDatabase('UPDATE posts SET score = score + 1 WHERE id = ?', [req.params.id])
    .then(() => {
      askDatabase('SELECT * FROM posts WHERE id = ?', [req.params.id])
        .then((result) => {
          res.status(200);
          res.setHeader('Content-Type', 'application/json');
          res.send(result[0]);
        })
        .catch((err) => {
          console.log(err.message);
          res.sendStatus(500);
        });
    })
    .catch((err) => {
      console.log(err.message);
      res.sendStatus(500);
    });
});

app.put('/posts/:id/downvote', function(req, res) {
  askDatabase('UPDATE posts SET score = score - 1 WHERE id = ?', [req.params.id])
    .then(() => {
      askDatabase('SELECT * FROM posts WHERE id = ?', [req.params.id])
        .then((result) => {
          res.status(200);
          res.setHeader('Content-Type', 'application/json');
          res.send(result[0]);
        })
        .catch((err) => {
          console.log(err.message);
          res.sendStatus(500);
        });
    })
    .catch((err) => {
      console.log(err.message);
      res.sendStatus(500);
    });
});

app.put('/posts/:id', function(req, res) {
  askDatabase('UPDATE posts SET ? WHERE id = ?', [req.body, req.params.id])
    .then(() => {
      askDatabase('SELECT * FROM posts WHERE id = ?', [req.params.id])
        .then((result) => {
          res.status(200);
          res.setHeader('Content-Type', 'application/json');
          res.send(result[0]);
        })
        .catch((err) => {
          console.log(err.message);
          res.sendStatus(500);
        });
    })
    .catch((err) => {
      console.log(err.message);
      res.sendStatus(500);
    });
});

app.delete('/posts/:id', function(req, res) {
  askDatabase('SELECT * FROM posts WHERE id = ?', [req.params.id])
    .then(() => {
      askDatabase('DELETE FROM posts WHERE id = ?', [req.params.id])
        .then((result) => {
          res.status(200);
          res.setHeader('Content-Type', 'application/json');
          res.send(result[0]);
        })
        .catch((err) => {
          console.log(err.message);
          res.sendStatus(500);
        });
    })
    .catch((err) => {
      console.log(err.message);
      res.sendStatus(500);
    });
});

module.exports = app;