const express = require('express');
const cookieparser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const localpassport = require('passport-local');
const kakaopassport = require('passport-kakao');
const bcrypt = require('bcryptjs');
const flash = require('connect-flash');
const helmet = require('helmet');
const hpp = require('hpp'); // hpp공격 방어해주는 패키지.
const passportConfig = require('./passport'); //passport의 index연결
const favicon = require('serve-favicon');

const IndexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const postRouter = require('./routes/post');
const UserRouter = require('./routes/user');
const logger = require('./logger');

const {sequelize} = require('./models');
  
require('dotenv').config();

const app = express();

sequelize.sync();


app.set('view engine', 'pug');
app.set('views',path.join(__dirname,'views'));
app.set('port',process.env.PORT||8001);


if(process.env.NODE_ENV ==='production'){
    app.use(morgan('combined'));
}else{// development
    app.use(morgan('dev'));
}

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use('/', express.static(path.join(__dirname,'public'))); // /main.css
app.use('/img', express.static(path.join(__dirname,'uploads'))); // /img/abc.png
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieparser(process.env.COOKIE_SECRET));
const sessionOption = {
    resave: false,
    saveUnitialized:false,
    secret:process.env.COOKIE_SECRET,
    cookie:{
        httpOnly:true,
        secure:false,
    },
}
if(process.env.NODE_ENV === 'production'){
    sessionOption.proxy=true; // 프록시서버 두기 가능.
    sessionOption.cookie.secure=true; // https사용 가능
}
app.use(session(sessionOption));
app.use(flash());

app.use(passport.initialize()); //passport는 세션을 사용해야하기에 반드시 express-session밑에 passport쪽 미들웨어 연결.
app.use(passport.session());
passportConfig(passport);


app.use('/',IndexRouter);
app.use('/auth',authRouter);
app.use('/post',postRouter);
app.use('/user',UserRouter);

app.use((req,res,next)=>{
    const err = new Error('NOT FOUND');
    err.status = 404;
    logger.info('hello'); // console.info 대체.
    logger.error('err.message'); // console.error 대체
    next(err);
});

app.use((err,req,res)=>{
    res.locals.message = err.message;
    res.locals.message = req.app.get('env') === 'development' ? err :{};
    res.status(err.status||500);
    res.render('error');
});

app.listen(app.get('port'),()=>{
    console.log(`${app.get('port')}번 포트에서 서버 대기중입니다!`);
});