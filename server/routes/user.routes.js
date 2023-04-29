const express = require("express");
const User = require("../models/User");
const auth = require("../middleware/auth.middleware");
const router = express.Router({ mergeParams: true });

router.patch("/:userId", auth, async (req, res) => {
  try {
    // получить userId
    const { userId } = req.params;

    // userId === current user id
    if (userId === req.user._id) {
      //new:true нужно, чтобы получить updatedUser, когда все обновиться в БД(т.е. ждем)
      const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
        new: true,
      });
      res.send(updatedUser);
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    res.status(500).json({
      message: "На сервере произошла ошибкаю Попробуйте позже",
    });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const list = await User.find();
    // res.status(200).send(list); если статус 200, его можно не указывать(идет по умолчанию)
    res.send(list);
  } catch (error) {
    res.status(500).json({
      message: "На сервере произошла ошибкаю Попробуйте позже",
    });
  }
});

module.exports = router;
