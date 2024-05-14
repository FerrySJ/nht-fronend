import React from "react";
import ReactApexCharts from "react-apexcharts";
import { httpClient } from "../../../../utils/HttpClient";
import { server } from "../../../../constance/contance";
import moment from "moment";

class Realtime_mbr extends React.Component {
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
    // await this.getStock_ball_onHand();
    await this.getOutput_ball();
    await this.getStock_ball_turnover();
    this.timer = setInterval(this.tick, 1000);
  };

  getDate = () => {
    this.setState({
      start_date: moment().startOf("month").format("YYYY-MM-DD"),
    });
    this.setState({ end_date: moment().endOf("month").format("YYYY-MM-DD") });
    this.setState({ datetoday: moment().format("YYYY-MM-DD") });
  };

  tick() {
    if (this.state.seconds > 0) {
      this.setState({ seconds: this.state.seconds - 1 });
    } else {
      clearInterval(this.timer);
      window.location.reload();
    }
  }
  //ball daily
  getOutput_ball = async () => {
    const array = await httpClient.get(
      server.realtime_MBRC_Ball_URL +
        "/" +
        this.state.datetoday 
        // +"/" +
        // this.state.end_date
    );
console.log("ball daily");
// console.log(this.state.datetoday);
//     console.log(array.data.resultBall);
//     console.log(array.data.result_mcname);
//     console.log(array.data.resultDateBall);

    let listUsageBall = array.data.resultBall;
    this.setState({ ballUsage: listUsageBall });
    let listUsageBall_name = array.data.result_mcname;
    this.setState({ mcno: listUsageBall_name });
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
  getOutput_ball_All = async () => {
    const array = await httpClient.get(server.realtime_MBRC_Ball_All_URL);

    console.log(array.data.resultBall_All);

    let listUsageBall_All = array.data.resultBall_All;
    this.setState({ ballUsage_All: listUsageBall_All });
    let listDateBall = array.data.resultDateBall_All;
    this.setState({ DateBall_All: listDateBall });
  };

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

  getStock_ball_turnover = async () => {
    const arrayStock = await httpClient.get(
      server.realtime_MBRC_Ball_Stock_URL
    );
    console.log(arrayStock.data.resultBall_onHand);

    let list_StockBall_All = arrayStock.data.resultBall_onHand;
    this.setState({ ballStock_All: list_StockBall_All });
    let listDateBall_Stock = arrayStock.data.resultDateBall_onHand;
    this.setState({ DateBall_Stock: listDateBall_Stock });

    const arrayUsage = await httpClient.get(server.realtime_MBRC_Ball_All_URL);
    console.log(arrayUsage.data.resultBall_All);

    let listUsageBall_All = arrayUsage.data.resultBall_All;
    this.setState({ ballUsage_All: listUsageBall_All });
    let listDateBall_Usage = arrayUsage.data.resultDateBall_All;
    this.setState({ DateBall_All: listDateBall_Usage });
  };

  render() {
    console.log(this.state.ballUsage)

    //Ball
    return (
      <div className="content-wrapper">
        <section className="content">
          <div className="container-fluid">
           

            <div className="row-12">
              <div className="card">
              {/* <div className="page-content">
                
                <p>test</p>
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
                            horizontal: false,
                          },
                        },
                        stroke: {
                          width: 1,
                          colors: ["#fff"],
                        },
                        xaxis: {
                          categories: this.state.mcno,
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
                            if (seriesName === "MBR_MD24") {
                              return ["BALL SIZE -5.0"];
                            }
                            if (seriesName === "MBR_MD25") {
                              return ["BALL SIZE -2.5"];
                            }
                            if (seriesName === "MBR_MD26") {
                              return ["BALL SIZE 0.0"];
                            }
                            if (seriesName === "MBR_MD27") {
                              return ["BALL SIZE +2.5"];
                            }
                            if (seriesName === "MBR_MD28") {
                              return ["BALL SIZE +5.0"];
                            }
                          },
                        },
                      }}
                      series={[
    {
        "name": "MBR_MD24",
        "data": [
            54,
            6576,
            29394,
            9624,
            30


        ]
    },
    {
        "name": "MBR_MD25",
        "data": [
            0,
            3420,
            32178,
            6468,
            12
            
        ]
    },
    {
        "name": "MBR_MD26",
        "data": [
            42,
            3570,
            26898,
            15762,
            1878

        ]
    },
    {
        "name": "MBR_MD27",
        "data": [
            66,
            3018,
            29574,
            12240,
            3246

        ]
    },
    {
        "name": "MBR_MD28",
        "data": [
            504,
            4560,
            30966,
            16200,
            2250

        ]
    }
]}
                      type="bar"
                      height={500}
                    />
                  </div>
                </div> */}
                <div
                  className="card-header"
                  style={{
                    marginBottom: "0",
                    fontWeight: 600,
                    fontSize: "2rem",
                  }}
                >
                  {" "}
                  Daily: Ball usage (%)
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
                            // horizontal: false,
                          },
                        },
                        stroke: {
                          width: 1,
                          colors: ["#fff"],
                        },
                          title: {
                            text: "Data for date : " + this.state.datetoday,
                            style: {
                              fontSize: '30px',
                              // fontWeight: 900
                            }
                          },
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
                            return seriesName
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
                      series={this.state.ballUsage}
                      type="bar"
                      height={500}
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

export default Realtime_mbr;
