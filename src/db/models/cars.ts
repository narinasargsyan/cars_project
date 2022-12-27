import mongoose from 'mongoose';

const carsSchema = new mongoose.Schema(
    {
        brand: { type: String, required: true },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        productionYear: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);
const Cars = mongoose.model('Cars', carsSchema);
export default Cars;
