import db from '../Persistence/db.js';


const Post = db.model('post',{
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
   comments:{
    type:String,
    ref:'comment',
    index:true,
    require:true 
   }
});

export default Post;