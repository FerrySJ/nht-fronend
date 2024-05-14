/* eslint-disable no-dupe-keys */
import React from "react";
import ReactApexCharts from "react-apexcharts";
import { httpClient } from "../../../utils/HttpClient";
import { server } from "../../../constance/contance";
import moment from "moment";

class Cost_Ball_Turnover extends React.Component {
  constructor(props) {
    super(props);
    this.tick = this.tick.bind(this);
    this.state = { seconds: props.seconds };


    this.state = {
      Ball_Cost: [],
      Date: [],
      time: this.props.time,
      seconds: "1200",
    };
  }

  componentDidMount = async () => {
    await this.getDate();
    await this.getCost_onHand();
    this.timer = setInterval(this.tick, 1000);
  };

  getDate = () => {
    this.setState({
      start_date: moment().startOf("month").format("YYYY-MM-DD"),
    });
    this.setState({ end_date: moment().endOf("month").format("YYYY-MM-DD") });
  };
  
  tick() {
    if (this.state.seconds > 0) {
      this.setState({ seconds: this.state.seconds - 1 });
    } else {
      clearInterval(this.timer);
      window.location.reload();
    }
  }

  getCost_onHand = async () => {
    const array = await httpClient.get(
      server.realtime_cost_onHand_URL +
        "/" +
        this.state.start_date +
        "/" +
        this.state.end_date
    );

    console.log("cost",array.data.resultBall_cost_onHand);
    console.log(array.data.resultDate_onHand);

    let listCost = array.data.resultBall_cost_onHand;
    this.setState({ Ball_Cost: listCost });
    let listDate = array.data.resultDate_onHand;
    this.setState({ Date: listDate });
  };

  render() {
  // console.log(this.state.Ball_Cost)
    return (
      <div className="wrapper">
        {/* <div className="position-relative card-body"></div> */}

        <section className="content">
          <div className="container-fluid">
            {/* Start 1st row */}
            <div className="card">
              <div
                className="card-header"
                style={{
                  marginBottom: "0",
                  fontWeight: 600,
                  fontSize: "2rem",
                }}
              >
                {" "}
                Daily: Cost of Ball on hand (All)
              </div>

              <div className="page-content">
                <div id="chart">
                  <ReactApexCharts
                    options={{
                      chart: {
                        type: "bar",
                        height: 350,
                        stacked: true,
                        toolbar: {
                          show: true,
                        },
                        zoom: {
                          enabled: true,
                        },
                      },
                      responsive: [
                        {
                          breakpoint: 480,
                          options: {
                            legend: {
                              position: "bottom",
                              offsetX: -10,
                              offsetY: 0,
                            },
                          },
                        },
                      ],
                      plotOptions: {
                        bar: {
                          horizontal: false,
                          borderRadius: 0,
                          dataLabels: {
                            total: {
                              enabled: false,
                              style: {
                                fontSize: "15px",
                                fontWeight: 900,
                              },
                            },
                          },
                        },
                      },
                      xaxis: {
                        type: "datetime",
                        labels: {
                          show: true,
                          rotate: -90,
                          rotateAlways: false,
                          hideOverlappingLabels: true,
                          showDuplicates: false,
                          trim: false,
                          minHeight: undefined,
                          maxHeight: 120,
                          style: {
                            colors: [],
                            fontSize: "25px",
                            fontFamily: "Helvetica, Arial, sans-serif",
                            fontWeight: 400,
                            cssClass: "apexcharts-xaxis-label",
                          },
                        },

                        categories: this.state.Date,
                      },

                      yaxis: {
                        labels: {
                          show: false,
                          align: "right",
                          minWidth: 0,
                          maxWidth: 160,
                          style: {
                            colors: [],
                            fontSize: "20px",
                            fontFamily: "Helvetica, Arial, sans-serif",
                            fontWeight: 400,
                            cssClass: "apexcharts-yaxis-label",
                          },
                          offsetX: 0,
                          offsetY: 0,
                          rotate: 0,
                        },
                        title: {
                          text: "Cost of Ball (Baht)",
                          style: {
                            color: undefined,
                            fontSize: "25px",
                            fontFamily: "Helvetica, Arial, sans-serif",
                            fontWeight: 1000,
                            cssClass: "apexcharts-yaxis-title",
                          },
                        },
                      },
                      dataLabels: {
                        style: {
                          colors: ["#2E294E"],
                          fontSize: "15px",
                        },
                      },
                      colors: [
                        "#A5978B",
                        "#F9C80E",
                        "#546E7A",
                        "#EA3546",
                        "#13d8aa",
                      ],
                      legend: {
                        position: "right",
                        offsetY: 40,
                      },
                      fill: {
                        opacity: 1,
                      },

                      legend: {
                        showForNullSeries: false,
                        horizontalAlign: "center",
                        floating: false,
                        fontSize: "25px",
                        fontFamily: "Helvetica, Arial",
                        position: "right",
                        offsetX: -20,
                        offsetY: 10,
                        formatter: function (seriesName) {
                          // console.log(seriesName);
                          if (seriesName === "-5") {
                            return ["BALL SIZE -5.0"];
                          }
                          if (seriesName === "-2.5") {
                            return ["BALL SIZE -2.5"];
                          }
                          if (seriesName === "0") {
                            return ["BALL SIZE 0.0"];
                          }
                          if (seriesName === "2.5") {
                            return ["BALL SIZE +2.5"];
                          }
                          if (seriesName === "5") {
                            return ["BALL SIZE +5.0"];
                          }
                        },
                        markers: {
                          width: 20,
                          height: 20,
                          strokeWidth: 0,
                          strokeColor: "#fff",
                          fillColors: undefined,
                          customHTML: undefined,
                          onClick: undefined,
                          offsetX: 0,
                          offsetY: 0,
                        },
                      },
                      
                      tooltip: {
                        y: {
                          formatter: function (val) {
                            return val + " pcs";
                          },
                        },
                      },

                      grid: {
                        row: {
                          colors: ["#e5e5e5", "transparent"],
                          opacity: 0.5,
                          fontSize: "20px",
                        },
                        column: {
                          colors: ["#f8f8f8", "transparent"],
                          fontSize: "20px",
                        },
                      },
                    }}
                    series={this.state.Ball_Cost}
                    type="bar"
                    height={450}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
export default Cost_Ball_Turnover;
