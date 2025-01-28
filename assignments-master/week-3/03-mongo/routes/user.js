const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");

// User Routes
router.post("/signup", async (req, res) => {
  // Implement user signup logic
  const username = req.body.username;
  const password = req.body.password;
  if (!username || !password) {
    return res.status(400).json({ message: "Username or password missing" });
  }
  const userExists = await User.findOne({ username });
  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }
  const user = await User.create({
    username,
    password,
  });
  if (user) {
    return res.status(201).json({ message: "User created successfully" });
  } else {
    return res.status(400).json({ message: "User creation failed" });
  }
});

router.get("/courses", async (req, res) => {
  // Implement listing all courses logic
  const response = await Course.find();
  if (response) {
    return res.status(200).json({ courses: response });
  } else {
    return res.status(400).json({ message: "No courses found" });
  }
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  // Implement course purchase logic
  const courseId = req.params.courseId;
  const username = req.headers.username;
  // Add the course to the user's purchasedCourses array
  const user = await User.updateOne(
    {
      username,
    },
    {
      $push: {
        purchasedCourses: courseId,
      },
    }
  );
  if (user) {
    return res.status(200).json({ message: "Course purchased successfully" });
  } else {
    return res.status(400).json({ message: "Course purchase failed" });
  }
});

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
  // Implement fetching purchased courses logic
  const username = req.headers.username;
  const user = await User.findOne({ username });
  if (user) {
    const purchasedCourses = await Course.find({
      _id: { $in: user.purchasedCourses },
    });
    return res.status(200).json({ purchasedCourses });
  } else {
    return res.status(400).json({ message: "No purchased courses found" });
  }
});

module.exports = router;
