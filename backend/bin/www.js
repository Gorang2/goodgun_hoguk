const app = require("../App.js");

require("dotenv").config();
const PORT = process.env.PORT;
app.listen(3000, () => {
    console.log("Listening to port", 3000);
})
