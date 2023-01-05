const client = require('../../db')
const express = require('express');
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json()); //req.body

app.listen(2002, ()=>{
    console.log("Sever is now listening at port 5000");
})

client.connect();


app.get('/location', (req, res)=>{
    client.query(`Select * from location`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
   
})



app.get('/location/:locationid', (req, res)=>{
    client.query(`Select * from location where locationid=${req.params.locationid}`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
   
})


const bodyParser = require("body-parser");

app.use(bodyParser.json());


app.post('/location', (req, res)=> {
    const location = req.body;
    let insertQuery = `insert into location(city,district,neighborhood)
                       values('${location.city}', '${location.district}', '${location.neighborhood}')`

    client.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('Insertion was successful')
        }
        else{ console.log(err.message) }
    })
  
})

app.put('/location/:locationid', (req, res)=> {
    let location = req.body;
    let updateQuery = `update location
                       set city = '${location.city}',
                       district = '${location.district}',
                       neighborhood = '${location.neighborhood}'
                       where locationid = ${req.params.locationid}`

    client.query(updateQuery, (err, result)=>{
        if(!err){
            res.send('Update was successful')
        }
        else{ console.log(err.message) }
    })
    client.end;
    })

app.delete('/location/:locationid', (req, res)=> {
    const location = req.body;
    let insertQuery = `delete from location where locationid=${req.params.locationid}`

    client.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('Deletion was successful')
        }
        else{ console.log(err.message) }
    })
    
})
