
const bcrypt = require("bcryptjs");
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.question("Enter your admin password: ", async (password) => {
    const hash = await bcrypt.hash(password, 10);

    console.log("\nYour encrypted password:");
    console.log(hash);

    rl.close();
});
