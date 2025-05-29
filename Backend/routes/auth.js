const userModel = require("../models/user");
const router = require("express").Router();

router.get("/", async (req, res) => {
  try {
    const data = await userModel.find({});
    res.status(200).json({
      success: true,
      data: data,
    });
  } catch (err) {
    console.log(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const { url, password, username } = req.body;
    userModel.create({ url, password, username });
    res.status(200).json({
      success:true,
      message: "password saved successfully"
    })
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

router.delete("/", async (req, res) => {
  try {
    const { id } = req.body;
    const data = await userModel.deleteOne({ _id: id });
    if (data.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Password not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Password deleted successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

router.put("/", async (req, res) => {
  try {
    console.log("heyyllooo")
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
