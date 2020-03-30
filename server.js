const express = require('express'); 
const bodyParser = require('body-parser'); //서버 모듈을 위한 기능 선언
const app = express();
const port = process.env.PORT || 5000;  //서버의 port번호: 5000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/api/hello', (req,res) => {
    res.send({message: 'Hello Express!'});
});

app.listen(port, () => console.log(`Listening on port ${port}`));