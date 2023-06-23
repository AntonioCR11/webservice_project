const express = require("express");
const path = require("path");
var app = express();
const port = 3000;

// databases
const db = require('./databases/connection');

// Global Middlewares
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

// Routes
const globalRouter = require('./routes/routes');
const thirdPartyApiRouter = require('./routes/thirdPartyAPIRoutes');

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


