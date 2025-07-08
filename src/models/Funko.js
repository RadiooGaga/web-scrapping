const mongoose = require('mongoose');

mongoose.set('strict', false); 
mongoose.set('strictQuery', false); 
mongoose.set('strictPopulate', false); 


const funkoSchema = new mongoose.Schema(
{
    title: String,
    img: String,
    price: String
},
{
    collection: "funkos"
});

const Funko = mongoose.model("funko", funkoSchema);

module.exports = Funko;