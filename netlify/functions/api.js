
import serverless from "serverless-http";
import { createRequire } from "node:module";
import path from "node:path";

const require = createRequire(
    path.join(process.cwd(), "netlify/functions/api.js")
);

const { app, connectDB } = require("../../backend/app");

const expressHandler = serverless(app);

export const handler = async (event, context) => {
    await connectDB();
    return expressHandler(event, context);
};
