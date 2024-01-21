const {Schema, model, Types} = require("mongoose");

// User schemas
const UserSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        userName: {
            type: String,
            required: true
        },
        password: {

        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/]
        },
        createdAt: {
            type: Date,
            default: Date.now,
        }
    }
);

const User = model('User', UserSchema);

module.exports = User;