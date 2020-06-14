// const util = require('util');

class RideModel {
    static getAll(db){
        let query = 'SELECT * FROM Rides';
        return new Promise((resolve, reject) => {
            db.all(query, (err, rows) => {
                if(err){
                    reject(err);
                }else{
                    resolve(rows);
                }
            });
        });
    }

    static addRide(db, values){
        return new Promise((resolve, reject) => {
            db.run('INSERT INTO Rides(startLat, startLong, endLat, endLong, riderName, driverName, driverVehicle) VALUES (?, ?, ?, ?, ?, ?, ?)', values, function (err) {
                if(err){
                    reject(err);
                }else{
                    db.all('SELECT * FROM Rides WHERE rideID = ?', this.lastID, function (err, rows) {
                        if(err){
                            reject(err);
                        }else{
                            resolve(rows);
                        }
                    });
                }
            });        
        });
    }

    static getOneById(db, id){
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM Rides WHERE rideID = ?', id, function (err, rows) {
                if(err){
                    reject(err);
                }
                resolve(rows);
            });
        });
    }
}

module.exports = RideModel;