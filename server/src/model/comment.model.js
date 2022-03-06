import { mongoose } from 'mongoose';
const Schema = mongoose.Schema;

const comment = new Schema({
    content: { type: String, min: 1},
    file: [{type: String, min :1}],
    content: { type: String},
    category: { type: Schema.Types.ObjectId, ref: 'category' },
    user: { type: Schema.Types.ObjectId, ref: 'user'},
    idea: { type: Schema.Types.ObjectId, ref: 'idea'}
},{
    timestamps : { currentTime: () => Math.floor(Date.now()) }
})

export default mongoose.model('idea', idea)