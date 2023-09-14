import mongoose from 'mongoose';

export const TokenSchema = new mongoose.Schema(
  {
    address: {
      type: String,
      required: true,
    },
    exchange: {
      type: String,
      required: true,
    },
    dextScore: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    refAddress: {
      type: String,
      required: true,
    },
    refName: {
      type: String,
      required: true,
    },
    refSymbol: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

TokenSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
    delete ret.isDeleted;
    delete ret.__v;
  },
});
