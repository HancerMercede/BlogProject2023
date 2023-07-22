import Comment from '../models/comment.js';


const commentService = {
      
    findAllCommentsByPost:async(req,res,next)=>{
       
        const {id} = req.params;
        const comments = await Comment.find({idPost:id});
        console.log(comments);
        res.status(200).send(comments);
    },

    findCommentForPostById:async(req,res,next)=>{
        const {id, idComment} = req.params;
        const comment = await Comment.findOne({idPost:id, id:idComment});
        console.log(comment);
        res.status(200).send(comment);
    },

    create:async(req,res,next) => {
        const {id} = req.params;
        const model = req.body;
        const createComment = await Comment.create({username:model.username, date:model.date, content:model.content, idPost:id});
        res.status(200).send(createComment);
    },

    updateCommentForPostById:async(req,res, next) => {
      const {id, idComment} = req.params;
      const post = req.body;
      const commentUpdated = await Comment.findOneAndUpdate({idPost:id, id:idComment}, post, {
          upsert:true,
          new:true
      });
      res.status(200).json(commentUpdated);
    }
}

export default commentService;