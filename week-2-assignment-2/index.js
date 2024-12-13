const app = require('express')();
const fs = require('fs'); 
const todo = require(`${__dirname}/file/todo.js`);
const {v1: uuidv1, v4: uuidv4} = require('uuid')
app.use(require('express').json());
app.get('/', (req, res) => res.status(200).json({message: "Hello World!"})); 
app.post('/create/todo', (req, res) => {
  const {title, description} = req.body;

  console.log(todo)
  if(!title || !description) {
    res.status(400).json({message: "Invalid Input"});
    return;
  }
  const appendData = `
  {
    "id": "${uuidv4()}",
    "title": "${title}",
    "description": "${description}",
  }`;
  fs.appendFile(`${__dirname}/file/test.txt`, `${appendData},`, (error) => {
    if(error) throw error;
    console.log("Updated!!!");
  })
  res.status(200).json(appendData)
})
app.listen(3000)
