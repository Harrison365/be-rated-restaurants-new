const {fetchRestaurants, sendRestaurant } = require("../models/models.js");

exports.getApi = (req, res) => {
  res.status(200).send({ message: "all ok!" });
};


exports.getRestaurants = (req, res) => {
  fetchRestaurants().then((restaurants) => {
    res.status(200).send({ restaurants: restaurants});
  })
};

exports.postRestaurant = (req, res) => {

  sendRestaurant(req.body).then((restaurant) => {
     console.log(restaurant)
    res.status(201).send({restaurant: restaurant})
  })
}
