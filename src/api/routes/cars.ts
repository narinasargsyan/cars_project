import * as express from "express";
const carsRouter = express.Router();
import CarsController from "../controllers/cars";

const cars = new CarsController();

carsRouter.post("/add", cars.addCars);
carsRouter.get("/sort/ascPrice", cars.sortByPriceAsc);
carsRouter.get("/sort/descPrice", cars.sortByPriceDesc);
carsRouter.get("/sort/yearAsc", cars.sortByYearAsc)
carsRouter.get("/sort/yearDesc", cars.sortByYearDesc);
carsRouter.get("/sort/asc", cars.sortAsc);
carsRouter.get("/sort/desc", cars.sortDesc);

carsRouter.delete("/delete", cars.deleteCars);

export { carsRouter };
