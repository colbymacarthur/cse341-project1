const router = require('express').Router();

router.get('/', (req, res) => {res.send('hello world')});

router.get('/users', require('./users'));

module.exports = router;