const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    return res.send({ message: 'Seja bem vindo à API do APP da M2 de Victor Matheus!' });
})

module.exports = router;