// server.js
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const path=require('path');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Vinni@02#feb',
  database: 'alumni_portal'
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL!");
});

app.use(express.static(path.join(__dirname,'public')));


app.get('/',(req,res)=>{
	res.sendFile(path.join(__dirname,'public','index.html'));
});

app.post('/signup',async(req,res)=>{
	const{name,loca,email,pass}=req.body;
	const hashedPass=await bcrypt.hash(pass,10);
	
	db.query('insert into users (name,location,email,password) values(?,?,?,?)',
	[name,loca,email,hashedPass],(err,results)=>{
		if (err) return res.status(500).send('signup failed');
		res.send('signup succesful');
	});
});

app.listen(3000,()=>console.log("sever running on port 3000"));