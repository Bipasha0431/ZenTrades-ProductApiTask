import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  subcategory: {
    type: String,
  },
  title: {
    type: String,
  },
  price: {
    type: Number,
  },
  popularity: {
    type: Number,
  },
});

export default mongoose.model("Product", productSchema);
