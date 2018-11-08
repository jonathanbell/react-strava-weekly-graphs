/* eslint react/no-did-mount-set-state: 0 */
import React from 'react';
import { HorizontalBar } from 'react-chartjs-2';

class ActivitiesChart extends React.Component {
  static defaultProps = {
    displayTitle: true,
    displayLegend: true
  };

  state = {
    barChartData: {
      labels: (() => {
        const weeks = [];
        for (let i = 0; i <= 52; i += 1) {
          weeks.push(`Week ${i}`);
        }
        return weeks;
      })(),
      // Set our initial chart datasets to be an empty array.
      // We populate this after our api call.
      datasets: []
    },
    isLoaded: false,
    isError: false
  };

  async componentDidMount() {
    // https://stackoverflow.com/questions/43040721/how-to-update-nested-state-properties-in-react
    const barChartData = { ...this.state.barChartData };
    barChartData.datasets = await this.getChartData();
    if (barChartData.datasets) {
      this.setState({ barChartData, isLoaded: true, isError: false });
    }
  }

  async componentDidUpdate(prevProps) {
    console.log('prevProps', prevProps.match.params.year);
    console.log('currentProps', this.props.match.params.year);
    if (prevProps.match.params.year !== this.props.match.params.year) {
      this.setState({ isLoaded: false });
      const barChartData = { ...this.state.barChartData };
      barChartData.datasets = await this.getChartData();
      if (barChartData.datasets) {
        this.setState({ barChartData, isLoaded: true, isError: false });
      }
    }
  }

  getChartData = async () => {
    const response = await fetch(
      `/api/weekly-graphs/${this.props.match.params.year ||
        new Date().getFullYear()}`
    ).catch(error => {
      this.setState({ isError: true });
      console.error(error);
    });

    const body = await response.json();
    console.log(body);

    if (response.status !== 200) {
      throw new Error(`HTTP response code error: ${response.status}`);
    }

    return body;
  };

  render() {
    return (
      <div>
        <hr style={{ clear: 'both' }} />

        {!this.state.isError && !this.state.isLoaded && (
          <p className="mt-2 text-center text-info">
            Getting chart data from our Strava API...
          </p>
        )}

        {this.state.isError && (
          <p className="mt-2 text-center text-danger">
            Error while getting chart data from Strava. There may be more
            information in the JavaScript console.
          </p>
        )}

        {/* Stacked barchart */}
        {this.state.isLoaded && (
          <HorizontalBar
            data={this.state.barChartData}
            height={777}
            options={{
              title: {
                text: `My ${this.props.match.params.year ||
                  new Date().getFullYear()} Training Activities by Hours per Week`,
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
        )}
      </div>
    );
  }
}

export default ActivitiesChart;
