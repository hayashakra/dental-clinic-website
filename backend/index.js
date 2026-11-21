
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const appointmentRoutes = require("./routes/appointmentRoutes");
const adminRoutes = require("./routes/adminRoutes");
require("dotenv").config();
const helmet = require("helmet");

const app = express();

app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://hayashakra.github.io"
    ],
}));
app.use(helmet());
app.use(express.json());
app.use("/api/appointments", appointmentRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
    res.send("Lulu Dental Clinic Backend is running!");
});

app.get("/api/health", (req, res) => {
    res.json({ status: "OK" });
});

const PORT = process.env.PORT || 5000;

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected successfully!");

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("MongoDB connection error:", error.message);
    });
