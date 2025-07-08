const { scrapper } = require('../scrapper/scrapper');

const searchWordFunction = async (req, res, next) => {
    try {
        const { key } = req.params;
        const funkos = await scrapper(`https://funko.com/search/?q=${key}`, key)
        return res.status(200).json(funkos);
    } catch (error) {
        return res.status(400).json('ruta no encontrada')
    }
};

const searchByCategory = async (req, res, next) => {
    try {
        const { key } = req.params;
        const funkos = await scrapper(`https://funko.com/fandoms/?q=${key}/`, key)
        return res.status(200).json(funkos);
    } catch (error) {
        return res.status(400).json('ruta no encontrada')
    }
};

module.exports = {searchWordFunction, searchByCategory};