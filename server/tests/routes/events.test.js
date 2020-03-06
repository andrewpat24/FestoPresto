import request from 'supertest';
import server from '../../server';
// The following import prevents 'expected 200 "OK", got 415 "Unsupported Media Type"' bug on post req tests.
// Bug is caused by lazy loading on jests' part.
// https://stackoverflow.com/questions/49141927/express-body-parser-utf-8-error-in-test?rq=1
import '../../../node_modules/iconv-lite/encodings';
// TEST DATA
import eventData from '../data/eventData';
const testUserID = 'testUserID';
const testEventName = 'testName';

eventData.creator_uid = testUserID;
eventData.name = testEventName;

// describe('Should test / Route', () => {
//   it.only('should GET JSON and 200 response.', done => {
//     return request(server)
//       .get('/events/')
//       .set('Accept', 'application/json')
//       .expect(200)
//       .end((err, res) => {
//         if (err) throw err;
//         console.log(res.body);
//         done();
//       });
//   });
// });
