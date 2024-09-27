const express = require('express');
const mongodb = require('./data/database');
const bodayParser = require('body-parser');
const app = express();

const port = process.env.PORT || 3000;
app.use(bodayParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
    );
    res.setHeader('Access-Control-Allow-Methods',
        'GET, POST, PATCH, PUT, DELETE, OPTIONS'
    );
    next();
})

app.use('/', require('./routes/index'));

mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    } 
    else {
        app.listen(port, () => {
            console.log(`Database is listening and running on ${port}`);
        })
    }
}); 