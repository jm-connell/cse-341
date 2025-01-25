const controller = require("../controllers/contacts");
const routes = require("express").Router();

routes.get("/", controller.getContacts);
routes.get("/:id", controller.getContactById);
routes.post("/create-contact", controller.createContact);
routes.put("/:id", controller.updateContact);
routes.delete("/:id", controller.deleteContact);

module.exports = routes;
