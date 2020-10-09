const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load User model
const User = require("../../models/User");

//Load Leave model
const Leaves = require("../../models/Leaves");

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        userType1: req.body.userType1,
        userType2: req.body.userType2,
        userType3: req.body.userType3,
      });

      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

// @route POST api/users/applyLeave
// @desc Register user
// @access Public
router.post("/applyLeave", (req, res) => {
  console.log(req.body.toEmail);
  //find if the manager in the req exists
  User.findOne({ email: req.body.toEmail }).then((user) => {
    console.log(user);
    if (!user) {
      return res.status(404).json({ emailNotFound: "Email not found" });
    } else if (user.isAccountActive == false) {
      return res.status(404).json({ accountDeactivated: "Manager account not active" });
    } else if (user.userType1 !== "manager") {
      return res.status(404).json({ accountDeactivated: "Not a valid manager account" });
    } else {
      //Create a new leave

      const newLeave = new Leaves({
        name: req.body.name,
        fromEmail: req.body.fromEmail,
        toEmail: req.body.toEmail,
        fromDate: req.body.fromDate,
        toDate: req.body.toDate,
        leaveType: req.body.leaveType,
        comments: req.body.comments,
      });

      newLeave
        .save()
        .then((leave) => res.json(leave))
        .catch((err) => console.log(err));
    }
  });
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
  // Form validation

  const { errors, isValid } = validateLoginInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then((user) => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    } else if (user.isAccountActive == false) {
      console.log("Account deactivated");
      return res.status(404).json({ accountDeactivated: "Account not active" });
    } else {
      // Check password
      bcrypt.compare(password, user.password).then((isMatch) => {
        if (isMatch) {
          console.log(" seeing inside payload");
          console.log(user.isAccountActive);
          console.log(user);
          const payload = {
            id: user.id,
            name: user.name,
            email: user.email,
            userType1: user.userType1,
            userType2: user.userType2,
            userType3: user.userType3,
            leave: {
              annualLeave: user.annualLeave,
              carersLeave: user.carersLeave,
              bloodDonorLeave: user.bloodDonorLeave,
              sickLeaveWC: user.sickLeaveWC,
              sickLeaveWOC: user.sickLeaveWOC,
              parentalLeave: user.parentalLeave,
              unpaidLeave: user.unpaidLeave,
            },
          };
          // Sign token
          jwt.sign(
            payload,
            keys.secretOrKey,
            {
              expiresIn: 31556926, // 1 year in seconds
            },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token,
              });
            }
          );
        } else {
          return res.status(400).json({ passwordincorrect: "Password incorrect" });
        }
      });
    }
  });
});

// @route POST api/users/updateUser
// @desc Updates user's active field
// @access Public
router.post("/updateUser", (req, res) => {
  const email = req.body.email;
  const status = req.body.isAccountActive;

  User.findOneAndUpdate({ email }, { isAccountActive: status }).then((user) => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    } else {
      return res.json(user);
    }
  });
});

// @route POST api/users/getUserDetails
// @desc Gets users info
// @access Public
router.get("/getUserDetails", (req, res) => {
  const email = req.body.email;

  User.findOne({ email }).then((user) => {
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    } else {
      return res.json(user);
    }
  });
});

// @route GET api/users/getLeaveRequest
// @desc Get Leave request list for a manager
// @access Public
router.get("/getLeaveRequest", (req, res) => {
  const toEmail = req.body.managerEmail;

  Leaves.findOne({ toEmail }).then((leaveRequest) => {
    if (!leaveRequest) {
      return res.status(404).json({ noRequestExists: "No Leave request to display" });
    } else {
      return res.json(leaveRequest);
    }
  });
});

// @route POST api/users/updateLeaveRequest
// @desc Get Leave request list for a manager
// @access Public
router.post("/updateLeaveRequest", (req, res) => {
  const _id = req.body.id;
  const leaveRequestStatus = req.body.status;

  User.findOneAndUpdate({ _id }, { status: leaveRequestStatus }).then((leaveRequest) => {
    // Check if user exists
    if (!leaveRequest) {
      return res.status(404).json({ noRequestExists: "Leave Request does not exists" });
    } else {
      return res.json(leaveRequest);
    }
  });
});

module.exports = router;
