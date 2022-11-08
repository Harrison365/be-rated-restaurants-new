const express = require("express");
const {
  getApi,
  getRestaurants,
  postRestaurant,
  deleteRestaurant,
} = require("./controllers/controllers.js");
const app = express();
app.use(express.json());

app.get("/api", getApi);
app.get("/api/restaurants", getRestaurants);
app.post("/api/restaurants", postRestaurant);
app.delete("/api/restaurants/:restaurant_id", deleteRestaurant);

app.all("/*", (req, res) => {
  res.status(404).send({ msg: "Route not found" });
});

app.use((err, req, res, next) => {
  console.log(err);
  res.sendStatus(500);
});

module.exports = app;
