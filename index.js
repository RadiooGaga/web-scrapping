const {searchWordFunction, searchByCategory} = require('./src/routes/routes');
const express = require('express');
const cors = require("cors");
require('dotenv').config();

const PORT = process.env.PORT || 4000;
//console.log(PORT);   


const app = express();
app.use(cors());

app.use('/api/v1/funko/:key', searchWordFunction) 
app.use('/api/v1/cat/:key(*)', searchByCategory) 

app.listen(PORT, () => {
    console.log(`Escuchando en el puerto http://localhost:${PORT}`);
})









