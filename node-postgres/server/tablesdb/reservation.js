const client = require('../../db')
const express = require('express');
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json()); //req.body

app.listen(6058, ()=>{
    console.log("Sever is now listening at port 5000");
})

client.connect();


app.get('/reservation', (req, res)=>{
    client.query(`Select * from reservation`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
   
})



app.get('/reservation/:reservationid', (req, res)=>{
    client.query(`Select * from reservation where reservationid=${req.params.reservationid}`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
   
})


const bodyParser = require("body-parser");

app.use(bodyParser.json());


app.post('/reservation', (req, res)=> {
    const reservation = req.body;
    let insertQuery = `insert into reservation(dormitoryid,studentid,roomid)
                       values('${reservation.dormitoryid}', '${reservation.studentid}', '${reservation.roomid}')`

    client.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('Insertion was successful')
        }
        else{ console.log(err.message) }
    })
  
})

app.put('/reservation/:reservationid', (req, res)=> {
    let  reservation = req.body;
    let updateQuery = `update reservation
                       set dormitoryid = '${reservation.dormitoryid}',
                       studentid = '${reservation.studentid}',
                       roomid = '${reservation.roomid}'
                       where reservationid = ${req.params.reservationid}`

    client.query(updateQuery, (err, result)=>{
        if(!err){
            res.send('Update was successful')
        }
        else{ console.log(err.message) }
    })
    client.end;
    })

app.delete('/reservation/:reservationid', (req, res)=> {
    const reservation = req.body;
    let insertQuery = `delete from reservation where reservationid=${req.params.reservationid}`

    client.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('Deletion was successful')
        }
        else{ console.log(err.message) }
    })
    
})
