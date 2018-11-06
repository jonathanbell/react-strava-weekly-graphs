const mongoose = require('mongoose');
const Activity = mongoose.model('Activity');

exports.getActivityById = async (req, res) => {
  const activity = await Activity.find({})
    .sort({ start_date: 1 })
    .limit(1);
  res.json(activity);
};

const setDefaultWeekValues = () => {
  const weeks = [];
  for (let i = 0; i <= 52; i++) {
    weeks.push(0);
  }
  return weeks;
};

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const generateRandomRGBAstr = () => {
  return `rgba(${getRandomInt(1, 255)}, ${getRandomInt(1, 255)}, ${getRandomInt(
    1,
    255
  )}, 0.77)`;
};

const getMaterialColor = index => {
  // Some colors
  const backgroundColors = [
    'rgba(30, 136, 229, 0.71)',
    'rgba(109, 76, 65, 0.71)',
    'rgba(192, 202, 51, 0.71)',
    'rgba(0, 172, 193, 0.71)',
    'rgba(142, 36, 170, 0.71)',
    'rgba(244, 81, 30, 0.71)',
    'rgba(84, 110, 122, 0.71)',
    'rgba(67, 160, 71, 0.71)',
    'rgba(251, 140, 0, 0.71)',
    'rgba(117, 117, 117, 0.71)',
    'rgba(253, 216, 53, 0.71)',
    'rgba(144, 164, 174, 0.71)'
  ];

  if (typeof backgroundColors[index] === 'undefined') {
    return generateRandomRGBAstr();
  }

  return backgroundColors[index];
};

exports.getActivitiesByTypeAndWeeklyDuration = async (req, res) => {
  const activityDurationsByWeekType = await Activity.getTotalActivityDurationByWeekType(
    new Date('2017-12-31T03:24:00'),
    new Date()
  );

  // Build datasets for chart.js

  // Populate activityTypes
  const activityTypes = [];
  activityDurationsByWeekType.forEach(activityWeeklyObj => {
    if (!activityTypes.includes(activityWeeklyObj.activity.type)) {
      activityTypes.push(activityWeeklyObj.activity.type);
    }
  });
  activityTypes.sort();

  // Intial population of datasets
  let datasets = [];
  activityTypes.forEach((activityType, index) => {
    datasets.push({
      label: activityType,
      data: setDefaultWeekValues(),
      backgroundColor: getMaterialColor(index)
    });
  });

  // Add weekly durations by activity type
  activityDurationsByWeekType.forEach(activityWeeklyObj => {
    datasets.forEach(activityType => {
      if (activityType.label === activityWeeklyObj.activity.type) {
        activityType.data[activityWeeklyObj.activity.week] +=
          activityWeeklyObj.total;
      }
    });
  });

  // console.log(JSON.parse(JSON.stringify(datasets)));

  res.json(datasets);
};
