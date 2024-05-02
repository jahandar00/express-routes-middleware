const express = require("express");
const path = require("path");

const app = express();


//middleware
app.use(express.json());
app.use(express.urlencoded());
app.use("/public", express.static(path.resolve("assets")));
app.use("/assets", (req, res, next) => {
    const token = req.headers['authorization'];
    if (token) {
        next();
    } else {
        res.end("Unauthorized request!")
    }
})

app.get('/', (req, res) => {
    res.sendFile(path.resolve("index.html"));
    console.log("Yes, request received");
})

app.post('/', (req, res) => {
    console.log(req.body);
    res.end("OK!")

})


app.listen(8080, () => {
    console.log("express server started");
});

