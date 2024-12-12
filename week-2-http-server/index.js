const app = require('express')();
app.use(require('express').json());

const user = [{
  name: "Nitin Sahu",
  kidney: {
    healthy: false,
  }
}]
app.get('/', (req, res) => res.send("Hello World!"));
app.listen(3001)
