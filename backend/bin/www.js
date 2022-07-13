const app = require("../App.js");

require("dotenv").config();
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log("Listening to port", PORT);
})