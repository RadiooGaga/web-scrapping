const mongoose = require('mongoose');
const Funko = require('../models/Funko');


//conectar a DB
const connectDB =  async () => {
    try {
        
        await mongoose.connect(process.env.URL_DB)
        console.log('Conectado a la base de datos Funko 💅')
    } catch (error) {
        console.log('error al conectar a la base de datos ❌')
        process.exit(1)
    }
}


//borra los que hay en la DB e inserta los nuevos en cada búsqueda.
const insertDocuments = async (data) => {
    try {
        const checkFunkos = await Funko.find();

        if (checkFunkos.length > 0) {
            await Funko.collection.drop();
            console.log("Colección Funko eliminada");
        }

        await Funko.insertMany(data);
        console.log("Nuevos documentos insertados en la colección Funko");

    } catch (error) {
        console.error("Error al guardar los documentos:", error);
    }
};


module.exports =  { connectDB, insertDocuments };

