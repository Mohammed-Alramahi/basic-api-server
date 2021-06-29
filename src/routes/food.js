"use strict";

const express = require("express");
const validator = require("../middleware/validator");
const foodRouter = express.Router();
const Food = require("../models/food");
const food = new Food();

foodRouter.get("/", get);
foodRouter.post("/", validator, create);
foodRouter.get("/:id", get);
foodRouter.put("/:id", validator, update);
foodRouter.delete("/:id", remove);

function create(req, res) {
  res.json(food.create(req.body));
}

function get(req, res) {
  res.json(food.read(req.params.id));
}

function update(req, res) {
  res.json(food.update(req.params.id, req.body));
}

function remove(req, res) {
  res.json(food.delete(req.params.id));
}

module.exports = foodRouter;
