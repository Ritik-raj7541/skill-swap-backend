const express = require('express') ;
const { matching, graphMatchingAlgo } = require('../../controllers/User/matchingAlgo');

const router = express.Router() ;

router.route('/match/:id').get(matching) ;
router.route('/match/graph/:id').get(graphMatchingAlgo)
module.exports = router ;