const express = require('express');
const router = express.Router();
const {isLoggedIn, isNotLoggedIn } = require('./middlewares');

const{User,Post} = require('../models');

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
    res.render('profile',{title:'내 정보 - NodeBird',user:req.user});
});
 
//메인 페이지
router.get('/',(req,res,next)=>{
    console.log(Post.id);
    Post.findAll({
        include:[{
            model:User,
            attributes:['id','nick'],
        },{
            model:User,
            attributes:['id','nick'],
            as:'Liker',
        }],
    })
    .then((posts)=>{
        console.log(posts);
        res.render('main',{
            title:'NodeBird',
            twits: posts,
            user:req.user,
            loginError:req.flash('loginError'), //connect flash 모듈로 에러를 넣었다.
        });
    })
    .catch((error)=>{
        console.error(error);
        next(error);
    });
});

module.exports = router;