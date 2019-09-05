var express = require( 'express');
var bodyParser = require ('body-parser');
var app = express();
var router = express.Router();
const authService = require('./services/auth-service');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//só Ala na causa
app.use(function(req, res, next) {

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "DELETE, POST, GET, OPTIONS");
    // res.setHeader("Access-Control-Allow-Headers", "*");
});



//MIDDLEWARE
router.use(function(req,res,next){
    console.log("Interceptação pelo Middleware OOOOOK");
    next();
})

app.get('/', (req, res) => res.send('NooooooooooodeJS'));

//Retorna
router.get('/nodejs',authService.authorize, function(req, res){
    res.json({'message' : "Get Get Get"})
})
//Insere
router.post('/nodejs', function(req, res){
    res.json({'message' : "Post Post Post"})
})
//Substitui
router.put('/nodejs', function(req, res){
    res.json({'message' : "Put Put Put"})
})
//Altera
router.patch('/nodejs', function(req, res){
    res.json({'message' : "Patch Patch Patch"})
})
//Apaga
router.delete('/nodejs', function(req, res){
    res.json({'message' : "Delete Delete Delete"})
})


app.use('/api', router);

app.listen(3000, () =>{
    console.log('Bizuuu na porta 3000');
});