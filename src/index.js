const express = require("express");
var app = express();
const port = 3000;

var bodyParser = require('body-parser');

// routes
const globalRouter = require('./routes/routes');
const thirdPartyApiRouter = require('./routes/thirdPartyAPIRoutes');

// databases
const db = require('./databases/connection');

app.use(express.json())
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())

app.use('/api', globalRouter);
app.use('/api/thirdPartyAPI', thirdPartyApiRouter);

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

module.exports = app;


