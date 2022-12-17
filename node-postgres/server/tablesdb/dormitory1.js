const client = require('../../db')
const express = require('express');
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json()); //req.body

app.listen(1370, ()=>{
    console.log("Sever is now listening at port 5000");
})

client.connect();


app.get('/dormitory1', (req, res)=>{
    client.query(`Select * from dormitory1`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
   
})



app.get('/dormitory1/:dormitoryid', (req, res)=>{
    client.query(`Select * from dormitory1 where dormitoryid=${req.params.dormitoryid}`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
   
})


const bodyParser = require("body-parser");

app.use(bodyParser.json());


app.post('/dormitory1', (req, res)=> {
    const dormitory1= req.body;
    let insertQuery = `insert into dormitory1( nameofdormitory, locationid ,typeofdormitory ,capacity,checkintime,checkouttime,numberofmeals) values(
    '${dormitory1.nameofdormitory}', 
    '${dormitory1.locationid}', 
    '${dormitory1.typeofdormitory}',
    '${dormitory1.capacity}',
    '${dormitory1.checkintime}',
    '${dormitory1.checkouttime}',
    '${dormitory1.numberofmeals}')`

    client.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('Insertion was successful')
        }
        else{ console.log(err.message) }
    })
  
})

app.put('/dormitory1/:dormitoryid', (req, res)=> {
    let dormitory1 = req.body;
    let updateQuery = `update dormitory1
                       set nameofdormitory = '${dormitory1.nameofdormitory}',
                       locationid = '${dormitory1.locationid}',
                       typeofdormitory = '${dormitory1.typeofdormitory}',
                       capacity = '${dormitory1.capacity}',
                       checkintime = '${dormitory1.checkintime}',
                       checkouttime = '${dormitory1.checkouttime}',
                       numberofmeals = '${dormitory1.numberofmeals}'
                       where dormitoryid = ${req.params.dormitoryid}`

    client.query(updateQuery, (err, result)=>{
        if(!err){
            res.send('Update was successful')
        }
        else{ console.log(err.message) }
    })
    client.end;
    })

app.delete('/dormitory1/:dormitoryid', (req, res)=> {
    const dormitory1 = req.body;
    let insertQuery = `delete from dormitory1 where dormitoryid=${req.params.dormitoryid}`

    client.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('Deletion was successful')
        }
        else{ console.log(err.message) }
    })
    
})
