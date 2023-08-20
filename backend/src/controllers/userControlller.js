const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "kpeworld",
  api_key: "455414113895392",
  api_secret: "7kNNkfb8SJz-Pr4Jwl8xSbEYVX0",
});

const userCreate = async (req, res) => {
  try {
    let { email, password, username} = req.body;
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(409).send({ error: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      email,
      password: hashedPassword,
      username,
    });
    await newUser.save();
    return res.status(201).send({ message: "User registered successfully" });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).send({ error: "Server error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
 
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send({ error: "Invalid credentials" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send({ error: "Invalid credentials" });
    }
    const token = jwt.sign({ userId: user._id }, "key", {
      expiresIn: "1h",
    });
    return res.status(200).send({ message: "Login successful", token: token , user: user._id});
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).send({ error: "Server error" });
  }
};
const userUpdate = async (req, res) => {
  try {
    let profile;
    let updatedUser
    if (req.files == null) {
      updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            email: req.body.email,
            username: req.body.username,
          profile: req.body.profile
          },
        },
        { new: true }
      );
      return res.status(200).send(updatedUser);
    }
    if (req.files?.profile) {
      await cloudinary.uploader.upload(
        req.files.profile.tempFilePath,
        async (err, result) => {
          profile = result.url;
        }
      );
      updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            email: req.body.email,
            username: req.body.username,
            profile: profile,
          },
        },
        { new: true }
      );
      return res.status(200).send(updatedUser);
    }
   
   
    if (!updatedUser) {
      return res.status(404).send({ error: "User not found" });
    }
   
  } catch (error) {
    console.error("Updating user error:", error);
    return res.status(500).send({ error: "Server error" });
  }
};

const userDelete= async function (req, res) {
  try {
    let id = req.params.id;
    let findUser = await User.findByIdAndDelete(id);
    if (findUser) {
      return res
        .status(200)
        .send({
          status: true,
          message: "User Delete Successfully",
          data: findUser,
        });
    } else
      return res
        .status(400)
        .send({
          status: false,
          message:
            "Id not present in db,  Its deleted OR wrong Please try another id",
          data: null,
        });
  } catch (err) {
    return res.status(500).send({ status: false, msg: err.message });
  }
};
 
const findUserById = async (req, res) => {
  try {
    
    let user = req.user;
   
    const findUser = await User.find({ _id: user._id });
    if (!findUser) {
      return res.status(404).send({ msg: "User not found" });
    }

    return res.status(200).send(findUser);
  } catch (error) {
    console.error("Fetching user error:", error);
    return res.status(500).send({ msg: "Server error" });
  }
};

module.exports = { userCreate, userUpdate, login, userDelete, findUserById, };
