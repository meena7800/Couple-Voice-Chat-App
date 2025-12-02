const User = require("../models/User");

exports.creditDiamonds = async (req, res) => {
  try {
    const { userId, diamonds } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    user.diamonds += Number(diamonds);
    await user.save();

    res.json({ success: true, diamonds: user.diamonds });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.requestPayout = async (req, res) => {
  try {
    // आप बाद में इसको पूरा payout system बना सकते हो
    res.json({
      success: true,
      message: "Payout request received"
    });

  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
