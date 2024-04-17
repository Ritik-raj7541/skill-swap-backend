const express = require('express') ;
const {profile} = require('../../controllers/User/operations') ;

const router = express.Router() ;

router.route('/profileUpdate/:email').post(profile) ;

module.exports = router ;