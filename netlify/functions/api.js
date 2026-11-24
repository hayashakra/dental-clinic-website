import serverless from "serverless-http";
import { app, connectDB } from "../../backend/app.js";

export const handler = async (event, context) => {
    try {
        await connectDB();

        if (event.path.includes("/api/admin/login")) {
            console.log("ADMIN_USERNAME loaded:", Boolean(process.env.ADMIN_USERNAME));
            console.log("ADMIN_PASSWORD_HASH loaded:", Boolean(process.env.ADMIN_PASSWORD_HASH));
            console.log("JWT_SECRET loaded:", Boolean(process.env.JWT_SECRET));
        }

        const expressHandler = serverless(app);
        return await expressHandler(event, context);
    } catch (error) {
        console.error("Function error:", error.message);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Server error" })
        };
    }
};