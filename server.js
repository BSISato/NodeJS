var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var router = express.Router();
const authService = require('./services/auth-service');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//MIDDLEWARE
router.use(function (req, res, next) {
    console.log("Interceptação pelo Middleware OOOOOK");
    next();
})

app.get('/', (req, res) => res.send('NooooooooooodeJS'));

router.post('/authenticate', function (req, res)   {
    var user = req.body.user;
    var pwd = req.body.pwd;
    if (user == 'sato' && pwd == '123') {

        const token = authService.generateToken(pwd);
        res.status(200).send({ auth: true, token:token });
    }else

    res.status(400).send('Login inválido!');

})

//Retorna
router.get('/nodejs',authService.authorize, function (req, res) {
    res.json({ 'message': "Retorno do Get" })
})
//Insere
router.post('/nodejs',authService.authorize, function (req, res) {
    res.json({ 'message': "Não sei o que inserido com sucesso" })
})
//Substitui
router.put('/nodejs',authService.authorize, function (req, res) {
    res.json({ 'message': "Alteração realizada com sucesso" })
})
//Altera
router.patch('/nodejs',authService.authorize, function (req, res) {
    res.json({ 'message': "Alteração realizada com sucesso" })
})
//Apaga
router.delete('/nodejs',authService.authorize, function (req, res) {
    res.json({ 'message': "Exclusão realizada com sucesso" })
})
//
router.copy('/nodejs',authService.authorize, function (req, res) {
    res.json({ 'message': "copy" })
})
//
router.head('/nodejs',authService.authorize, function (req, res) {
    res.json({ 'message': "head" })
})
//
router.options('/nodejs',authService.authorize, function (req, res) {
    res.json({ 'message': "options" })
})
//
router.link('/nodejs',authService.authorize, function (req, res) {
    res.json({ 'message': "link" })
})
//
router.unlink('/nodejs',authService.authorize, function (req, res) {
    res.json({ 'message': "unlink" })
})
//
router.purge('/nodejs',authService.authorize, function (req, res) {
    res.json({ 'message': "purge" })
})
//
router.lock('/nodejs',authService.authorize, function (req, res) {
    res.json({ 'message': "lock" })
})
//
router.unlock('/nodejs',authService.authorize, function (req, res) {
    res.json({ 'message': "unlock" })
})
//
router.propfind('/nodejs',authService.authorize, function (req, res) {
    res.json({ 'message': "propfind" })
})
/*
router.view('/nodejs',authService.authorize, function (req, res) {
    res.json({ 'message': "" })
})
*/
app.use('/api', router);

app.listen(3000, () => {
    console.log('De Zoio na porta 3000');
});