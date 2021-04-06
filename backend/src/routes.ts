import { Router } from 'express';

import UserController from './controllers/UserController';
import FilesController from './controllers/FilesController';
import PostController from './controllers/PostController';
import SolicitationController from './controllers/SolicitationController';
import FriendController from './controllers/FriendController';

import {
   PostMiddleware,
   UserMiddleware,
   SolicitationMiddleware,
   FriendMiddleware,
} from './middlewares';

const router = Router();

const { validCreateData, validToken, validUpdateData } = UserMiddleware;
const { validPostData, validPostOwner, validExistsPost } = PostMiddleware;
const {
   validSolicitationCreateData,
   validSolicitationUpdateData,
   validExistsSolicitation,
} = SolicitationMiddleware;
const { validFriend } = FriendMiddleware;

// User
router.get('/user/:id', validToken, UserController.list);
router.post('/register', validCreateData, UserController.create);
router.post('/login', UserController.login);
router.put('/user/:id', validUpdateData, UserController.update);
router.delete('/user/:id', validToken, UserController.delete);

// Avatar
router.post('/avatar', validToken, FilesController.uploadAvatar);
router.post('/avatar/reupload', validToken, FilesController.reuploadAvatar);

// Post
router.get('/post/:id', validExistsPost, PostController.list);
router.post('/post', validToken, validPostData, PostController.create);
router.put(
   '/post/:id',
   validToken,
   validExistsPost,
   validPostData,
   validPostOwner,
   PostController.update
);
router.delete('/post/:id', validToken, validExistsPost, validPostOwner, PostController.delete);

// Solicitation
router.get('/solicitations', validToken, SolicitationController.list);
router.post(
   '/solicitation',
   validToken,
   validSolicitationCreateData,
   SolicitationController.create
);
router.put(
   '/solicitation/:id',
   validToken,
   validExistsSolicitation,
   validSolicitationUpdateData,
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
