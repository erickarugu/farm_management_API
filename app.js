const http = require('http');
const express = require("express");
const cors = require("cors");
const logger = require('morgan');

const db = require("./config/database");
let userRoute = require('./routes/users');
let activityRoute = require('./routes/activities');

const app = express();

/** Get port from environment and store in Express. */
const port = process.env.PORT || "3030";
app.set("port", port);

// logging
if (process.env.NODE_ENV === "development") {
  app.use(logger("dev"));
}

// force: true will drop the table if it already exists
db.sequelize.sync().then(() => {
  console.log('Syncing the model to the database');
});
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//serve files in public folder
app.use(express.static('public'));

app.get("/", (req, res) => {
  res.json({ message: "Hi there, welcome to Famajo API" });
});

// api routes
app.use("/api/v1/users", userRoute.router);
app.use("/api/v1/activities", activityRoute.router);

/** Create HTTP server. */
const server = http.Server(app);

/** Listen on provided port, on all network interfaces. */
server.listen(port);
/** Event listener for HTTP server "listening" event. */
server.on("listening", () => {
  console.log(`Server is running on port ${port}`);
});