const express = require('express');
const cookieparser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const IndexRouter = require('./routes/index');
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


app.listen(app.get('port'),()=>{
    console.log(`${app.get('port')}8001포트에서 서버 대기중입니다!`);
});