const { restart } = require( "nodemon" );
const Note = require( "../models/Notes" );

const getNoteController = ( req, res ) =>
{
    const myObj = {
        a: "hello",
        b: 21199
    };
    res.json( myObj );
};

const createNoteController = ( req, res ) =>
{
    const note = {
        title: req.body.title,
        description: req.body.description,
        tag: req.body.tag,
        date: new Date()
    };
    res.status( 201 ).json( {
        message: "create successfully",
        note
    } );
    console.log( "hello programmer" );
    // return note.save().then( result =>
    // {
    //     res.status( 201 ).json( {
    //         message: "hello",
    //         result
    //     } );
    // } ).catch( ( err ) =>
    // {
    //     res.status( 500 ).json( {
    //         message: "Note don't created",
    //         err
    //     } );
    // } );
};

module.exports = { getNoteController, createNoteController };