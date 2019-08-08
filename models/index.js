const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(
  config.database, config.username, config.password, config,
);

 
db.sequelize = sequelize;
db.Sequelize = Sequelize; 

db.User = require('./user')(sequelize, Sequelize);
db.Post = require('./post')(sequelize, Sequelize);
db.Hashtag = require('./hashtag')(sequelize, Sequelize);

db.User.hasMany(db.Post);
db.Post.belongsTo(db.User);
//1대다

db.Post.belongsToMany(db.Hashtag,{through:'PostHashtag',});
db.Hashtag.belongsToMany(db.Post,{through: 'PostHashtag'});
//다대다 관계 새로운 모델(테이블) 생성 (PostHashtag) 게시글과 해시태그 관계

db.User.belongsToMany(db.User,{
  through:'Follow',
  as:'Followers', 
  foreignKey:'followingId'
});

db.User.belongsToMany(db.User,{
  through:'Follow', 
  as:'Followings', 
  foreignKey:'followerId'
});
//유저와 유저관의 관계(팔로우, 팔로워)

db.User.belongsToMany(db.Post,{through:'Like'});
db.Post.belongsToMany(db.User,{through:'Like', as:'Liker'});
//좋아요 누르기 기능



module.exports = db;
