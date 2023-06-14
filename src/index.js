const express = require("express");
const app = express();
const port = 3000;

const globalRouter = require('./routes/routes');
const Associations = require("./models/association")();

const db = require('./databases/connection');

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use('/api/', globalRouter);

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
