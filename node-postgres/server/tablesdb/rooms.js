const client = require('../../db')
const express = require('express');
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json()); //req.body

app.listen(2005, ()=>{
    console.log("Sever is now listening at port 5000");
})

client.connect();


app.get('/rooms', (req, res)=>{
    client.query(`Select * from rooms`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
   
})



app.get('/rooms/:roomid', (req, res)=>{
    client.query(`Select * from rooms where roomid=${req.params.roomid}`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
   
})


const bodyParser = require("body-parser");

app.use(bodyParser.json());


app.post('/rooms', (req, res)=> {
    const rooms = req.body;
    let insertQuery = `insert into rooms(dormitoryid ,capacity ,wc,price) values(
        '${rooms.dormitoryid}', 
        '${rooms.capacity}', 
        '${rooms.wc}',
        '${rooms.price}')`

    client.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('Insertion was successful')
        }
        else{ console.log(err.message) }
    })
  
})


app.put('/rooms/:roomid', (req, res)=> {
    let rooms = req.body;
    let updateQuery = `update rooms set 
    dormitoryid= '${rooms.dormitoryid}',capacity= '${rooms.capacity}',wc= '${rooms.wc}' ,price= '${rooms.price}' where roomid = ${req.params.roomid}`

    client.query(updateQuery, (err, result)=>{
        if(!err){
            res.send('Update was successful')
        }
        else{ console.log(err.message) }
    })
    client.end;
    })

app.delete('/rooms/:roomid', (req, res)=> {
    const rooms = req.body;
    let insertQuery = `delete from rooms where roomid=${req.params.roomid}`

    client.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('Deletion was successful')
        }
        else{ console.log(err.message) }
    })
    
})
