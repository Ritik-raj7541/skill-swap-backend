const express = require('express') ;
const { matching } = require('../../controllers/User/matchingAlgo');

const router = express.Router() ;

router.route('/match/:id').get(matching) ;
module.exports = router ;