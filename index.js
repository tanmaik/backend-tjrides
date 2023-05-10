const express = require("express");
const bodyParser = require("body-parser");
const HttpError = require("./models/http-error");
const cors = require("cors");

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

const authRoutes = require("./routes/auth");

const app = express();

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

  res.setHeader("Content-Type", "application/json");
  res.setHeader("Accept", "application/json");

  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  res.setHeader("GET", "POST", "OPTIONS");
  next();
});

app.use("/api/auth", authRoutes);

app.get("/", (req, res, next) => {
  res.json({ message: "Look for a route." });
});

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});

app.listen(5000);
