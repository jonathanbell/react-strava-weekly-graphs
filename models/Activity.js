const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

const activitySchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  distance: {
    type: Number,
    default: 0
  },
  elapsed_time: {
    type: Number,
    default: 0
  },
  total_elevation_gain: {
    type: Number,
    default: 0
  },
  type: String,
  start_date: {
    type: Date,
    required: true
  },
  start_date_local: {
    type: Date,
    required: true
  },
  photo_count: {
    type: Number,
    default: 0
  },
  private: {
    type: Boolean,
    default: false
  },
  max_speed: {
    type: Number,
    default: 0
  },
  elev_high: {
    type: Number,
    default: 0
  },
  elev_low: {
    type: Number,
    default: 0
  },
  pr_count: {
    type: Number,
    default: 0
  }
});

// Deffine DB indexes
activitySchema.index({
  name: 'text',
  type: 'text'
});

// TODO: Pretty good, but it could be better...
activitySchema.statics.getTotalActivityDurationByWeekType = function(
  after,
  before
) {
  return this.aggregate([
    { $match: { start_date: { $gt: after, $lt: before } } },
    {
      $group: {
        _id: { week: { $week: '$start_date' }, type: '$type' },
        total: { $sum: '$elapsed_time' }
      }
    },
    { $sort: { '_id.week': 1 } },
    {
      $addFields: { activity: '$_id' }
    },
    {
      $project: { _id: 0 }
    }
  ]);
};

module.exports = mongoose.model('Activity', activitySchema);
