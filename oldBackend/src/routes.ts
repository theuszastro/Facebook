import { Router } from 'express';

import UserController from './controllers/UserController';
import AvatarController from './controllers/AvatarController';
import CoverController from './controllers/CoverController';
import DestaqueController from './controllers/HighlightedController';
import PostsUserController from './controllers/PostagemController';
import CommentController from './controllers/CommentController';
import ShareController from './controllers/ShareController';
import SolicitationController from './controllers/SolicitationController';
import FriendController from './controllers/FriendController';

import Middlewares from './middlewares/Middlewares';

const router = Router();

// Usuário
router.get('/users', UserController.ListAll);
router.get('/user', Middlewares.login, UserController.ListUserWithToken);
router.get('/user/:id', Middlewares.UserIsSameOwner, UserController.ListOne);
router.post('/register', UserController.Create);
router.post('/login', UserController.Login);
router.put('/user/:id', Middlewares.UserIsSameOwner, UserController.Update);
router.delete('/user/:id', Middlewares.UserIsSameOwner, UserController.Delete);

// Foto do perfil
router.get('/avatar/:id', AvatarController.getAvatarByUser);
router.post('/avatar/upload', Middlewares.login, AvatarController.AvatarUpload);
router.post('/avatar/reupload', Middlewares.login, AvatarController.AvatarReupload);
router.delete('/avatar/:id', Middlewares.checkAvatarAndCover, AvatarController.AvatarDelete);

// Capa do perfil
router.post('/capa/upload', Middlewares.login, CoverController.CoverCreate);
router.post('/capa/reupload', Middlewares.login, CoverController.CoverReupload);
router.delete('/capa/:id', Middlewares.checkAvatarAndCover, CoverController.CoverRemove);

// Destaques
router.post('/destaque/upload', Middlewares.login, DestaqueController.DestaqueUpload);
router.post('/destaque/update', Middlewares.login, DestaqueController.DestaqueUpdate);

// Posts (Posts criados pelo usuário);
router.get('/posts', PostsUserController.ListAll);
router.get('/post/:id', Middlewares.login, PostsUserController.ListOne);
router.post('/post/create', Middlewares.login, PostsUserController.Create);
router.put('/post/:id', Middlewares.postOwner, PostsUserController.Update);
router.delete('/post/:id', Middlewares.postOwner, PostsUserController.Delete);

// Feedback em Posts/comment/resposnse
// router.post('/like', Middlewares.login, LikeController.AddFeedback);
// router.delete('/like', Middlewares.login, LikeController.RemoveFeedback);

// Comment em Posts
router.post('/comment', Middlewares.login, CommentController.AddComment);
router.put('/comment', Middlewares.commentInPost, CommentController.UpdateComment);
router.delete('/comment', Middlewares.commentOwner, CommentController.RemoveComment);

// Responder Comentário
router.post('/comment/response', Middlewares.login, CommentController.AddResponse);
router.put('/comment/response', Middlewares.responseInComment, CommentController.UpdateResponse);
router.delete('/comment/response', Middlewares.responseInComment, CommentController.RemoveResponse);

// Compartilhamento
// router.get('/shares', Middlewares.login, ShareController.ListAll);
router.get('/share/:id', Middlewares.login, ShareController.ListOne);
router.post('/share', Middlewares.login, ShareController.Create);
router.put('/share/:id', Middlewares.login, ShareController.Update);
router.delete('/share/:id', Middlewares.login, ShareController.Delete);

// Solicitações
router.get('/solicitacoes', Middlewares.login, SolicitationController.ListAll);
router.post('/solicitacao', Middlewares.login, SolicitationController.Create);
router.put('/solicitacao', Middlewares.login, SolicitationController.Update);
router.delete('/solicitacao/:id', Middlewares.login, SolicitationController.Delete);

// Amigos
router.get('/friends', Middlewares.login, FriendController.getAllFriends);
router.delete('/friend/:id', Middlewares.isFriend, FriendController.DeleteFriend);

// Adm
router.delete('/solicitacoes', SolicitationController.DeleteAll);
router.delete('/friends', FriendController.DeleteAll);

export default router;
