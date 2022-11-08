const { fetchApi } = require("../models/models.js");

exports.getApi = (req, res) => {
  res.status(200).send({ message: "all ok!" });
};
