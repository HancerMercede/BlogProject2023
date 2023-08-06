import models from "../database/models/index.js";

const postService = {
  findAll: async (req, res, next) => {
    const posts = await Post.findAll();
    res.status(200).send(posts);
  },

  findById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const post = await Post.findByPk(id);

      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      res.status(200).send(post);
    } catch (err) {
      console.error(err);
      next(err);
    }
  },

  /**
   * 
   * @param {
   * 
   * 
   * 
   * 
   * 
   * 
   * 
   * } req 
   * @param {*} res 
   * @param {*} next 
   */

  create: async (req, res, next) => {
    try {
      const result = await sequelize.trasaction(async (tx) => {
        const post = await req.body;
        return await Post.create(
          { ...post },
          {
            //Pila de opciones
            trasaction: tx,
            logging: console.log,
          }
        );
      });
      res.status(201).send(result);
    } catch (err) {
      console.error(err);
      next(err);
    }
  },

  update: async (req, res, next) => {
    try {
      const { id } = req.params;

      const post = req.body;
      const updatePost = await Post.update(post, { where: { id: id } });
      res.status(204).json(updatePost);
    } catch (err) {
      console.error(err);
      next(err);
    }
  },

  Delete: async (req, res, next) => {
    try {
      const { id } = req.params;
      const deleted = await Post.destroy({ where: { id: id } });
      res.status(204).json(deleted);
    } catch (err) {
      console.error(err);
      next(err);
    }
  },
};

export default postService;
