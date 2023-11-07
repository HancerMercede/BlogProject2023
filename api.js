import express from "express";
import { Auth, isAuthenticated } from "./src/auth/auth.js";
import _postService from "./src/services/post.service.js";
import _commentService from "./src/services/comment.service.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3001;

// root endpoints
app.get("/", (req, res, next) => {
  res.send("Hello, this is the API for the it-master-blog application.");
});

//Auth EndPoints
app.post("/auth/register", Auth.register);
app.post("/auth/login", Auth.login);

app.get("/auth", isAuthenticated, (req, res) => {
  res.send(req.user);
});

//Comments EndPoints
app.get("/api/v1/posts", _postService.findAll);
app.get("/api/v1/posts/:id", _postService.findById);
app.post("/api/v1/posts", _postService.create);
app.put("/api/v1/posts/:id", isAuthenticated, _postService.update);
app.delete("/api/v1/posts/:id", isAuthenticated, _postService.Delete);

//Comments EndPoints
app.get("/api/v1/posts/:id/comments", _commentService.findAllCommentsByPost);
app.get(
  "/api/v1/posts/:id/comments/:idComment",
  _commentService.findCommentForPostById
);
app.post("/api/v1/posts/:id/comments", isAuthenticated, _commentService.create);
app.put(
  "/api/v1/posts/:id/comments/:idComment",
  isAuthenticated,
  _commentService.updateCommentForPostById
);
app.delete(
  "/api/v1/posts/:id/comments/:idComment",
  isAuthenticated,
  _commentService.delete
);

//Start the server
const server = app.listen(port, () =>
  console.log("server running in port:", port)
);

server.listen;
