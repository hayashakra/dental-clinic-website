
require("dotenv").config();

const { app, connectDB } = require("./app");

const PORT = process.env.PORT || 5000;

connectDB()
    .then(() => {
        console.log("MongoDB connected successfully!");

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("MongoDB connection error:", error.message);
    });
