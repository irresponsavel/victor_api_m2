const express = require('express');
const router = express.Router();
const produtos = require('../models/Produto');

router.get('/', async (req, res) => {
    try {
        const produto = await produtos.find({});
            return res.send(produto);
    }
    catch (err) {
        return res.status(500).send({ message: 'Erro na busca das produtos!' });
    }
});


router.post('/create', async (req, res) => {
    const { nome, preco, categoria, descricao } = req.body;
    
    if (!nome || !preco || !categoria || !descricao) 
        return res.send({ message: 'Verifique se todos os campos obrigatórios foram informados!' });
    try {
        if (await produtos.findOne({ nome } ))
            return res.send({ message: 'Produto já cadastrado!' });
        
        const produto = await produtos.create(req.body);

        return res.status(201).send({ message: "ok" })
    }
    catch (err) {
        return res.send({ message: `Erro ao gravar produto: ${err}`})
    }
});

router.put('/update/:id', async (req, res) => {
    const { nome, preco, categoria, descricao } = req.body;
    
    if (!preco || !categoria || !descricao) 
        return res.send({ message: 'Verifique se todos os campos obrigatórios foram informados!' });
    try {

        
        const produto = await produtos.findByIdAndUpdate(req.params.id, req.body);
        const produtoChanged = await produtos.findById(req.params.id);

        return res.status(201).send({ produtoChanged });
    }
    catch (err) {
            return res.status(201).send({ message: `Erro ao atualizar o produto: ${err}`})
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        await produtos.findByIdAndDelete(req.params.id);
            return res.send({ message: 'produto removido com sucesso!' });
    }
    catch (err) {
            return res.send({ message: 'Erro ao remover produto! '});
    }
});

module.exports = router;