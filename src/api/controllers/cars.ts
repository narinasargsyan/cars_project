import Cars from "../../db/models/cars";

class CarsController {
    addCars = async (req, res) => {
        try {
            const cars = new Cars({
                brand: req.body.brand,
                name: req.body.name,
                price: req.body.price,
                productionYear: req.body.productionYear,
            });

            const createdCars = await cars.save()

            res.send({message: "done"})
        } catch (err) {
            res.status(400).send("Something went wrong")
            console.log(err)
        }
    }

    deleteCars = async (req, res) => {
        try {
            const car = await Cars.findById(req.query._id);
            if(!car){
                res.status(400).send("Car not exists");
            }
            const deleteCars = await car.remove();
            res.send({ message: 'Car successfully removed', car: deleteCars });
        } catch (err) {
            res.status(400).send("Something went wrong")
            console.log(err)
        }
    }

    sortByPriceAsc = async (req, res) => {
        try {
            const cars = await Cars.find().sort({ price:1 }).limit(req.query.limit||5);
            res.send({ message: 'Done!',  cars: cars });
        } catch (err) {
            res.status(400).send("Something went wrong")
            console.log(err)
        }
    }

    sortByPriceDesc = async (req, res) => {
        try {
            const cars = await Cars.find().sort({ price:-1 }).limit(req.query.limit||5);
            res.send({ message: 'Done!',  cars: cars });
        } catch (err) {
            res.status(400).send("Something went wrong")
            console.log(err)
        }
    }

    sortByYearAsc = async (req, res) => {
        try {
            const cars = await Cars.find().sort({ productionYear:1 }).limit(req.query.limit||5);
            res.send({ message: 'Done!',  cars: cars });
        } catch (err) {
            res.status(400).send("Something went wrong")
            console.log(err)
        }
    }

    sortByYearDesc = async (req, res) => {
        try {
            const cars = await Cars.find().sort({ productionYear:-1 }).limit(req.query.limit||5);
            res.send({ message: 'Done!',  cars: cars });
        } catch (err) {
            res.status(400).send("Something went wrong")
            console.log(err)
        }
    }

    sortAsc = async (req, res) => {
        try {
            const cars = await Cars.find().sort({ productionYear:1, price:1}).limit(req.query.limit||5);
            res.send({ message: 'Done!',  cars: cars });
        } catch (err) {
            res.status(400).send("Something went wrong")
            console.log(err)
        }
    }

    sortDesc = async (req, res) => {
        try {
            const cars = await Cars.find().sort({ productionYear:-1, price:-1 }).limit( req.query.limit || 5);
            res.send({ message: 'Done!',  cars: cars });
        } catch (err) {
            res.status(400).send("Something went wrong")
            console.log(err)
        }
    }
}

export default CarsController
