const {
  getNotes,
  getNoteById,
  createNote,
  deleteNote,
  updateNote,
} = require('../controllers/note.controller');

const router = require('express').Router();

router.get('/', getNotes);

router.post('/', createNote);

router.delete('/:id', deleteNote);

router.put('/:id', updateNote);

router.get('/:id', getNoteById);

module.exports = router;
