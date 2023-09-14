import mongoose from 'mongoose'

export const ChainSchema = new mongoose.Schema(
  {
    isEnabled: {
      type: Boolean,
      required: true,
      default: false
    },
    chainName: {
      type: String,
      required: true
    },
    chainId: {
      type: Number,
      required: true
    },
    explorer: {
      type: String,
      required: true
    },
    nativeToken: {
      type: String,
      required: true
    },
    rpcProvider: {
      type: String,
      required: true
    },
    currentScanBlock: {
      type: Number,
      required: false
    },
    maxScanBlocks: {
      type: Number,
      required: false
    },
    safeScanBlocks: {
      type: Number,
      required: false
    },
    excludeScanContracts: {
      type: [String],
      require: false
    }
  },
  {
    timestamps: true
  }
)

ChainSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id
    delete ret.isDeleted
    delete ret.__v
  }
})
