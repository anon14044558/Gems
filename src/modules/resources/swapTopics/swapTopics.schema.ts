import mongoose from 'mongoose'

export const SwapTopicSchema = new mongoose.Schema(
  {
    isEnabled: {
      type: Boolean,
      required: true,
      default: true
    },
    topic: {
      type: String,
      required: true,
      unique: true
    },
    name: {
      type: String,
      required: false
    },
    chain: {
      type: String,
      required: false
    }
  },
  {
    timestamps: true
  }
)

SwapTopicSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id
    delete ret.isDeleted
    delete ret.__v
  }
})
