const mongoose = require("mongoose");

const { Schema } = mongoose;

const FavoriteBrandSchema = new Schema({
  name: String,
});

module.exports = mongoose.model("FavoriteBrand", FavoriteBrandSchema);
