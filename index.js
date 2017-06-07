const mongoose = require('mongoose');

mongoose.connect('mongodb://mongo:27017/users_test');
mongoose.connection
    .once('open', () => console.log('Working'))
    .on('error', (error) => {
        console.warn('Warning', error);
    });

beforeEach((done) => {
    mongoose.connection.collections.users.drop(() => {
        done();
    });
});