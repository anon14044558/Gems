import mongoose from 'mongoose'

export const ChannelSchema = new mongoose.Schema({
  isEnabled: {
    type: Boolean,
    required: true,
    default: true
  },
  name: {
    type: String,
    required: true
  },
  telegramId: {
    type: String,
    required: true
  },
  telegramToken: {
    type: String,
    required: true
  },
  minPairCreatedDays: {
    type: Number,
    required: true
  },
  maxPairCreatedDays: {
    type: Number,
    required: true
  },
  minLiquidity: {
    type: Number,
    required: true
  },
  maxLiquidity: {
    type: Number,
    required: true
  },
  minFDV: {
    type: Number,
    required: true
  },
  maxFDV: {
    type: Number,
    required: true
  },
  minValue: {
    type: Number,
    required: true
  },
  maxValue: {
    type: Number,
    required: true
  },
  isSendTransactionNotification: {
    type: Boolean,
    default: false
  }
})

ChannelSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id
    delete ret.isDeleted
    delete ret.__v
  }
})
