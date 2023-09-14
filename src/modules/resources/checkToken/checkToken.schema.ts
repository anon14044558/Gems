import mongoose from 'mongoose';

export const checkTokenSchema = new mongoose.Schema(
  {
    holders: {
      type: Number,
      required: true,
    },
    buyTax: {
      type: Number,
      required: true,
    },
    sellTax: {
      type: Number,
      required: true,
    },
    codeVerified: {
      type: Boolean,
      required: true,
    },
    renounced: {
      type: Boolean,
      required: true,
    },
    isHoneypot: {
      type: Boolean,
      required: true,
    },
    Locked: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

checkTokenSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
    delete ret.isDeleted;
    delete ret.__v;
  },
});
