import mongoose from 'mongoose'

export const SettingSchema = new mongoose.Schema({
  isSystemEnabled: {
    type: Boolean,
    required: true,
    default: true
  },
  isStreamEnabled: {
    type: Boolean,
    required: true,
    default: true
  },
  minWhaleBalance: {
    type: Number,
    required: true
  },
  maxWhaleBalance: {
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
  maxPairCreatedDays: {
    type: Number,
    required: true
  }
})

SettingSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id
    delete ret.__v
  }
})
