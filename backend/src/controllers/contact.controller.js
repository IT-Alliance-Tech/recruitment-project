const Contact = require("../models/Contact");

/**
 * @desc    Create contact message
 * @route   POST /api/contact
 */
const createContact = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: "Name, Email and Message are required",
      });
    }

    const contact = await Contact.create({
      name,
      email,
      phone,
      message,
    });

    return res.status(201).json({
      success: true,
      data: {
        message: "Contact submitted successfully",
        contact,
      },
    });
  } catch (error) {
    console.error("Contact Error:", error);
    return res.status(500).json({
      success: false,
      error: "FAILED_TO_SUBMIT_CONTACT",
    });
  }
};

module.exports = { createContact };
