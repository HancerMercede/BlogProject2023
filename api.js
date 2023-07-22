import express from 'express';
import {Auth, isAuthenticated} from './auth/auth.js';
import _postService from './services/post.service.js';
import _commentService from './services/comment.service.js';


const app = express();

app.use(express.json());

const port = process.env.PORT || 3001


app.get('/', (req,res,next)=>{
    res.send('Hello Node.js');
});

app.post('/auth/register',Auth.register);
app.post('/auth/login', Auth.login);

app.get('/auth', isAuthenticated, (req, res)=>{
    res.send(req.user);
});

//Comments EndPoints
app.get('/posts', _postService.findAll);
app.get('/posts/:id', _postService.findById);
app.post('/posts', isAuthenticated, _postService.create);
app.put('/posts/:id', isAuthenticated, _postService.update)
app.delete('/posts/:id', isAuthenticated, _postService.Delete)

//Comments EndPoints
app.get('/posts/:id/comments', _commentService.findAllCommentsByPost);
app.get('/posts/:id/comments/:idComment', _commentService.findCommentForPostById);
app.post('/posts/:id/comments', isAuthenticated, _commentService.create);
app.put('/posts/:id/comments/:idComment', isAuthenticated, _commentService.updateCommentForPostById);


const server = app.listen(port, ()=>console.log('server running in port:',port));
server.listen;