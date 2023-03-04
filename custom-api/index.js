const express = require('express');
const {engine} = require('express-handlebars');
const bodyParser = require('body-parser');
const formData = require('express-form-data');

const api = require('./api');
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(formData.parse());
app.use(bodyParser.json());

app.use('/api', api);
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');

app.get('/', (req, res, next) => {
    res.render('basis', {

    });
});

app.use('/static', express.static('./static'));

const server = require('http').createServer();
server.on('request', app);
server.listen(process.env.port || 3500, () => {
    console.log(`[ready] http://localhost:${process.env.port || 3500}`);
  });

