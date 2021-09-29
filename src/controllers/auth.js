const Auth = require( "../models/Auth" );

const getAuthController = ( req, res ) =>
{
    res.send( "Nasir" );
};

module.exports = { getAuthController };