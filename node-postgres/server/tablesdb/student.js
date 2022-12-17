const client = require('../../db')
const express = require('express');
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json()); //req.body

app.listen(9090, ()=>{
    console.log("Sever is now listening at port 5000");
})

client.connect();


app.get('/student', (req, res)=>{
    client.query(`Select * from student`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
   
})



app.get('/student/:studentid', (req, res)=>{
    client.query(`Select * from student where studentid=${req.params.studentid}`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
   
})


const bodyParser = require("body-parser");

app.use(bodyParser.json());


app.post('/student', (req, res)=> {
    const student= req.body;
    let insertQuery = `insert into student( dormitoryid,roomid, fname ,lname ,old,universityid,department,classno,phoneno,password,paymentid,parentid) values(
    '${student.dormitoryid}', 
    '${student.roomid}', 
    '${student.fname}', 
    '${student.lname}',
    '${student.old}',
    '${student.universityid}',
    '${student.department}',
    '${student.classno}',
    '${student.phoneno}',
    '${student.password}',
    '${student.paymentid}',
    '${student.parentid}')`

    client.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('Insertion was successful')
        }
        else{ console.log(err.message) }
    })
  
})

app.put('/student/:studentid', (req, res)=> {
    let student = req.body;
    let updateQuery = `update student
                       set 
                       dormitoryid = '${student.dormitoryid}',
                       roomid= '${student.roomid}',
                       fname= '${student.fname}',
                       lname = '${student.lname}',
                       old = '${student.old}',
                       universityid = '${student.universityid}',
                       department = '${student.department}',
                       classno='${student.classno}',
                       phoneno= '${student.phoneno}',
                       password= '${student.password}',
                       paymentid= '${student.paymentid}',
                       parentid= '${student.parentid}'
                       where studentid = ${req.params.studentid}`

    client.query(updateQuery, (err, result)=>{
        if(!err){
            res.send('Update was successful')
        }
        else{ console.log(err.message) }
    })
    client.end;
    })

    app.delete('/student/:studentid', (req, res)=> {
        const student = req.body;
        let insertQuery = `delete from student where studentid=${req.params.studentid}`
    
        client.query(insertQuery, (err, result)=>{
            if(!err){
                res.send('Deletion was successful')
            }
            else{ console.log(err.message) }
        })
    
})
