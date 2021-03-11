require("dotenv").config();
const User = require("../models/userModel");
const Confirm = require("../models/confirmModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

module.exports = {
  register: async (req, res) => {
    try {
      const { email, password, passwordCheck, displayName } = req.body;
      console.log("email is",email);

      if (!email || !password || !passwordCheck || !displayName) {
        return res
          .status(400)
          .json({ msg: "Not all fields have been entered" });
      }

      if (passwordCheck.length < 8) {
        return res.status(400).json({ msg: "You need a longer password" });
      }

      if (password !== passwordCheck) {
        return res
          .status(400)
          .json({ msg: "password does not match the password check" });
      }

      const existingUser = await User.findOne({ email: email });

      if (existingUser) {
        return res.status(400).json({ msg: "User already exists" });
      }
  
      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(password, salt);
  

      const newUser = new User({
        email: email,
        password: passwordHash,
        displayName: displayName
      });

    
      const confirmToken = new Confirm({
        userID: newUser._id,
        token: crypto.randomBytes(16).toString("hex")
      });
      console.log("gnerated token", confirmToken, "user", newUser )

   
      //contains configuration to authenticate to the mail service
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "kw.mern@gmail.com",
          pass: process.env.EPASS,
        },
      });
      
      // compost the mail from message
      const mailMessage = {
        from: "kw.mern@gmail.com",
        to: newUser.email,
        subject: "Confirm your account",
        text:
          "Thanks for signing up! Confirm your account here: \n https://bookmarker-kw.herokuapp.com/confirm_account/" +
          confirmToken.token,
      };    
      
      //actually send the message
      transporter.sendMail(mailMessage, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
      
      //wait for comfirmation before creating the user
    
      console.log('confirm token', confirmToken)
      await confirmToken.save();
      const savedUser = await newUser.save();
      res.json(savedUser);
    } catch (err) {
      console.log('it an error on saves');
      res.status(500).json({ msg: err });
    }
  },
  

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        res.status(400).json({ msg: "all required fields were not sent" });
      }

      const user = await User.findOne({ email: email });

      if (!user) {
        res.status(400).json({ msg: "User downs exist" });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        res.status(400).json({ msg: "this was an incorrect password" });
      }

      if (!user.confirmed)
      return res.json({ token: null, user: { confirmed: user.confirmed } });

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });

      res.json({
        token,
        user: { id: user._id, confirmed: user.confirmed, displayName: user.displayName, email: user.email, },
      });
    } catch (err) {
      res.status(500).json({ msg: err });
    }
  },

  tokenIsValid: async (req, res) => {
    try {
      const token = req.header("x-auth-token");
      if (!token) return res.json(false);
  
      const verified = jwt.verify(token, process.env.JWT_SECRET);
      if (!verified) return res.json(false);
  
      const user = await User.findById(verified.id);
      if (!user) return res.json(false);
  
      return res.json(true);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  

  auth: async (req, res) => {
    const user = await User.findById(req.user);
    if (!user.confirmed) {
      res.json({ confirmed: user.confirmed });
    } else {
      res.json({
        email: user.email,
        displayName: user.displayName,
        id: user._id,
        confirmed: user.confirmed,
      });
    }
  },

  getUser: async (req, res) => {
    try {
      const user = await User.findById(req.user);

      res.json({
        displayName: user.displayName,
        id: user._id,
      });
    } catch (err) {
      res.send(err.response);
    }
  }
};
