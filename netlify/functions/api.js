
import serverless from "serverless-http";
import dotenv from "dotenv";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

dotenv.config({ path: "backend/.env" });

const { app, connectDB } = require("../../backend/app");

const expressHandler = serverless(app);

export const handler = async (event, context) => {
    await connectDB();
    return expressHandler(event, context);
};
