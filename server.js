const express = require('express'); 
const bodyParser = require('body-parser'); //서버 모듈을 위한 기능 선언
const app = express();
const port = process.env.PORT || 5000;  //서버의 port번호: 5000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/api/customers', (req, res) =>{
    res.send([
        {
        'id':1,
        'image': 'https://placeimg.com/64/64/1', //64*64
        'name': '홍길동',
        'birthday': '951003',
        'gender' : '여자',
        'job' : '대학생'
      },
      {
        'id':2,
        'image': 'https://placeimg.com/64/64/2', //64*64
        'name': '김철수',
        'birthday': '960405',
        'gender' : '남자',
        'job' : '프로그래머'
      },
      {
        'id':3,
        'image': 'https://placeimg.com/64/64/3', //64*64
        'name': '이영희',
        'birthday': '970109',
        'gender' : '여자',
        'job' : '회사원'
      }
    ]);
});

app.listen(port, () => console.log(`Listening on port ${port}`));