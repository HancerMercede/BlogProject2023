import Comment from '../models/comment.js';


const commentService = {
      
    findAllCommentsByPost:async(req,res,next)=>{
       
        const {id} = req.params;
        const comments = await Comment.find({idPost:id});

        if(comments === null){return res.send(`No comments yet for this post: ${id}`)}
        res.status(200).send(comments);
    },

    findCommentForPostById:async(req,res,next)=>{
        const {id, idComment} = req.params;
        const comment = await Comment.findOne({idPost:id, id:idComment});

        if(comment === null) { return res.send(`No comment with this id : ${idComment}`); }

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
     try{

        const {id, idComment} = req.params;
        const post = req.body;
        const commentUpdated = await Comment.findOneAndUpdate({idPost:id, id:idComment}, post, {
            upsert:true,
            new:true
        });
        res.status(200).json(commentUpdated);

     }catch(err){
        console.error(err);
        next(err);
     }
    },

    delete:async(req,res,next) => {
       try{

        const {id, idComment} = req.params;
        const commetDeleted = await Comment.deleteOne({idPost:id, id:idComment});
 
        res.status(204).send();

       }catch(err){
        console.error(err);
        next(err);
       }
    }
}

export default commentService;