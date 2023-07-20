import express from 'express';
import {Auth, isAuthenticated} from './auth/auth.js';
import _postService from './services/post.service.js';
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

app.get('/posts', _postService.findAll );
app.post('/posts', isAuthenticated, _postService.create);

const server = app.listen(port, ()=>console.log('server running in port:',port));
console.log(process.env.SECRET_KEY);
server.listen