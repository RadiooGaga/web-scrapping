//función para extraer los datos elegidos de cada funko

// busca las páginas que hay, en qué div, y los resultados (numero de productos total)

const extractData = async (page, selector, mapFunction) => {
    const data = await page.$$eval(selector, mapFunction);
    //console.log(data)
    return data;
}; 

module.exports = { extractData };