const db = require("../models");
const Note = db.Note;
const { Op } = require('sequelize');
const Joi = require('joi');

// Validation schemas
const noteSchema = Joi.object({
  title: Joi.string()
    .min(1)
    .max(255)
    .required(),
  content: Joi.string()
    .allow('', null)
    .optional(),
  category: Joi.string()
    .max(100)
    .optional()
});

const updateNoteSchema = Joi.object({
  title: Joi.string()
    .min(1)
    .max(255)
    .optional(),
  content: Joi.string()
    .allow('', null)
    .optional(),
  category: Joi.string()
    .max(100)
    .optional()
});

const getNotesHandler = async (req, res) => {
  try {
    // Build filters from query parameters
    const whereClause = {};
    
    if (req.query.category) {
      whereClause.category = req.query.category;
    }
    
    if (req.query.search) {
      whereClause[Op.or] = [
        { title: { [Op.iLike]: `%${req.query.search}%` } },
        { content: { [Op.iLike]: `%${req.query.search}%` } }
      ];
    }

    const notes = await Note.findAll({
      where: whereClause,
      order: [['updatedAt', 'DESC']]
    });

    res.writeHead(200, { "Content-Type": "application/json" });
    const output = {
      message: "List of notes",
      data: notes,
      count: notes.length,
      status: "success",
    };
    res.write(JSON.stringify(output));
    res.end();
  } catch (error) {
    console.error('Error in getNotesHandler:', error);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.write(JSON.stringify({ 
      error: "Internal server error", 
      message: error.message 
    }));
    res.end();
  }
};

const addNoteHandler = async (req, res) => {
  try {
    // Validate request body
    const { error } = await noteSchema.validateAsync(req.body);

    if (error) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.write(JSON.stringify({ 
        error: "Invalid request", 
        message: error.details[0].message 
      }));
      res.end();
      return;
    }

    const newNote = await Note.create(req.body);
    
    res.writeHead(201, { "Content-Type": "application/json" });
    const output = {
      message: "Note added successfully",
      data: newNote,
      status: "success",
    };
    res.write(JSON.stringify(output));
    res.end();
  } catch (error) {
    console.error('Error in addNoteHandler:', error);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.write(JSON.stringify({ 
      error: "Internal server error", 
      message: error.message 
    }));
    res.end();
  }
};

const getDetailNoteHandler = async (req, res) => {
  try {
    const id = req.params.id;
    const note = await Note.findByPk(id);
    
    if (note) {
      res.writeHead(200, { "Content-Type": "application/json" });
      const output = {
        message: "Detail of note",
        data: note,
        status: "success",
      };
      res.write(JSON.stringify(output));
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.write(JSON.stringify({ 
        error: "Note not found",
        status: "error" 
      }));
    }
    res.end();
  } catch (error) {
    console.error('Error in getDetailNoteHandler:', error);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.write(JSON.stringify({ 
      error: "Internal server error", 
      message: error.message 
    }));
    res.end();
  }
};

const updateNoteHandler = async (req, res) => {
  try {
    const id = req.params.id;
    
    // Validate request body
    const { error } = await updateNoteSchema.validateAsync(req.body);

    if (error) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.write(JSON.stringify({ 
        error: "Invalid request", 
        message: error.details[0].message 
      }));
      res.end();
      return;
    }

    const [updated] = await Note.update(req.body, {
      where: { id },
      returning: true
    });
    
    if (updated) {
      const updatedNote = await Note.findByPk(id);
      res.writeHead(200, { "Content-Type": "application/json" });
      const output = {
        message: "Note updated successfully",
        data: updatedNote,
        status: "success",
      };
      res.write(JSON.stringify(output));
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.write(JSON.stringify({ 
        error: "Note not found",
        status: "error" 
      }));
    }
    res.end();
  } catch (error) {
    console.error('Error in updateNoteHandler:', error);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.write(JSON.stringify({ 
      error: "Internal server error", 
      message: error.message 
    }));
    res.end();
  }
};

const deleteNoteHandler = async (req, res) => {
  try {
    const id = req.params.id;
    const note = await Note.findByPk(id);
    
    if (note) {
      await note.destroy();
      res.writeHead(200, { "Content-Type": "application/json" });
      const output = {
        message: "Note deleted successfully",
        status: "success",
      };
      res.write(JSON.stringify(output));
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.write(JSON.stringify({ 
        error: "Note not found",
        status: "error" 
      }));
    }
    res.end();
  } catch (error) {
    console.error('Error in deleteNoteHandler:', error);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.write(JSON.stringify({ 
      error: "Internal server error", 
      message: error.message 
    }));
    res.end();
  }
};

module.exports = {
  getNotesHandler,
  getDetailNoteHandler,
  addNoteHandler,
  updateNoteHandler,
  deleteNoteHandler,
}; 