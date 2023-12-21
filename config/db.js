/**
 * dependancies
 */

const mongoose = require("mongoose");

//connected to db
mongoose.connect(process.env.DATABASE_URL);

//connection status listeners
mongoose.connection.on("error", (err) =>
  console.log(err.message + " there is an error")
);
mongoose.connection.on("connected", () => console.log("Connected to db"));
mongoose.connection.on("disconnected", () => console.log("Disconnected to db"));
