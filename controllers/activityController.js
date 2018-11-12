const mongoose = require('mongoose');
const Activity = mongoose.model('Activity');

exports.getActivityById = async (req, res) => {
  const activity = await Activity.findOne({ id: req.params.id });
  res.json(activity);
};

const setDefaultWeekValues = () => {
  const weeks = [];
  for (let i = 0; i <= 52; i++) {
    weeks.push(0);
  }
  return weeks;
};

const secondsToHours = seconds => {
  return seconds / (60 * 60);
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

const getMaterialColor = activityType => {
  let materialColor = 'rgba(117, 117, 117, 0.71)';

  switch (activityType) {
    case 'Backcountry Skiing':
      materialColor = 'rgba(63, 81, 181, 0.7)';
      break;
    case 'Fingerboard Training':
      materialColor = 'rgba(109, 76, 65, 0.71)';
      break;
    case 'Hiking':
      materialColor = 'rgba(192, 202, 51, 0.71)';
      break;
    case 'Resort Skiing':
      materialColor = 'rgba(0, 188, 212, 0.71)';
      break;
    case 'Ride':
      materialColor = 'rgba(142, 36, 170, 0.71)';
      break;
    case 'Rock Climbing':
      materialColor = 'rgba(233, 30, 99, 0.71)';
      break;
    case 'Run':
      materialColor = 'rgba(251, 140, 0, 0.71)';
      break;
    case 'Strength Training':
      materialColor = 'rgba(67, 160, 71, 0.71)';
      break;
    case 'Walk':
      materialColor = 'rgba(255, 87, 34, 0.71)';
      break;
    case 'Swim':
      materialColor = 'rgba(96, 125, 139, 0.77)';
      break;
    case 'Yoga':
      materialColor = 'rgba(253, 216, 53, 0.71)';
      break;
    default:
      materialColor = generateRandomRGBAstr();
  }

  return materialColor;
};

exports.getActivitiesByTypeAndWeeklyDuration = async (req, res) => {
  const activityDurationsByWeekType = await Activity.getTotalActivityDurationByWeekType(
    new Date(`${req.params.year - 1}-12-31T23:59:59`),
    new Date(`${req.params.year}-12-31T23:59:59`)
  );

  // Build `datasets` for chart.js

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
  activityTypes.forEach(activityType => {
    datasets.push({
      label: activityType,
      data: setDefaultWeekValues(),
      backgroundColor: getMaterialColor(activityType)
    });
  });

  // Add weekly durations by activity type
  activityDurationsByWeekType.forEach(activityWeeklyObj => {
    datasets.forEach(activityType => {
      if (activityType.label === activityWeeklyObj.activity.type) {
        activityType.data[activityWeeklyObj.activity.week] += secondsToHours(
          activityWeeklyObj.total
        );
      }
    });
  });

  res.json(datasets);
};

exports.getActivitiesBySearchTerm = async (req, res) => {
  const activities = await Activity.find({
    $text: { $search: req.query.s }
  })
    .sort({ start_date: -1 })
    .limit(20);

  res.json(activities);
};

exports.getBiggies = async (req, res) => {
  const mostElevationGainPromise = Activity.find({})
    .sort({ total_elevation_gain: -1 })
    .limit(1);
  const longestDurationPromise = Activity.find({})
    .sort({ elapsed_time: -1 })
    .limit(1);
  const longestDistancePromise = Activity.find({})
    .sort({ distance: -1 })
    .limit(1);
  const fastestPromise = Activity.find({})
    .sort({ max_speed: -1 })
    .limit(1);

  const results = await Promise.all([
    mostElevationGainPromise,
    longestDurationPromise,
    longestDistancePromise,
    fastestPromise
  ]);

  const biggies = [];
  for (i = 0; i < results.length; i++) {
    biggies.push(results[i][0]);
  }

  res.json(biggies);
};
