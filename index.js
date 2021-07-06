const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

const options = {
    poolSize: 5,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
};

mongoose.connect('##DEFINIR##',options);

mongoose.set('useCreateIndex',true);

mongoose.connection.on('connected', () => {
    console.log('Aplicação conectada ao banco de dados!');
});

mongoose.connection.on('error', (err) => {
    console.log(`Erro na conexão com o banco de dados:  ${err}`);
});

mongoose.connection.on('disconnected', () => {
    console.log('Aplicação desconectada do banco de dados!');
});

const { urlencoded } = require('body-parser');
app.use(urlencoded({ extended: false }));
app.use(bodyParser.json());

const usuarioRoutes = require('./routes/usuarios');
const lojaRoutes = require('./routes/lojas');
const produtoRoutes = require('./routes/produtos');
const publicRoutes = require('./routes/public');

app.use('/usuarios', usuarioRoutes);
app.use('/lojas', lojaRoutes);
app.use('/produtos', produtoRoutes);
app.use('/', publicRoutes);

app.listen(process.env.PORT || 5000);

module.exports = app;