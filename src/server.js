require("dotenv").config();
require("../config/db");
const path = require("path");
const express = require("express");
const fileupload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");
const errorHandler = require("./middleware/error");

// Route files
const bootcamps = require("./routes/bootcamps");
const courses = require("./routes/courses");
const auth = require("./routes/auth");
const users = require("./routes/users");
const reviews = require("./routes/reviews");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(fileupload());
app.use(express.static(path.join(__dirname, "public")));
app.use(errorHandler);

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 100,
});
app.use(limiter);

// Mount routers
app.use("/api/v1/bootcamps", bootcamps);
app.use("/api/v1/courses", courses);
app.use("/api/v1/auth", auth);
app.use("/api/v1/users", users);
app.use("/api/v1/reviews", reviews);
app.use((req, res) => {
  res.status(404).json({ message: "Resource not found!" });
});

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
