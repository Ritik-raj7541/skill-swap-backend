const express = require('express') ;
const {scheduler, getSchedule} = require('../../controllers/User/schedulingAlgo');
const router = express.Router() ;

router.route('/schedule/:id').post(scheduler) ;
router.route('/show-schedule/:id').get(getSchedule) ;

module.exports = router ;