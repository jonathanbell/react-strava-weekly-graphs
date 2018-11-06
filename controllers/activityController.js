const mongoose = require('mongoose');
const Activity = mongoose.model('Activity');

exports.getActivityById = async (req, res) => {
  const activity = await Activity.find({})
    .sort({ start_date: 1 })
    .limit(1);
  res.json(activity);
};
