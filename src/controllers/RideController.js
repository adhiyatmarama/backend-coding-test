const RideModel = require('../models/RideModel');

class RideController {
    static getAll(req, res,){
        req.logger.info('request received at GET /rides');
        let page = Number(req.query.page) || 1;
        let limit = Number(req.query.limit) || 10;
        const db = req.db;
        RideModel.getAll(db, (err, rows) => {
            if(err){
                // req.logger.error('Server error at GET /rides');
                res.status(500).json({
                    error_code: 500,
                    type: 'SERVER_ERROR',
                    message: 'Unknown error'
                });
            }else if (rows.length === 0) {
                // req.logger.error('Rides not found error at GET /rides');
                res.status(404).json({
                    error_code: 404,
                    type: 'RIDES_NOT_FOUND_ERROR',
                    message: 'Could not find any rides'
                });
            } else if(req.query.page){
                const startIndex = (page - 1) * limit;
                const endIndex = page * limit;
                const result = rows.slice(startIndex, endIndex);
                res.status(200).json(result);
            } else {
                res.status(200).json(rows);
            }

        });
    }

    static addRide(req, res){
        req.logger.info('Request received at POST /rides');
        const db = req.db;

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
    
            RideModel.addRide(db, values, (err, rows) => {
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
        req.logger.info('Request received at GET /rides/:id');
        const db = req.db;

        const id = Number(req.params.id);
        RideModel.getOneById(db, id, (err, rows) => {
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
            }else{
                res.status(200).json({
                    ride: rows[0],
                });
            }
        });
    }
}

module.exports = RideController;