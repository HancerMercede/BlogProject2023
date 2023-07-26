import { DataTypes, UUIDV4 } from "sequelize";
import sequelize from "../../Persistence/database.js";


const Post = sequelize.define('Post', {
  // Model attributes are defined here
  id: {
    type: DataTypes.STRING, 
    defaultValue: UUIDV4,
    allowNull: false,
    primaryKey:true,
    validate:{
        isUUID: 4
    }
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
    defaultValue: DataTypes.NOW,
    allowNull:false,
    validate:{
        isDate: true
    }
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
    defaultValue: DataTypes.NOW,
    allowNull:false
  }
}, {
  sequelize,
  modelName:'User',
  timestamps: true
});

export default Post;