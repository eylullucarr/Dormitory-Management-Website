const client = require('../../db')
const express = require('express');
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json()); //req.body

app.listen(6248, ()=>{
    console.log("Sever is now listening at port 5000");
})

client.connect();


app.get("/search", async (req, res) => {
    try {
      const { city,district,typeofdormitory} = req.query;
  
  
      const location = await client.query(
        `SELECT (dormitory1.nameofdormitory,dormitory1.typeofdormitory,dormitory1.numberofmeals,location.city, location.district, comments.comment) FROM location
        inner join dormitory1 on location.locationid=dormitory1.locationid  
        inner join comments on dormitory1.dormitoryid=comments.dormitoryid
        WHERE (city ILIKE $1 and district ILIKE $2 and typeofdormitory ILIKE $3)`,
        [`%${city}%`,`%${district}%`,`%${typeofdormitory}%`]
      );
  
      
  
      res.json(location.rows);
    } catch (err) {
      console.error(err.message);
    }
  });