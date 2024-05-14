import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";
import { httpClient } from "../../../utils/HttpClient";
import { server } from "../../../constance/contance";
import moment from "moment";

class Chart_PD_MD_24 extends React.Component {
  constructor(props) {
    super(props);
    this.tick = this.tick.bind(this);
    this.state = { seconds: props.seconds };
    this.state = {
      Output_MBR_MD: [],
      time: this.props.time,
      seconds: "1200",

      series: [
        {
          name: "Production",
          type: "column",
          data: [440, 505, 414, 671, 227, 413, 201, 352, 752, 320, 257, 160, 440, 505, 414, 671, 227, 413, 201, 352, 752, 320, 257, 160],
        },
        {
          name: "Yield",
          type: "line",
          data: [23, 42, 35, 27, 43, 22, 23, 42, 35, 27, 43, 22, 17, 31, 22, 22, 12, 16, 17, 31, 22, 22, 12, 16],
        },
      ],
      options: {
        chart: {
          height: 350,
          type: "line",
        },
        stroke: {
          width: [0, 4],
        },
        // title: {
        //   text: "Traffic Sources",
        // },
        dataLabels: {
          enabled: true,
          enabledOnSeries: [1],
        },
        labels: [
          "08:00",
          "09:00",
          "10:00",
          "11:00",
          "12:00",
          "13:00",
          "14:00",
          "15:00",
          "16:00",
          "17:00",
          "18:00",
          "19:00",
          "20:00",
          "21:00",
          "22:00",
          "23:00",
          "00:00",
          "01:00",
          "02:00",
          "03:00",
          "04:00",
          "05:00",
          "06:00",
          "07:00",
        ],
        xaxis: {
          type: "time",
        },
        yaxis: [
          {
            title: {
              text: "Production",
            },
          },
          {
            opposite: true,
            title: {
              text: "Yield (%)",
              size: "18px"
            },
          },
        ],
      },
    };
  }

  componentDidMount = async () => {
    await this.dateChange();
    await this.getOutput_MBR_MD();
    this.timer = setInterval(this.tick, 1000);
  };

  dateChange = () => {
    if (6 >= parseInt(moment().format("H"))) {
      this.setState({
        start_date: moment().add(-1, "days").format("YYYY-MM-DD"),
      });
    } else {
      this.setState({ start_date: moment().format("YYYY-MM-DD") });
    }
  };

  tick() {
    if (this.state.seconds > 0) {
      this.setState({ seconds: this.state.seconds - 1 });
    } else {
      clearInterval(this.timer);
      window.location.reload();
    }
  }

  getOutput_MBR_MD = async () => {
    const array = await httpClient.get(
      server.realtime_chartPD_MBR_MD24_URL + "/" + this.state.start_date
    );

    // console.log("Chart1", array.data.resultOutput_MBR);
    let listOutput_MBR_MD = array.data.resultOutput_MBR;
    this.setState({ Output_MBR_MD: listOutput_MBR_MD });
  };
  render() {
    return (
      // <div className="content-wrapper">
      //   <div className="content">
      <div className="row-12">
        <div className="card">
          <h3 className="card-header">
            Production/ Yield
          </h3>
          <div className="card-body">
            <div id="chart">
              <ReactApexChart
                options={ {
                  chart: {
                    height: 350,
                    type: "line",
                  },
                  stroke: {
                    width: [0, 4],
                  },
                  // title: {
                  //   text: "Traffic Sources",
                  // },
                  dataLabels: {
                    enabled: true,
                    enabledOnSeries: [1],
                  },
                  labels: [
                    "08:00",
                    "09:00",
                    "10:00",
                    "11:00",
                    "12:00",
                    "13:00",
                    "14:00",
                    "15:00",
                    "16:00",
                    "17:00",
                    "18:00",
                    "19:00",
                    "20:00",
                    "21:00",
                    "22:00",
                    "23:00",
                    "00:00",
                    "01:00",
                    "02:00",
                    "03:00",
                    "04:00",
                    "05:00",
                    "06:00",
                    "07:00",
                  ],
                  xaxis: {
                    type: "time",
                  },
                  yaxis: [
                    {
                      title: {
                        text: "Production",
                        style: {
                          fontSize: '20px',
                          fontWeight: 500,
                      },
                      },
                    },
                    {
                      opposite: true,
                      title: {
                        text: "Yield (%)",
                        style: {
                          fontSize: '20px',
                          // fontFamily: 'Helvetica, Arial, sans-serif',
                          fontWeight: 500,
                          // cssClass: 'apexcharts-yaxis-title',
                      },
                      },
                    },
                  ],
                }}
                series={this.state.Output_MBR_MD}
                type="line"
                height={350}
              />
            </div>
          </div>
        </div>
      </div>
      //   </div>
      // </div>
    );
  }
}

export default Chart_PD_MD_24;
