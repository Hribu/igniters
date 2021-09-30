//IMPORT PACKAGES AND USER MODEL
const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const bcrypt = require("bcrypt");
const saltRounds = process.env.SALT || 10;

//DELETE USER
router.get("/:id/delete", (req, res) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    res.status(400).json({
      message: "Specified id is not valid",
    });
    return;
  }

  User.findByIdAndRemove(userId)
    .then(() =>
      res.json({
        message: `Project with ${userId} is removed successfully.`,
      })
    )
    .catch((error) => res.json(error));
});

//EDIT USER
router.put("/:id/edit", (req, res) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    res.status(400).json({
      message: "Specified id is not valid",
    });
    return;
  }

  const { name, email, password } = req.body;

  if (
    !name ||
    name === "" ||
    !password ||
    password === "" ||
    !email ||
    email === "" ||
    !email.includes("@")
  ) {
    res.status(400).json({
      message: "Specified id is not valid",
    });
    return;
  }

  const salt = bcrypt.genSaltSync(saltRounds);
  const hashPassword = bcrypt.hashSync(password, salt);

  User.findByIdAndUpdate(userId, {
    name,
    email,
    password: hashPassword,
  })
    .then((updatedUser) => res.json(updatedUser))
    .catch((error) => {
      console.log("User not updated", error);
      res.json(error);
    });
});

//THIS GET METHOD DISPLAYS PROFILE
router.get("/:id", (req, res) => {
  User.findById(req.params.id)
    // User.findById(req.session.currentUser._id)
    .then((user) => {
      // Send back the object with user data
      res.status(200).json(user);
    })
    .catch((err) => res.json(err));
});

module.exports = router;
