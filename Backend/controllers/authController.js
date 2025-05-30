import { User } from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

//@desc Register
//@route POST /api/auth/register

const registerUser = async (req, res) => {
  try {
    const { name, email, pwd, profilePicUrl, adminInviteToken } = req.body;

    //if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ msg: "User exists" });
    }

    //user role
    let role = "member";
    if (
      adminInviteToken &&
      adminInviteToken == process.env.ADMIN_INVITE_TOKEN
    ) {
      role = "admin";
    }

    //Hash Pwd
    const salt = await bcrypt.genSalt(10);
    const hashedPwd = await bcrypt.hash(pwd, salt);

    //New User
    const user = await User.create({
      name,
      email,
      pwd: hashedPwd,
      profilePicUrl,
      role,
    });

    //Return user
    res.status(201).json({
      name: user.name,
      _id: user.id,
      email: user.email,
      role: user.role,
      profilePicUrl: user.profilePicUrl,
      token: generateToken(user._id),
    });
  } catch (err) {
    res.status(500).json({ msg: "Server error", err: err.message });
  }
};

//Login
const loginUser = async (req, res) => {
  try {
    const { email, pwd } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ msg: "Invalid email or password" });
    }

    //Verify Pwd
    const isMatch = await bcrypt.compare(pwd, user.pwd);
    if (!isMatch) {
      return res.status(401).json({ msg: "Invalid email or password" });
    }

    //user data

    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      profilePicUrl: user.profilePicUrl,
      token: generateToken(user._id),
    });
  } catch (err) {
    res.status(500).json({ msg: "Server error", err: err.message });
  }
};

//Profile
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-pwd");
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.json({ user });
  } catch (err) {
    res.status(500).json({ msg: "Server error", err: err.message });
  }
};

//Update
const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.pwd) {
      const salt = await bcrypt.genSalt(10);
      user.pwd = await bcrypt.hash(req.body.pwd, salt);
    }

    const updatedUser = await user.save();
    res.json({
      _id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      token: generateToken(updatedUser._id),
    });
  } catch (err) {
    res.status(500).json({ msg: "Server error", err: err.message });
  }
};

export { registerUser, loginUser, getUserProfile, updateUserProfile };
