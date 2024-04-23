const express = require('express') ;
const {profile, skillAdd, skillDeletion} = require('../../controllers/User/operations') ;

const router = express.Router() ;

router.route('/profileUpdate/:id').post(profile) ;
router.route('/skill-update/add-new-skill/:type/:id').patch(skillAdd) ;
router.route('/skill-update/remove-skill/:type/:id').patch(skillDeletion) ;

module.exports = router ;