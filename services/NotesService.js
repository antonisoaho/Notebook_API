const mongoose = require('mongoose');
const Note = require('../models/NoteModel');

const getNotes = async (userId) => {
  try {
    const query = {};
    query.createdBy = userId;

    const result = await Note.find(query).sort({ updatedAt: -1 });
    if (!result) throw new Error();

    return { status: 200, result };
  } catch (error) {
    return { status: 404, result: 'No data found' };
  }
};

const createNote = async (newNote) => {
  try {
    const note = new Note(newNote);
    const result = await note.save();

    if (!result) throw new Error();

    return { status: 201, result };
  } catch (error) {
    throw error;
  }
};

const changeNote = async (newNote, filter) => {
  try {
    if (
      !mongoose.Types.ObjectId.isValid(filter._id) ||
      !mongoose.Types.ObjectId.isValid(filter.createdBy)
    )
      return { status: 400, result: 'Invalid ID format' };

    const result = await Note.findOneAndUpdate(filter, newNote, {
      new: true,
    });
    if (!result)
      return {
        status: 404,
        result: { error: 'No note found matching UserID and ID.' },
      };

    return { status: 200, result };
  } catch (error) {
    throw error;
  }
};

const deleteNote = async (filter) => {
  try {
    if (
      !mongoose.Types.ObjectId.isValid(filter._id) ||
      !mongoose.Types.ObjectId.isValid(filter.createdBy)
    )
      return { status: 400, result: 'Invalid ID format' };

    const result = await Note.deleteOne(filter);

    if (result.deletedCount === 1) {
      return 204;
    } else {
      return 404;
    }
  } catch (error) {
    throw error;
  }
};

const searchNotes = async (filter) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(filter.createdBy)) throw new Error();

    const result = await Note.find({
      title: { $regex: filter.title, $options: 'i' },
      createdBy: filter.createdBy,
    });

    if (result.length < 1)
      return { status: 404, result: { result: 'No notes found' } };

    return { status: 200, result: result };
  } catch (error) {
    throw error;
  }
};

module.exports = { getNotes, createNote, changeNote, deleteNote, searchNotes };
