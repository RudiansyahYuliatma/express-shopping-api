const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'project_purwadhika'
});

db.connect();

app.get('/customer/', (req, res) => {
    let sql = 'SELECT * FROM customer';
    db.query(sql, (err, result) => {
        if(err){
            res.send({
                message:"error",
                result:[]
            });
        }res.send({
            message:"success",
            result:result
        });
    });
});

app.get('/cart/', (req, res) => {
    let sql = 'SELECT * FROM cart';
    db.query(sql, (err, result) => {
        if(err){
            res.send({
                message:"error",
                result:[]
            });
        }res.send({
            message:"success",
            result:result
        });
    });
});

app.post('/cart/', (req, res) => {
    let email = req.body.email;
    let product_id = req.body.product_id;
    let product_name = req.body.product_name;
    let qty = req.body.qty;
    let harga = req.body.harga;
    let sql = 'INSERT INTO cart SET email=?, product_id=?, product_name=?, qty=?, harga=?';
    db.query(sql, [email, product_id, product_name, qty, harga], (err, result) => {
        if(err){
            console.log(err);
            res.send({
                message:"error",
                result:[]
            });
        }res.send({
            message:"succes",
            result:result
        });
    });
});

app.listen(3210, () => {
    console.log('Server is listening on port 3210')
});