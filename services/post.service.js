import Post from '../models/post.js';


const postService = {
    findAll:async(req, res, next)=>{
        const posts = await Post.find()
        .populate('comments')
        .exec();

        res.status(200).send(posts);
    },

    findById:async(req,res,next)=>{
      try{
        const {id} = req.params;
        const post = await Post.findOne({_id:id})
        .populate('comments')
        .exec();

        res.status(200).send(post);

      }catch(err){
        console.error(err);
        next(err);
      }
       
    },

    create:async(req, res,next) => {
      try{

        const post = req.body;
        const createPost = await Post.create({title:post.title, date:post.date, username:post.username, content:post.content, rate:post.rate, comment:post.comment});
        res.status(201).send(createPost);

      }catch(err){
         console.error(err);
         next(err);
      }
    
    },

    update:async(req, res, next) => {
      try{

        const {id} = req.params;


        const post = req.body;
      
        const updatePost = await Post.findByIdAndUpdate({_id:id}, post, {
          new:true
        });
        
        res.status(200).json(updatePost);

      }catch(err){
          console.error(err);
          next(err);
       }
      },

      Delete: async(req,res,next)=>{
        const {id} = req.params; 
        const deleted = await Post.findByIdAndDelete({_id:id});
        res.status(204).json(deleted);
      }
}

export default postService;