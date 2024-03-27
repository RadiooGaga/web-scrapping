//función para extraer los datos elegidos de cada funko

const extractData = async (page, selector, mapFunction) => {
    const data = await page.$$eval(selector, mapFunction);
    console.log(data)
        return data;
}; 

/*
const generateRandomRange = async (data) => {
    let start = Math.floor(Math.random() * data.length); 
    // Generamos un índice aleatorio dentro del rango de la longitud de los datos
    if (start >= data.length - 20) {
        start -= 20;
    }
    let end = start + 20;
    console.log(data.length)
    return { start, end }; 
    // Retornamos un objeto con el inicio y fin del rango aleatorio
};
*/
module.exports = { extractData };