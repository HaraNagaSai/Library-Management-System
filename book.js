const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  bookId: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  author: { type: String, required: true },
  available: { type: Boolean, default: true },
  checkedOutBy: { type: Schema.Types.ObjectId, ref: 'User', default: null },
  checkoutDate: { type: Date, default: null }
});

module.exports = mongoose.model('Book', bookSchema);
