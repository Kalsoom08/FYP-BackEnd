const mongoose = require('mongoose');
const hashedPassword = require('../Utils/hashPassword.js');

const authSchema = new mongoose.Schema(
    {
        userName: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            enum: ['admin'],
            default: 'admin',
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

authSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await hashedPassword(this.password);
    next();
});

module.exports = mongoose.model('Auth', authSchema);