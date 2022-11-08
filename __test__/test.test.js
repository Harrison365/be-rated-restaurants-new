const db = require("../db/index.js");
const request = require("supertest");
const app = require("../app.js");

afterAll(() => {
  db.end();
});

describe("GET /api", () => {
  test("get 200 response with success message", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual({ message: "all ok" });
      });
  });
});
