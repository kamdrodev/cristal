import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ListSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
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
  numberOfWords: {
    type: Number,
    default: 0,
  },
  flashcards: [{
    createdAt: {
      type: Date,
      default: new Date(),
    },
    firstLanguage: {
      type: String,
    },
    secondLanguage: {
      type: String,
    },
    statistics: {
      correctAnswers: {
        type: Number,
        default: 0,
      },
      incorrectAnswers: {
        type: Number,
        default: 0,
      }
    }
  }],
  statistics: {
    quizzes: [{
      createdAt: {
        type: Date,
        default: new Date(),
      },
      correctAnswers: {
        type: Number,
        default: 0,
      },
      incorrectAnswers: {
        type: Number,
        default: 0,
      }
    }]
  },
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
