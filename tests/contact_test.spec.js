process.env.NODE_ENV='test';
import chai from 'chai';
import request from 'request';
import chaiHttp from 'chai-http';
import app from '../index';
import mongoose from 'mongoose';
chai.use(chaiHttp);
const should = chai.should();
const expect = chai.expect;
describe('test the contacts functionalities', () => {
  let id;
  before( (done) => {
      mongoose.connection.dropDatabase();
      mongoose.connect(`mongodb://${process.env.TEST_USER}:${process.env.TEST_PASSWORD}${process.env.TEST_HOST}/${process.env.TEST_NAME}`, {useNewUrlParser: true });
      done();
  });
  it('creates a contact', (done) => {
    const contact = {
      name: 'sato',
      phone: '9000'
      };
      chai.request(app)
      .post('/contact/create')
      .send(contact)
      .end((err, res) => {
        id = res.body.data._id;
        res.should.have.status(201);
        res.body.should.be.a('object');
        expect(res.body.message).equal('successfully created');
       done();
      });
  });

it('cannot create a contact with a registered number', (done) => {
  const contact = {
    name: 'mashmello',
    phone: '9000'
    };
    chai.request(app)
    .post('/contact/create')
    .send(contact)
    .end((err, res) => {
      res.should.have.status(403);
     done();
    });
});
it('get one contact', (done) => {
  chai.request(app)
  .get(`/contact/${id}`)
  .end((err, res) => {
    res.should.have.status(200);
    res.body.should.be.a('object');
   done();
  });
});
it('get  contact with invalid Id', (done) => {
  chai.request(app)
  .get('/contact/4848484')
  .end((err, res) => {
    res.should.have.status(404);
    expect(res.body.message).equal('Invalid Id');
    res.body.should.be.a('object');
   done();
  });
});

  it('get all contacts', (done) => {
      chai.request(app)
      .get('/contacts')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
       done();
      });
  });
  it('edit a contact', (done) => {
    const contact = {
      name: 'collins macharia',
      phone: '25470844'
      };
    chai.request(app)
    .put(`/contact/${id}`)
    .send(contact)
    .end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.a('object');
      expect(res.body.message).equal('successfully updated');
     done();
    });
});

it('delete a contact', (done) => {
  chai.request(app)
  .delete(`/contact/${id}`)
  .end((err, res) => {
    res.should.have.status(200);
    expect(res.body.message).equal('successfully deleted the contact');
   done();
  });
});
it('cant delete a contact with an invalid if ', (done) => {
  chai.request(app)
  .delete('/contact/908940498')
  .end((err, res) => {
    res.should.have.status(404);
    expect(res.body.message).equal('Invalid Id');
    res.body.should.be.a('object');
   done();
  });
});
it('delete a contact that does not exist ', (done) => {
  chai.request(app)
  .delete(`/contact/${id}`)
  .end((err, res) => {
    res.should.have.status(404);
    expect(res.body.message).equal('Nothing was  found');
    res.body.should.be.a('object');
   done();
  });
});
it('get  contact that does not exist ', (done) => {
  chai.request(app)
  .get(`/contact/${id}`)
  .end((err, res) => {
    res.should.have.status(404);
    expect(res.body.message).equal('Nothing was  found');
    res.body.should.be.a('object');
   done();
  });
});
it('cant get a contact with an invalid if ', (done) => {
  chai.request(app)
  .get('/contact/908940498')
  .end((err, res) => {
    res.should.have.status(404);
    expect(res.body.message).equal('Invalid Id');
    res.body.should.be.a('object');
   done();
  });
});
it('edit a contact that does not exist ', (done) => {
  const contact = {
    name: 'collins macharia',
    phone: '25470844'
    };
  chai.request(app)
  .put(`/contact/${id}`)
  .send(contact)
  .end((err, res) => {
    res.should.have.status(404);
    expect(res.body.message).equal('Nothing was  found');
    res.body.should.be.a('object');
   done();
  });
});
it('creates a contact without a name', (done) => {
  const contact = {
    'name': '      ',
    'phone': '9000'
    };
    chai.request(app)
    .post('/contact/create')
    .send(contact)
    .end((err, res) => {
      res.should.have.status(400);
      expect(res.body.message).equal('this cannot be an empty string');
     done();
    });
});

it('cant edit a contact with an invalid if ', (done) => {
  const contact = {
    name: 'collins macharia',
    phone: '25470844'
    };
  chai.request(app)
  .put('/contact/908940498')
  .send(contact)
  .end((err, res) => {
    res.should.have.status(404);
    expect(res.body.message).equal('Invalid Id');
    res.body.should.be.a('object');
   done();
  });
});

});