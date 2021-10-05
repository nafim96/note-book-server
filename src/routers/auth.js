const express = require( "express" );
const router = express.Router();
const { body } = require( 'express-validator' );
const { createAuthController, getAuthController, loggedInUserController } = require( "../controllers/auth" );
const fetchUser = require( "../middleware/fetchUser" );
const User = require( "../models/Users" );



// userCreate router end point: api/auth/create
const userValidator = [ body( 'name', "Please Enter atlist 3 character name" ).isLength( { min: 3 } ), body( 'email', "Please Enter valid Email" ).isEmail(), body( 'password', "Please Enter atlist 6 character password" ).isLength( { min: 6 } ) ];

router.post( "/create", userValidator, createAuthController );

// user login routers end point: api/auth/login
const logInValidator = [ body( 'email', "Please Enter valid Email" ).isEmail(), body( 'password', "Can't not blank password" ).exists() ];

router.post( "/login", logInValidator, loggedInUserController );


// use Post method get authenticate user end point: api/auth/getUser
router.post( "/getUser", fetchUser, getAuthController );

module.exports = router;

