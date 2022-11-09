const db = require("../db/index.js");

exports.fetchRestaurants = () => {
  return db.query("SELECT * FROM restaurants;").then((result) => {
    return result.rows;
  });
};

exports.sendRestaurant = (restaurant) => {
    if (Object.keys(restaurant).length !== 4 && !Object.keys(restaurant).includes("restaurant_name", "area_id", "cuisine", "website")){ console.log("hello")
return Prommise.reject({status: 400, message: "Invalid input entered - please try again!" })
    }
  const { restaurant_name, area_id, cuisine, website } = restaurant;
  return db
    .query(
      "INSERT INTO restaurants (restaurant_name, area_id, cuisine, website) VALUES ($1, $2, $3, $4) RETURNING *;",
      [restaurant_name, area_id, cuisine, website]
    )
    .then((result) => {
      return result.rows[0];
    });
};

exports.removeRestaurant = (id) => {
  return db
    .query("DELETE FROM restaurants WHERE restaurant_id = $1", [id])
    .then(() => {
      return {};
    });
};
