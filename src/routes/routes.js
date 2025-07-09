const { scrapper } = require('../scrapper/scrapper');
require('dotenv').config();

const searchWordFunction = async (req, res, next) => {
    try {
        const { key } = req.params;
        const page = parseInt(req.query.page) || 1;
        const pageSize = 20;
        const start = (page - 1) * pageSize;

        const url = `https://funko.com/search/?q=${key}&start=${start}&sz=${pageSize}`;
        const { funkoProducts, totalResults } = await scrapper(url, key);
        const totalPages = Math.ceil(totalResults / pageSize);

        return res.status(200).json({
            products: funkoProducts,
            currentPage: page,
            totalPages
        });
    } catch (error) {
        return res.status(400).json('ruta no encontrada');
    }
};

const searchByCategory = async (req, res, next) => {
    try {
        let key = decodeURIComponent(req.params.key) || '';
        const page = parseInt(req.query.page) || 1;
        const pageSize = 20;
        const start = (page - 1) * pageSize;

            const url = key === '' 
            ? `https://funko.com/fandoms/?start=${start}&sz=${pageSize}`
            : `https://funko.com/fandoms/${key}?start=${start}&sz=${pageSize}`;
        const { funkoProducts, totalResults } = await scrapper(url, key);
        const totalPages = Math.ceil(totalResults / pageSize);
        console.log(funkoProducts);

        return res.status(200).json({
            products: funkoProducts,
            currentPage: page,
            totalPages
        });
    } catch (error) {
        return res.status(400).json('ruta no encontrada');
    }
};

module.exports = {searchWordFunction, searchByCategory};