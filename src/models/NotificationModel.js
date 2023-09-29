import mongoose from "mongoose";

const LikeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  nft: { type: mongoose.Schema.Types.ObjectId, ref: "NFT" },
  // Other Like-related information
});

// Define a compound index on multiple fields in the Favorite collection
LikeSchema.index({ user: 1, nft: 1 });

const NotificationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  message: String,
  notificationDate: Date,
  isRead: Boolean,
  // Other notification-related information
});

// Define indexes for the 'user' and 'notificationDate' fields in the Notification collection
NotificationSchema.index({ user: 1, notificationDate: -1 }); // Descending index on 'notificationDate'

const LikeModel = mongoose.model("Like", LikeSchema);
const NotificationModel = mongoose.model("Notification", NotificationSchema);

export { LikeModel, NotificationModel };
