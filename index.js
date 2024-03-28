const {searchWordFunction, searchByCategory} = require('./src/routes/routes');
const express = require('express');
const cors = require("cors");

const app = express();
app.use(cors());

app.use('/api/v1/funko/:key', searchWordFunction) 
app.use('/api/v1/cat/:key', searchByCategory) 

app.listen(4001, () => {
    console.log(`Escuchando en el puerto http://localhost:4001`);
})









