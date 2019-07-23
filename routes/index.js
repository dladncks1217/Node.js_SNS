const express = require('express');
const router = express.Router();
const {isLoggedIn, isNotLoggedIn } = require('./middlewares');

//회원가입 페이지
router.get('/join',isNotLoggedIn,(req,res)=>{ // 회원가입 안한사람은 프로필 안뜨도록
    res.render('join',{
        title:'회원가입 - NodeBird',
        user:req.user,
        joinError:req.flash('joinError'),//connect flash 모듈로 에러를 넣었다.
    });
});
//프로필 페이지
router.get('/profile',isLoggedIn, (req,res)=>{ // 로그인 한사람은 로그인창 안뜨도록
    res.render('profile',{title:'내 정보 - NodeBird',user:null});
});
 
//메인 페이지
router.get('/',(req,res,next)=>{
     res.render('main',{
         title:'NodeBird',
         twits:[],
         user:req.user,
         loginError:req.flash('loginError'), //connect flash 모듈로 에러를 넣었다.
     });
});

module.exports = router;