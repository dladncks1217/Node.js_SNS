const express = require('express');
const router = express.Router();

//회원가입 페이지
router.get('/join',(req,res)=>{
    res.render('join',{
        title:'회원가입 - NodeBird',
        user:null,
        joinError:req.flash('joinError'),//connect flash 모듈로 에러를 넣었다.
    });
});
//프로필 페이지
router.get('/profile',(req,res)=>{
    res.render('profile',{title:'내 정보 - NodeBird',user:null});
});
 
//메인 페이지
router.get('/',(req,res,next)=>{
     res.render('main',{
         title:'NodeBird',
         twits:[],
         user:null,
         loginError:req.flash('loginError'), //connect flash 모듈로 에러를 넣었다.
     });
});

module.exports = router;