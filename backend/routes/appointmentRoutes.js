
const express = require("express");
const router = express.Router();

const Appointment = require("../models/Appointment");

const adminAuthentication = require("../authentication/adminAuthentication");

// Get all appointments
router.get("/", adminAuthentication, async (req, res) => {
    try {
        const appointments = await Appointment.find().sort({ createdAt: -1 });

        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch appointments.",
            error: error.message,
        });
    }
});

// Create a new appointment
router.post("/", async (req, res) => {
    try {
        const name = typeof req.body.name === "string" ? req.body.name.trim() : "";
        const phone = typeof req.body.phone === "string" ? req.body.phone.trim() : "";
        const email = typeof req.body.email === "string" ? req.body.email.trim() : "";
        const service = typeof req.body.service === "string" ? req.body.service.trim() : "";
        const date = typeof req.body.date === "string" ? req.body.date.trim() : "";
        const time = typeof req.body.time === "string" ? req.body.time.trim() : "";

        if (!name || !phone || !service || !date || !time) {
            return res.status(400).json({
                message: "Please fill in all required fields.",
            });
        }

        if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return res.status(400).json({
                message: "Invalid email address.",
            });
        }

        const appointment = await Appointment.create({
            name,
            phone,
            email: email || undefined,
            service,
            date,
            time,
        });

        res.status(201).json({
            message: "Appointment created successfully!",
            appointment,
        });
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong.",
            error: error.message,
        });
    }
});

// Update appointment status
router.patch("/:id", adminAuthentication, async (req, res) => {
    try {
        const { status } = req.body;

        if (!["pending", "confirmed", "cancelled"].includes(status)) {
            return res.status(400).json({
                message: "Invalid appointment status.",
            });
        }

        const appointment = await Appointment.findByIdAndUpdate(
            req.params.id,
            { status },
            { returnDocument: "after", runValidators: true });

        if (!appointment) {
            return res.status(404).json({
                message: "Appointment not found.",
            });
        }

        res.status(200).json({
            message: "Appointment status updated successfully!",
            appointment,
        });
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong.",
            error: error.message,
        });
    }
});



// Delete an appointment
router.delete("/:id", adminAuthentication, async (req, res) => {
    try {
        console.log("DELETE REQUEST:", req.params.id);

        const appointment = await Appointment.findByIdAndDelete(
            req.params.id
        );

        if (!appointment) {
            return res.status(404).json({
                message: "Appointment not found.",
            });
        }

        console.log("APPOINTMENT DELETED:", appointment._id);

        res.status(200).json({
            message: "Appointment deleted successfully!",
        });
    } catch (error) {
        console.error("DELETE ERROR:", error);

        res.status(500).json({
            message: "Failed to delete appointment.",
            error: error.message,
        });
    }
});


module.exports = router;
