const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const produtoSchema = new Schema( {

    nome: { type: String, required: true, unique: true},
    preco: { type: Number, required: true},
    categoria: { type: String, required: true},
    descricao: { type: String, required: false},

});

module.exports = mongoose.model('Produto', produtoSchema);