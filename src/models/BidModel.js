import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
  fromUser: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  toUser: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  nft: { type: mongoose.Schema.Types.ObjectId, ref: "NFT" },
  transactionType: String,
  transactionDate: Date,
  // Other transaction-related information
});

// Define a compound index on multiple fields in the Transaction collection
TransactionSchema.index({ fromUser: 1, toUser: 1 });

const BidSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  nft: { type: mongoose.Schema.Types.ObjectId, ref: "NFT" },
  amount: Number,
  bidDate: Date,
  // Other bid-related information
});

// Define indexes for the 'user' and 'nft' fields in the Bid collection
BidSchema.index({ user: 1, nft: 1 });

const TransactionModel = mongoose.model("Transaction", TransactionSchema);
const BidModel = mongoose.model("Bid", BidSchema);

export { TransactionModel, BidModel };
