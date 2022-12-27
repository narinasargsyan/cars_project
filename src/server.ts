import express from "express";
import { Express } from "express";
import mongoose from 'mongoose';
import * as bodyParser from "body-parser";
import { carsRouter } from "./api/routes/cars";
const jsonParser = bodyParser.json({
    limit: 1024 * 1024 * 1024,
});

const app: Express = express();

const url = `mongodb+srv://Mila:4aNhGPWXNuyAyrd7@cluster0.i5cniud.mongodb.net/task_cars?retryWrites=true&w=majority`;

mongoose.connect( url )
    .then( () => {
        console.log('Connected to database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })

app.use(jsonParser);

app.use("/cars", carsRouter);

app.listen(3000, () => {
    console.log("started the server")
});
