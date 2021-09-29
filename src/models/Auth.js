const mongoose = require( "mongoose" );
const Schema = mongoose.Schema;

const AuthSchema = new Schema( {
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },

    date: {
        type: Date,
        default: Date.now
    }
} );
const Auth = mongoose.model( 'Auth', AuthSchema );

module.exports = Auth;