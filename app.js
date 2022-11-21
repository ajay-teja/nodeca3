var express = require('express');
var app = express();
var dotenv = require('dotenv');
var mongo = require('mongodb');
var MongoClient = mongo.MongoClient;
dotenv.config();
var mongoUrl = "mongodb+srv://rishi143:P.Gopi143@cluster0.n58ot.mongodb.net/curries?retryWrites=true&w=majority";
var cors = require('cors')
const bodyParser = require('body-parser')
var port = process.env.PORT || 8124;
// save the database connection
var db;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());

// first default route
app.get('/',(req,res) => {
    res.send("Hiii From Express")
})
app.get('/menu',(req,res) => {
    db.collection('menucurries').find().toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
})

app.get('/cart',(req,res) => {
    db.collection('eshoping').find().toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
})


app.get('/items/:id', (req,res) =>{
    var id =parseInt(req.params.id);
    db.collection('curryitems').find({"curry_id":id}).toArray((err,result) =>{
        if(err) throw err;
        res.send(result)
    })
})


MongoClient.connect(mongoUrl, (err,client) => {
    if(err) console.log("Error While Connecting");
    db = client.db('curries');
    app.listen(port,()=>{
        console.log(`listening on port ${port}`)
    })
})
