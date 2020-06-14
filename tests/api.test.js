'use strict';

const request = require('supertest');

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

const app = require('../src/app')(db);
const buildSchemas = require('../src/schemas');

// eslint-disable-next-line
describe('API tests', () => {
    // eslint-disable-next-line
    before((done) => {
        db.serialize((err) => { 
            if (err) {
                return done(err);
            }

            buildSchemas(db);

            done();
        });
    });
    // eslint-disable-next-line
    describe('GET /health', () => {
        // eslint-disable-next-line
        it('should return health', (done) => {
            request(app)
                .get('/health')
                .expect('Content-Type', /text/)
                .expect(200, done);
        });
    });

    // eslint-disable-next-line
    describe('GET /rides', () => {
        // eslint-disable-next-line
        describe('unsuccessfully get rides due to empty data', () => {
            // eslint-disable-next-line
            it('should return 404 and object of error', (done) => {
                request(app)
                    .get('/rides')
                    .expect('Content-Type', /json/)
                    .expect(404, {
                        error_code: 404,
                        type: 'RIDES_NOT_FOUND_ERROR',
                        message: 'Could not find any rides'
                    }, done);
            });
        });
    });

    // eslint-disable-next-line
    describe('POST /rides', () => {
        // eslint-disable-next-line
        describe('successfully add a ride', () => {
            // eslint-disable-next-line
            it('should return 201 and an object', (done) => {
                request(app)
                    .post('/rides')
                    .send({
                        start_lat: 0,
                        start_long: 0,
                        end_lat: 45,
                        end_long: 45,
                        rider_name: 'Adhiyatma',
                        driver_name: 'Adhiyatma',
                        driver_vehicle: 'Car'
                    })
                    .expect('Content-Type', /json/)
                    .expect(201, done);
            });
        });
        // eslint-disable-next-line
        describe('usuccessfully add a ride due to validation errors', () => {
            // eslint-disable-next-line
            it('should return 400 and an object', (done) => {
                request(app)
                    .post('/rides')
                    .send({
                        start_lat: 95,
                        start_long: 85,
                        end_lat: 95,
                        end_long: 95,
                        rider_name: '',
                        driver_name: '',
                        driver_vehicle: ''
                    })
                    .expect('Content-Type', /json/)
                    .expect(400, {
                        error_code: 400,
                        type: 'VALIDATION_ERROR',
                        messages: [
                            'Start latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively',
                            'End latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively',
                            'Rider name must be a non empty string',
                            'Driver name must be a non empty string',
                            'Driver vehicle must be a non empty string'
                        ]
                    },
                    done);
            });
        });
    }); 

    // eslint-disable-next-line
    describe('GET /rides', () => {
        // eslint-disable-next-line
        describe('successfully get rides', () => {
            // eslint-disable-next-line
            it('should return 200', (done) => {
                request(app)
                    .get('/rides')
                    .expect('Content-Type', /json/)
                    .expect(200,  done);
            });
        });
        // eslint-disable-next-line
        describe('successfully get rides with pagination', () => {
            // eslint-disable-next-line
            it('should return 200', (done) => {
                request(app)
                    .get('/rides?page=1&limit=5')
                    .expect('Content-Type', /json/)
                    .expect(200,  done);
            });
        });
    });
    // eslint-disable-next-line
    describe('GET /rides/:id', () => {
        // eslint-disable-next-line
        describe('successfully get ride by id', () => {
            // eslint-disable-next-line
            it('should return 200', (done) => {
                request(app)
                    .get('/rides/1')
                    .expect('Content-Type', /json/)
                    .expect(200,  done);
            });
        });
        // eslint-disable-next-line
        describe('unsuccessfully get ride by id due to data not found', () => {
            // eslint-disable-next-line
            it('should return 404', (done) => {
                request(app)
                    .get('/rides/2')
                    .expect('Content-Type', /json/)
                    .expect(404,  done);
            });
        });
    });
});

