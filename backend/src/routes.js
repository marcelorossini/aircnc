const express = require('express');

const routes = express.Router();

routes.post('/users',(req, res) => {
    return res.json('ba');
});

module.exports = routes;