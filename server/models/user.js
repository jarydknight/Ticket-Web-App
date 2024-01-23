const {Schema, model} = require("mongoose");

// User schema
const UserSchema = new Schema(
    {
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
        location: {
            type: String,
            required: true
        },
        position: {
            type: String
        },
        createdAt: {
            type: Date,
            default: Date.now,
        }
    }
);

const User = model('User', UserSchema);

module.exports = User;