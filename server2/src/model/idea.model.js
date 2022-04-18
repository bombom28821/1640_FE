import { mongoose } from 'mongoose';
const Schema = mongoose.Schema;

const idea = new Schema({
    content: { type: String, min: 1},
    file: [{type: String, min :1}],
    content: { type: String},
    category: { type: Schema.Types.ObjectId, ref: 'category' },
    like: [{ type: Schema.Types.ObjectId, ref: 'user'}],
    disLike: [{ type: Schema.Types.ObjectId, ref: 'user'}],
    comment: [{ type: Schema.Types.ObjectId, ref: 'comment'}]
},{
    timestamps : { currentTime: () => Math.floor(Date.now()) }
})

export default mongoose.model('idea', idea)