const RideModel = require('../models/RideModel');

class RideController {
    static getAll(req, res){
        RideModel.getAll((err, rows) => {
            if(err){
                res.status(500).json({
                    error_code: 500,
                    type: 'SERVER_ERROR',
                    message: 'Unknown error'
                });
            }else if (rows.length === 0) {
                res.status(404).json({
                    error_code: 404,
                    type: 'RIDES_NOT_FOUND_ERROR',
                    message: 'Could not find any rides'
                });
            } else {
                res.status(200).json(rows);
            }

        });
    }

    static addRide(req, res){
        const startLatitude = Number(req.body.start_lat);
        const startLongitude = Number(req.body.start_long);
        const endLatitude = Number(req.body.end_lat);
        const endLongitude = Number(req.body.end_long);
        const riderName = req.body.rider_name;
        const driverName = req.body.driver_name;
        const driverVehicle = req.body.driver_vehicle;
        const validationErrors = [];

        if (startLatitude < -90 || startLatitude > 90 || startLongitude < -180 || startLongitude > 180) {
            validationErrors.push('Start latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively');
        }

        if (endLatitude < -90 || endLatitude > 90 || endLongitude < -180 || endLongitude > 180) {
            validationErrors.push('End latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively');
        }

        if (typeof riderName !== 'string' || riderName.length < 1) {
            validationErrors.push('Rider name must be a non empty string');
        }

        if (typeof driverName !== 'string' || driverName.length < 1) {
            validationErrors.push('Driver name must be a non empty string');
        }

        if (typeof driverVehicle !== 'string' || driverVehicle.length < 1) {
            validationErrors.push('Driver vehicle must be a non empty string');
        }

        if(validationErrors.length > 0){
            res.status(400).json({
                error_code: 400,
                type: 'VALIDATION_ERROR',
                messages: validationErrors,
            });
        } else {
            var values = [req.body.start_lat, req.body.start_long, req.body.end_lat, req.body.end_long, req.body.rider_name, req.body.driver_name, req.body.driver_vehicle];
    
            RideModel.addRide(values, (err, rows) => {
                if(err){
                    res.status(500).json({
                        error_code: 500,
                        type: 'SERVER_ERROR',
                        message: 'Unknown error'
                    });
                }else{
                    res.status(201).json({
                        message: 'Successfully add a ride',
                        ride: rows[0],
                    });
                }
            });
        }
    }

    static getOneByID(req, res){
        const id = Number(req.params.id);
        RideModel.getOneById(id, (err, rows) => {
            if(err){
                res.status(500).json({
                    error_code: 500,
                    type: 'SERVER_ERROR',
                    message: 'Unknown error'
                });
            }else if (rows.length === 0) {
                res.status(400).json({
                    error_code: 404,
                    type: 'RIDES_NOT_FOUND_ERROR',
                    message: 'Could not find any rides'
                });
            }else{
                res.status(200).json({
                    ride: rows[0],
                });
            }
        });
    }
}

module.exports = RideController;