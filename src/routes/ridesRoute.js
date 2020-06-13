const router = require('express').Router();
const rideController = require('../controllers/RideController');

router.get('/', rideController.getAll);
router.post('/', rideController.addRide);
router.get('/:id', rideController.getOneByID);

module.exports = router;