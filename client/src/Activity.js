import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const getMaterialColor = activityType => {
  let materialColor = 'rgba(117, 117, 117, 0.7)';

  switch (activityType) {
    case 'Backcountry Skiing':
      materialColor = 'rgba(63, 81, 181, 0.7)';
      break;
    case 'Fingerboard Training':
      materialColor = 'rgba(109, 76, 65, 0.7)';
      break;
    case 'Hiking':
      materialColor = 'rgba(192, 202, 51, 0.7)';
      break;
    case 'Resort Skiing':
      materialColor = 'rgba(0, 188, 212, 0.7)';
      break;
    case 'Ride':
      materialColor = 'rgba(142, 36, 170, 0.7)';
      break;
    case 'Rock Climbing':
      materialColor = 'rgba(233, 30, 99, 0.7)';
      break;
    case 'Run':
      materialColor = 'rgba(251, 140, 0, 0.7)';
      break;
    case 'Strength Training':
      materialColor = 'rgba(67, 160, 71, 0.7)';
      break;
    case 'Walk':
      materialColor = 'rgba(255, 87, 34, 0.7)';
      break;
    case 'Swim':
      materialColor = 'rgba(96, 125, 139, 0.7)';
      break;
    case 'Yoga':
      materialColor = 'rgba(253, 216, 53, 0.7)';
      break;
    default:
      materialColor = 'rgba(117, 117, 115, 0.7)';
  }

  return materialColor;
};

const Activity = ({ activity }) => (
  <div className="card">
    <div
      className="card-header"
      style={{ background: getMaterialColor(activity.type) }}
    >
      <strong>{activity.type}</strong> -{' '}
      <time>
        <Moment fromNow>{activity.start_date}</Moment>
      </time>
    </div>
    <div className="card-body">
      <h3 className="card-title h5">{activity.name} </h3>
      <p className="card-text mt-0 mb-0">
        Duration:{' '}
        {
          new Date(activity.elapsed_time * 1000)
            .toUTCString()
            .match(/(\d\d:\d\d:\d\d)/)[0]
        }
      </p>
      {activity.distance ? (
        <p className="card-text mt-0 mb-0">
          Distance: {(activity.distance / 1000).toFixed(2)}km
        </p>
      ) : (
        ' '
      )}
      {activity.total_elevation_gain ? (
        <p className="card-text mt-0 mb-0">
          Elevation gain: {activity.total_elevation_gain} meters
        </p>
      ) : (
        ' '
      )}
      <a
        className="btn btn-primary mt-3"
        target="_blank"
        href={`https://www.strava.com/activities/${activity.id}`}
      >
        View on Strava
      </a>
    </div>
  </div>
);

Activity.propTypes = {
  activity: PropTypes.shape({
    // "Validates" that the `name` is a prop type of string and is not NULL.
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired
  }).isRequired
};

export default Activity;
