const mongoose = require("mongoose");
const FoodSchema = new mongoose.Schema({
  _id: { type: Number, required: true },
  name: { type: String, required: true },
  category: { type: String },
  description: { type: String },
  price: { type: Number, required: true },
  image: { type: String, required: true },
});

const Food = mongoose.model("foods", FoodSchema);
module.exports = Food;
