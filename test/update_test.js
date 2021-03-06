const assert = require('assert');
const User = require('../src/user');

describe('Updating  records', () => {
  let joe;

  beforeEach((done) => {
    joe = new User({ name: 'Joe', likes: 0 });
    joe.save()
      .then(() => done());
  });

  function asssertName(operation, done) {
    operation
      .then(() => User.find({  }))
      .then((users) => {
        assert(users.length === 1);
        assert(users[0].name === 'Alex');
        done();
      });
  }

  it('instance set and save', (done) => {
    joe.set('name', 'Alex');
    asssertName(joe.save(), done);
  });

  it('A model instance can update', (done) => {
    asssertName(joe.update({ name: 'Alex' }), done);
  });

  it('A model class can update', (done) => {
    asssertName(User.update({ name: 'Joe' }, { name: 'Alex' }), done);
  });

  it('A model class can update one record', (done) => {
    asssertName(
      User.findOneAndUpdate({ name: 'Joe' }, { name: 'Alex' }),
      done
    )
  });

  it('A model class can find a record with id and update', (done) => {
    asssertName(
      User.findByIdAndUpdate(joe._id, { name: 'Alex' }), 
      done
    );
  });

  it('A user can have their postcount inctement by 1', (done) => {
     User.update({ name: 'Joe'}, { $inc: { likes: 10 } })
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user.likes === 10);
        done();
      })
  });
});

