import db from '../Persistence/db.js';

const User = db.model('user', {
    email: { type: String, require: true, unique:true},
    password: { type: String, require: true, minLength:8 },
    salt: { type: String, require: true },
    name: { type: String, require: true, lowercase:true },
    roles:{type:[''],lowercase:true},
});

export default User;