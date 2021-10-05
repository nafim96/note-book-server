const mongoose = require( "mongoose" );
const Schema = mongoose.Schema;

const NoteSchema = new Schema( {
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    tag: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
} );
const Note = mongoose.model( 'note', NoteSchema );

module.exports = Note;