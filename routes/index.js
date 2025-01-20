const controller = require("../controllers");
const routes = require("express").Router();

routes.get("/", controller.homeRoute);

module.exports = routes;
