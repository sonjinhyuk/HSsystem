// app.js

// [LOAD PACKAGES]
var express     = require('express');
var http = require('http');
var serveStatic = require('serve-static');      //특정 폴더의 파일들을 특정 패스로 접근할 수 있도록 열어주는 역할
//login을 위한 모듈 호출
var path = require('path');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var expressErrorHandler = require('express-error-handler');
//login 모듈 끝
var app         = express();
var bodyParser  = require('body-parser');
var mongoose    = require('mongoose');

//db connection
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
    // CONNECTED TO MONGODB SERVER
    console.log("Connected to mongod server");
});

var mongoClient = require('mongodb').MongoClient;
function connectDB() {
  //localhost 로컬 호스트
  //:27017  몽고디비 포트
  //local db 생성시 만든 폴더 명
  var databaseURL = 'mongodb://localhost:27017';
  mongoClient.connect(databaseURL,
      function (err, cluster)
      {
        //이 구문까지 실행되었다면 ongoDB 에 연결된 것
        if (err) {
            console.log('db connect error');
            return;
        }
        console.log('db was connected : ' + databaseURL);
        database = cluster.db('test');
      }
  );
}
//db connection end
app.use(serveStatic(path.join('public', __dirname, 'public')));


// [CONFIGURE APP TO USE bodyParser]
app.use(bodyParser.urlencoded({ extended: true }));// post 방식 세팅
app.use(bodyParser.json()); // json 사용 하는 경우의 세팅
app.use(serveStatic(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(expressSession({
  secret: 'my key',           //이때의 옵션은 세션에 세이브 정보를 저장할때 할때 파일을 만들꺼냐 , 아니면 미리 만들어 놓을꺼냐 등에 대한 옵션들임
  resave: true,
  saveUninitialized: true
}));


app.get('/',function(req, res){
  res.sendFile(__dirname + '/web/index.html');
});
// [CONFIGURE SERVER PORT]
var port = process.env.PORT || 8080;

// [CONFIGURE ROUTER]
// var Book = require('./models/book');
var User = require('./models/user');
var login = require('./routes/user')(app, User)



var errorHandler = expressErrorHandler(
  { static: { '404': './public/404.html' } }              //404 에러 코드가 발생하면 해당 페이지를 보여주는 예외 미들웨어
);


app.use(expressErrorHandler.httpError(404));
app.use(expressErrorHandler);
 

// [RUN SERVER]
var server = app.listen(port, function(){
  console.log("Express server has started on port " + port)
  connectDB();        //DB 연결 , DB 연결 먼저해도 상관 없음
 });
// mongoose.connect('mongodb://localhost/hssystem');

