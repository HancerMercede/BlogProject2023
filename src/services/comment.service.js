import Comment from "../database/models/comment.js";
import sequelize from "../Persistence/database.js";

const commentService = {
  findAllCommentsByPost: async (req, res, next) => {
    const { id } = req.params;
    const comments = await Comment.findAll({ where: { idPost: id } });

    if (comments.length === 0 || comments === null) {
      return res.status(404).send([]);
    }
    res.status(200).json(comments);
  },

  findCommentForPostById: async (req, res, next) => {
    const { id, idComment } = req.params;

    const comment = await Comment.findAll({
      where: { idPost: id, id: idComment },
    });

    if (comment.length === 0 || comment === null) {
      return res.json({
        message: `No comment with this id : ${idComment}`,
      });
    }

    res.status(200).json(comment);
  },

  create: async (req, res, next) => {
    try {
      return await sequelize.transaction(async (t) => {
        const { id } = await req.params;
        const model = req.body;
        console.log(model);
        const createComment = await Comment.create(
          {
            idPost: model.idPost,
            content: model.content,
            username: model.username,
          },
          { transaction: t }
        );
        res.status(200).send(createComment);
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  updateCommentForPostById: async (req, res, next) => {
    try {
      return await sequelize.transaction(async (t) => {
        const { id, idComment } = req.params;
        const comment = req.body;
        const commentUpdated = await Comment.update(
          comment,
          { where: { idPost: id, id: idComment } },
          { transaction: t }
        );

        res.status(200).json(commentUpdated);
      });
    } catch (err) {
      console.error(err);
      next(err);
    }
  },

  delete: async (req, res, next) => {
    try {
      return await sequelize.transaction(async (t) => {
        const { id, idComment } = req.params;
        const commetDeleted = await Comment.destroy(
          { where: { idPost: id, id: idComment } },
          { transaction: t }
        );

        res.status(204).send(commetDeleted);
      });
    } catch (err) {
      console.error(err);
      next(err);
    }
  },
};

export default commentService;
