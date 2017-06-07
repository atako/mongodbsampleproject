const mongoose = require('mongoose');

mongoose.Promise = global.Promise;


before((done) => {
    mongoose.connect('mongodb://mongo:27017/users_test');
    mongoose.connection
    .once('open', () => { done(); })
    .on('error', (error) => {
        console.warn('Some error', error);
    });
});

beforeEach((done) => {
    mongoose.connection.collections.users.drop(() => {
        done();
    });
});
