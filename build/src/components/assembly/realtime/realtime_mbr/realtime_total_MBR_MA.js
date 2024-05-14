import React from "react";
import ReactApexCharts from "react-apexcharts";
import { httpClient } from "../../../../utils/HttpClient";
import { server } from "../../../../constance/contance";
import moment from "moment";

class Realtime_total_MBR_MA extends React.Component {
  constructor(props) {
    super(props);
    this.tick = this.tick.bind(this);
    this.state = { seconds: props.seconds };

    this.state = {
      ballUsageMA: [],
      ballUsageTB: [],
      DateBallTB: [],
      DateBall: [],
      data_table: [],
      data_tableDaily: [],
      ballUsage_Daily: [],
      DateBall_Daily: [],
      ballStock_All: [],
      DateBall_Stock: [],
      time: this.props.time,
      seconds: "1200",
    };
  }

  componentDidMount = async () => {
    await this.getDate();
    await this.getOutput_ball_MBR_MA();
    // await this.getStock_ball_onHand();
    await this.getOutput_ball();
    // await this.getOutput_ball_table();
    this.timer = setInterval(this.tick, 1000);
  };

  getDate = () => {
    this.setState({
      start_date: moment().startOf("month").format("YYYY-MM-DD"),
      end_date: moment().endOf("month").format("YYYY-MM-DD"),
      datetoday: moment().format("YYYY-MM-DD"),
      start_date_def: moment().format("YYYY-MM-DD"),
      end_date_def: moment().format("YYYY-MM-DD"),
      start_date_val: moment().format("YYYY-MM-DD"),
      end_date_val: moment().format("YYYY-MM-DD"),
      yesterday: moment().subtract(1, 'days').format("YYYY-MM-DD"),
      end_yesterday: moment().subtract(1, 'days').format("YYYY-MM-DD"),
    });

  };

  tick() {
    if (this.state.seconds > 0) {
      this.setState({ seconds: this.state.seconds - 1 });
    } else {
      clearInterval(this.timer);
      window.location.reload();
    }
  }
  //chart ball daily
  getOutput_ball = async () => {
    const array = await httpClient.get(
      server.realtime_MBRC_Ball_URL +
      "/" +
      // this.state.start_date 
      this.state.start_date_def
      + "/" +
      this.state.end_date_def
      // this.state.end_date
    );
    console.log("MBR MA");
    console.log(this.state.start_date, this.state.end_date);
    console.log(array.data.resultBall);
    console.log(array.data.result_mcname);
    console.log(array.data.resultDateBall);

    let listUsageBall = array.data.resultBall;
    this.setState({ ballUsageMA: listUsageBall }); //, data_table: array.data.result[0] 
    let listUsageMC_name = array.data.result_mcname;
    this.setState({ mcno: listUsageMC_name });
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
  //table ball daily
  getOutput_ball_table = async () => {
    const array = await httpClient.get(
      server.realtime_MBRC_Ball_tb_URL +
      "/" +
      // this.state.start_date 
      this.state.yesterday
      + "/" +
      this.state.end_date_def
      // this.state.end_date
    );
    console.log("ball daily");
    console.log(this.state.start_date, this.state.end_date);
    console.log(array.data.resultBall);
    console.log(array.data.result_mcname);
    console.log(array.data.resultDateBall);

    let listUsageBall = array.data.resultBall;
    this.setState({ ballUsageTB: listUsageBall, data_table: array.data.result[0] });
    let listUsageMC_name = array.data.result_mcname;
    this.setState({ mcnoTB: listUsageMC_name });
    let listDateBall = array.data.resultDateBall;
    this.setState({ DateBallTB: listDateBall });

    setTimeout(
      function () {
        //Start the timer
        this.getOutput_ball_table();
      }.bind(this),
      600000 //10 min
    );
  };
  getOutput_ball_MBR_MA = async () => {
    const array = await httpClient.get(server.realtime_MBRC_Ball_Daily_URL +
      "/" +
      this.state.start_date
      + "/" +
      this.state.end_date);

    console.log(array.data.resultBall_All);

    let listUsageBall_All = array.data.resultBall;
    this.setState({ ballUsage_Daily: listUsageBall_All, data_tableDaily: array.data.result[0] });
    let listDateBall = array.data.resultDateBall;
    this.setState({ DateBall_Daily: listDateBall });
    console.log(this.state.ballUsage_Daily);

    setTimeout(
      function () {
        //Start the timer
        this.getOutput_ball_MBR_MA();
      }.bind(this),
      600000 //10 min
    );
  };
  Click_getOutput_ball = async () => {
    const array = await httpClient.get(
      server.realtime_MBRC_Ball_URL +
      "/" +
      this.state.start_date_def
      + "/" +
      this.state.end_date_def
    );
    console.log("Click ball daily");
    console.log(this.state.datetoday);
    console.log(array.data.resultBall);
    console.log(array.data.result_mcname);
    console.log(array.data.resultDateBall);

    let listUsageBall = array.data.resultBall;
    this.setState({ ballUsage: listUsageBall });
    let listUsageMC_name = array.data.result_mcname;
    this.setState({ mcno: listUsageMC_name });
    let listDateBall = array.data.resultDateBall;
    this.setState({ DateBall: listDateBall });

  };
  Click_value_ball = async () => {
    console.log("click");
    const array = await httpClient.get(
      server.realtime_MBRC_Ball_tb_URL +
      "/" +
      // this.state.start_date 
      this.state.yesterday
      + "/" +
      this.state.end_yesterday
      // this.state.end_date
    );
    console.log("click value");
    console.log(array.data.result[0]);

    this.setState({ data_table: array.data.result[0] });
  };
  clear_state = () => {
    this.setState({ ballUsageMA: [] }); // clear state
  };
  render() {
    // console.log(this.state.ballUsage)

    //Ball
    return (
      <div className="content-wrapper">
        <section className="content">
          <div className="container-fluid">
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
                  Total MBR_MA: Ball usage (%)
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
                      series={this.state.ballUsageMA}
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

export default Realtime_total_MBR_MA;
