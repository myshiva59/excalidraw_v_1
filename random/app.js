const fs = require("fs");
const http = require("http");

var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
// let bodyParser = require("body-parser");
// const busboy = require("connect-busboy");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();
const server = http.createServer(app);

app.all("*", (req, res, next) => {
  // update to match the domain you will make the request from
  // res.header("Access-Control-Allow-Origin", "localhost");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept",
  );
  next();
});
app.use(logger("dev"));
app.use(express.static(__dirname));
// app.use(
//   bodyParser.urlencoded({
//     extended: true,
//   }),
// );
// app.use(bodyParser.json());
// app.use(busboy({ immediate: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const port = 9099;
console.log(`Listening at ${port}`);
server.listen(port);
console.log(
  'POST image data to /upload with body - \n{\n  name: "",\n  data: blob_data\n}',
);

app.post("/upload", (req, res) => {
  req.on("readable", async function () {
    let bloData = await req.read();
  });
  console.log("Data received in body- ");
  res.send("Nothing");
});

app.use("/", indexRouter);
app.use("/users", usersRouter);

module.exports = app;
