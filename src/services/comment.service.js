import Comment from "../database/models/comment.js";

const commentService = {
  findAllCommentsByPost: async (req, res, next) => {
    const { id } = req.params;
    const comments = await Comment.findAll({ where: { idPost: id } });

    if (comments.length === 0 || comments === null) {
      return res.json({ message: `No comments yet for this post: ${id}` });
    }
    res.status(200).send(comments);
  },

  findCommentForPostById: async (req, res, next) => {
    const { id, idComment } = req.params;
    const comment = await Comment.findAll({
      where: { idPost: id, id: idComment },
    });
    console.log(comment);
    if (comment.length === 0 || comment === null) {
      return res.json({ message: `No comment with this id : ${idComment}` });
    }

    res.status(200).json(comment);
  },

  create: async (req, res, next) => {
    const { id } = req.params;
    const model = req.body;
    const createComment = await Comment.create({
      username: model.username,
      date: model.date,
      content: model.content,
      idPost: id,
    });
    res.status(200).send(createComment);
  },

  updateCommentForPostById: async (req, res, next) => {
    try {
      const { id, idComment } = req.params;
      const comment = req.body;
      const commentUpdated = await Comment.update(comment, {
        where: { idPost: id, id: idComment },
      });

      res.status(200).json(commentUpdated);
    } catch (err) {
      console.error(err);
      next(err);
    }
  },

  delete: async (req, res, next) => {
    try {
      const { id, idComment } = req.params;
      const commetDeleted = await Comment.destroy({
        where: { idPost: id, id: idComment },
      });

      res.status(204).send(commetDeleted);
    } catch (err) {
      console.error(err);
      next(err);
    }
  },
};

export default commentService;
