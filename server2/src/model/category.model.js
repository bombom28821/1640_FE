import { mongoose } from 'mongoose';
const Schema = mongoose.Schema;

const category = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    }
},{
    timestamps : { currentTime: () => Math.floor(Date.now()) },
    
})

export default mongoose.model('Category', category);