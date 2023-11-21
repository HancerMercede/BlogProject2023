import express from "express";
import { Auth, isAuthenticated } from "./src/auth/auth.js";
import _postService from "./src/services/post.service.js";
import _commentService from "./src/services/comment.service.js";
import cors from "cors";
import multer from "multer";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const upload = multer({
  dest: "uploads/",
  limits: { fileSize: 10 * 1024 * 1024 },
});

const app = express();

app.use(express.json());
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(
  cors({
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    origin: "http://localhost:5173",
  })
);
app.use(cookieParser());

const port = process.env.PORT || 3001;

// root endpoints
app.get("/", (req, res, next) => {
  res.send("Hello, this is the API for the it-master-blog application.");
});

//Auth EndPoints
app.post("/auth/register", Auth.register);
app.post("/auth/login", Auth.login);
app.get("/auth/profile", Auth.profile);

app.get("/auth", isAuthenticated, (req, res) => {
  res.send(req.user);
});

//Comments EndPoints
app.get("/api/v1/posts", _postService.findAll);
app.get("/api/v1/posts/:id", _postService.findById);

app.post("/api/v1/posts", upload.single("files"), _postService.create);
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

app.post("/api/v1/uploads", upload.single("files"), (req, res, next) => {
  console.log({ files: req.file });
});
//Start the server
const server = app.listen(port, () =>
  console.log("server running in port:", port)
);

server.listen;
