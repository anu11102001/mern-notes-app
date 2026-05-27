const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const User = require("./models/User");
const Note = require("./models/Note");

const app = express();


// Middleware

app.use(cors());
app.use(express.json());


// MongoDB

mongoose.connect(process.env.MONGO_URI)

.then(() => {
  console.log("✅ MongoDB Connected");
})

.catch((err) => {
  console.log(err);
});


// ================= REGISTER =================

app.post("/register", async (req, res) => {

  try {

    const { username, password } = req.body;

    const existingUser =
      await User.findOne({ username });

    if (existingUser) {

      return res.status(400).json({
        message: "User already exists"
      });

    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const newUser = new User({

      username,

      password: hashedPassword

    });

    await newUser.save();

    res.json({
      message: "Registration Successful"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });

  }

});


// ================= LOGIN =================

app.post("/login", async (req, res) => {

  try {

    const { username, password } = req.body;

    const user =
      await User.findOne({ username });

    if (!user) {

      return res.status(400).json({
        message: "User not found"
      });

    }

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {

      return res.status(400).json({
        message: "Wrong password"
      });

    }

    const token = jwt.sign(

      { id: user._id },

      process.env.JWT_SECRET,

      { expiresIn: "1d" }

    );

    res.json({

      token,

      username: user.username

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });

  }

});


// ================= GET NOTES =================

app.get("/notes", async (req, res) => {

  try {

    const token =
      req.headers.authorization;

    const decoded =
      jwt.verify(
        token,
        process.env.JWT_SECRET
      );

    const notes =
      await Note.find({
        userId: decoded.id
      });

    res.json(notes);

  } catch (error) {

    res.status(401).json({
      message: "Invalid Token"
    });

  }

});


// ================= ADD NOTE =================

app.post("/notes", async (req, res) => {

  try {

    const token =
      req.headers.authorization;

    const decoded =
      jwt.verify(
        token,
        process.env.JWT_SECRET
      );

    const note = new Note({

      userId: decoded.id,

      text: req.body.text

    });

    await note.save();

    res.json(note);

  } catch (error) {

    res.status(401).json({
      message: "Invalid Token"
    });

  }

});


// ================= DELETE NOTE =================

app.delete("/notes/:id", async (req, res) => {

  try {

    await Note.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Note Deleted"
    });

  } catch (error) {

    res.status(500).json({
      message: "Server Error"
    });

  }

});


// ================= SERVER =================

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log(
    ` Server Running on Port ${PORT}`
  );

});