import Post from '../models/post.js';


const postService = {
    findAll:async(req, res, next)=>{
        const posts = await Post.find()
        .populate('comments')
        .exec();

        res.status(200).send(posts);
    },

    findById:async(req,res,next)=>{
        const {id}=req.params;
        const post = await Post.findOne({_id:id})
        .populate('comments')
        .exec();

        res.status(200).send(post);
    },

    create:async(req, res,next) => {
      const post = await req.body;
      const createPost = Post.create({title:post.title, date:post.date, username:post.username, content:post.content, rate:post.rate, comment:post.comment});
      res.status(201).json(createPost);
    },

    update:async(req, res,next) => {
        const post = await req.body;
        const updatePost = Post.updateOne({_id:id}, post);
        res.status(200).json(updatePost);
      }
}

export default postService;