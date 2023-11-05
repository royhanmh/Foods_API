const express = require("express");
const router = express.Router();
const connectDB = require("../database/connection");
const foodModel = require("../models/Food");
const path = require("path");

const dotenv = require("dotenv");
dotenv.config();
const baseUrl = process.env.BASE_URL;
connectDB();

router.get("/categories", async (req, res) => {
  try {
    const categories = await foodModel.distinct("category");
    res.json({
      message: "Categories Retrieved Successfully",
      data: categories,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

function capitalizeWords(str) {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

router.get("/categories/:category", async (req, res) => {
  try {
    let category = req.params.category;
    category = capitalizeWords(category);
    const foodsInCategory = await foodModel
      .find({ category: category })
      .select("-__v");

    if (foodsInCategory.length === 0) {
      return res
        .status(404)
        .json({ message: "Category Not Found", data: null });
    }

    res.json({
      message: "Foods Retrieved Successfully",
      data: foodsInCategory,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", data: null });
  }
});

router.post("/", (req, res) => {
  const name = req.body.name;
  const category = req.body.category;
  const description = req.body.description;
  const price = req.body.price;
  const image = req.body.image;

  if (!name || !category || !description || !price || !image) {
    return res.status(400).json({
      message: "Missing Required Fields",
      data: null,
    });
  }

  const validExtensions = [".jpg", ".png", ".jpeg", ".gif"];
  const imageExtension = path.extname(image);

  if (!validExtensions.includes(imageExtension)) {
    return res.status(400).json({
      message: "Invalid Image Extension",
      data: null,
    });
  }

  const foodData = {
    _id: 21,
    name: name,
    category: category,
    description: description,
    price: price,
    image: `${baseUrl}/images/${image}`,
  };

  res.json({ message: "Food Added Successfully", data: foodData });
});

router.get("/", async (req, res) => {
  const limit = parseInt(req.query.limit) || 0;
  const sort = req.query.sort;
  const sortOrder = sort === "desc" ? -1 : 1;

  const filter = { _id: { $gte: 1 } };

  const result = await foodModel
    .find(filter)
    .select("-__v")
    .limit(limit)
    .sort(sort ? { name: sortOrder } : null);

  res.json({ message: "Food Retrieved successfully", data: result });
});

router.get("/:id", async (req, res) => {
  try {
    const result = await foodModel.findById(req.params.id).select("-__v");
    if (!result) {
      res.status(404).send({ message: "Food Not Found", data: {} });
    } else {
      res.json({ message: "Food Retrieved successfully", data: result });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error", data: null });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const existingFood = await foodModel.findById(id);

    if (!existingFood) {
      return res.status(404).json({ message: "Food Not Found", data: null });
    }

    const { name, category, description, price, image } = req.body;

    if (!name || !category || !description || !price || !image) {
      return res.status(400).json({
        message: "Missing Required Fields",
        data: null,
      });
    }

    const validExtensions = [".jpg", ".png", ".jpeg", ".gif"];
    const imageExtension = path.extname(image);

    if (!validExtensions.includes(imageExtension)) {
      return res.status(400).json({
        message: "Invalid Image Extension",
        data: null,
      });
    }

    const updatedData = {
      _id: id,
      name,
      category,
      description,
      price,
      image: `${baseUrl}/images/${image}`,
    };

    res.json({ message: "Food Edited Successfully", data: updatedData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", data: null });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const deletedFood = await foodModel.findById(id).select("-__v");

    if (!deletedFood) {
      return res.status(404).json({ message: "Food not found", data: null });
    }

    // Include the _id field
    deletedFood._id = id;

    res.json({ message: "Food Deleted Successfully", data: deletedFood });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", data: null });
  }
});

module.exports = router;
