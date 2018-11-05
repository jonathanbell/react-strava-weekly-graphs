import React from 'react';
import PropTypes from 'prop-types';

const Activity = ({ activity }) => (
  <a
    title="View on Strava"
    target="_blank"
    href={`https://www.strava.com/activities/${activity.id}`}
  >
    {activity.name}
  </a>
);

Activity.propTypes = {
  activity: PropTypes.shape({
    name: PropTypes.string.isRequired, // "validates" that the `name` is a prop type of string and is not NULL.
    id: PropTypes.number.isRequired
  }).isRequired
};

export default Activity;
