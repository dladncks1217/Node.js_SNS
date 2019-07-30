const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path'); 

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

router.post('/')

module.exports = router;