const express = require("express");
const router = express.Router();
const Conversation = require("../models/Conversation.js");

// new conversation

router.post("/", async (req, res) => {
  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.recieverId],
  });
  try {
    const savedConversation = await newConversation.save();
    res.json(savedConversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get conversation with a user

router.get("/:userId", async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] },
    });
    res.json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
