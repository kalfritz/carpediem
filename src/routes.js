const express = require('express');

const authMiddleware = require('./middlewares/AuthMiddleware');

const FixController = require('./controllers/FixController');

const AuthController = require('./controllers/AuthController');
const PostController = require(`./controllers/PostController`);
const CommentController = require('./controllers/CommentController');
const LikeController = require('./controllers/LikeController');
const FollowersController = require('./controllers/FollowersController');
const ProfileController = require('./controllers/ProfileController');
const GroupController = require('./controllers/GroupController');
const GPostController = require('./controllers/GPostController');

const routes = new express.Router();
// const upload = multer(uploadConfig);
//////////////////////////////////////////////////////////////
routes.get('/index', AuthController.index);
routes.get('/getuser/:userId', AuthController.getUser);
routes.post('/register', AuthController.register);
routes.post('/authenticate', AuthController.authenticate);
//////////////////////////////////////////////////////////////
routes.get('/posts', PostController.index);
routes.get('/posts/feed', authMiddleware, PostController.feed);
routes.get('/posts/timeline/:userId', PostController.timeline);
routes.get('/posts/trends', PostController.trendPosts);
routes.get('/posts/:postId', PostController.getOne);
routes.post('/posts', authMiddleware, PostController.store);
routes.put('/posts/:postId', authMiddleware, PostController.update);
routes.delete('/posts/:postId', authMiddleware, PostController.delete);

routes.post('/posts/:postId/like', authMiddleware, LikeController.onAPost);
//////////////////////////////////////////////////////////////
routes.get('/comments', CommentController.index);
routes.get('/posts/:postId/comments', CommentController.getCommentsOfAPost);
routes.get('/posts/:postId/comments/:commentId', CommentController.getOne);
routes.post(
  '/posts/:postId/comments/',
  authMiddleware,
  CommentController.store,
);
routes.put(
  '/posts/:postId/comments/:commentId',
  authMiddleware,
  CommentController.update,
);
routes.delete(
  '/posts/:postId/comments/:commentId',
  authMiddleware,
  CommentController.delete,
);

routes.post(
  '/comments/:commentId/like',
  authMiddleware,
  LikeController.onAComment,
);
////////////////////////////////////////////////////////////////
routes.post(
  '/follow/:followUserId',
  authMiddleware,
  FollowersController.follow,
);
routes.post(
  '/disfollow/:unfollowUserId',
  authMiddleware,
  FollowersController.unfollow,
);
//////////////////////////////////////////////////////////////
routes.post('/profile/bio', authMiddleware, ProfileController.setBio);
routes.post(
  '/profile/socialmedia',
  authMiddleware,
  ProfileController.setSocialMedia,
);

routes.get('/groups', GroupController.index);
routes.get('/groups/:groupId', GroupController.getOne);
routes.post('/groups', authMiddleware, GroupController.store);
routes.delete('/groups/:groupId', authMiddleware, GroupController.delete);

routes.post('/fix', authMiddleware, FixController.fix);

routes.get('/gposts', authMiddleware, GPostController.index);
routes.get(
  '/groups/:groupId/gposts/:gpostId',
  authMiddleware,
  GPostController.getOne,
),
  routes.get(
    '/groups/:groupId/timeline',
    authMiddleware,
    GPostController.timeline,
  );
routes.get('/gposts/feed', authMiddleware, GPostController.feed);
routes.post('/groups/:groupId', authMiddleware, GPostController.store);
routes.put(
  '/groups/:groupId/gposts/:gpostId',
  authMiddleware,
  GPostController.update,
);
routes.delete(
  '/groups/:groupId/gposts/:gpostId',
  authMiddleware,
  GPostController.delete,
);

module.exports = routes;
