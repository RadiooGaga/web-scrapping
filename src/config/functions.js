//función para extraer los datos elegidos de cada funko

const extractData = async (page, selector, mapFunction) => {
    const data = await page.$$eval(selector, mapFunction);
        return data;
}; 

module.exports = { extractData };