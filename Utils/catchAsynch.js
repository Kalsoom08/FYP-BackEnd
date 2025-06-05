const catchAsync = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next).catch(next)).catch(next);
    }
};
module.exports = catchAsync;

// Bro you can use this code in a controller by follow the following steps:
//import catchAsync from utils function
// and write controller in this formate

//const getUser = catchAsync(async (req, res, next) => {
//    const user = await User.findById(req.params.id);
//   res.json(user);
//});

//you do not need to show any error because itt will automatically convert to the error handling middleware without crash your server.