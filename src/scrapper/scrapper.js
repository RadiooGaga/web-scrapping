const puppeteer = require('puppeteer');
const { connectDB, insertDocuments } = require('../config/db');
const { extractData } = require('../config/functions');
const fs = require('fs');

const scrapper = async (url, topic) => {
    await connectDB()
   
    const browser = await puppeteer.launch({
        headless: false, // 'new' en produccion
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

    
    // Intenta obtener el número total de resultados de la página original
    const totalText = await extractData(page, 'div.item-count span', nodes =>
    nodes.map(node => node.innerText)
    );

    let totalResults = 0;

    for (const text of totalText) {
    const match = text.match(/of\s+([\d,]+)/i);
        if (match) {
            totalResults = parseInt(match[1].replace(/,/g, ''));
            break;
        }
    }
    console.log("totalText:", totalText);
    console.log("totalResults calculado:", totalResults);


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
   

    //generamos un json del producto con lo que sacamos de él: title.slice(0, 1).map para probar 1
    const funkoProducts = title.map((value, index) => ({
        title: title[index],
        img: img[index],
        price: price[index]
    }));
    
    console.log(funkoProducts)

    //lo guardamos en DB
    insertDocuments(funkoProducts);
  

     //Con FS escribimos un nuevo fichero {}.json con los productos
     try {
        fs.writeFile(`../${topic}.json`, JSON.stringify(funkoProducts), (err) => {
            if (err) {
                console.log(err)
            } else {
                console.log("archivo guardado")
            }
        });
     } catch (error) {
        console.log("no se ha guardado donde se tiene que guardar", error)
     }
    
    
    //cerramos navegador, aviso de guardado y retornamos el funko
    await browser.close();
    console.log(`búsqueda realizada: ${topic} Todos guardados !!`);
    return {
        funkoProducts,
        totalResults
    }
}

module.exports = { scrapper };
