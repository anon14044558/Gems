import mongoose from 'mongoose'

export const TransactionSchema = new mongoose.Schema(
  {
    chainName: {
      type: String,
      required: true
    },
    walletAddress: {
      type: String,
      required: true
    },
    tokenSymbol: {
      type: String,
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    txType: {
      type: String,
      required: true
    },
    txHash: {
      type: String,
      required: true
    }
  },
  {
    timestamps: {
      createdAt: 'created_time',
      updatedAt: 'updated_time'
    }
  }
)

TransactionSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id
    delete ret.__v
  }
})
