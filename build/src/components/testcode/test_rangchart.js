import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';

class RangeBarChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        labels: ['A', 'B', 'C', 'D', 'E'],
        datasets: [
          {
            label: 'Data',
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(75,192,192,0.8)',
            hoverBorderColor: 'rgba(75,192,192,1)',
            data: [10, 20, 30, 40, 50],
          },
        ],
      },
      options: {
        scales: {
          y: {
            type: 'linear', // เปลี่ยน scale เป็น linear
            ticks: {
              beginAtZero: true,
            },
          },
        },
      },
    };
  }

  render() {
    return (
      <div>
        <h2>Linear Data Bar Chart</h2>
        <Bar data={this.state.data} options={this.state.options} />
      </div>
    );
  }
}

export default RangeBarChart;
