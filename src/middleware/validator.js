"use strict";

module.exports = (req, res, next) => {
  if (!req.body.name || !req.body.description) {
    next("check for missing parameters");
  } else {
    next();
  }
};
