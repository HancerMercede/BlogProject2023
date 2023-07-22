import { Schema } from 'mongoose';
import db from '../Persistence/db.js';
import {v4 as uuidv4} from 'uuid';


const Post = db.model('post',{
   id:{type:String, unique:true, default:uuidv4},
   title:{type:String, require:true},
   date:{type:Date,require:true},
   username:{
    type:String,
    ref:'user',
    index:true,
    require:true
   },
   content:{type:String, require:true},
   rate:{type:Number},
   comments:[{
    type:Schema.Types.ObjectId,
    ref:'comment',
    index:true
   }]
});

export default Post;