const controller = require("../controllers");
const routes = require("express").Router();

routes.get("/", controller.contactRoute);
routes.get("/:id", controller.getContactById);

module.exports = routes;
