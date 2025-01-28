const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db");
const router = Router();

// Admin Routes
router.post("/signup", async (req, res) => {
  // Implement admin signup logic
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res.status(400).json({ message: "Username or password missing" });
  }
  // check if the username from this username is already exists.
  const adminExists = await Admin.findOne({ username });
  console.log(adminExists);
  if (adminExists) {
    return res.status(400).json({ message: "Admin already exists" });
  }
  const admin = await Admin.create({ username: username, password: password });
  if (admin) {
    return res.status(201).json({ message: "Admin created successfully" });
  }
});

router.post("/courses", adminMiddleware, async (req, res) => {
  // Implement course creation logic
  const title = req.body.title;
  const description = req.body.description;
  const price = req.body.price;
  const imageLink = req.body.imageLink;

  const course = await Course.create({ title, description, price, imageLink });
  if (course) {
    return res
      .status(201)
      .json({ message: "Course created successfully", courseId: course._id });
  } else {
    return res.status(400).json({ message: "Course creation failed" });
  }
});

router.get("/courses", adminMiddleware, async (req, res) => {
  // Implement fetching all courses logic
  await Course.find().then(function (courses) {
    res.status(200).json(courses);
  });
});

module.exports = router;
