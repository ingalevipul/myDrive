const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
// Test route
router.get("/test", (req, res) => {
  res.send("hello user route");
});

// Register route (GET)
router.get("/register", (req, res) => {
  res.render("register.ejs");
});

// Register route (POST)
router.post(
  "/register",
  // Validation rules
  body("name")
    .trim()
    .isLength({ min: 5 })
    .withMessage("Name must be at least 5 characters long"),
  body("email").trim().isEmail().withMessage("Invalid email format"),
  body("password").isLength({ min: 8 }),
  async (req, res) => {
    var result = validationResult(req);
    if (result.isEmpty()) {
      // Proceed with the registration logic (e.g., save user to DB)

      const { name, email, password } = req.body;
      const hashPassword = await bcrypt.hash(password,1);
      const newUser = await userModel.create({
        name,
        email,
        password: password
      });

      res.json(newUser);
    } else {
      // Return validation errors
      res.status(400).send({ errors: result.array() });
    }
  }
);
router.get("/login", (req, res) => {
  res.render("login.ejs");
});

router.post(
  "/login",
  // Validation rules
  body("name").trim().isLength({ min: 3 }).withMessage("Invalid email format"),
  body("password").trim().isLength({ min: 8 }).withMessage("Password is required"),
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).send({ errors: result.array() });
    } else {
      const { name, password } = req.body;

      const user = await userModel.findOne({ name: name });
      console.log(user)
      if (!user) {
        return res
          .status(400)
          .json({ message: "username or password incorrect" });
      }
  
      
    const checkHash = await bcrypt.compare(password,user.password);
      console.log(checkHash)
     //if (!checkHash) {
       // return res
         // .status(400)
          //.json({ message: "username or password incorrect" });
     // }

     if( !user.password==password)
     {
return res.status(400).json({message:"username or password incorrect"})
     }
      console.log('check point 1')
      const token = jwt.sign(
        { userId: user._id, userName: user.name },
        process.env.JWT_SECRET
      );


      res.cookie('token',token)

      res.send('logged in')
    }
  }
);

module.exports = router;
