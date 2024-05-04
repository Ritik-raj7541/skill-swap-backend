const express = require('express') ;
const { matching, graphMatchingAlgo, confirmation, group } = require('../../controllers/User/matchingAlgo');

const router = express.Router() ;

router.route('/match/:id').get(matching) ;
router.route('/match/graph/:id').get(graphMatchingAlgo)
router.route('/confirmation/:groupId/:id').get(confirmation) ;
router.route('/group/:id').get(group) ;
module.exports = router ;