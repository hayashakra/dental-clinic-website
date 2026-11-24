
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const rateLimit = require("express-rate-limit");
const router = express.Router();
console.log("Admin routes loaded");

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 20,
    message: {
        message: "تم تجاوز عدد محاولات تسجيل الدخول. حاولي بعد 15 دقيقة.",
    },
});


// Admin login
router.post("/login", loginLimiter, async (req, res) => {
    try {
        console.log("LOGIN ROUTE REACHED");

        console.log("Login request received");
        console.log("Username received:", JSON.stringify(req.body.username));
        console.log("Username configured:", JSON.stringify(process.env.ADMIN_USERNAME));

        const { username, password } = req.body;

        if (username !== process.env.ADMIN_USERNAME) {
            console.log("Username mismatch");
            return res.status(401).json({
                message: "بيانات تسجيل الدخول غير صحيحة.",
            });
        }

        const isPasswordValid = await bcrypt.compare(
            password,
            process.env.ADMIN_PASSWORD_HASH
        );

        console.log("Password comparison result:", isPasswordValid);
        console.log("Hash loaded:", Boolean(process.env.ADMIN_PASSWORD_HASH));

        if (!isPasswordValid) {
            return res.status(401).json({
                message: "بيانات تسجيل الدخول غير صحيحة.",
            });
        }

        const token = jwt.sign(
            { role: "admin" },
            process.env.JWT_SECRET,
            { expiresIn: "2h" }
        );

        res.json({ token });
    } catch (error) {
        res.status(500).json({
            message: "حدث خطأ أثناء تسجيل الدخول.",
        });
    }
});

module.exports = router;
