/* eslint react/no-did-mount-set-state: 0 */
import React from 'react';
import { HorizontalBar } from 'react-chartjs-2';
import moment from 'moment';
import equal from 'fast-deep-equal';

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
  }

  state = {
    barChartData: {
      labels: (() => {
        const weeks = [];
        for (let i = 0; i <= 52; i += 1) {
          weeks.push(`Week ${i}`);
        }
        return weeks;
      })(),
      // Set our initial state to be an empty array.
      // We will populate this after our api call.
      datasets: []
    },
    activities: [],
    isLoaded: true
  };

  componentDidMount() {
    this.callApi()
      .then(res =>
        this.setState({
          barChartData: {
            labels: (() => {
              const weeks = [];
              for (let i = 0; i <= 52; i += 1) {
                weeks.push(`Week ${i}`);
              }
              return weeks;
            })(),
            // Set our initial state to be an empty array.
            // We will populate this after our api call.
            datasets: res
          }
        })
      )
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/testing2');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

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
                  this.state.selectedYear
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
      </div>
    );
  }
}

export default ActivitiesChart;
