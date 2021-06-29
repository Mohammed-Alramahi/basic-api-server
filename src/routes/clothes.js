"use strict";

const express = require("express");
const validator = require("../middleware/validator");
const clothesRouter = express.Router();
const Clothes = require("../models/clothes");
const clothes = new Clothes();

clothesRouter.post("/", validator, create);

clothesRouter.get("/", get);

clothesRouter.get("/:id", get);

clothesRouter.put("/:id", validator, update);

clothesRouter.delete("/:id", remove);

function create(req, res) {
  res.json(clothes.create(req.body));
}

function get(req, res) {
  res.json(clothes.read(req.params.id));
}

function update(req, res) {
  res.json(clothes.update(req.params.id, req.body));
}

function remove(req, res) {
  res.json(clothes.delete(req.params.id));
}

module.exports = clothesRouter;
