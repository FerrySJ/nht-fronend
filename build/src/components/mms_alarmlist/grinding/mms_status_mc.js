/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-pascal-case */
import React from "react";
import ReactApexCharts from "react-apexcharts";
import { httpClient } from "../../../utils/HttpClient";
import { server } from "../../../constance/contance";
import moment from "moment";
import { FallingLines } from "react-loader-spinner";
import Swal from "sweetalert2";

class Mms_status_mc extends React.Component {
  constructor(props) {
    super(props);
    this.tick = this.tick.bind(this);
    this.state = { seconds: props.seconds };

    this.state = {
      start_date: moment().format("YYYY-MM-DD"),
      // start_date: moment().startOf("month").format("YYYY-MM-DD"),
      end_date: moment().endOf("month").format("YYYY-MM-DD"),
      data_mc: [],
      data_status: [],
      time: this.props.time,
      seconds: "1200",
      loading: "on",
      count_mc: 0,
    };
  }
  componentDidMount() {
    this.getOutput_ball_All();
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
  loadingScreen() {
    if (this.state.loading === "on") {
      return (
        <div className="overlay">
          <FallingLines
            color="#4fa94d"
            width="80"
            visible={true}
            ariaLabel="falling-lines-loading"
          />
          {/* <Hourglass
visible={true}
height="60"
width="60"
ariaLabel="hourglass-loading"
wrapperStyle={{}}
wrapperclassName=""
colors={['#306cce', '#72a1ed']}
/> */}
        </div>
      );
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.start_date !== this.state.start_date) {
       this.setState({ loading: "on" });
    this.getOutput_ball_All();
    }
  }

  handleSearch = (event) => {
    this.setState({ start_date: moment(event.target.value).format("YYYY-MM-DD") }); 
  };
  // getOutput_ball_All = async () => {
  //   let mc_list_data = await httpClient.post(server.GET_MASTER_MC_GD);
  //   console.log(mc_list_data.data.result_basic);
  //   const array = await httpClient.post(
  //     server.Realtime_status_daily_GD + "/" + this.state.start_date
  //   );

  //   // console.log(array.data);
  //   // console.log(array.data.resultStatus      );
  //   console.log(array.data.resultDateBall);
  //   let listUsageBall_All = array.data.resultStatus;
  //   this.setState({
  //     data_status: listUsageBall_All,
  //     loading : "off"
  //   });
  //   let listDateBall = array.data.resultDateBall;
  //   this.setState({ data_mc: listDateBall , count_mc:listDateBall.length});
  //   // console.log(this.state.data_status);
  //   // console.log(this.state.data_mc);

  //   setTimeout(
  //     function () {
  //       //Start the timer
  //       this.getOutput_ball_All();
  //     }.bind(this),
  //     600000 //10 min
  //   );
  // };
  getOutput_ball_All = async () => {
    let mc_list_data = await httpClient.post(server.GET_MASTER_MC_GD, {
      date: this.state.start_date,
    });
    let arr_mc = mc_list_data.data.result_basic_daily;
    // console.log(arr_mc,mc_list_data.data.result_basic_daily);
    let newArr_MC = [];
    for (let index = 0; index < arr_mc.length; index++) {
      const item = arr_mc[index];
      await newArr_MC.push(item.mc_no);
    }
    // console.log(newArr_MC);
    let data_RUN = [];
    let data_STOP = [];
    let data_ALARM = [];
    let data_WAIT = [];
    let data_FULL = [];
    // console.log(arr_mc.length);
    for (let index = 0; index < arr_mc.length; index++) {
      const array = await httpClient.post(
        server.Realtime_status_daily_GD + "/" + this.state.start_date,
        { mc_no: arr_mc[index].mc_no }
      );
      let arrayData = array.data.resultStatus[0];
      if (arrayData.name === "RUN") {
        if (
          arrayData.data[0] === undefined ||
          arrayData.data[0] === "undefined"
        ) {
          data_RUN.push(0);
        } else {
          data_RUN.push(arrayData.data[0]);
        }
      }
      if (array.data.resultStatus[1].name === "STOP") {
        if (
          arrayData.data[0] === undefined ||
          arrayData.data[0] === "undefined"
        ) {
          data_STOP.push(0);
        } else {
          data_STOP.push(array.data.resultStatus[1].data[0]);
        }
      }
      if (array.data.resultStatus[2].name === "ALARM") {
        if (
          arrayData.data[0] === undefined ||
          arrayData.data[0] === "undefined"
        ) {
          data_ALARM.push(0);
        } else {
          data_ALARM.push(array.data.resultStatus[2].data[0]);
        }
      }
      if (array.data.resultStatus[3].name === "WAIT PART") {
        if (
          arrayData.data[0] === undefined ||
          arrayData.data[0] === "undefined"
        ) {
          data_WAIT.push(0);
        } else {
          data_WAIT.push(array.data.resultStatus[3].data[0]);
        }
      }
      if (array.data.resultStatus[4].name === "FULL PART") {
        if (
          arrayData.data[0] === undefined ||
          arrayData.data[0] === "undefined"
        ) {
          data_FULL.push(0);
        } else {
          data_FULL.push(array.data.resultStatus[4].data[0]);
        }
      }

      // continue
    }
    let run = [];
    let stop = [];
    let alarm = [];
    let wait = [];
    let full = [];
    run.push({
      name: "RUN",
      data: data_RUN,
    });
    stop.push({
      name: "STOP",
      data: data_STOP,
    });
    alarm.push({
      name: "ALARM",
      data: data_ALARM,
    });
    wait.push({
      name: "WAIT PART",
      data: data_WAIT,
    });
    full.push({
      name: "FULL PART",
      data: data_FULL,
    });

    let data_result = [run[0], stop[0], alarm[0], wait[0], full[0]];
    await this.setState({
      data_status: [run[0], stop[0], alarm[0], wait[0], full[0]],
      data_mc: newArr_MC,
      count_mc: newArr_MC.length,
      loading: "off",
    });
    // console.log(";;;;;;;;;;;;;;;;;;;;");
    console.log(data_result);
    // console.log("=================");
    console.log(this.state.data_status);

    setTimeout(
      function () {
        //Start the timer
        this.getOutput_ball_All();
      }.bind(this),
      600000 //10 min
    );
  };
  clear_state = async () => {
    await this.setState({
      data_status: [],
      data_mc: [],
      count_mc: 0,
      loading: "on",
    });
  };
  render() {
    return (
      // <div className="content-wrapper">
      // <div className="content">
      // {/* <div className="content-wrapper" style={{ minHeight: "1000px" }}> */}
      // {/* <div className="position-relative card-body"></div> */}

      <div className="row-12">
        <div className="card">
          <div
            className="card-header"
            style={{
              marginBottom: "0",
              fontWeight: 500,
              fontSize: "1.5rem",
            }}
          >
            Machine Status (%)
          </div>
          <div
            className="row justify-content-center"
            style={{ paddingTop: "10px" }}
          >
            <div className="col-auto">
              <h5>Select Date :</h5>
            </div>
            <div className="col-auto">
              <input
                className="form-control"
                type="date"
                value={this.state.start_date}
                // onChange={async (e) => {
                //   await this.setState({
                //     start_date: moment(e.target.value).format("YYYY-MM-DD"),
                //   });
                // }}
                onChange={this.handleSearch} // เมื่อมีการเปลี่ยนแปลงของ input ให้เรียกใช้ handleSearch
                />
            </div>
            {/* <div className="col-1">
              <button
                type="submit"
                className="btn btn-primary"
                onClick={async (e) => {
                  e.preventDefault();
                  await this.clear_state();
                  await this.getOutput_ball_All();
                }}
              >
                submit
              </button>
            </div> */}
          </div>

          <div className="row justify-content-end">
            <div>
              <b style={{ color: "red" }}>Online : {this.state.count_mc} M/C</b>
            </div>
          </div>

          <div className="page-content">
            <div className="overlay-wrapper">
              {this.loadingScreen()}
              <div id="chart">
                <ReactApexCharts
                  options={{
                    chart: {
                      type: "bar",
                      height: 350,
                      stacked: true,
                      stackType: "100%",
                      events: {
                        //   console.log(chartContext.series.ctx.data.w.config.series
                        click(event, chartContext, config) {
                          Swal.fire({
                            icon: "warning",
                            title: "In Progress...",
                            text:
                              config.config.xaxis.categories[
                                config.dataPointIndex
                              ] +
                              " ... " +
                              config.config.series[config.seriesIndex].name +
                              " ... " +
                              config.config.series[config.seriesIndex].data[
                                config.dataPointIndex
                              ] +
                              " sec",
                            showConfirmButton: false,
                            timer: 2500,
                          });
                          // console.log(config.config.series[config.seriesIndex].data[config.dataPointIndex], config.config.xaxis.categories[config.dataPointIndex], config.config.series[config.seriesIndex].name);
                        },
                      },
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
                      // categories: this.state.test_mc,
                      categories: this.state.data_mc,
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
                          return val + " sec";
                        },
                      },
                    },
                    fill: {
                      opacity: 1,
                    },
                    colors: [
                      "#0BD830",
                      "#EA3546",
                      "#FF8F00",
                      "#FAFA09",
                      "#0291D8",
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
                        // if (seriesName === "BALL SIZE -5.0") {
                        //   return ["BALL SIZE -5.0"];
                        // }
                      },
                    },
                  }}
                  // series={this.state.test_op}
                  series={this.state.data_status}
                  type="bar"
                  height={1000}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      //   </div>
      // </div>
    );
  }
}

export default Mms_status_mc;
