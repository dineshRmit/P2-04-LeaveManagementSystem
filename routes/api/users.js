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
  //find if the manager in the req exists
  User.findOne({ email: req.body.toEmail }).then((user) => {
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
      return res.status(404).json({ accountDeactivated: "Account not active" });
    } else {
      // Check password
      bcrypt.compare(password, user.password).then((isMatch) => {
        if (isMatch) {
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

// @route POST api/users/updateLeaveStatus
// @desc Updates leave request status field
// @access Public
router.post("/updateLeaveStatus", (req, res) => {
  console.log(req.body);
  const id = req.body.id;
  const status = req.body.status;

  Leaves.findByIdAndUpdate({ _id: id }, { status: status }).then((leave) => {
    // Check if user exists
    if (!leave) {
      return res.status(404).json({ leaveNotFound: "Leave does not exist" });
    } else {
      return res.json(leave);
    }
  });
});

//Update annual leave balance
router.post("/updateAnnualLeaveBalance", (req, res) => {
  const email = req.body.userEmail;
  const updatedLeaveBalanceHours = req.body.leaveBalanceHours;

  User.findOneAndUpdate({ email }, { annualLeave: updatedLeaveBalanceHours }).then((user) => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    } else {
      return res.json(user);
    }
  });
});

//Update carers leave balance
router.post("/updateCarersLeaveBalance", (req, res) => {
  const email = req.body.userEmail;
  const updatedLeaveBalanceHours = req.body.leaveBalanceHours;

  User.findOneAndUpdate({ email }, { carersLeave: updatedLeaveBalanceHours }).then((user) => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    } else {
      return res.json(user);
    }
  });
});

//Update blood donor leave balance
router.post("/updateBloodDonorLeaveBalance", (req, res) => {
  const email = req.body.userEmail;
  const updatedLeaveBalanceHours = req.body.leaveBalanceHours;

  User.findOneAndUpdate({ email }, { bloodDonorLeave: updatedLeaveBalanceHours }).then((user) => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    } else {
      return res.json(user);
    }
  });
});

//Update SickLeaveWC leave balance
router.post("/updateSickLeaveWCBalance", (req, res) => {
  const email = req.body.userEmail;
  const updatedLeaveBalanceHours = req.body.leaveBalanceHours;

  User.findOneAndUpdate({ email }, { sickLeaveWC: updatedLeaveBalanceHours }).then((user) => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    } else {
      return res.json(user);
    }
  });
});

//Update SickLeaveWOC leave balance
router.post("/updateSickLeaveWOCBalance", (req, res) => {
  const email = req.body.userEmail;
  const updatedLeaveBalanceHours = req.body.leaveBalanceHours;

  User.findOneAndUpdate({ email }, { sickLeaveWOC: updatedLeaveBalanceHours }).then((user) => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    } else {
      return res.json(user);
    }
  });
});

//Update Parental Leave leave balance
router.post("/updateParentalLeaveBalance", (req, res) => {
  const email = req.body.userEmail;
  const updatedLeaveBalanceHours = req.body.leaveBalanceHours;

  User.findOneAndUpdate({ email }, { parentalLeave: updatedLeaveBalanceHours }).then((user) => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    } else {
      return res.json(user);
    }
  });
});

//Update UnpaidLeave leave balance
router.post("/updateUnpaidLeaveBalance", (req, res) => {
  console.log("printing req.body");
  console.log(req.body);
  console.log(req.body.newLeaveBalanceHours);
  const email = req.body.userEmail;
  const updatedLeaveBalanceHours = req.body.leaveBalanceHours;

  User.findOneAndUpdate({ email }, { unpaidLeave: updatedLeaveBalanceHours }).then((user) => {
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
router.get("/getUserDetails/:userEmail", (req, res) => {
  console.log("displaying req,params in userEmail");
  console.log(req.params);
  const email = req.params.userEmail;

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
router.get("/getLeaveRequest/:managerEmail", (req, res) => {
  console.log("Displaying req.params");
  console.log(req.params);
  const managerEmail = req.params.managerEmail;

  Leaves.find({ toEmail: managerEmail }).then((leaveRequest) => {
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
  var ObjectId = req.body.id;
  const leaveRequestStatus = req.body.status;

  Leaves.findOneAndUpdate({ _id: ObjectId }, { status: leaveRequestStatus }).then((leaveRequest) => {
    // Check if user exists
    if (!leaveRequest) {
      return res.status(404).json({ noRequestExists: "Leave Request does not exists" });
    } else {
      return res.json(leaveRequest);
    }
  });
});
module.exports = router;
