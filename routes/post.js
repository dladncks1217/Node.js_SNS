const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path'); 

const {Post, Hashtag} = require('../models');

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, cb){
            cb(null,'uploads/');
        },
        filename(req, file, cb){
            const ext = path.extname(file.originalname);
            cb(null, path.basename(file.originalname, ext)+ new Date().valueOf() + ext); //파일명 중복을 막기 위해 현재시간도 값으로 넣어준다.(덮어쓰기 막기위해)
        }
    }),
    limits:{fileSize: 5 * 1024 * 1024},
});

router.post('/img',upload.single('img'),(req,res)=>{
    console.log(req.file); // 보통 폼 업로드는 req.body에 들어가나 multer를 통해 업로드한 파일은 req.file에 들어가있다.
    res.json({url: `/img/${req.file.filename}` });
});

const upload2 = multer();

router.post('/', upload2.none(), async (req,res,next)=>{
    //게시글 업로드
    try{
        const post = await Post.create({
            content: req.body.content,
            img: req.body.url,
            userId: req.body.id,
        });
        const hashtags = req.body.content.match(/#[^\s]*/g); // /#[^\s]*/g 는 해시태그의 "정규표현식"
        if(hashtags){
            await Promise.all(hashtags.map(tag => Hashtag.findOrCreate({
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

module.exports = router;