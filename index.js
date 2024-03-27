const { scrapper } = require('./src/scrapper/scrapper');
const express = require('express');
const cors = require("cors");

const app = express();
app.use(cors());

const searchWordFunction = async (req, res, next) => {
    try {
        const { key } = req.params;
        const funkos = await scrapper(`https://funko.com/search/?q=${key}&search-button=`, key)
        return res.status(200).json(funkos);
    } catch (error) {
        return res.status(400).json('ruta no encontrada')
    }
};

const searchByCategory = async (req, res, next) => {
    try {
        const { key } = req.params;
        const funkos = await scrapper(`https://funko.com/fandoms/?q=${key}&search-button=`, key)
        return res.status(200).json(funkos);
    } catch (error) {
        return res.status(400).json('ruta no encontrada')
    }
};

app.use('/api/v1/funko/:key', searchWordFunction) 
app.use('/api/v1/cat/:key', searchByCategory) 


app.listen(4001, () => {
    console.log(`Escuchando en el puerto http://localhost:4001`);
})









