import mongoose from 'mongoose'

export const WalletSchema = new mongoose.Schema(
  {
    isEnabled: {
      type: Boolean,
      required: true,
      default: true
    },
    name: {
      type: String,
      required: false
    },
    address: {
      type: String,
      required: true,
      unique: true
    },
    parentWallet: {
      type: String,
      required: false
    },
    walletTree: {
      type: [String],
      required: false
    },
    email: {
      type: String,
      required: false
    },
    twitter: {
      type: String,
      required: false
    },
    facebook: {
      type: String,
      required: false
    },
    telegram: {
      type: String,
      required: false
    }
  },
  {
    timestamps: true
  }
)

WalletSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id
    delete ret.isDeleted
    delete ret.__v
  }
})
