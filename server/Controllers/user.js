import { User } from "../Model/User.js";

export const list = async (req, res) => {
  try {
    const user = await User.find({})
      .select("-password")
      .select("-confirmPassword") //ไม่เอา password ไม่ส่งไป
      .exec();
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("server error");
  }
};

export const changeRole = async (req, res) => {
  try {
    const { id, role } = req.body.data;
    //หา id ด้วย id & update role ด้วย role ที่ส่งมา
    const user = await User.findOneAndUpdate(
      { _id: id },
      { role: role },
      { new: true }
    )
      .select("-password")
      .exec();
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("server error");
  }
};

export const remove = async (req, res) => {
  try {
    const id = req.params.id;
    console.log("id remove", id);
    const removed = await User.findOneAndDelete({ _id: id }).exec();
    res.send(removed);
  } catch (err) {
    console.log(err);
    res.status(500).send("server error");
  }
};
