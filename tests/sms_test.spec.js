import chai from 'chai';
import request from 'request';
import chaiHttp from 'chai-http';
import app from '../index';
import mongoose from 'mongoose';
chai.use(chaiHttp);
const should = chai.should();
const expect = chai.expect;

describe('test the sms functionalities', () => {
  let sender ;
  let receiver;
  let id;
  let cId;
  after(function(done){
    app.close();
    mongoose.connection.close();
    done();
  });

  before((done) => {
      const contact = 
        {'name': 'cjmash',
        'phone': '8000'};
      chai.request(app)
      .post('/contact/create')
      .send(contact)
      .end((err, res) => {
        sender = res.body.data.phone;
        cId = res.body.data._id;
        done();
      });
  });

  before((done) => {
      const contact = 
        {'name': 'test user',
        'phone': '1000'
      };
      chai.request(app)
      .post('/contact/create')
      .send(contact)
      .end(async (err, res) => {
        receiver = await res.body.data.phone;
        done();
      });
  });

  it('creates a message', (done) => {
      const message = {
        'receiver':`${receiver}`,
        'message': 'hey man you good',
        'sender': `${sender}`
      };
      chai.request(app)
      .post('/message')
      .send(message)
      .end((err, res) => {
        id = res.body.data._id;
        res.should.have.status(201);
        res.body.should.be.a('object');
        expect(res.body.message).equal('successfully created');
      done();
      });
  });

  it('gets  messages', (done) => {
    chai.request(app)
    .get('/messages')
    .end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.a('array');
    done();
    });
});

  it('create a message without a registered sender', (done) => {
    const message = {
      'receiver':'45676543',
      'message': 'hey man you good',
      'sender': `${sender}`
    };
    chai.request(app)
    .post('/message')
    .send(message)
    .end((err, res) => {
      res.should.have.status(403);
      expect(res.body.message).equal('Please register the contacts first');
    done();
    });
});

  it('get a message', (done) => {
    chai.request(app)
    .get(`/message/${id}`)
    .end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.a('object');
    done();
    });
});
it('gets messages from a contact', (done) => {
  chai.request(app)
  .get(`/messages/contact/${cId}`)
  .end((err, res) => {
    res.should.have.status(200);
    res.body.should.be.a('array');
  done();
  });
});
it('cant delete a message with an invalid id ', (done) => {
  chai.request(app)
  .delete('/message/908940498')
  .end((err, res) => {
    res.should.have.status(404);
    expect(res.body.message).equal('Invalid Id');
    res.body.should.be.a('object');
   done();
  });
});
  it('deletes a message', (done) => {
    chai.request(app)
    .delete(`/message/${id}`)
    .end((err, res) => {
      res.should.have.status(200);
      expect(res.body.message).equal('successfully deleted the contact');
    done();
    });
  });

});
