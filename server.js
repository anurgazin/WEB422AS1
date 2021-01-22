/*********************************************************************************
 * WEB422 – Assignment 1
 * I declare that this assignment is my own work in accordance with Seneca Academic Policy.
 * No part of this assignment has been copied manually or electronically from any other source
 * (including web sites) or distributed to other students.
 *
 * Name: _____Aldiyar Nurgazin_________________ Student ID: ____121026199__________ Date: __2021.01.22______________
 * Heroku Link: _______________________________________________________________
 *
 ********************************************************************************/
var express = require("express");
var cors = require("cors");
const bodyParser = require("body-parser");
const RestaurantDB = require("./modules/restaurantDB.js");
const db = new RestaurantDB(
  "mongodb+srv://dbNur:NANmas@1903@cluster0.lts19.mongodb.net/sample_restaurants?retryWrites=true&w=majority"
);
var app = express();
var HTTP_PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(cors());
app.get("/", function (req, res) {
  res.send({ message: "API Listening" });
});

app.post("/api/restaurants", (req, res) => {
  db.addNewRestaurant(req.body)
    .then((message) => res.status(201).json(message))
    .catch((err) => {
      res.json(`Error with an adding restaurant: ${err}`);
    });
  console.log(req.body);
});

app.get("/api/restaurants/", (req, res) => {
  db.getAllRestaurants(req.query.page, req.query.perPage, req.query.borough)
    .then((message) => {
      res.status(201).json(message);
    })
    .catch((err) => {
      res.json(`Error with a searching restaurants: ${err}`);
    });
});

app.get("/api/restaurants/:id", (req, res) => {
  db.getRestaurantById(req.params.id)
    .then((message) => {
      res.status(201).json(message);
    })
    .catch((err) => {
      res.json(`Error with an searching restaurant: ${err}`);
    });
});

app.put("/api/restaurants/:id", (req, res) => {
  db.updateRestaurantById(req.body, req.params.id)
    .then((message) => {
      res.status(201).json(message);
    })
    .catch((err) => {
      res.json(`Error with an updating restaurant: ${err}`);
    });
});

app.delete("/api/restaurants/:id", (req, res) => {
  db.deleteRestaurantById(req.params.id)
    .then((message) => {
      res.status(201).json(message);
    })
    .catch((err) => {
      res.json(`Error with an deleting restaurant: ${err}`);
    });
});

db.initialize()
  .then(() => {
    app.listen(HTTP_PORT, () => {
      console.log(`server listening on: ${HTTP_PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
