import request from "supertest";
import server from "../../server";
// The following import prevents 'expected 200 "OK", got 415 "Unsupported Media Type"' bug on post req tests.
// Bug is caused by lazy loading on jests' part.
// https://stackoverflow.com/questions/49141927/express-body-parser-utf-8-error-in-test?rq=1
import "../../../node_modules/iconv-lite/encodings";

// test("Empty route should respond with 200.", () => {
//   return request(server)
//     .get("events/")
//     .expect(200)
//     .end(function(err, res) {
//       if (err) throw err;
//     });
// });

describe("Should test / Route", () => {
  it.only("should GET JSON and 200 response.", done => {
    return request(server)
      .get("/events/")
      .set("Accept", "application/json")
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        console.log(res.body);
        done();
      });
  });
});

describe("Should test /get_event_by_id Route", () => {
  it.only("Should POST id and Recieve JSON Object with 200 response", done => {
    const eventId = "5dfc32c652af8b4116985149";
    return request(server)
      .post("/events/get_event_by_id")
      .send({
        event_id: eventId
      })
      .set("Accept", "application/json")
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        expect(res.body._id).toEqual(eventId);
        done();
      });
  });

  it.only("Should POST incorrect id and recieve incorrect id back and 404 response.", done => {
    const wrongId = "wrong ID";
    return request(server)
      .post("/events/get_event_by_id")
      .send({
        event_id: wrongId
      })
      .set("Accept", "application/json")
      .expect(404)
      .end((err, res) => {
        if (err) throw err;
        expect(res.body._id).toEqual(wrongId);
        done();
      });
  });
});
