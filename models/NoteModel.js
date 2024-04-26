const { Schema, model } = require('mongoose');

const NoteSchema = new Schema(
  {
    title: String,
    text: String,
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const Note = model('Note', NoteSchema);

module.exports = Note;
