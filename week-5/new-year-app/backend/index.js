const express = require("express");
const { updateTodo, createTodo } = require("./types");
const { todo } = require("./db");
const app = express();
app.use(express.json());

app.post("/todo", async function (req, res) {
  const createPayload = req.body;
  const parsedPayload = createTodo.safeParse(createPayload);
  if (!parsedPayload.success) {
    res.status(411).json({
      msg: "You sent the wrong inputs!",
    });
    return;
  }
  // put it in mongodb
  const todoCreated = await todo.create({
    title: createPayload.title,
    description: createPayload.description,
  });
  if (!todoCreated) {
    return res.status(400).json({
      message: "Fail to create Todo!!1",
    });
  }
  res.status(200).json({
    message: "Created Todo Successfully!!",
  });
});
app.get("/todos", async function (req, res) {
  const todos = await todo.find();
  if (!todo) {
    return res.status(400).json({
      message: "Unable to find Todos!",
    });
  }
  res.status(200).json({ todos });
});
app.put("/completed", async function (req, res) {
  const updatePayload = req.body;
  const parsedPayload = updateTodo.safeParse(updatePayload);
  if (!parsedPayload.success) {
    res.status(411).json({
      msg: "You sent the wrong inputs!!",
    });
    return;
  }
  // put it in mongodb
  const updateTodo = await todo.update(
    {
      _id: req.body.id,
    },
    {
      completed: true,
    }
  );
  if (!updateTodo) {
    return res.status(400).json({
      message: "Unable to update Todo",
    });
  }
  res.status(200).json({
    message: "Todo Updated successfully!!",
  });
});
app.delete("/delete", function (req, res) {});

app.listen(3000);
