const mongoose = require("mongoose");
mongoose.connect(
 process.env.DB_URL
);
const todoSchema = mongoose.Schema({
  title: String,
  description: String,
  completed: Boolean
})

const todo = mongoose.model("Todos", todoSchema);
module.exports = {
  todo
}
