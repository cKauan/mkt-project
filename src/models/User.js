const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    buy: {
        type: Number,
        required: true,
    },
    notes: {
        type: String,
        default: ''
    },
    created_at: {
        type: Date,
        default: Date.now
    }
})


UserSchema.plugin(mongoosePaginate);
mongoose.model('Users', UserSchema);