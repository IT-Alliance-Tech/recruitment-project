const express = require("express");
const router = express.Router();

const {
  getAllClients,
  createClient,
  getClientById,
  updateClient,
  deleteClient,
} = require("../controllers/client.controller");

// Routes
router.get("/", getAllClients);
router.post("/", createClient);
router.get("/:id", getClientById);
router.put("/:id", updateClient);
router.delete("/:id", deleteClient);

module.exports = router;
