const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path'); 

const {Post, Hashtag, User} = require('../models');
const {isLoggedIn} = require('./middlewares');

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, cb){
            cb(null,'uploads/');
        },
        filename(req, file, cb){
            const ext = path.extname(file.originalname);
            cb(null, path.basename(file.originalname, ext)+ Date.now() + ext); //파일명 중복을 막기 위해 현재시간도 값으로 넣어준다.(덮어쓰기 막기위해)
        },
    }),
    limits:{fileSize: 5 * 1024 * 1024},
});

router.post('/img', isLoggedIn, upload.single('img'),(req,res)=>{
    console.log(req.file); // 보통 폼 업로드는 req.body에 들어가나 multer를 통해 업로드한 파일은 req.file에 들어가있다.
    res.json({url: `/img/${req.file.filename}` });
});

const upload2 = multer();

router.post('/',  isLoggedIn, upload2.none(), async (req,res,next)=>{
    //게시글 업로드
    try{
        const post = await Post.create({
            content: req.body.content,
            img: req.body.url,
            userId: req.user.id,
        });
        const hashtags = req.body.content.match(/#[^\s]*/g); // /#[^\s]*/g 는 해시태그의 "정규표현식"
        if(hashtags){
            const result = await Promise.all(hashtags.map(tag => Hashtag.findOrCreate({
                where: {title : tag.slice(1).toLowerCase()},
            })));
            await post.addHashtags(result.map(r=>r[0]));
        }
        res.redirect('/');
    }catch(error){
        console.error(error);
        next(error);
    }
});
//게시글삭제라우터
router.delete('/:id', async (req,res,next)=>{
    try{
        await Post.destroy({where:{id:req.params.id,userId:req.user.id}});
        res.send('OK');
    }catch(error){
        console.error(error);
        next(error);
    }
});


router.get('/hashtag',async (req,res,next)=>{ //해시태그 검색 시 그 태그 나오도록
    const query = req.query.hashtag;
    if(!query){
        return res.redirect('/'); //아무것도 입력 안하고 검색하면 다시 메인페이지로
    }
    try{
        const hashtag = await Hashtag.findOne({where :{ title: query}});
        let posts = [];
        if(hashtag){
            posts = await hashtag.getPosts({include:[{model:User}]});
        }
        return res.render('main',{
            title:`${query} | Nodebird`,
            user: req.user,
            twits:posts,
        });
    }catch(error){
        console.error(error);
        next(error);
    }
});

//좋아요 기능 라우터
router.post('/:id/like', async(req,res,next)=>{
    try{
        const post = await Post.find({where:{ id: req.params.id }});
        await post.addLiker(req.user.id);
        res.send('OK');
    }catch(error){
        console.error(error);
        next(error);
    }
});
router.delete('/:id/like',async(req,res,next)=>{
    try{
        const post = await Post.findOne({where:{id:req.user.id}});
        await post.removeLiker(req.params.id);
        res.send('OK');
    }catch(error){
        console.error(error);
        next(error);
    }
});

module.exports = router;