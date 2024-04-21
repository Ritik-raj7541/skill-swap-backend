const express = require('express') ;
const {profile, skillAdd} = require('../../controllers/User/operations') ;

const router = express.Router() ;

router.route('/profileUpdate/:id').post(profile) ;
router.route('/skill-update/add-new-skill/:type/:id').patch(skillAdd) ;

module.exports = router ;