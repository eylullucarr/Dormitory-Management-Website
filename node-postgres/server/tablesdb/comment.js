const client = require('../../db')
const express = require('express');
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json()); //req.body

app.listen(2008, ()=>{
    console.log("Sever is now listening at port 5000");
})

client.connect();


app.get('/comments', (req, res)=>{
    client.query(`Select * from comments`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
   
})



app.get('/comments/:commentsid', (req, res)=>{
    client.query(`Select * from comments where commentid=${req.params.commentid}`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
   
})


const bodyParser = require("body-parser");

app.use(bodyParser.json());


app.post('/comments', (req, res)=> {
    const comments = req.body;
    let insertQuery = `insert into comments(dormitoryid,studentid,roomid,date,comment)
                       values('${comments.dormitoryid}', '${comments.studentid}', '${comments.roomid}', '${comments.date}', '${comments.comment}')`

    client.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('Insertion was successful')
        }
        else{ console.log(err.message) }
    })
  
})

app.put('/comments/:commentid', (req, res)=> {
    let comments = req.body;
    let updateQuery = `update comments
                       set dormitoryid = '${comments.dormitoryid}',
                       studentid = '${comments.studentid}',
                       roomid = '${comments.roomid}',
                       date = '${comments.date}',
                       comment = '${comments.comment}'
                       where commentid = ${req.params.commentid}`

    client.query(updateQuery, (err, result)=>{
        if(!err){
            res.send('Update was successful')
        }
        else{ console.log(err.message) }
    })
    client.end;
    })

app.delete('/comments/:commentid', (req, res)=> {
    const comments = req.body;
    let insertQuery = `delete from comments where commentid=${req.params.commentid}`

    client.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('Deletion was successful')
        }
        else{ console.log(err.message) }
    })
    
})
