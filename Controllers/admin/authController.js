const Admin = require('../../Models/authModel');
const comparePassword = require('../../Utils/comparePassword');
const {signToken} = require('../../Utils/JWTGenerator');


exports.loginAdmin = async (req, res) => {
    try {
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

        res.json({
            message: 'Login successful',
            token,
            admin: {
                id: admin._id,
                userName: admin.userName,
                role: admin.role
            }
        });

    } catch (err) {
        res.status(500).json({ message: 'Login failed', error: err.message });
    }
};
