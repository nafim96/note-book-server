const connectToMongo = require( "./db" );
const express = require( "express" );
const cors = require( "cors" );
connectToMongo();

const app = express();
const port = 5000;

app.use( cors() );
app.use( express.json() );
app.use( express.urlencoded( { extended: false } ) );

// import all router here
const noteRouter = require( "./src/routers/notes" );
const authRouter = require( "./src/routers/auth" );


//All Routers available Here
app.use( "/api/notes", noteRouter );
app.use( "/api/auth", authRouter );

app.get( "/", ( req, res ) =>
{
    res.send( "Hello World" );
} );


app.listen( port, () =>
{
    console.log( `App is running listening at http://localhost:${ port }` );
} );