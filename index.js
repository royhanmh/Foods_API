const express = require("express");
const cors = require("cors");
const app = express();
const fs = require("fs");
const path = require("path");
app.use(express.json());
app.use(express.static("public"));
app.use(cors());

const foodsRoute = require("./routes/foods");

app.use("/foods", foodsRoute);

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

app.get("/dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "public/dashboard.html"));
});

app.listen(process.env.PORT || 3002, () => {
  console.log("Server is running on http://localhost:3002");
});
