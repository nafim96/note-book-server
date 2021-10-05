const User = require( "../models/Users" );
const { validationResult } = require( 'express-validator' );
const bcrypt = require( 'bcryptjs' );
const jwt = require( 'jsonwebtoken' );
// require( "dotenv" ).config( { path: "../../.env" } );
const JWT_SECRETE = "helloAnu";

// Route 1: Get LoggedIn user Details using: POST "api/auth/getUser"
const getAuthController = async ( req, res ) =>
{
    try
    {
        userId = req.user.id;
        let user = await User.findById( userId ).select( "-password" );
        res.send( user );
    } catch ( error )
    {
        console.log( error.message );
        res.status( 500 ).send( "Internal Server Error" );
    }
};

//Route 2: create New user using:POST: "/api/auth/create"
const createAuthController = async ( req, res ) =>
{
    const errors = validationResult( req );
    if ( !errors.isEmpty() )
    {
        return res.status( 400 ).json( { errors: errors.array() } );
    }
    try
    {
        let user = await User.findOne( { email: req.body.email } );
        if ( user )
        {
            return res.status( 400 ).json( { errors: "user already exist" } );
        }
        //new user create and store
        const salt = await bcrypt.genSalt( 12 );
        const secPass = await bcrypt.hash( req.body.password, salt );

        user = await User.create( {
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        } );
        const data = {
            users: {
                id: user.id
            }
        };
        const userToken = jwt.sign( { data }, JWT_SECRETE );
        res.json( { userToken } );

    } catch ( err )
    {
        res.status( 500 ).send( "some occurred" ).json( { message: "Enter valid input", err } );
        console.log( err.message );
    }
};

//Route 3: user Auth login systems using: POST end point : api/auth/login

const loggedInUserController = async ( req, res ) =>
{
    const errors = validationResult( req );
    if ( !errors.isEmpty() )
    {
        return res.status( 400 ).json( { errors: errors.array() } );
    }
    try
    {
        const { email, password } = req.body;
        let user = await User.findOne( { email } );
        if ( !user )
        {
            return res.status( 400 ).json( { Error: "please use correct credential" } );
        }
        const passwordCompare = await bcrypt.compare( password, user.password );
        if ( !passwordCompare )
        {
            return res.status( 400 ).json( { Error: "please use correct credential" } );
        }

        const data = {
            user: {
                id: user.id
            }
        };

        const userToken = jwt.sign( { data }, JWT_SECRETE );
        res.json( { userToken } );
    } catch ( err )
    {
        res.status( 500 ).send( "Internal Server Error" );
        console.log( err.message );
    }
};

module.exports = { getAuthController, createAuthController, loggedInUserController };