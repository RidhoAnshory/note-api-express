const noteModel = require('../models/note.models');
const { v4: uuidv4 } = require('uuid');

const createNote = async (req, res) => {
  const { title, description } = req.body;

  const newNote = new noteModel({
    title: title,
    description: description,
    uuid: uuidv4().replaceAll('-', ''),
    userId: req.userId,
  });

  try {
    await newNote.save();

    res.status(201).json(newNote);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const updateNote = async (req, res) => {
  const id = req.params.id;
  const { title, description } = req.body;

  try {
    await noteModel.update(
      {
        title: title,
        description: description,
      },
      {
        where: {
          uuid: id,
        },
      },
    );

    res.status(201).json({ message: 'Successfully update the note' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const deleteNote = async (req, res) => {
  const id = req.params.id;

  try {
    const isNoteExist = await noteModel.findOne({
      where: {
        uuid: id,
      },
    });

    if (!isNoteExist) {
      return res
        .status(404)
        .json({ message: 'Failed to delete note, note did not exist' });
    }

    await noteModel.destroy({
      where: {
        uuid: id,
      },
    });
    res.status(201).json({ message: 'Successfully delete the note' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const getNotes = async (req, res) => {
  try {
    const notes = await noteModel.findAll({
      where: {
        userId: req.userId,
      },
    });
    res.status(200).json(notes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const getNoteById = (req, res) => {};

module.exports = {
  createNote,
  updateNote,
  deleteNote,
  getNotes,
  getNoteById,
};
