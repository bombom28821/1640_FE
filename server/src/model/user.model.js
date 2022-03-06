import { mongoose } from 'mongoose';
const Schema = mongoose.Schema;
import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);
let passwordHash = bcrypt.hashSync('123456', salt);

const user = new Schema({
    name : { type: String, min: 1, max: 50 },
    email : { type: String, min: 1, max: 100, unique: true },
    password : { type: String, min: 1, default: passwordHash},
    category : { type: Schema.Types.ObjectId, ref:"category"},
    phone : { type: String, min: 9},
    address : { type: String, min: 1, max: 255 },
    avatar : { type: String, default: "avatar.jpg"},
    role : { type: String, min: 1 },
},{
    timestamps : { currentTime: () => Math.floor(Date.now()) },
});

export const userModel = mongoose.model('User', user);

export function initializeUser() {
    try{
        userModel.estimatedDocumentCount(async (err, count) => {
            if( !err && count === 0 ) {
                await new userModel({
                    name: 'admin',
                    email : 'admin@fpt.edu.vn',
                    phone: '0123456789',
                    address: 'Hà Nội',
                    role: "admin",
                }).save();
                console.log('Add admin user!')
            }
        })
    }catch(err){
        console.log(err)
    }
}