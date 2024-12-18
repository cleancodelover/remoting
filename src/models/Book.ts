import mongoose from 'mongoose'

const bookSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User', 
    },
    title: {
        type: String,
        required: false,
    },
    author: {
        type: String,
        required: false,
    },
    description: {
        type: String,
        required: false,
    },
    pages: {
        type: String,
        required: false,
    },
    unitPrice: {
        type: String,
        required: false,
    },
    imageUrl: {
        type: String,
        required: false,
    },
    year: {
        type: String,
        required: false,
    },
    bookUrl: {
        type: String,
        required: false,
    },
    isbn: {
        type: String,
        required: true,
        unique: true
    },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
    ratings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Rating' }]
}, {collection: 'books'})

export default mongoose.models.Book || mongoose.model('Book', bookSchema)