const validateNoteLength = (note) => {
  if (note.title) if (note.title.length > 50) return false;
  if (note.text) if (note.text.length > 300) return false;
  return true;
};

module.exports = validateNoteLength;
