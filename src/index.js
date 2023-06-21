const express = require("express");
var app = express();
const port = 3000;
var bodyParser = require('body-parser');
const globalRouter = require('./routes/routes');

const db = require('./databases/connection');

app.use(express.json())
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())

app.use('/api', globalRouter);
var userFunction = require("./controllers/UserController");
const initApp = async () => { 
    console.log("Testing database connection");
    try {
        await db.authenticate();
        console.log("Successfully connected!");

        app.listen(port, () =>
            console.log(`App listening on port ${port}!`)
        );
    } catch (error) {
        console.error("Failure database connection : ", error.original);
    }
}
initApp();
app.post("/api/users/register", userFunction.addUser);

module.exports = app;


