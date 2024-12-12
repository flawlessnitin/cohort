const express = require('express');
const app = express();
const fs = require('fs');
app.get('/files', (req, res) => {
  fs.readdir(`${__dirname}/files`, (err, files) => {
    files.forEach(file => {
      console.log(file);
    })
  })
})
app.get('/files/:name', (req, res) => {
  const { name } = req.params;
  console.log(name)
  fs.readFile(`${__dirname}/files/${name}`, 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    res.send(data);
  })
});
app.listen(3000)

