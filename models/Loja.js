const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lojaSchema = new Schema( {

    nome: { type: String, unique: false, required: true},
    endereco: { type: String, unique: false, required: true},
    estado: { type: String, unique: false, required: true},
    cidade: { type: String, unique: false, required: true},
    cnpj: { type: String, unique: true, required: true}

});

module.exports = mongoose.model('Loja', lojaSchema);