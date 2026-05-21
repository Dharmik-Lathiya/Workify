const asyncHandler = require('../utils/asyncHandler');
const User = require('../models/UserSchema');
const Client = require('../models/ClientSchema');

// @desc    Add a new chat
// @route   POST /api/chats
// @access  Private
const addChat = asyncHandler(async (req, res) => {
  const { userId, clientId, reciverid, recivermodel, model, chatId } = req.body;
  
  const senderId = userId || clientId;
  const senderModel = userId ? 'users' : 'client';
  const SenderModelClass = userId ? User : Client;

  // Add chat to sender
  await SenderModelClass.updateOne(
    { _id: senderId },
    { $push: { chats: { reciverid, reciverModel: recivermodel, chatid: chatId } } }
  );

  // Add chat to receiver
  const ReceiverModelClass = recivermodel === 'users' ? User : Client;
  await ReceiverModelClass.updateOne(
    { _id: reciverid },
    { $push: { chats: { reciverid: senderId, reciverModel: senderModel, chatid: chatId } } }
  );

  res.status(200).json({ success: true, message: "Chat added successfully" });
});

// @desc    Get user chats
// @route   POST /api/chats/get
// @access  Private
const getChats = asyncHandler(async (req, res) => {
  const { id, type } = req.body;

  const model = type === 'developer' || type === 'user' ? User : Client;
  const user = await model.findById(id).populate('chats.reciverid', 'firstName lastName username email photo');

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  res.json({ success: true, data: user.chats });
});

module.exports = { addChat, getChats };
