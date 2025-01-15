const express = require('express');
const app = express();
app.use(express.json());
// app.get('/health-checkup', function(req, res)  {
//   // do health checks here
//   const kidneyId = req.query.kidneyId;
//   const username = req.headers.username;
//   const password = req.headers.password;

//   if(!(username === "nitin" &&  password === "pass")) {
//     res.status(400).json({"message": "Something up with your inputs!!"});
//     return;
//   }
//   if(kidneyId != 1 && kidneyId != 2) {
//     res.status(400).json({"message": "Somethings up with your inputs"});
//     return;
//   }
//   res.json({message: "Your kidney is fine!!"})
// })

// app.get('/health-checkup', function(req, res, next) {
//   console.log('Request 1');
//   // next();
// }, function(req, res, next) {
//   console.log("Request 2")
// })

// function userMiddleware(req, res, next) {
//   if(username != "nitin" && password != "pass") res.status(403).json({message: "Incorrect Inputs",})
//   else next();
// }
// function kidneyMiddleware(req, res, next) {
//   if(kidneyId != 1 || kidney != 2) res.status(403).json({message: "Incorrect inputs"});
//   else next();
// }
// app.get("/health-checkup", userMiddleware, kidneyMiddleware, function(req, res) {
//   // do something with kidney here
//   res.send("Your heart is healthy");
// })
// app.get("/kidney-check", userMiddleware, kidneyMiddlewarff e, function(req, res) {
//   // do something with kidney here
//   res.send("kidney is fine!")
// })

// let requestCount = 0;
// function calculateRequests(req, res, next) {
//   if(requestCount > 5) {
//     res.status(429).json({ 
//       "Number of request": requestCount,
//       "Rate Limitation status": true}
//     );
//     return;
//   } else {
//     if(requestCount <= 5) requestCount++;
//     next();
//   }
// }
// app.use(calculateRequests)
// const start = process.hrtime();
// app.get("/health-checkup", function(req, res) {
//   res.status(200).json({
//     "Number of request": requestCount,
//     "Rate Limitation status": false
//   }) 
// })

function userMiddleware(req, res, next) {
  const username = req.headers.username;
  const password = req.headers.password;
  if(username != "nitin" && password != "pass") res.status(403).json({message: "Incorrect Inputs",})
  else next();
}
function kidneyMiddleware(req, res, next) {
  const kidneyId = req.query.kidneyId;
  if(kidneyId != 1 || kidneyId != 2) res.status(403).json({message: "Incorrect inputs"});
  else next();
}

app.get("/health-checkup", userMiddleware, kidneyMiddleware, function(req, res) {
  // do something with kidney here
  res.send("Your heart is healthy");
});
app.get("/kidney-check", userMiddleware, kidneyMiddleware, function(req, res) {
  // do something with kidney here
  res.send("kidney is fine!")
});

app.listen(3000)
