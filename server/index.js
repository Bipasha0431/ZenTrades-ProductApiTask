import express from "express";
import mongoose from "mongoose";
import prodRoute from "./Route/prodRoute.js";
import Product from "./model/product.js";
import axios from "axios";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect("mongodb://127.0.0.1:27017", {
    dbName: "ProductsDB",
  })
  .then(() => {
    console.log("Database connected...");
  })
  .catch((e) => {
    console.log("e");
  });

const fetchApiData = async () => {
  try {
    const apiRes = await axios.get(
      "https://s3.amazonaws.com/open-to-cors/assignment.json"
    );
    const apiData = apiRes.data;

    const newData = Object.keys(apiData.products).map((Id) => ({
      subcategory: apiData.products[Id].subcategory,
      title: apiData.products[Id].title,
      price: parseFloat(apiData.products[Id].price) || 0,
      popularity: parseInt(apiData.products[Id].popularity) || 0,
    }));

    // console.log("New Data:", newData);
    await Product.deleteMany({});

    await Product.insertMany(newData);

    console.log("Data fetched and stored successfully");
  } catch (e) {
    console.error(e);
  }
};

fetchApiData();
app.use("/api", prodRoute);

app.listen(3001, () => {
  console.log("server is working...");
});
