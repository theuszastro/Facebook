import { Router } from 'express';

import UserController from './controllers/UserController';
import FilesController from './controllers/FilesController';
import PostController from './controllers/PostController';
import SolicitationController from './controllers/SolicitationController';
import FriendController from './controllers/FriendController';
import LikeController from './controllers/LikeController';

import {
   PostMiddleware,
   UserMiddleware,
   SolicitationMiddleware,
   FriendMiddleware,
   DataMiddleware,
} from './middlewares';

const router = Router();

const { validData } = DataMiddleware;

const { checkUser, validToken } = UserMiddleware;
const { validPostOwner, validExistsPost } = PostMiddleware;
const { checkSolicitation, validExistsSolicitation } = SolicitationMiddleware;
const { validFriend } = FriendMiddleware;

// User
router.get('/users', UserController.listAll);
router.get('/user/:id', validToken, UserController.list);
router.post('/register', validData.bind(DataMiddleware), checkUser, UserController.create);
router.post('/login', UserController.login);
router.put('/user/:id', validToken, validData.bind(DataMiddleware), UserController.update);
router.delete('/user/:id', validToken, UserController.delete);

// Avatar
router.post('/avatar', validToken, FilesController.uploadAvatar);
router.post('/avatar/reupload', validToken, FilesController.reuploadAvatar);

// Post
router.get('/posts', validToken, PostController.list);
router.get('/post/:id', validExistsPost, PostController.listById);
router.post('/post', validToken, validData.bind(DataMiddleware), PostController.create);
router.put(
   '/post/:id',
   validToken,
   validData.bind(DataMiddleware).bind(DataMiddleware),
   validExistsPost,
   validPostOwner,
   PostController.update
);
router.delete('/post/:id', validToken, validExistsPost, validPostOwner, PostController.delete);

// Like
router.post('/like', validToken, validData.bind(DataMiddleware), LikeController.create);
router.delete('/like/:id', validToken, LikeController.delete);

// Solicitation
router.get('/solicitations', validToken, SolicitationController.list);
router.post(
   '/solicitation',
   validToken,
   validData.bind(DataMiddleware),
   checkSolicitation,
   SolicitationController.create
);
router.put(
   '/solicitation/:id',
   validToken,
   validExistsSolicitation,
   checkSolicitation,
   validData.bind(DataMiddleware),
   SolicitationController.update
);
router.delete(
   '/solicitation/:id',
   validToken,
   validExistsSolicitation,
   SolicitationController.delete
);

// Friend
router.get('/friends', validToken, FriendController.list);
router.delete('/friend/:id', validToken, validFriend, FriendController.delete);

export default router;
