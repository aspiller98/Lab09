const path = require("path");
const express = require("express");
const hbs = require("hbs");
const forecast = require('./utils/forecast');
const location = require('./utils/geocode');

const app = express();
const port = process.env.PORT || 3000;

// Define path for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath); // with this you dont have to stick with folder name views
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Yash Jain"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Yash Jain"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "This is some helpful text",
    title: "Help",
    name: "Yash Jain"
  });
});

app.get("/weather", (req, res) => {
  if(!req.query.address) {
    return res.send({
      address: "You must provide an address!"
    });
  };

  location(req.query.address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error });;
      }

      res.send({
        forecast: forecastData,
        location: location,
        address: req.query.address
      });
    })
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Yash Jain",
    errorMsg: "Help article not found."
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Yash Jain",
    errorMsg: "Page not found."
  });
});

app.listen(port, () => console.log("Server is listening on port", port));
