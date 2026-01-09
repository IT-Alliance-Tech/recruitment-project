const Client = require("../models/Client");

/**
 * Get all clients
 */
const getAllClients = async (req, res) => {
  try {
    const clients = await Client.find().sort({ createdAt: -1 });

    return res.status(200).json({
      statusCode: 200,
      success: true,
      error: null,
      data: {
        message: "Clients retrieved successfully",
        clients,
      },
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      success: false,
      error: "FAILED_TO_FETCH_CLIENTS",
      data: null,
    });
  }
};

/**
 * Create client
 */
const createClient = async (req, res) => {
  try {
    const client = await Client.create(req.body);

    return res.status(201).json({
      statusCode: 201,
      success: true,
      error: null,
      data: {
        message: "Client created successfully",
        client,
      },
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      success: false,
      error: "FAILED_TO_CREATE_CLIENT",
      data: null,
    });
  }
};

/**
 * Get client by ID
 */
const getClientById = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);

    if (!client) {
      return res.status(404).json({
        statusCode: 404,
        success: false,
        error: "CLIENT_NOT_FOUND",
        data: null,
      });
    }

    return res.status(200).json({
      statusCode: 200,
      success: true,
      error: null,
      data: { client },
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      success: false,
      error: "FAILED_TO_FETCH_CLIENT",
      data: null,
    });
  }
};

/**
 * Update client
 */
const updateClient = async (req, res) => {
  try {
    const updatedClient = await Client.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    return res.status(200).json({
      statusCode: 200,
      success: true,
      error: null,
      data: { client: updatedClient },
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      success: false,
      error: "FAILED_TO_UPDATE_CLIENT",
      data: null,
    });
  }
};

/**
 * Delete client
 */
const deleteClient = async (req, res) => {
  try {
    await Client.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      statusCode: 200,
      success: true,
      error: null,
      data: { message: "Client deleted successfully" },
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      success: false,
      error: "FAILED_TO_DELETE_CLIENT",
      data: null,
    });
  }
};

module.exports = {
  getAllClients,
  createClient,
  getClientById,
  updateClient,
  deleteClient,
};
