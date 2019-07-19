const express = require('express');
const cookieparser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const localpassport = require('local-passport');
const kakaopassport = require('passport-kakao');
const bcrypt = require('bcrypt');
const flash = require('connect-flash');
const IndexRouter = require('./routes/index');
const passportConfig = require('./passport');

require('dotenv').config();

const app = express();

app.set('view engine', 'pug');
app.set('views',path.join(__dirname,'views'));
app.set('port',process.env.PORT||8001);

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname,'public')));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieparser(process.env.COOKIE_SECRET));
app.use(session({
    resave: false,
    saveUnitialized:false,
    secret:process.env.COOKIE_SECRET,
    cookie:{
        httpOnly:true,
        secure:false,
    },
}));
app.use(flash());


app.use('/',IndexRouter);

app.use((req,res,next)=>{
    const err = new Error('NOT FOUND');
    err.status = 404;
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