import { Schema } from 'mongoose';
import db from '../Persistence/db.js';
import {v4 as uuidv4} from 'uuid';

const Comment = db.model('comment', {
    id:{type:String, unique:true, default:uuidv4},
    username:{ 
        type:String,
        ref:'user',
        index:true,
        require:true
    },
    date:{type:Date},
    content:{type:String},
     idPost:{
      type:Schema.Types.ObjectId,
      ref:'Post',
      index:true,
      require:false
    },
});

export default Comment;