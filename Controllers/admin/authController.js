const Admin = require('../../Models/authModel');
const comparePassword = require('../../Utils/comparePassword');
const { signToken } = require('../../Utils/JWTGenerator');
const catchAsync = require('../../Utils/catchAsynch');

const loginAdmin = catchAsync(async (req, res) => {
    const { userName, password } = req.body;

    const admin = await Admin.findOne({ userName });
    if (!admin) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await comparePassword(password, admin.password);
    if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = signToken({ id: admin._id, role: admin.role });

    res.status(200).json({
        message: 'Login successful',
        token,
        admin: {
            id: admin._id,
            userName: admin.userName,
            role: admin.role
        }
    });
});

module.exports = { loginAdmin };
