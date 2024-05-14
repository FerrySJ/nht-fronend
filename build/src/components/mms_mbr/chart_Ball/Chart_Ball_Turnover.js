
  /* eslint-disable no-dupe-class-members */
/* eslint-disable no-dupe-keys */
import React from "react";
import ReactApexCharts from "react-apexcharts";
import { httpClient } from "../../../utils/HttpClient";
import { server } from ".././../../constance/contance";
import moment from "moment";

class Chart_Ball_Turnover extends React.Component {
  constructor(props) {
    super(props);
    this.tick = this.tick.bind(this);
    this.state = { seconds: props.seconds };

    this.state = {
      ballTurnover: [],
      Date: [],

      time: this.props.time,
      seconds: "1200",

      options: {
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
            borderRadius: 10,
            dataLabels: {
              total: {
                enabled: true,
                style: {
                  fontSize: "13px",
                  fontWeight: 900,
                },
              },
            },
          },
        },

        dataLabels: {
          enabled: true,
          position: "center",
          style: {
            fontSize: "30px",
            fontWeight: "bold",
          },
        },
        //   labels:this.state.Date,
        labels: { fontSize: "20px", fontWeight: "bold" },
        xaxis: {
          type: "datetime",
          categories: this.state.Date,
          // categories: ['2022-12-12','2022-12-12','2022-12-12','2022-12-12','2022-12-12'],
          datetimeUTC: true,
          datetimeFormatter: {
            year: "yyyy",
            month: "MM",
            day: "dd",
          },
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
              fontSize: "15px",
              fontFamily: "Helvetica, Arial, sans-serif",
              fontWeight: 400,
              cssClass: "apexcharts-xaxis-label",
            },

            categories: this.state.Date,
          },
        },

        // Output : Bar option
        yaxis: [
          {
            title: {
              text: "Turnover ratio (%)",
            },
            min: 0,
            max: 3,
          },

          // Target : Line option
          {
            seriesName: "Turnover Target (%)",
            min: 0,
            max: 3,
            opposite: true,
            axisTicks: {
              show: true,
            },
            axisBorder: {
              show: true,
              color: "green",
            },
            labels: {
              style: {
                colors: "green",
              },
            },
            title: {
              text: "Target turnover (%)",

              style: {
                color: "green",
              },
            },
          },
        ],
      },
    };

  }

  componentDidMount = async () => {
    await this.getDate();
    await this.getStock_ball_turnover();
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

  getStock_ball_turnover = async () => {
    const array = await httpClient.get(
      server.realtime_MBRC_Ball_turnover_URL +
        "/" +
        this.state.start_date +
        "/" +
        this.state.end_date
    );
    console.log("resultTurnover",array.data.resultTurnover);

    let list_Turnover_All = array.data.resultTurnover;
    this.setState({ ballTurnover: list_Turnover_All });
    let listDateBall_Turnonver = array.data.resultDate_Turnover;
    this.setState({ Date: listDateBall_Turnonver });
    console.log(this.state.Date);
  };

  render() {
    return (
      <div className="content-wrapper">
        <section className="content">
          <div className="container-fluid">
            {/* Start 1st row */}
            <div className="row-12" style={{paddingTop:"15px"}}>
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
                  Daily : Ball turnover (%)
                </div>
                <div
                    className="row justify-content-center"
                    style={{ textAlign: "center", paddingBottom: "10px" }}
                  >
                     <div className="col-auto">
                    <h5 style={{ paddingTop: "6px" }}>Start Date :</h5>
                  </div>
                  <div className="col-1">
                    <input
                      className="form-control"
                      type="date"
                      value={this.state.start_date}
                      onChange={async (e) => {
                        await this.setState({
                          start_date: moment(e.target.value).format(
                            "YYYY-MM-DD"
                          ),
                        });
                      }}
                    />
                  </div>
                  <div className="col-auto">
                    <h5 style={{ paddingTop: "6px" }}>End Date :</h5>
                  </div>
                  <div className="col-1">
                    <input
                      className="form-control"
                      type="date"
                      value={this.state.end_date}
                      onChange={async (e) => {
                        await this.setState({
                          end_date: moment(e.target.value).format(
                            "YYYY-MM-DD"
                          ),
                        });
                      }}
                    />
                  </div>

                    <div className="col-1">
                      <button
                        type="submit"
                        className="btn btn-primary"
                        onClick={async (e) => {
                          e.preventDefault();
                          await this.getStock_ball_turnover();
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
                          toolbar: {
                            show: true,
                          },
                          zoom: {
                            enabled: true,
                          },
                        },
                        stroke: {
                          width: [0, 2],
                          curve: "smooth",
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

                        legend: {
                          showForNullSeries: false,
                          horizontalAlign: "center",
                          floating: false,
                          fontSize: "25px",
                          fontFamily: "Helvetica, Arial",
                          position: "bottom",
                          offsetX: -20,
                          offsetY: 10,
                        },
                        plotOptions: {
                          bar: {
                            horizontal: false,
                            borderRadius: 10,
                            dataLabels: {
                              total: {
                                enabled: false,
                                style: {
                                  fontSize: "13px",
                                  fontWeight: 900,
                                },
                              },
                            },
                          },
                        },

                        dataLabels: {
                          enabled: true,
                          position: "center",
                          style: {
                            fontSize: "20px",
                            fontWeight: "bold",
                          },
                        },
                        //   labels:this.state.Date,
                        labels: { fontSize: "30px", fontWeight: "bold" },
                        xaxis: {
                          type: "datetime",
                          categories: this.state.Date,
                          datetimeUTC: true,
                          datetimeFormatter: {
                            year: "yyyy",
                            month: "MM",
                            day: "dd",
                          },
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

                            // categories: this.state.Date,
                          },
                        },

                        // Output : Bar option
                        yaxis: [
                          {
                            //size of Yaxis
                            labels: {
                              style: {
                                colors: "black",
                                fontSize: "20px",
                              },
                            },

                            title: {
                              text: "Turnover ratio (%)",

                              style: {
                                color: "black",
                                fontSize: "25px",
                                fontFamily: "Helvetica, Arial, sans-serif",
                                fontWeight: 1000,
                                cssClass: "apexcharts-xaxis-label",
                              },
                            },
                            min: 0,
                            max: 2,
                          },

                          // Target : Line option
                          {
                            seriesName: "Turnover Target (%)",

                            min: 0,
                            max: 2,
                            opposite: true,
                            axisTicks: {
                              show: true,
                            },
                            axisBorder: {
                              show: true,
                              color: "green",
                            },
                            labels: {
                              style: {
                                colors: "green",
                                fontSize: "20px",
                              },
                            },
                            title: {
                              text: "Target turnover (%)",

                              style: {
                                color: "green",
                                fontSize: "25px",
                                fontFamily: "Helvetica, Arial, sans-serif",
                                fontWeight: 1000,
                                cssClass: "apexcharts-xaxis-label",
                              },
                            },
                          },
                        ],
                      }}
                      series={this.state.ballTurnover}
                      height={550}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Chart_Ball_Turnover;
