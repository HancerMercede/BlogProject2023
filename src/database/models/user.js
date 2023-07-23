import { DATE, DataTypes, UUIDV4 } from "sequelize";
import sequelize from "../../Persistence/database.js";

const  User = sequelize.define('User',{
  id: {type: DataTypes.STRING, primaryKey:true, defaultValue:UUIDV4},
  email:{type: DataTypes.STRING},
  password: {type: DataTypes.STRING},
  name: {type: DataTypes.STRING},
  role: {type: DataTypes.STRING, defaultValue:'USER'},
  salt: {type: DataTypes.STRING},
  createdAt: {type: DataTypes.DATE,defaultValue:DataTypes.NOW},
  updatedAt: {type: DataTypes.DATE,defaultValue:DataTypes.NOW},
 
}, {
  sequelize,
  modelName: 'User',
});

export default User;