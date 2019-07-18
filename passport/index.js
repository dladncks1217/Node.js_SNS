const local = require('../passport/localStrategy');
const kakao = require('../passport/kakaoStrategy');

module.exports = (passport)=>{
    
    
    local(passport);
    kakao(passport);
};