const express = require('express') ;
const { matching, graphMatchingAlgo, confirmation } = require('../../controllers/User/matchingAlgo');

const router = express.Router() ;

router.route('/match/:id').get(matching) ;
router.route('/match/graph/:id').get(graphMatchingAlgo)
router.route('/confirmation/:groupId/:id').get(confirmation) ;
module.exports = router ;