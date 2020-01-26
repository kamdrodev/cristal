import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const FlashcardSchema = mongoose.Schema({
  firstLanguage: {
    language: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    }    
  },
  secondLanguage: {
    language: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    }    
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  listId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'List',
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  views: {
    type: Number,
    default: 0,
  },
  level: {
    type: Number,
    default: 0,
  },
  isAdmin: {
    type: Boolean,
    defaul: false,
  }
});

export default mongoose.model('Flashcard', FlashcardSchema);