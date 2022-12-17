const client = require('../../db')
const express = require('express');
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json()); //req.body

app.listen(5950, ()=>{
    console.log("Sever is now listening at port 5000");
})

client.connect();


app.get('/payment', (req, res)=>{
    client.query(`Select * from payment`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
   
})



app.get('/payment/:paymentid', (req, res)=>{
    client.query(`Select * from payment where paymentid=${req.params.paymentid}`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
   
})


const bodyParser = require("body-parser");

app.use(bodyParser.json());


app.post('/payment', (req, res)=> {
    const payment = req.body;
    let insertQuery = `insert into payment( studentid ,price,typeofpayment,remainingdebt) values(
        '${payment.studentid}', 
        '${payment.price}', 
        '${payment.typeofpayment}',
        '${payment.remainingdebt}')`

    client.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('Insertion was successful')
        }
        else{ console.log(err.message) }
    })
  
})


app.put('/payment/:paymentid', (req, res)=> {
    let payment= req.body;
    let updateQuery = `update payment set 
    studentid= '${payment.studentid}',price= '${payment.price}' ,typeofpayment= '${payment.typeofpayment}',remainingdebt= '${payment.remainingdebt}'where paymentid = ${req.params.paymentid}`

    client.query(updateQuery, (err, result)=>{
        if(!err){
            res.send('Update was successful')
        }
        else{ console.log(err.message) }
    })
    client.end;
    })

app.delete('/payment/:paymentid', (req, res)=> {
    const payment = req.body;
    let insertQuery = `delete from payment where paymentid=${req.params.paymentsid}`

    client.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('Deletion was successful')
        }
        else{ console.log(err.message) }
    })
    
})
