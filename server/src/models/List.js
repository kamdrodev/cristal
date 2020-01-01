import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ListSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  firstLanguage: {
    type: String,
    required: true,
  },
  secondLanguage: {
    type: String,
    required: true,
  },
  views: {
    type: Number,
    default: 0,
  },
  solved: [{
    date: {
      type: Date,
      default: new Date(),
    },
    accuracy: {
      type: Number,
      required: true,
    },
  }],
  createdAt: {
    type: Date,
    default: new Date(),
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }
});

export default mongoose.model('List', ListSchema);