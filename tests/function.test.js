const {validate, paginate} = require('../src/services/functions');

const paginateData = [
    'user1',
    'user2',
    'user3',
    'user4',
    'user5',
    'user6',
    'user7',
    'user8',
];

// eslint-disable-next-line
describe('validate function test', function(){
    // eslint-disable-next-line
    it('should return array of errors', function(done){
        const result = validate('a', 'a', 'a', 'a', '', '', '');
        if(
            result[0] == 'Start latitude and longitude should be a number' &&
            result[1] == 'Start latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively' &&
            result[2] == 'End latitude and longitude should be a number' &&
            result[3] == 'End latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively' &&
            result[4] == 'Rider name must be a non empty string' &&
            result[5] == 'Driver name must be a non empty string' &&
            result[6] == 'Driver vehicle must be a non empty string'
        ){
            done();
        }else{
            done(new Error());
        }
    });
});

// eslint-disable-next-line
describe('paginate function test', function(){
    // eslint-disable-next-line
    describe('test with page = 1 and limit = 4', function(){
        // eslint-disable-next-line
        it('should return data from index = 0 to index = 3', function(done){
            const result = paginate(1, 4, paginateData);
            for(let i = 0; i < 4; i++){
                if(result[i] !== paginateData[i]){
                    done(new Error());
                }
            }
            done();
        });
    });
    // eslint-disable-next-line
    describe('test with page = 2 and limit = 4', function(){
        // eslint-disable-next-line
        it('should return data from index = 4 to index = 7', function(done){
            const result = paginate(2, 4, paginateData);
            let check = true;
            for(let i = 0; i < 4; i++){
                if(result[i] !== paginateData[i + 4]){
                    check = false;
                }
            }
            if(!check){
                done(new Error());
            }
            done();
        });
    });
    // eslint-disable-next-line
    describe('test with page = 1 and limit = 8', function(){
        // eslint-disable-next-line
        it('should return data from index = 0 to index = 7', function(done){
            const result = paginate(1, 8, paginateData);
            let check = true;
            for(let i = 0; i < 8; i++){
                if(result[i] !== paginateData[i]){
                    check = false;
                }
            }
            if(!check){
                done(new Error());
            }
            done();
        });
    });
});