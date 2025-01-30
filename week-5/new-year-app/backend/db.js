const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://sahunitin970:Lee4OazR3af4oaMc@mern-blog.eafjsnv.mongodb.net/todos"
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
