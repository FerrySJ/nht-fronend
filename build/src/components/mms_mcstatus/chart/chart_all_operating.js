import React, { Component } from "react";
import ReactApexCharts from "react-apexcharts";
import { httpClient } from "../../../utils/HttpClient";
import { server } from "../../../constance/contance";
import moment from "moment";

class chart_all_operating extends Component {
  constructor(props) {
    super(props);
    this.tick = this.tick.bind(this);
    this.state = { seconds: props.seconds };

    this.state = {
      data_all: [],
      start_date: moment().format("YYYY-MM-DD"),
      time: this.props.time,
      seconds: "1200",
    };
  }
componentDidMount(){
    console.log("LLLL");
    this.getOutput_data();
this.timer = setInterval(this.tick, 1000);
}
  tick() {
    if (this.state.seconds > 0) {
      this.setState({ seconds: this.state.seconds - 1 });
    } else {
      clearInterval(this.timer);
      window.location.reload();
    }
  }
  //chart ball daily
  getOutput_data = async () => {
    console.log("LOL");
    const array = await httpClient.get(
      server.realtime_MBRC_Ball_URL + "/" + this.state.start_date + "/"
    );
    console.log("chart");
    console.log(array.data.resultBall);

    let listUsageBall = array.data.resultBall;
    this.setState({ data_all: listUsageBall });
    let listDateBall = array.data.resultDateBall;
    this.setState({ DateBall: listDateBall });

    setTimeout(
      function () {
        //Start the timer
        this.getOutput_ball();
      }.bind(this),
      600000 //10 min
    );
  };
  render() {
    return (
      <div className="row-12">
        <div className="card">
          <div
            className="card-header"
            style={{
              marginBottom: "0",
              fontWeight: 600,
              fontSize: "2rem",
            }}
          >
            {/* Total: Ball usage (%) */}
            {this.state.datetoday} : Ball usage (%) by Machine
          </div>
          <div
            className="row justify-content-center"
            style={{ paddingTop: "10px", textAlign: "center" }}
          >
            <div className="col-1">
              <h5>Start Date</h5>
            </div>
            <div className="col-2">
              <input
                className="form-control"
                type="date"
                value={this.state.start_date_def}
                onChange={async (e) => {
                  await this.setState({
                    start_date_def: moment(e.target.value).format("YYYY-MM-DD"),
                  });
                }}
              />
            </div>

            <div className="col-1">
              <h5>End Date</h5>
            </div>
            <div className="col-2">
              <input
                className="form-control"
                type="date"
                value={this.state.end_date_def}
                onChange={async (e) => {
                  await this.setState({
                    end_date_def: moment(e.target.value).format("YYYY-MM-DD"),
                  });
                }}
              />
            </div>

            <div className="col-1">
              <button
                type="submit"
                className="btn btn-primary"
                onClick={async (e) => {
                  await this.clear_state();
                  e.preventDefault();
                  await this.Click_getOutput_ball();
                }}
              >
                submit
              </button>
            </div>
          </div>
          <div className="page-content">
            <div id="chart">
              <ReactApexCharts
                options={{
                  chart: {
                    type: "bar",
                    height: 350,
                    stacked: true,
                    stackType: "100%",
                  },
                  plotOptions: {
                    bar: {
                      // horizontal: true,
                      horizontal: false,
                    },
                  },
                  stroke: {
                    width: 1,
                    colors: ["#fff"],
                  },
                  // title: {
                  //   text: "Data for date : " + this.state.datetoday,
                  //   style: {
                  //     fontSize: '30px',
                  //     // fontWeight: 900
                  //   }
                  // },
                  xaxis: {
                    categories: this.state.mcno,
                    // categories: this.state.DateBall,
                  },
                  yaxis: [
                    {
                      labels: {
                        style: {
                          colors: "black",
                          fontSize: "20px",
                          fontWeight: "bold",
                        },
                      },
                    },
                  ],
                  dataLabels: {
                    enabled: true,
                    position: "center",
                    style: {
                      fontSize: "20px",
                      fontWeight: "bold",
                    },
                  },
                  tooltip: {
                    y: {
                      formatter: function (val) {
                        return val + "pcs";
                      },
                    },
                  },
                  fill: {
                    opacity: 1,
                  },
                  colors: [
                    "#A5978B",
                    "#F9C80E",
                    "#546E7A",
                    "#EA3546",
                    "#13d8aa",
                  ],
                  legend: {
                    horizontalAlign: "center",
                    floating: false,
                    fontSize: "20px",
                    fontFamily: "Helvetica, Arial",
                    position: "right",
                    offsetX: -20,
                    offsetY: 10,
                    formatter: function (seriesName) {
                      return seriesName;
                      // if (seriesName === "MBR_MD24") {
                      //   return ["BALL SIZE -5.0"];
                      // }
                      // if (seriesName === "MBR_MD25") {
                      //   return ["BALL SIZE -2.5"];
                      // }
                      // if (seriesName === "MBR_MD26") {
                      //   return ["BALL SIZE 0.0"];
                      // }
                      // if (seriesName === "MBR_MD27") {
                      //   return ["BALL SIZE +2.5"];
                      // }
                      // if (seriesName === "MBR_MD28") {
                      //   return ["BALL SIZE +5.0"];
                      // }
                    },
                  },
                }}
                series={this.state.data_all}
                type="bar"
                height={500}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default chart_all_operating;
