const fs = require('fs');  //db에서 가져온 고객 정보로 넘겨줄 수 있게 선언
const express = require('express'); 
const bodyParser = require('body-parser'); //서버 모듈을 위한 기능 선언
const app = express();
const port = process.env.PORT || 5000;  //서버의 port번호: 5000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const data = fs.readFileSync('./database.json');  //database.json파일로부터 db환경설정 정보를 읽어와야 한다.
const conf = JSON.parse(data);  //환경설정 데이터 파싱
const mysql = require('mysql');  //mysql 라이브러리 호출

const connection = mysql.createConnection({ //연결
  host: conf.host,
  user: conf.user,
  password: conf.password,
  port: conf.port,
  database: conf.database
});
connection.connect();  //연결 수행

const multer = require('multer'); //multer 라이브러리 설치
const upload = multer({dest: './upload'})  //upload폴더 설정

app.get('/api/customers', (req, res) =>{
  connection.query(
    "SELECT * FROM CUSTOMER WHERE isDeleted = 0", 
    (err, rows, fields) => {
      res.send(rows);
    }
    );
});

app.use('/image', express.static('./upload'));

app.post('/api/customers', upload.single('image'), (req,res) => {
  let sql = 'INSERT INTO CUSTOMER VALUES (null, ?, ?, ?, ?, ?, now(), 0)';
  let image = '/image/' + req.file.filename;
  let name = req.body.name;
  let birthday = req.body.birthday;
  let gender = req.body.gender;
  let job = req.body.job;

  let params = [image, name, birthday, gender, job];
  connection.query(sql, params, 
    (err, rows, fields) => {
      res.send(rows);
    });
});

app.delete('/api/customers/:id', (req, res) => {
    let sql = 'UPDATE CUSTOMER SET isDeleted = 1 WHERE id = ?';
    let params = [req.params.id];
    connection.query(sql, params,
      (err, rows, fields) => {
        res.send(rows);
      }
    )
});

app.listen(port, () => console.log(`Listening on port ${port}`));