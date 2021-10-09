const { restart } = require( "nodemon" );
const Note = require( "../models/Notes" );

//Route 1: get note by user authenticate. using: GET "api/note/getNote"
const getNoteController = async ( req, res ) =>
{
    try
    {
        const note = await Note.find( { user: req.user.id } );
        res.send( { note } );
    } catch ( error )
    {
        console.log( error.message );
        res.status( 500 ).send( "Internal Server Error" );
    }
};


//Route 2: Create note by user authenticate. using: POST "api/note/create"
const createNoteController = async ( req, res ) =>
{
    try
    {
        const { title, description, tag } = req.body;
        const note = await new Note( { title, description, tag, user: req.user.id } );
        const addNote = await note.save();
        res.send( addNote );
    } catch ( error )
    {
        console.log( error.message );
        res.status( 500 ).send( "Internal Server Error" );
    }
};

//Route 3: update note by user Id. using: PUT "api/note/updateNote/:id"
const updateNoteController = async ( req, res ) =>
{
    try
    {
        const { title, description, tag } = req.body;
        const newNote = {};
        if ( title ) { newNote.title = title; }
        if ( description ) { newNote.description = description; }
        if ( tag ) { newNote.tag = tag; }

        // find the note to be updated and update it
        let note = await Note.findById( req.params.id );
        if ( !note ) { res.status( 404 ).send( "Not Found" ); }

        if ( note.user.toString() !== req.user.id )
        {
            res.status( 401 ).send( "Not Allowed" );
        }
        note = await Note.findByIdAndUpdate( req.params.id, { $set: newNote }, { new: true } );

        res.send( { note } );
    } catch ( error )
    {
        console.log( error.message );
        res.status( 500 ).send( "Internal Server Error" );
    }
};

//Route 4: Delete note by user Id. using: DELETE "api/note/deleteNote/:id"
const deleteNoteController = async ( req, res ) =>
{
    try
    {
        // find the note to be updated and update it
        let note = await Note.findById( req.params.id );
        if ( !note ) { res.status( 404 ).send( "Not Found" ); }

        // Allowed deletion only if user owns this Notes
        if ( note.user.toString() !== req.user.id )
        {
            res.status( 401 ).send( "Not Allowed" );
        }
        note = await Note.findByIdAndDelete( req.params.id );

        res.json( { success: "Note has been deleted", note: note } );
    } catch ( error )
    {
        console.log( error.message );
        res.status( 500 ).send( "Internal Server Error" );
    }
};


module.exports = { getNoteController, createNoteController, updateNoteController, deleteNoteController };