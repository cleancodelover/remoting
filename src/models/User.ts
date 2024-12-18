import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: false,
    },
    isAuthor: {
        type: Boolean,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    salt: {
        type: String,
        required: true,
    },
    hash: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: false,
    },
    books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
    ratings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Rating' }]
}, {collection: 'users'})

export default mongoose.models.User || mongoose.model('User', userSchema)