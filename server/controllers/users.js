import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    // gets at most one user because email is unique
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({
        message: `User with email: ${email} doesn't exist`,
      });
    }

    // if user does exist, we need to check whether the password matches or not
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    /* if we bypass both the conditions above, that means that we have a correct user logging in
        in which case, we will create and send the jwt to the client
    */
    const token = jwt.sign(
      {
        email: existingUser.email,
        id: existingUser._id,
      },
      process.env.SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      result: existingUser,
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: `Something went wrong. ${error}`,
    });
  }
};

export const signUp = async (req, res) => {};
