const validateNoteLength = (note) => {
  if (note.title.length > 50 || note.text.length > 300) return false;
  return true;
};

module.exports = validateNoteLength;
