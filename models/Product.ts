import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  title: String,
  price: String,
  image: String,
});

export default
  mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);