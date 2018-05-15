/* eslint react/no-did-mount-set-state: 0 */
import React from 'react';
import { HorizontalBar } from 'react-chartjs-2';
import moment from 'moment';
import Activity from './Activity';

class ActivitiesChart extends React.Component {
  static defaultProps = {
    displayTitle: true,
    displayLegend: true
  };

  constructor(props) {
    super(props);

    this.setDefaultWeekValues = () => {
      const zeros = [];
      for (let i = 1; i <= 52; i += 1) {
        zeros.push(0);
      }
      return zeros;
    };

    this.selectedYear =
      this.props.match.params.year > 2014 &&
      this.props.match.params.year < moment().year() + 1
        ? parseInt(this.props.match.params.year, 10)
        : parseInt(moment().year(), 10);
  }

  state = {
    barChartData: {
      labels: (() => {
        const weeks = [];
        for (let i = 1; i <= 52; i += 1) {
          weeks.push(`Week ${i}`);
        }
        return weeks;
      })(),
      // Set our initial state to be an empty array.
      // We will populate this after our api call.
      datasets: []
    },
    activities: [],
    isLoaded: false
  };

  componentDidMount() {
    const getAllStravaActivitiesByYear = (
      page = 1,
      newDataSets = [],
      allActivities = [],
      activitiesPerPage = 200
    ) => {
      fetch(
        `https://www.strava.com/api/v3/athlete/activities?per_page=${activitiesPerPage}&page=${page}`,
        {
          method: 'GET',
          headers: {
            Authorization: 'Bearer 3df37bbc2c82897c54a0f252988d219f19ab8d04'
          }
        }
      )
        .then(response => response.json())
        .then(json => {
          if (newDataSets.length === 0) {
            newDataSets = [
              {
                label: 'Running', // 0
                backgroundColor: 'rgba(31, 35, 215, 0.73)',
                data: this.setDefaultWeekValues()
              },
              {
                label: 'Strength and Finger Training', // 1
                backgroundColor: 'rgba(91, 215, 31, 0.73)',
                data: this.setDefaultWeekValues()
              },
              {
                label: 'Rock Climbing', // 2
                backgroundColor: 'rgba(213, 239, 15, 0.73)',
                data: this.setDefaultWeekValues()
              },
              {
                label: 'Hiking', // 3
                backgroundColor: 'rgba(0, 150, 133, 0.73)',
                data: this.setDefaultWeekValues()
              },
              {
                label: 'Resort Skiing', // 4
                backgroundColor: 'rgba(244, 67, 54, 0.73)',
                data: this.setDefaultWeekValues()
              },
              {
                label: 'Backcountry Skiing', // 5
                backgroundColor: 'rgba(3, 169, 239, 0.73)',
                data: this.setDefaultWeekValues()
              },
              {
                label: 'Other', // 6
                backgroundColor: 'rgba(157, 157, 153, 0.73)',
                data: this.setDefaultWeekValues()
              }
            ];
          }

          json.forEach(activity => {
            if (moment(activity.start_date).year() === this.selectedYear) {
              let activityType = 6;

              switch (activity.type) {
                case 'Run':
                  activityType = 0;
                  break;
                case 'WeightTraining':
                case 'Workout':
                  activityType = 1;
                  break;
                case 'RockClimbing':
                  activityType = 2;
                  break;
                case 'Hike':
                  activityType = 3;
                  break;
                case 'AlpineSki':
                  activityType = 4;
                  break;
                case 'BackcountrySki':
                  activityType = 5;
                  break;
                default:
                  activityType = 6;
              }

              newDataSets[activityType].data[
                moment(activity.start_date).isoWeek() - 1
              ] +=
                activity.elapsed_time / 3600;

              allActivities.push(activity);
            }
          });

          if (
            moment(json[json.length - 1].start_date).year() >=
              this.selectedYear &&
            json.length === activitiesPerPage
          ) {
            page += 1;
            getAllStravaActivitiesByYear(
              page,
              newDataSets,
              allActivities,
              activitiesPerPage
            );
          } else {
            console.log('We made this dataset for chart.js:', newDataSets);

            // https://stackoverflow.com/questions/43040721/how-to-update-a-nested-state-in-react
            const barChartData = { ...this.state.barChartData };
            barChartData.datasets = newDataSets;
            this.setState({ isLoaded: true });
            this.setState({ barChartData });
            this.setState({ activities: allActivities.reverse() });
          }
        })
        .catch(error =>
          console.error('There was, like, totally an error....', error)
        );
    };

    getAllStravaActivitiesByYear();
  }

  render() {
    return (
      <div>
        <hr style={{ clear: 'both' }} />
        {this.state.isLoaded ? (
          <HorizontalBar
            data={this.state.barChartData}
            height={777}
            options={{
              title: {
                text: `My ${
                  this.selectedYear
                } Training Activities by Hours per Week`,
                display: this.props.displayTitle,
                fontSize: 20
              },
              tooltips: {
                mode: 'index',
                intersect: false,
                callbacks: {
                  label(tooltipItem, data) {
                    let label =
                      data.datasets[tooltipItem.datasetIndex].label || '';

                    if (label) {
                      label += ': ';
                    }
                    label += Math.round(tooltipItem.xLabel * 100) / 100;
                    return label;
                  }
                }
              },
              responsive: true,
              scales: {
                xAxes: [
                  {
                    stacked: true
                  }
                ],
                yAxes: [
                  {
                    stacked: true
                  }
                ]
              }
            }}
          />
        ) : (
          <p style={{ marginTop: '1rem', textAlign: 'center' }}>
            Getting chart data from Strava...
          </p>
        )}
        <hr />
        {this.state.isLoaded && <h2>All {this.selectedYear} Activities</h2>}
        <ul>
          {this.state.activities.map(activity => (
            <li key={activity.id}>
              <Activity activity={activity} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default ActivitiesChart;
