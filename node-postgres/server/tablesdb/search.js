const client = require('../../db')
const express = require('express');
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json()); //req.body

app.listen(8497, ()=>{
    console.log("Sever is now listening at port 5000");
})

client.connect();

    app.get("/location", async (req, res) => {
        console.log(req)
        console.log(req.query)
        try {
        const { city } = req.query;
      
    
    
        const location = await client.query(
            `SELECT * FROM location WHERE city ILIKE $1 `,
            [`%${city}%`]
        );
    
        
        res.json(location.rows)
        } catch (err) {
        console.error(err.message);
        }
    });