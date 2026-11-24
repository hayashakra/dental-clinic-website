
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const helmet = require("helmet");

const appointmentRoutes = require("./routes/appointmentRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

app.use(cors({
    origin: [
        "http://localhost:5173",
        "http://localhost:5181",
        "https://hayashakra.github.io",
        "https://dental-clinic-website-lxay.netlify.app"],
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

let connectionPromise = null;

async function connectDB() {
    if (mongoose.connection.readyState === 1) {
        return;
    }

    if (!connectionPromise) {
        connectionPromise = mongoose.connect(process.env.MONGO_URI)
            .catch((error) => {
                connectionPromise = null;
                throw error;
            });
    }

    await connectionPromise;
}

module.exports = { app, connectDB };
