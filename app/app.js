const express = require('express');
const mysql = require('mysql');
const path = require('path');
require('dotenv').config();

const app = express();

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
});

app.set('view engine', 'ejs');
app.use(express.static('./assets'));
app.use(express.json());

connection.connect(function (err) {
  if (err) {
    console.log(err);
    return;
  } else {
    console.log('Connection with database is established');
  }
});

app.get('/reddit', function(req, res) {
  res.sendFile(path.resolve('views/index.html'));
});

app.get('/posts', function (req, res) {
  connection.query('SELECT * FROM posts;', function(error, result) {
    if (error) {
      console.log('Couldnt get data from the database', error);
      return;
    }
    res.status(200);
    res.setHeader('Content-Type', 'application/json');
    res.render('posts', { parsed: result });
  });
});

app.get('/posts/:id', function(req, res) {
  res.sendFile(path.resolve('views/editForm.html'));
});

app.get('/add', function(req, res) {
  res.sendFile(path.resolve('views/addForm.html'))
});

app.post('/posts', function (req, res) {
  connection.query('INSERT INTO posts SET ?', req.body, (insError, insResult) => {
    if (insError) {
      console.log('Couldn\'t insert data into database', insError);
      return;
    }
    connection.query('SELECT * FROM posts WHERE id = ?', insResult.insertId, (readError, readResult) => {
      if (readError) {
        console.log('Couldn\'t get inserted row from database', readError);
        return;
      }
      res.status(200);
      res.setHeader('Contet-Type', 'application/json');
      res.send(readResult[0]);
    });
  });
});

app.put('/posts/:id/upvote', function(req, res) {
  connection.query('UPDATE posts SET score = score + 1 WHERE id = ?', req.params.id, (error, result) => {
    if(error) {
      console.log('Couldn\'t update database', error);
      return;
    }
  });
  connection.query('SELECT * FROM posts WHERE id = ?', req.params.id, (error, result) => {
    if(error) {
      console.log('Couldn\'t get updated row from database', error);
      return;
    }
    res.status(200);
    res.setHeader('Contet-Type', 'application/json');
    res.send(result[0]);
  });
});

app.put('/posts/:id/downvote', function(req, res) {
  connection.query('UPDATE posts SET score = score - 1 WHERE id = ?', req.params.id, (error, result) => {
    if(error) {
      console.log('Couldn\'t update database', error);
      return;
    }
  });
  connection.query('SELECT * FROM posts WHERE id = ?', req.params.id, (error, result) => {
    if(error) {
      console.log('Couldn\'t get updated row from database', error);
      return;
    }
    res.status(200);
    res.setHeader('Contet-Type', 'application/json');
    res.send(result[0]);
  });
});

app.put('/posts/:id', function(req, res) {
  connection.query('UPDATE posts SET ? WHERE id = ?', [req.body, req.params.id], (error, result) => {
    if(error) {
      console.log('Couldn\'t update database', error);
      return;
    }
  });
  connection.query('SELECT * FROM posts WHERE id = ?', req.params.id, (error, result) => {
    if(error) {
      console.log('Couldn\'t get updated row from database', error);
      return;
    }
    res.status(200);
    res.setHeader('Contet-Type', 'application/json');
    res.send(result[0]);
  });
})

app.delete('/posts/:id', function(req, res) {
  connection.query('SELECT * FROM posts WHERE id = ?', req.params.id, (error, result) => {
    if(error) {
      console.log('Couldn\'t get selected row from database', error);
      return;
    }
    connection.query('DELETE FROM posts WHERE id = ?', req.params.id, (error, result) => {
      if(error) {
        console.log('Couldn\'t update database', error);
        return;
      }
    });
    res.status(200);
    res.setHeader('Contet-Type', 'application/json');
    res.send(result[0]);
  });
});

module.exports = app;