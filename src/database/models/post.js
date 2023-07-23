import { DataTypes } from "sequelize";
import sequelize from "../../Persistence/database.js";


const Post = sequelize.define('Post', {
  // Model attributes are defined here
  id: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey:true
  },
  title: {
    type: DataTypes.STRING,
    allowNull:false
  },
  content: {
    type: DataTypes.STRING,
    allowNull:false
  },
  username: {
    type: DataTypes.STRING,
    allowNull:false
  },
  postdate: {
    type: DataTypes.DATE,
    allowNull:false
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull:false
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull:false
  },
  modifiedBy: {
    type: DataTypes.DATE,
    allowNull:false
  }
}, {
  sequelize,
  modelName:'User',
  timestamps: true
});

export default Post;
