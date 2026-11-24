
import serverless from "serverless-http";
import { app, connectDB } from "../../backend/app.js";

const expressHandler = serverless(app);

export const handler = async (event, context) => {
    await connectDB();
    return expressHandler(event, context);
};
