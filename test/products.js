import { use, expect } from 'chai';
import chaiHttp from 'chai-http';
const chai = use(chaiHttp);
// const expect = chai.expect;
const should = chai.should();
import app from '../index.js';
// chai.use(chaiHttp);

const server = app;

describe(' GET /Products API', () => {
    it('it should return all products', (done) => {
        chai.request(server)
        .get('/products').end((err, response) => {
            response.should.have.status(200);
            response.body.should.be.a('array');
            done();
        })
    })
});


// describe('POST /products', () => {
//     it('it should POST a product', (done) => {
//         let product = {
//             title: "Boat Earbuds",
//             description: "Premium quality earbuds",
//             price: 999,
//             imageUrl: "www.boat.com"
//         }
//       chai.request(server)
//           .post('/products')
//           .send(product)
//           .end((err, res) => {
//                 res.should.have.status(201);
//                 res.body.should.be.a('object');
//                 res.body.should.have.property('message');
//             done();
//           });
//     });

// });


describe('POST /user/register', () => {
    it('it should POST an user', (done) => {
        let user = {
            email: "test10@gmail.com",
            password: "123456",
            confirmPassword: "123456"
        }
      chai.request(server)
          .post('/user/register')
          .send(user)
          .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.should.have.property('message');
            done();
          });
    });

});





