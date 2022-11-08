const db = require("../db/index.js"); //so that we can end the connection to the db after all the tests.
const request = require("supertest");
const app = require("../app.js");

afterAll(() => {
  return db.end();
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
describe("GET /api/restaurants", () => {
  test("get 200 response with an array of restaurants", () => {
    return request(app)
      .get("/api/restaurants")
      .expect(200)
      .then((res) => {
        expect(res.body.restaurants).toBeInstanceOf(Array);
        expect(res.body.restaurants).toHaveLength(8);
        res.body.restaurants.forEach((element) => {
          expect(element).toEqual(
            expect.objectContaining({
              restaurant_id: expect.any(Number),
              restaurant_name: expect.any(String),
              area_id: expect.any(Number),
              cuisine: expect.any(String),
              website: expect.any(String),
            })
          );
        });
      });
  });
});
describe("POST /api/restaurants", () => {
  test("Status 201, responds with newly added restaurant object", () => {
    const newRestaurant = {
      restaurant_name: "The Codfather",
      area_id: 2,
      cuisine: "British",
      website: "www.thecodfather.com",
    };
    return request(app)
      .post("/api/restaurants")
      .send(newRestaurant)
      .expect(201)
      .then((response) => {
        expect(response.body.restaurant).toEqual({
          restaurant_id: 9,
          restaurant_name: "The Codfather",
          area_id: 2,
          cuisine: "British",
          website: "www.thecodfather.com",
        });
      });
  });
});

describe("DELETE /api/restaurants/:restaurant_id", () => {
  test("status:204, responds with an empty object", () => {
    return request(app)
      .delete("/api/restaurants/2")
      .expect(204)
      .then((response) => {
        expect(response.body).toEqual({});
      });
  });
  test("length of restaurants is one shorter", () => {
    return request(app)
      .get("/api/restaurants")
      .expect(200)
      .then((res) => {
        expect(res.body.restaurants).toBeInstanceOf(Array);
        expect(res.body.restaurants).toHaveLength(8);
      });
  });
});
