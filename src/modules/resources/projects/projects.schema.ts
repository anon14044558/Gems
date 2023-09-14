import mongoose from 'mongoose'

export const ProjectSchema = new mongoose.Schema(
  {
    isEnabled: {
      type: Boolean,
      required: true,
      default: false
    },
    chainId: {
      type: Number,
      required: true
    },
    tokenName: {
      type: String,
      required: false
    },
    tokenSymbol: {
      type: String,
      required: true
    },
    tokenAddress: {
      type: String,
      required: true,
      unique: true
    },
    dexPairUrl: {
      type: String,
      required: false
    }
  },
  {
    timestamps: true
  }
)

ProjectSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id
    delete ret.isDeleted
    delete ret.__v
  }
})
