import React from "react";
import ReactApexCharts from "react-apexcharts";
import { httpClient } from "../../../utils/HttpClient";
import { server } from "../../../constance/contance";
import moment from "moment";

class Chart_Ball_Onhand extends React.Component {
  constructor(props) {
    super(props);
    this.tick = this.tick.bind(this);
    this.state = { seconds: props.seconds };

    this.state = {
      ballUsage: [],
      DateBall: [],
      ballUsage_All: [],
      DateBall_All: [],
      ballStock_All: [],
      DateBall_Stock: [],
      time: this.props.time,
      seconds: "1200",
    };
  }

  componentDidMount = async () => {
    await this.getDate();
    // await this.getOutput_ball_All();
    await this.getStock_ball_onHand();
    // await this.getOutput_ball();
    // await this.getStock_ball_turnover();
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

  getStock_ball_onHand = async () => {
    const array = await httpClient.get(
      server.realtime_MBRC_Ball_Stock_URL +
        "/" +
        this.state.start_date +
        "/" +
        this.state.end_date
    );
    console.log(array.data.resultBall_onHand);

    let list_StockBall_All = array.data.resultBall_onHand;
    this.setState({ ballStock_All: list_StockBall_All });
    let listDateBall = array.data.resultDateBall_onHand;
    this.setState({ DateBall_Stock: listDateBall });
  };

  render() {
    // console.log(this.state.Usage)

    //Ball
    return (
      <div className="wrapper">
        <section className="content">
          <div className="container-fluid">
            

            {/* Ball stock */}
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
                  Daily : Ball stock on hand (%) (All)
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
                            horizontal: true,
                          },
                        },
                        stroke: {
                          width: 1,
                          colors: ["#fff"],
                        },
                        //   title: {
                        //     text: "Ball usage ratio",
                        //   },
                        xaxis: {
                          categories: this.state.DateBall_Stock,
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
                              return val + " pcs";
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
                          offsetY: 5,
                          formatter: function (seriesName) {
                            // console.log(seriesName);
                            if (seriesName === "BT111U3N 5240") {
                              return ["BALL SIZE -5.0"];
                            }
                            if (seriesName === "BT111U4N 5240") {
                              return ["BALL SIZE -2.5"];
                            }
                            if (seriesName === "BT111U5N 5240") {
                              return ["BALL SIZE 0.0"];
                            }
                            if (seriesName === "BT111U6N 5240") {
                              return ["BALL SIZE +2.5"];
                            }
                            if (seriesName === "BT111U7N 5240") {
                              return ["BALL SIZE +5.0"];
                            }
                          },
                        },
                      }}
                      series={this.state.ballStock_All}
                      type="bar"
                      height={400}
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
export default Chart_Ball_Onhand;
