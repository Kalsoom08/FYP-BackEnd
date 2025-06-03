const catchAsync = require('../../Utils/catchAsynch.js');
const Notification = require('../../Models/notificationsModel.js')


const getNotifications = catchAsync(async (req, res) => {
  const {title ,type, department } = req.query;
  const filter = {};
  if(title) filter.title = title
  if (type) filter.type = type;
  if (department) filter.department = department;

  const notifications = await Notification.find(filter).sort({ createdAt: -1 });
  res.status(200).json(notifications);
});

module.exports = getNotifications