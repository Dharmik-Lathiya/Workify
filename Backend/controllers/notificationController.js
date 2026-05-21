const asyncHandler = require('../utils/asyncHandler');
const User = require('../models/UserSchema');
const Client = require('../models/ClientSchema');

// @desc    Add a new notification
// @route   POST /api/notifications
// @access  Private
const addNotification = asyncHandler(async (req, res) => {
  const { userId, clientId, reciverid, recivermodel, model, notificationType, content, role } = req.body;
  
  const senderId = userId || clientId;
  const senderModel = userId ? 'users' : 'client';
  const SenderModelClass = userId ? User : Client;

  // Add notification to sender (if needed, original code does this)
  await SenderModelClass.updateOne(
    { _id: senderId },
    { $push: { notifications: { reciverid, reciverModel: recivermodel, notificationType, content, role } } }
  );

  // Add notification to receiver
  const ReceiverModelClass = recivermodel === 'users' ? User : Client;
  await ReceiverModelClass.updateOne(
    { _id: reciverid },
    { $push: { notifications: { reciverid: senderId, reciverModel: model, notificationType, content } } }
  );

  res.status(200).json({ success: true, message: "Notification added successfully" });
});

// @desc    Get user notifications
// @route   POST /api/notifications/get
// @access  Private
const getNotifications = asyncHandler(async (req, res) => {
  const { id, type } = req.body;

  const model = (type === 'developer' || type === 'user' || type === true) ? User : Client;
  const user = await model.findById(id).populate('notifications.reciverid', 'firstName lastName username email photo');

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  res.json({ success: true, data: user.notifications });
});

module.exports = { addNotification, getNotifications };
