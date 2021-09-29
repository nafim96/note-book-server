const express = require( "express" );
const router = express.Router();
const { getAuthController } = require( "../controllers/auth" );

router.get( "/", getAuthController );

module.exports = router;

