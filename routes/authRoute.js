const express = require("express");
const router = express.Router();
const {
  userSignIn,
  userLogIn,
  findOneUser,
  updateUser
} = require("../controller/auth/authController");

router.post("/signin", (req, res) => {
  userSignIn(req, res, req.body);
});

router.post("/login", (req, res) => {
  userLogIn(req, res, req.body);
});

router.get("/user/:id", (req, res) => {
  findOneUser(req, res, req.params.id);
});

router.post("/update-user", (req, res) => {
  updateUser(req, res, req.body);
});

module.exports = router;
