const CampusMap = require('../../Models/mapModel.js');
const catchAsync = require('../../Utils/catchAsynch.js');

const getCampusMap = catchAsync(async (req, res) => {
    const map = await CampusMap.findOne().sort( { createdAt : -1 });
    if (!map) {
        return res.status(404).json({
            message: "Map not Available."
        });
    }
    res.status(200).json({
        message: "Map Fetched Successfully.",
        data : map,
    });
});
module.exports = { getCampusMap };