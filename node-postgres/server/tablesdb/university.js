const client = require('../../db')
const express = require('express');
const app = express();
const cors = require("cors");

const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.use(cors());
app.use(express.json()); //req.body

app.listen(2007, ()=>{
    console.log("Sever is now listening at port 5000");
})

client.connect();


app.get('/university', (req, res)=>{
    client.query(`Select * from university`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
   
})



app.get('/university/:universityid', (req, res)=>{
    client.query(`Select * from university where universityid=${req.params.universityid}`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
   
})






app.post('/university', (req, res)=> {
    const university = req.body;
    let insertQuery = `insert into university(nameofuniversity,locationid)
                       values('${university.nameofuniversity}',${university.locationid})`

    client.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('Insertion was successful')
        }
        else{ console.log(err.message) }
    })
  
})

app.put('/university/:universityid', (req, res)=> {
    let university = req.body;
    let updateQuery = `update university set 
    nameofuniversity= '${university.nameofuniversity}',locationid= '${university.locationid}' where universityid = ${req.params.universityid}`

    client.query(updateQuery, (err, result)=>{
        if(!err){
            res.send('Update was successful')
        }
        else{ console.log(err.message) }
    })
    client.end;
    })

app.delete('/university/:universityid', (req, res)=> {
    const university = req.body;
    let insertQuery = `delete from university where universityid=${req.params.universityid}`

    client.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('Deletion was successful')
        }
        else{ console.log(err.message) }
    })
    
})
