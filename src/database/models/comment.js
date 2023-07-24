import { DataTypes, UUIDV4 } from "sequelize";
import sequelize from "../../Persistence/database";

const Comment = sequelize.define("Comment", {
  id:{
    typpe:DataTypes.STRING,
    primaryKey:true,
    defaultValue:UUIDV4,
    allowNull:false,
    validate:{
      isUUID:4
    }
  },
    idPost:{
      typpe:DataTypes.STRING,
      allowNull:false,
      validate:{
        isUUID:4
      }
    },
    content:{
      type:DataTypes.STRING,
      allowNull:false
    },
    username:{
      type:DataTypes.STRING, 
      allowNull:false,
      validate:{
      isEmail:true
      }
    },
    commentDate:{
      type:DataTypes.DATE,
      allowNull:false
      }
      
  },{
    modelName:"Comment",
    sequelize

});