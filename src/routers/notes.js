const { getNoteController, createNoteController } = require( "../controllers/notes" );
const express = require( "express" );
const router = express.Router();

router.get( "/", getNoteController );
router.post( "/creates", createNoteController );

module.exports = router;