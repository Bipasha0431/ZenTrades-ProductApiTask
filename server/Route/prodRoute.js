import Express from "express";
import product from "../model/product.js";

const Router = Express.Router();

Router.get("/products", async (req, res) => {
  try {
    const prodData = await product.find().sort({ popularity: -1 });
    res.json(prodData);
  } catch (e) {
    res.status(500).json({ e: "Internal Server error" });
  }
});

export default Router;
