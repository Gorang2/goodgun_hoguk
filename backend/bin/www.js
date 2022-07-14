const Appjs= require("../App.js");

const app = Appjs.app;
require("dotenv").config();
const SERVER_PORT = process.env.SERVER_PORT;
app.listen(SERVER_PORT, () => {
    console.log("Listening to port", SERVER_PORT);
})