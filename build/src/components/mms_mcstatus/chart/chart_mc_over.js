import React, { Component } from "react";
import ReactApexCharts from "react-apexcharts";
import { httpClient } from "../../../utils/HttpClient";
import { server } from "../../../constance/contance";
import moment from "moment";
import Swal from "sweetalert2";

class Chart_mc_over extends Component {
  constructor(props) {
    super(props);
    this.tick = this.tick.bind(this);
    this.state = { seconds: props.seconds };

    this.state = {
      data_all: [],
      DateAll:[],
      mcno:"ic11r",
      time: this.props.time,
    //   start_date: localStorage.getItem("start_date"),
    //   end_date: localStorage.getItem("end_date"),
      seconds: "1200",
      data_test:[
        { name: 'Non - Operating time', data: [ 86291, 36659, 16858 ] },
        { name: 'Operating time', data: [ 86176, 36923, 16904 ] }
      ],
      series_test:[ '2023-08-22','2023-08-23' ,'2023-08-24' ],
    };
  }
  componentDidMount = async()=> {
    await this.getDate();
    
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
    // console.log("LOL");
    const array = await httpClient.post(
      server.MC_by_status_GD + "/" + this.state.start_date  + "/" + this.state.end_date + "/" + this.state.mcno
    );
    console.log("by status");
    console.log(array.data.resultdata);
    console.log(array.data.result);
    console.log(array.data.resultDate);

    let list_oper_all = array.data.result;
    this.setState({ data_all: list_oper_all });
    let listDate = array.data.resultDate;
    this.setState({ DateAll: listDate });

    setTimeout(
      function () {
        //Start the timer
        this.getOutput_data();
      }.bind(this),
      600000 //10 min
    );
  };
  
  getDate = () => {
    this.setState({
      start_date: moment().startOf("month").format("YYYY-MM-DD"),
    });
    this.setState({ end_date: moment().endOf("month").format("YYYY-MM-DD")
 });
  };
  click_search = async () => {
    let result = await httpClient.post(
      server.MC_by_status_GD +
        "/" +
        this.state.start_date +
        "/" +
        this.state.end_date +
        "/" +
        this.state.selectMC
    );
    console.log(result);
    if (result.data.series[0].data[0] === undefined) {
      Swal.fire({
        icon: "error",
        text: "Can not find data!",
      }).then(() => {
        window.location.replace("../grinding_MMS_alarm");
      });
    }}
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
                M/C by Status 
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

                <div className="col-1">
                  <h5>End Date</h5>
                </div>
                <div className="col-2">
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
                      await this.click_search();
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
                        type: "date",
                        labels: {
                          show: true,
                          rotate: -45,
                          // rotateAlways: false,
                          // hideOverlappingLabels: true,
                          // showDuplicates: false,
                          // trim: false,
                          // minHeight: undefined,
                          // maxHeight: 120,
                          // style: {
                          //   colors: [],
                          //   fontSize: "25px",
                          //   fontFamily: "Helvetica, Arial, sans-serif",
                          //   fontWeight: 400,
                          //   cssClass: "apexcharts-xaxis-label",
                          // },
                        },
                        categories: this.state.DateAll,
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
                            return val + "min";
                          },
                        },
                      },
                      fill: {
                        opacity: 1,
                      },
                      colors: [
                        "#46E816",
                        "#E81616",
                        "#FF9700",
                        "#FFFB00",
                        "#003EFF",
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
                    // series={this.state.data_test}
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

export default Chart_mc_over;
