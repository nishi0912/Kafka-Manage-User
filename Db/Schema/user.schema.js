import mongoose, { Types } from "mongoose";

// User schema creation
export const users_schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      uniq: true,
      required: true,
    },
    phoneNumber: { type: Number, uniq: true, required: true },
    userLocale: {
      type: String,
      uniq: true,
      required: true,
      default: "en",
    },
    androidPushToken: { type: String },
    isEmailUnsub: { type: Boolean, default: false },
    isSmsUnsub: { type: Boolean, default: false },
    isPushUnsub: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);
