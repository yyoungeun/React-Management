const fs = require('fs');
const express = require('express'); 
const bodyParser = require('body-parser'); //서버 모듈을 위한 기능 선언
const app = express();
const port = process.env.PORT || 5000;  //서버의 port번호: 5000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');

const connection = mysql.createConnection({ //연결
  host: conf.host,
  user: conf.user,
  password: conf.password,
  port: conf.port,
  database: conf.database
});
connection.connect();

app.get('/api/customers', (req, res) =>{
  connection.query(
    "SELECT * FROM CUSTOMER", 
    (err, rows, fields) => {
      res.send(rows);
    }
    );
});

app.listen(port, () => console.log(`Listening on port ${port}`));