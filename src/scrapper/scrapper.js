const puppeteer = require('puppeteer');
const { connectDB, insertDocuments } = require('../config/db');
const { extractData } = require('../config/extractData');
const Funko = require('../models/Funko');
const fs = require('fs');

const scrapper = async (url, topic) => {
    await connectDB()
   
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: ['--start-maximized']
    })
    
    const page = await browser.newPage();
    await page.goto(url);
    const timeout = 2000;

    try {
        const pagination = await page.waitForSelector('.btn-pagination', { timeout });
        console.log("hay paginación", pagination) 
    } catch (error) {
        console.log("Aquí no hay elementos de paginación, mi ciela", error)
    }
    
    
    //los datos que quiero
    const title = await extractData(page, 'a.product-name', nodes =>
        nodes.map(node => node.innerText)
    );
    const img = await extractData(page, 'img.tile-main-image', nodes =>
        nodes.map(node => node.getAttribute('src'))
    );
    const price = await extractData(page, 'span.sales', nodes =>
        nodes.map(node => node.innerText)
    );
   

    //generamos un json del producto con lo que sacamos de él
    const funkoProduct = title.map((value, index) => ({//title.slice(0, 1).map para probar 1
        title: title[index],
        img: img[index],
        price: price[index]
    })); 
  
    //generamos la aleatoriedad de la aparición de los datos
    //console.log(generateRandomRange(funkoProduct))
   
    //que metemos en DB
    insertDocuments(funkoProduct);
  
     //Con FS escribimos un nuevo fichero {}.json con los productos
    fs.writeFile(`${topic}.json`, JSON.stringify(funkoProduct), (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log("archivo guardado")
        }
    });
    
   
    //cerramos navegador, aviso de guardado y retornamos el funko
    await browser.close();
    console.log('Todos guardados !!');
    return funkoProduct;
}

module.exports = { scrapper };
