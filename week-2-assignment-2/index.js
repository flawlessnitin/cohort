// Imports
const app = require('express')();
const fs = require('fs'); 
const todo = require(`${__dirname}/file/todo.js`);
const {v1: uuidv1, v4: uuidv4} = require('uuid')

const todos = todo;
// Middlewares
app.use(require('express').json());

// Route handlers

// 1.GET /todos - Retrieve all todo items
// Description: Returns a list of all todo items.
// Response: 200 OK with an array of todo items in JSON format.
// Example: GET http://localhost:3000/todos
app.get('/todos', (req, res) => {
  if(!todos) {
    res.status(404).json("There are not todo's yet!!");
    return;
  }
  res.status(200).json(todos);
}); 
// 2.GET /todos/:id - Retrieve a specific todo item by ID
// Description: Returns a specific todo item identified by its ID.
// Response: 200 OK with the todo item in JSON format if found, or 404 Not Found if not found.
// Example: GET http://localhost:3000/todos/123

app.get('/todos/:id', (req, res) => {
  const id = req.params.id;
  if(!todos) {
    res.status(404).json({message: "There are no todo's yet!!"});
    return;
  }
  todos.map((item) => {
    if(item.id === id) {
      res.status(200).json(item);
      return
    }
  })
  res.status(404).json({message: "Sorry!! Unable to find the requested todo."})
})

// 3. POST /todos - Create a new todo item
// Description: Creates a new todo item.
// Request Body: JSON object representing the todo item.
// Response: 201 Created with the ID of the created todo item in JSON format. eg: {id: 1}
// Example: POST http://localhost:3000/todos
// Request Body: { "title": "Buy groceries", "completed": false, description: "I should buy groceries" }
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

// http server port listen
app.listen(3000)
