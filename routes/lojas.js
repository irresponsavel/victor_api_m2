const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('../middlewares/auth');
const config = require('../config/config');
const lojas = require('../models/Loja');

router.get('/', async (req, res) => {
    try {
        const loja = await lojas.find({});
            return res.send(loja);
    }
    catch (err) {
        return res.status(500).send({ message: 'Erro na busca dos Usuários!' });
    }
});


router.post('/create', async (req, res) => {
    const { nome, endereco, estado ,cidade, cnpj } = req.body;

    if (!nome || !endereco || !estado || !cidade || !cnpj) 
        return res.send({ message: 'Verifique se todos os campos obrigatórios foram informados!' });
    try {
        if (await lojas.findOne({ cnpj } ))
            return res.send({ message: 'Loja já cadastrada!' });
        
        const loja = await lojas.create(req.body);

        return res.status(201).send({ message: "ok" /*loja , token: createlojaToken(loja.id)*/ })
    }
    catch (err) {
        return res.send({ message: `Erro ao grava loja: ${err}`})
    }
});

router.put('/update/:id', async (req, res) => {
    const { nome, endereco, estado ,cidade, cnpj } = req.body;


    try {
       
        const loja = await lojas.findByIdAndUpdate(req.params.id, req.body);
        const lojaChanged = await lojas.findById(req.params.id);

        return res.status(201).send({ lojaChanged });
    }
    catch (err) {
            return res.status(201).send({ message: `Erro ao atualizar a loja: ${err}`})
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        await lojas.findByIdAndDelete(req.params.id);
            return res.send({ message: 'Loja removida com sucesso!' });
    }
    catch (err) {
            return res.send({ message: 'Erro ao remover Loja! '});
    }
});

module.exports = router;