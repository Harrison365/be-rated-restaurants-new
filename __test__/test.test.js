const db = require("../db/index.js"); //so that we can end the connection to the db after all the tests.
const request = require("supertest");
const app = require("../app.js");

afterAll(() => {
  db.end();
}); //disconnect from db after all of the tests.

describe("GET /api", () => {
  test("get 200 response with success message", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual({ message: "all ok!" });
      });
  });
});
