const express = require( "express" );
const router = express.Router();
const { getNoteController, createNoteController, updateNoteController, deleteNoteController } = require( "../controllers/notes" );
const fetchUser = require( "../middleware/fetchUser" );

//Create all router for note collections
router.get( "/getNote", fetchUser, getNoteController );
router.post( "/create", fetchUser, createNoteController );
router.put( "/updateNote/:id", fetchUser, updateNoteController );
router.delete( "/deleteNote/:id", fetchUser, deleteNoteController );

module.exports = router;