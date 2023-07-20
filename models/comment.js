import db from '../Persistence/db.js';

const Comment = db.model('comment',{
    username:{type:String},
    date:{type:Date},
    content:{type:String}
});

export default Comment;