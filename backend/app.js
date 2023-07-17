const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const pokemonRouter = require("./routes/pokemon");
const { errorHandler } = require("./middleware/errorHandler");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const port = 3001;

mongoose
    .connect("mongodb://127.0.0.1:27017/Pokedex", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Connected to the database");
    })
    .catch((error) => {
        console.error("Error connecting to the database:", error);
    });

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/pokemon", pokemonRouter);

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app;
