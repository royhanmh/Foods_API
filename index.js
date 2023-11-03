const express = require("express");
const cors = require("cors");
const app = express();
const fs = require("fs");
const path = require("path");
app.use(express.json());
app.use(express.static("public"));
app.use(cors());
// connectDB();
// const dashboardRoute = require("./routes/dashboard"); // Import the dashboard route module
const foodsRoute = require("./routes/foods"); // Import the foods route module
// const categoriesRoute = require("./routes/categories");

// app.use('/dashboard', dashboardRoute); // Use the dashboard route
app.use("/foods", foodsRoute); // Use the foods route
// app.use("/categories", categoriesRoute); // Use the categories route

app.use("/images", (req, res) => {
  const requestedImage = req.url.slice(1);
  fs.access(path.join(__dirname, "images", requestedImage), (err) => {
    if (err) {
      res.sendFile(path.join(__dirname, "images", "noImage.jpg"));
    } else {
      res.sendFile(path.join(__dirname, "images", requestedImage));
    }
  });
});

// Define a route to serve the dashboard
app.get("/dashboard", (req, res) => {
  // Use path to locate the dashboard.html file
  res.sendFile(path.join(__dirname, "public/dashboard.html"));
});

app.listen(process.env.PORT || 3002, () => {
  console.log("Server is running on http://localhost:3002");
});
