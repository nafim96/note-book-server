const connectToMongo = require( "./db" );
const express = require( "express" );
connectToMongo();

const app = express();
const port = 5000;

app.use( express.json() );

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