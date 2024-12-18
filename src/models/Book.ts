import mongoose from 'mongoose'

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
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
        required: true,
    },
    unitPrice: {
        type: String,
        required: false,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    bookUrl: {
        type: String,
        required: true,
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