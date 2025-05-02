import { User } from "../Model/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    //1.check user
    const { name, password, confirmPassword } = req.body;

    var user = await User.findOne({ name });
    if (user) {
      return res.status(400).json({ error: "User already exists" });
    } else if (name.length <= 3) {
      return res
        .status(400)
        .json({ error: "Username must be more than 3 characters" });
    } else if (password.length <= 3) {
      return res
        .status(400)
        .json({ error: "Password must be more than 3 characters" });
    }
    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ error: "Password not match. Please try again" });
    }

    //2.encrypt password
    const salt = await bcrypt.genSalt(10);
    user = new User({
      //อันนี้ต้องตรงตาม schema
      name,
      password,
      confirmPassword,
    });
    user.password = await bcrypt.hash(password, salt);
    user.confirmPassword = await bcrypt.hash(confirmPassword, salt);

    //3.save to db
    await user.save();
    res.send("User created successfully !! Redirecting to login page");
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    //1.check user
    const { name, password } = req.body;
    var user = await User.findOneAndUpdate({ name }, { new: true });
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: "Invalid user or password" });
      }

      //2.Payload
      var payload = {
        user: {
          user: user.name,
          role: user.role,
        },
      };

      //3.generate token
      jwt.sign(payload, "jwtSecret", { expiresIn: "1d" }, (err, token) => {
        if (err) throw err;
        res.json({ token, payload });
      });
    } else {
      return res.status(400).json({ error: "User not found !!" });
    }
    // res.send("Login successfully");
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

export const loginLine = async (req, res) => {
  try {
    const { userId, displayName, pictureUrl } = req.body;

    var data = {
      name: userId,
      displayName: displayName,
      picture: pictureUrl,
    };
    var user = await User.findOneAndUpdate({ name: userId }, { new: true });
    if (user) {
      console.log("user updated !!");
    } else {
      user = new User(data);
      await user.save();
    }
    //2.Payload
    var payload = {
      user: {
        user: user.name,
        role: user.role,
        displayName: user.displayName,
      },
    };

    // 3.generate token
    jwt.sign(payload, "jwtSecret", { expiresIn: "1d" }, (err, token) => {
      if (err) throw err;

      res.json({ token, payload });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

export const loginFacebook = async (req, res) => {
  try {
    const { userID, name, email } = req.body;

    var data = {
      name: userID,
      displayName: name,
      email: email,
    };
    var user = await User.findOneAndUpdate({ name: userID }, { new: true });
    if (user) {
      console.log("user updated !!");
    } else {
      user = new User(data);
      await user.save();
    }
    //2.Payload
    var payload = {
      user: {
        user: user.name,
        role: user.role,
        displayName: user.displayName,
      },
    };

    // 3.generate token
    jwt.sign(payload, "jwtSecret", { expiresIn: "1d" }, (err, token) => {
      if (err) throw err;

      res.json({ token, payload });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

export const currentUser = async (req, res) => {
  try {
    const user = await User.findOne({ name: req.user.user })
      .select("-password") //ไม่เอา password ไม่ส่งไป
      .exec();
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("server error");
  }
};
