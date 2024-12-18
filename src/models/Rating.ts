import mongoose from 'mongoose'

const ratingSchema = new mongoose.Schema({
    user_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', required: true 
    },
    book_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Book', 
        required: true 
    },
    quantity: {
        type: String,
        required: true,
        unique: false
    },
    user: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    book: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }]
}, {collection: 'ratings'})

export default mongoose.models.Rating || mongoose.model('Rating', ratingSchema)