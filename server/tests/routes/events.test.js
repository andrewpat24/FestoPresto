import request from "supertest";
import server from "../../server";

test("Empty route should respond with 200.", () => {
  request(server)
    .get("/events/")
    .expect(200)
    .end(function(err, res) {
      if (err) throw err;
    });
});
