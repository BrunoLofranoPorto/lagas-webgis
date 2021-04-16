const express = require("express");
app = express();

const port = process.env.PORT || 3000;

app.use(express.static("dist"));

app.get("/", function(req, res) {
    res.send("servidor de pé!")
});

app.listen(port, () => console.log("servidor de pé!"));




