import { Op } from "sequelize";
import sequelize from "../Persistence/database.js";
import Post from "../database/models/post.js";
import fs from "fs";

const postService = {
  findAll: async (req, res, next) => {
    try {
      const { search } = req.query;
      if (search) {
        const posts = await Post.findAll({
          where: {
            title: {
              [Op.like]: `%${search}%`,
            },
          },
        });
        return res.status(200).json(posts);
      }

      const posts = await Post.findAll();

      return res.status(200).json(posts);
    } catch (err) {
      console.error(err);
      next(err);
    }
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

  create: async (req, res, next) => {
    try {
      const post = await req.body;
      const { originalname, path } = req.file;
      const parts = originalname.split(".");
      const ext = parts[parts.length - 1];
      const newPath = path + "." + ext;
      fs.renameSync(path, newPath);
      console.log(newPath);

      console.log(post);
      return await sequelize.transaction(async (t) => {
        const createPost = await Post.create(
          {
            title: post.title,
            content: post.content,
            cover: newPath,
            category: post.category,
            username: post.author,
            postdate: post.date,
            createdAt: post.date,
            updatedAt: post.date,
            modifiedBy: post.author,
          },
          {
            transaction: t,
          }
        );
        res.status(201).json(createPost);
      });
    } catch (err) {
      console.error(err);
      next(err);
    }
  },

  update: async (req, res, next) => {
    try {
      return await sequelize.transaction(async (t) => {
        const { id } = req.params;

        const post = req.body;

        const updatePost = await Post.update(
          {
            title: post.title,
            content: post.content,
            category: post.category,
            username: post.author,
            createdAt: post.date,
            modifiedBy: post.author,
          },
          { where: { id: id } },
          { transaction: t }
        );
        res.status(204).json(updatePost);
      });
    } catch (err) {
      console.error(err);
      next(err);
    }
  },

  Delete: async (req, res, next) => {
    try {
      return await sequelize.transaction(async (t) => {
        const { id } = req.params;
        const deleted = await Post.destroy(
          { where: { id: id } },
          { transaction: t }
        );
        res.status(204).json(deleted);
      });
    } catch (err) {
      console.error(err);
      next(err);
    }
  },
};

export default postService;
