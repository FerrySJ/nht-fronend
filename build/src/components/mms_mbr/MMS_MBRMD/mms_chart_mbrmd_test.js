//display All ???

import React, { Component } from "react";
import axios from "axios";
import moment from "moment";
import { httpClient } from "../../../utils/HttpClient";
import { server } from "../../../constance/contance";
import ReactApexChart from "react-apexcharts";

import ReactApexCharts from "react-apexcharts";
import Swal from "sweetalert2";

class Mms_chart_mbrmd_test extends Component {
  constructor(props) {
    super(props);
    this.tick = this.tick.bind(this);
    this.state = { seconds: props.seconds };

    this.state = {
      aa: [],
      start_date: moment().format("YYYY-MM-DD"),
      data_all: [],
      DateAll: [],
      mcno: "ic11r",
      time: this.props.time,
      seconds: "1200",
      scal_min: 0,
      dataMax: 2566,
      scal_min_YR: 80,
      scal_max_YR: 110,
      dataPD: [],
      data_MA03: [],
      data_MA08: [],
      data_MA12: [],
      data_MA13: [],
      data_MA14: [],
      data_MD01: [],
      data_MD02: [],
      data_MD03: [],
      data_MD04: [],
      data_MD05: [],
      data_MD06: [],
      data_MD07: [],
      data_MD08: [],
      data_MD09: [],
      data_MD10: [],
      data_MD11: [],
      data_MD12: [],
      data_MD13: [],
      data_MD14: [],
      data_MD15: [],
      data_MD16: [],
      data_MD17: [],
      data_MD18: [],
      data_MD19: [],
      data_MD20: [],
      data_MD21: [],
      data_MD22: [],
      data_MD23: [],
      data_MD24: [],
      data_MD25: [],
      data_MD26: [],
      data_MD27: [],
      data_MD28: [],
      data_MD29: [],
      data_MD30: [],
      data_MD31: [],
      data_MD32: [],
      data_MD33: [],
      data_MD34: [],
      data_MD35: [],
      data_MD38: [],
      data_FFL31: [],
      data_FFL32: [],
      data_FFL33: [],
      data_FFL34: [],
      data_FFL35: [],
      data_FFL36: [],
      arr_mcno: [],
      set_mbr: [],
    };
  }
  componentDidMount = async () => {
    await this.get_master_MC();
    // await this.getDate();
    // console.log(this.state.start_date , this.state.end_date);
    this.getOutput_data();
    this.timer = setInterval(this.tick, 1000);
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
  getOutput_data = async () => {
    console.log("LOL", this.state.aa);

    const arr_MA03 = await httpClient.post(
      server.realtime_chartPD_MBR_MD_URL + "/MBR_MA03/" + this.state.start_date
    );
    const arr_MA08 = await httpClient.post(
      server.realtime_chartPD_MBR_MD_URL + "/MBR_MA08/" + this.state.start_date
    );
    const arr_MA12 = await httpClient.post(
      server.realtime_chartPD_MBR_MD_URL + "/MBR_MA12/" + this.state.start_date
    );

    const arr_MA14 = await httpClient.post(
      server.realtime_chartPD_MBR_MD_URL + "/MBR_MA14/" + this.state.start_date
    );
    const arr_MD01 = await httpClient.post(
      server.realtime_chartPD_MBR_MD_URL + "/MBR_MD01/" + this.state.start_date
    );
    const arr_MD02 = await httpClient.post(
      server.realtime_chartPD_MBR_MD_URL + "/MBR_MD02/" + this.state.start_date
    );
    const arr_MD03 = await httpClient.post(
      server.realtime_chartPD_MBR_MD_URL + "/MBR_MD03/" + this.state.start_date
    );
    const arr_MD04 = await httpClient.post(
      server.realtime_chartPD_MBR_MD_URL + "/MBR_MD04/" + this.state.start_date
    );
    const arr_MD05 = await httpClient.post(
      server.realtime_chartPD_MBR_MD_URL + "/MBR_MD05/" + this.state.start_date
    );
    const arr_MD06 = await httpClient.post(
      server.realtime_chartPD_MBR_MD_URL + "/MBR_MD06/" + this.state.start_date
    );
    const arr_MD07 = await httpClient.post(
      server.realtime_chartPD_MBR_MD_URL + "/MBR_MD07/" + this.state.start_date
    );
    const arr_MD08 = await httpClient.post(
      server.realtime_chartPD_MBR_MD_URL + "/MBR_MD08/" + this.state.start_date
    );
    const arr_MD09 = await httpClient.post(
      server.realtime_chartPD_MBR_MD_URL + "/MBR_MD09/" + this.state.start_date
    );
    const arr_MD10 = await httpClient.post(
      server.realtime_chartPD_MBR_MD_URL + "/MBR_MD10/" + this.state.start_date
    );
    const arr_MD11 = await httpClient.post(
      server.realtime_chartPD_MBR_MD_URL + "/MBR_MD11/" + this.state.start_date
    );
    const arr_MD12 = await httpClient.post(
      server.realtime_chartPD_MBR_MD_URL + "/MBR_MD12/" + this.state.start_date
    );
    const arr_MD13 = await httpClient.post(
      server.realtime_chartPD_MBR_MD_URL + "/MBR_MD13/" + this.state.start_date
    );
    const arr_MD14 = await httpClient.post(
      server.realtime_chartPD_MBR_MD_URL + "/MBR_MD14/" + this.state.start_date
    );
    const arr_MD15 = await httpClient.post(
      server.realtime_chartPD_MBR_MD_URL + "/MBR_MD15/" + this.state.start_date
    );
    const arr_MD16 = await httpClient.post(
      server.realtime_chartPD_MBR_MD_URL + "/MBR_MD16/" + this.state.start_date
    );
    const arr_MD17 = await httpClient.post(
      server.realtime_chartPD_MBR_MD_URL + "/MBR_MD17/" + this.state.start_date
    );
    const arr_MD18 = await httpClient.post(
      server.realtime_chartPD_MBR_MD_URL + "/MBR_MD18/" + this.state.start_date
    );
    const arr_MD19 = await httpClient.post(
      server.realtime_chartPD_MBR_MD_URL + "/MBR_MD19/" + this.state.start_date
    );
    const arr_MD20 = await httpClient.post(
      server.realtime_chartPD_MBR_MD_URL + "/MBR_MD20/" + this.state.start_date
    );
    const arr_MD21 = await httpClient.post(
      server.realtime_chartPD_MBR_MD_URL + "/MBR_MD21/" + this.state.start_date
    );
    const arr_MD22 = await httpClient.post(
      server.realtime_chartPD_MBR_MD_URL + "/MBR_MD22/" + this.state.start_date
    );
    const arr_MD23 = await httpClient.post(
      server.realtime_chartPD_MBR_MD_URL + "/MBR_MD23/" + this.state.start_date
    );
    const arr_MD24 = await httpClient.post(
      server.realtime_chartPD_MBR_MD_URL + "/MBR_MD24/" + this.state.start_date
    );
    const arr_MD25 = await httpClient.post(
      server.realtime_chartPD_MBR_MD_URL + "/MBR_MD25/" + this.state.start_date
    );
    const arr_MD26 = await httpClient.post(
      server.realtime_chartPD_MBR_MD_URL + "/MBR_MD26/" + this.state.start_date
    );
    const arr_MD27 = await httpClient.post(
      server.realtime_chartPD_MBR_MD_URL + "/MBR_MD27/" + this.state.start_date
    );
    const arr_MD28 = await httpClient.post(
      server.realtime_chartPD_MBR_MD_URL + "/MBR_MD28/" + this.state.start_date
    );
    const arr_MD29 = await httpClient.post(
      server.realtime_chartPD_MBR_MD_URL + "/MBR_MD29/" + this.state.start_date
    );
    const arr_MD30 = await httpClient.post(
      server.realtime_chartPD_MBR_MD_URL + "/MBR_MD30/" + this.state.start_date
    );
    const arr_MD31 = await httpClient.post(
      server.realtime_chartPD_MBR_MD_URL + "/MBR_MD31/" + this.state.start_date
    );
    const arr_MD32 = await httpClient.post(
      server.realtime_chartPD_MBR_MD_URL + "/MBR_MD32/" + this.state.start_date
    );
    const arr_MD33 = await httpClient.post(
      server.realtime_chartPD_MBR_MD_URL + "/MBR_MD33/" + this.state.start_date
    );
    const arr_MD34 = await httpClient.post(
      server.realtime_chartPD_MBR_MD_URL + "/MBR_MD34/" + this.state.start_date
    );
    const arr_MD35 = await httpClient.post(
      server.realtime_chartPD_MBR_MD_URL + "/MBR_MD35/" + this.state.start_date
    );
    const arr_MD38 = await httpClient.post(
      server.realtime_chartPD_MBR_MD_URL + "/MBR_MD38/" + this.state.start_date
    );
    const arr_FFL31 = await httpClient.post(
      server.realtime_chartPD_MBR_MD_URL + "/MINI_FFL31/" + this.state.start_date
    );
    const arr_FFL32 = await httpClient.post(
      server.realtime_chartPD_MBR_MD_URL + "/MINI_FFL32/" + this.state.start_date
    );
    const arr_FFL33 = await httpClient.post(
      server.realtime_chartPD_MBR_MD_URL + "/MINI_FFL33/" + this.state.start_date
    );
    const arr_FFL34 = await httpClient.post(
      server.realtime_chartPD_MBR_MD_URL + "/MINI_FFL34/" + this.state.start_date
    );
    const arr_FFL35 = await httpClient.post(
      server.realtime_chartPD_MBR_MD_URL + "/MINI_FFL35/" + this.state.start_date
    );
    const arr_FFL36 = await httpClient.post(
      server.realtime_chartPD_MBR_MD_URL + "/MINI_FFL36/" + this.state.start_date
    );
    

    // console.log("ChartPD ==>", arr_MA03.data.resultOutput_MBR);
    this.setState({
      data_MA03: arr_MA03.data.resultOutput_MBR,
      data_MA08: arr_MA08.data.resultOutput_MBR,
      data_MA12: arr_MA12.data.resultOutput_MBR,
      data_MA14: arr_MA14.data.resultOutput_MBR,
      data_MD08: arr_MD08.data.resultOutput_MBR,
      data_MD01: arr_MD01.data.resultOutput_MBR,
      data_MD02: arr_MD02.data.resultOutput_MBR,
      data_MD03: arr_MD03.data.resultOutput_MBR,
      data_MD04: arr_MD04.data.resultOutput_MBR,
      data_MD05: arr_MD05.data.resultOutput_MBR,
      data_MD06: arr_MD06.data.resultOutput_MBR,
      data_MD07: arr_MD07.data.resultOutput_MBR,
      data_MD08: arr_MD08.data.resultOutput_MBR,
      data_MD09: arr_MD09.data.resultOutput_MBR,
      data_MD10: arr_MD10.data.resultOutput_MBR,
      data_MD11: arr_MD11.data.resultOutput_MBR,
      data_MD12: arr_MD12.data.resultOutput_MBR,
      data_MD13: arr_MD13.data.resultOutput_MBR,
      data_MD14: arr_MD14.data.resultOutput_MBR,
      data_MD15: arr_MD15.data.resultOutput_MBR,
      data_MD16: arr_MD16.data.resultOutput_MBR,
      data_MD17: arr_MD17.data.resultOutput_MBR,
      data_MD18: arr_MD18.data.resultOutput_MBR,
      data_MD19: arr_MD19.data.resultOutput_MBR,
      data_MD20: arr_MD20.data.resultOutput_MBR,
      data_MD21: arr_MD21.data.resultOutput_MBR,
      data_MD22: arr_MD22.data.resultOutput_MBR,
      data_MD23: arr_MD23.data.resultOutput_MBR,
      data_MD24: arr_MD24.data.resultOutput_MBR,
      data_MD25: arr_MD25.data.resultOutput_MBR,
      data_MD26: arr_MD26.data.resultOutput_MBR,
      data_MD27: arr_MD27.data.resultOutput_MBR,
      data_MD28: arr_MD28.data.resultOutput_MBR,
      data_MD29: arr_MD29.data.resultOutput_MBR,
      data_MD30: arr_MD30.data.resultOutput_MBR,
      data_MD31: arr_MD31.data.resultOutput_MBR,
      data_MD32: arr_MD32.data.resultOutput_MBR,
      data_MD33: arr_MD33.data.resultOutput_MBR,
      data_MD34: arr_MD34.data.resultOutput_MBR,
      data_MD35: arr_MD35.data.resultOutput_MBR,
      data_MD38: arr_MD38.data.resultOutput_MBR,
      data_FFL31: arr_FFL31.data.resultOutput_MBR,
      data_FFL32: arr_FFL32.data.resultOutput_MBR,
      data_FFL33: arr_FFL33.data.resultOutput_MBR,
      data_FFL34: arr_FFL34.data.resultOutput_MBR,
      data_FFL35: arr_FFL35.data.resultOutput_MBR,
      data_FFL36: arr_FFL36.data.resultOutput_MBR,

    });
    // console.log("dataMA03",this.state.data_MA03);
    setTimeout(
      function () {
        //Start the timer
        this.getOutput_data();
      }.bind(this),
      // 180000 //3 min
      600000 //10 min
    );
  };

  get_master_MC = async () => {
    let result = await httpClient.get(server.master_machine);
    this.setState({
      arr_mcno: result.data.result[0],
      arr_mcno_length: result.data.result[0].length,
    });
    // console.log(result.data.result[0]);
    let arr_mc = [];
    for (let index = 0; index < result.data.result[0].length; index++) {
      // console.log(result.data.result[0][index].machine_no);
      this.state.aa.push(result.data.result[0][index].machine_no);
      arr_mc.push(result.data.result[0][index].machine_no);
    }
    // console.log(this.state.aa);
  };
  click_search = async () => {
    let result = await httpClient.post(
      server.Alarm_Non_Operating_GD +
        "/" +
        this.state.start_date +
        "/" +
        this.state.end_date +
        "/" +
        this.state.mcno
    );
    console.log(result);
    if (result.data.result.length === 0) {
      this.setState({}).then(() => {
        Swal.fire({
          icon: "warning",
          text: "Can not find data!",
        });
      });
    }
  };

  render() {
    return (
      <div className="content-wrapper">
        <div className="content">
          {/* <div className="row" style={{ paddingTop: "15px" }}> */}
          {/* <div className="col-lg-12"> */}
          <h4 className="row justify-content-end">
            Date: {moment().format("YYYY-MM-DD")} {moment().format("HH:mm:ss")}
          </h4>

          <div
            className="row justify-content-center"
            style={{
              // paddingTop: "10px",
              textAlign: "center",
              paddingBottom: "10px",
            }}
          >
            <h5 className="col-auto">Date :</h5>
            <div className="col-2">
              <input
                className="form-control"
                type="date"
                value={moment().format("YYYY-MM-DD")}
                onChange={async (e) => {
                  await moment(e.target.value).format("YYYY-MM-DD");
                }}
              />
            </div>
          </div>
          <div
            className="row justify-content-start"
            style={{ paddingTop: "15px" }}
          >
            <div className="col-lg-4">
              <div className="card">
                <h5 className="card-header"> MBR_MA03</h5>
                <div className="card-body" style={{ padding: "0rem" }}>
                  <div id="chart" style={{ padding: "0rem" }}>
                    <ReactApexChart
                      options={{
                        chart: {
                          height: 350,
                          type: "line",
                          stacked: false,
                        },
                        colors: [
                          "rgb(0, 143, 251)",
                          "#FF3B3B",
                          "#14D91A",
                          "#FF8ED6",
                          "#936BDE",
                          "#A73970",
                        ],

                        dataLabels: {
                          enabled: true,
                        },
                        stroke: {
                          width: [1, 4, 4],
                        },
                        xaxis: {
                          labels: {
                            rotate: -45,
                          },
                          categories: [
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
                        },
                        yaxis: [
                          {
                            axisTicks: {
                              show: true,
                            },
                            axisBorder: {
                              show: true,
                              color: "#008FFB",
                            },
                            labels: {
                              style: {
                                colors: "#008FFB",
                              },
                            },
                            title: {
                              text: "Production (pcs)",
                              style: {
                                color: "#008FFB",
                                fontSize: "18px",
                                fontWeight: 500,
                              },
                            },
                            tooltip: {
                              enabled: true,
                            },
                            min: this.state.scal_min,
                            max: this.state.dataMax, //dataBox.scal_max,
                          },
                          {
                            axisTicks: {
                              show: false,
                            },
                            axisBorder: {
                              show: false,
                              color: "#FF3B3B",
                            },
                            labels: {
                              show: false,
                              style: {
                                colors: "#FF3B3B",
                              },
                            },
                            // title: {
                            //   show:true,
                            //   text: "",
                            //   style: {
                            //   color: "#FF3B3B",
                            //     fontSize: "18px",
                            //     fontWeight: 500,
                            //   },
                            // },
                            // tooltip: {
                            //   enabled: true,
                            // },
                            min: this.state.scal_min,
                            max: this.state.dataMax, //dataBox.scal_max,
                          },
                          {
                            seriesName: "Yield rate",
                            opposite: true,
                            min: this.state.scal_min_YR,
                            max: this.state.scal_max_YR,
                            axisTicks: {
                              show: true,
                            },
                            axisBorder: {
                              show: true,
                              color: "#14D91A",
                            },
                            labels: {
                              style: {
                                colors: "#14D91A",
                              },
                            },
                            title: {
                              text: "Yield Rate (%)",
                              style: {
                                show: true,
                                color: "#14D91A",
                                fontSize: "18px",
                                fontWeight: 500,
                              },
                            },
                          },
                        ],
                        tooltip: {
                          fixed: {
                            enabled: false,
                            position: "topLeft", // topRight, topLeft, bottomRight, bottomLeft
                            offsetY: 30,
                            offsetX: 60,
                          },
                        },
                        legend: {
                          horizontalAlign: "center",
                          offsetX: 40,
                        },
                      }}
                      series={this.state.data_MA03}
                      type="line"
                      height={300}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card">
                <h5 className="card-header"> MBR_MA08</h5>
                <div className="card-body" style={{ padding: "0rem" }}>
                  <div id="chart" style={{ padding: "0rem" }}>
                    <ReactApexChart
                      options={{
                        chart: {
                          height: 350,
                          type: "line",
                          stacked: false,
                        },
                        colors: [
                          "rgb(0, 143, 251)",
                          "#FF3B3B",
                          "#14D91A",
                          "#FF8ED6",
                          "#936BDE",
                          "#A73970",
                        ],

                        dataLabels: {
                          enabled: true,
                        },
                        stroke: {
                          width: [1, 4, 4],
                        },
                        xaxis: {
                          labels: {
                            rotate: -45,
                          },
                          categories: [
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
                        },
                        yaxis: [
                          {
                            axisTicks: {
                              show: true,
                            },
                            axisBorder: {
                              show: true,
                              color: "#008FFB",
                            },
                            labels: {
                              style: {
                                colors: "#008FFB",
                              },
                            },
                            title: {
                              text: "Production (pcs)",
                              style: {
                                color: "#008FFB",
                                fontSize: "18px",
                                fontWeight: 500,
                              },
                            },
                            tooltip: {
                              enabled: true,
                            },
                            min: this.state.scal_min,
                            max: this.state.dataMax, //dataBox.scal_max,
                          },
                          {
                            axisTicks: {
                              show: false,
                            },
                            axisBorder: {
                              show: false,
                              color: "#FF3B3B",
                            },
                            labels: {
                              show: false,
                              style: {
                                colors: "#FF3B3B",
                              },
                            },
                            // title: {
                            //   show:true,
                            //   text: "",
                            //   style: {
                            //   color: "#FF3B3B",
                            //     fontSize: "18px",
                            //     fontWeight: 500,
                            //   },
                            // },
                            // tooltip: {
                            //   enabled: true,
                            // },
                            min: this.state.scal_min,
                            max: this.state.dataMax, //dataBox.scal_max,
                          },
                          {
                            seriesName: "Yield rate",
                            opposite: true,
                            min: this.state.scal_min_YR,
                            max: this.state.scal_max_YR,
                            axisTicks: {
                              show: true,
                            },
                            axisBorder: {
                              show: true,
                              color: "#14D91A",
                            },
                            labels: {
                              style: {
                                colors: "#14D91A",
                              },
                            },
                            title: {
                              text: "Yield Rate (%)",
                              style: {
                                show: true,
                                color: "#14D91A",
                                fontSize: "18px",
                                fontWeight: 500,
                              },
                            },
                          },
                        ],
                        tooltip: {
                          fixed: {
                            enabled: false,
                            position: "topLeft", // topRight, topLeft, bottomRight, bottomLeft
                            offsetY: 30,
                            offsetX: 60,
                          },
                        },
                        legend: {
                          horizontalAlign: "center",
                          offsetX: 40,
                        },
                      }}
                      series={this.state.data_MA08}
                      type="line"
                      height={300}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card">
                <h5 className="card-header"> MBR_MA12</h5>
                <div className="card-body" style={{ padding: "0rem" }}>
                  <div id="chart" style={{ padding: "0rem" }}>
                    <ReactApexChart
                      options={{
                        chart: {
                          height: 350,
                          type: "line",
                          stacked: false,
                        },
                        colors: [
                          "rgb(0, 143, 251)",
                          "#FF3B3B",
                          "#14D91A",
                          "#FF8ED6",
                          "#936BDE",
                          "#A73970",
                        ],

                        dataLabels: {
                          enabled: true,
                        },
                        stroke: {
                          width: [1, 4, 4],
                        },
                        xaxis: {
                          labels: {
                            rotate: -45,
                          },
                          categories: [
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
                        },
                        yaxis: [
                          {
                            axisTicks: {
                              show: true,
                            },
                            axisBorder: {
                              show: true,
                              color: "#008FFB",
                            },
                            labels: {
                              style: {
                                colors: "#008FFB",
                              },
                            },
                            title: {
                              text: "Production (pcs)",
                              style: {
                                color: "#008FFB",
                                fontSize: "18px",
                                fontWeight: 500,
                              },
                            },
                            tooltip: {
                              enabled: true,
                            },
                            min: this.state.scal_min,
                            max: this.state.dataMax, //dataBox.scal_max,
                          },
                          {
                            axisTicks: {
                              show: false,
                            },
                            axisBorder: {
                              show: false,
                              color: "#FF3B3B",
                            },
                            labels: {
                              show: false,
                              style: {
                                colors: "#FF3B3B",
                              },
                            },
                            // title: {
                            //   show:true,
                            //   text: "",
                            //   style: {
                            //   color: "#FF3B3B",
                            //     fontSize: "18px",
                            //     fontWeight: 500,
                            //   },
                            // },
                            // tooltip: {
                            //   enabled: true,
                            // },
                            min: this.state.scal_min,
                            max: this.state.dataMax, //dataBox.scal_max,
                          },
                          {
                            seriesName: "Yield rate",
                            opposite: true,
                            min: this.state.scal_min_YR,
                            max: this.state.scal_max_YR,
                            axisTicks: {
                              show: true,
                            },
                            axisBorder: {
                              show: true,
                              color: "#14D91A",
                            },
                            labels: {
                              style: {
                                colors: "#14D91A",
                              },
                            },
                            title: {
                              text: "Yield Rate (%)",
                              style: {
                                show: true,
                                color: "#14D91A",
                                fontSize: "18px",
                                fontWeight: 500,
                              },
                            },
                          },
                        ],
                        tooltip: {
                          fixed: {
                            enabled: false,
                            position: "topLeft", // topRight, topLeft, bottomRight, bottomLeft
                            offsetY: 30,
                            offsetX: 60,
                          },
                        },
                        legend: {
                          horizontalAlign: "center",
                          offsetX: 40,
                        },
                      }}
                      series={this.state.data_MA12}
                      type="line"
                      height={300}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* 2 */}
          <div
            className="row justify-content-start"
            style={{ paddingTop: "15px" }}
          >
            <div className="col-lg-4">
              <div className="card">
                <h5 className="card-header"> MBR_MA14</h5>
                <div className="card-body" style={{ padding: "0rem" }}>
                  <div id="chart" style={{ padding: "0rem" }}>
                    <ReactApexChart
                      options={{
                        chart: {
                          height: 350,
                          type: "line",
                          stacked: false,
                        },
                        colors: [
                          "rgb(0, 143, 251)",
                          "#FF3B3B",
                          "#14D91A",
                          "#FF8ED6",
                          "#936BDE",
                          "#A73970",
                        ],

                        dataLabels: {
                          enabled: true,
                        },
                        stroke: {
                          width: [1, 4, 4],
                        },
                        xaxis: {
                          labels: {
                            rotate: -45,
                          },
                          categories: [
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
                        },
                        yaxis: [
                          {
                            axisTicks: {
                              show: true,
                            },
                            axisBorder: {
                              show: true,
                              color: "#008FFB",
                            },
                            labels: {
                              style: {
                                colors: "#008FFB",
                              },
                            },
                            title: {
                              text: "Production (pcs)",
                              style: {
                                color: "#008FFB",
                                fontSize: "18px",
                                fontWeight: 500,
                              },
                            },
                            tooltip: {
                              enabled: true,
                            },
                            min: this.state.scal_min,
                            max: this.state.dataMax, //dataBox.scal_max,
                          },
                          {
                            axisTicks: {
                              show: false,
                            },
                            axisBorder: {
                              show: false,
                              color: "#FF3B3B",
                            },
                            labels: {
                              show: false,
                              style: {
                                colors: "#FF3B3B",
                              },
                            },
                            // title: {
                            //   show:true,
                            //   text: "",
                            //   style: {
                            //   color: "#FF3B3B",
                            //     fontSize: "18px",
                            //     fontWeight: 500,
                            //   },
                            // },
                            // tooltip: {
                            //   enabled: true,
                            // },
                            min: this.state.scal_min,
                            max: this.state.dataMax, //dataBox.scal_max,
                          },
                          {
                            seriesName: "Yield rate",
                            opposite: true,
                            min: this.state.scal_min_YR,
                            max: this.state.scal_max_YR,
                            axisTicks: {
                              show: true,
                            },
                            axisBorder: {
                              show: true,
                              color: "#14D91A",
                            },
                            labels: {
                              style: {
                                colors: "#14D91A",
                              },
                            },
                            title: {
                              text: "Yield Rate (%)",
                              style: {
                                show: true,
                                color: "#14D91A",
                                fontSize: "18px",
                                fontWeight: 500,
                              },
                            },
                          },
                        ],
                        tooltip: {
                          fixed: {
                            enabled: false,
                            position: "topLeft", // topRight, topLeft, bottomRight, bottomLeft
                            offsetY: 30,
                            offsetX: 60,
                          },
                        },
                        legend: {
                          horizontalAlign: "center",
                          offsetX: 40,
                        },
                      }}
                      series={this.state.data_MA14}
                      type="line"
                      height={300}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card">
                <h5 className="card-header"> MBR_MD01</h5>
                <div className="card-body" style={{ padding: "0rem" }}>
                  <div id="chart" style={{ padding: "0rem" }}>
                    <ReactApexChart
                      options={{
                        chart: {
                          height: 350,
                          type: "line",
                          stacked: false,
                        },
                        colors: [
                          "rgb(0, 143, 251)",
                          "#FF3B3B",
                          "#14D91A",
                          "#FF8ED6",
                          "#936BDE",
                          "#A73970",
                        ],

                        dataLabels: {
                          enabled: true,
                        },
                        stroke: {
                          width: [1, 4, 4],
                        },
                        xaxis: {
                          labels: {
                            rotate: -45,
                          },
                          categories: [
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
                        },
                        yaxis: [
                          {
                            axisTicks: {
                              show: true,
                            },
                            axisBorder: {
                              show: true,
                              color: "#008FFB",
                            },
                            labels: {
                              style: {
                                colors: "#008FFB",
                              },
                            },
                            title: {
                              text: "Production (pcs)",
                              style: {
                                color: "#008FFB",
                                fontSize: "18px",
                                fontWeight: 500,
                              },
                            },
                            tooltip: {
                              enabled: true,
                            },
                            min: this.state.scal_min,
                            max: this.state.dataMax, //dataBox.scal_max,
                          },
                          {
                            axisTicks: {
                              show: false,
                            },
                            axisBorder: {
                              show: false,
                              color: "#FF3B3B",
                            },
                            labels: {
                              show: false,
                              style: {
                                colors: "#FF3B3B",
                              },
                            },
                            // title: {
                            //   show:true,
                            //   text: "",
                            //   style: {
                            //   color: "#FF3B3B",
                            //     fontSize: "18px",
                            //     fontWeight: 500,
                            //   },
                            // },
                            // tooltip: {
                            //   enabled: true,
                            // },
                            min: this.state.scal_min,
                            max: this.state.dataMax, //dataBox.scal_max,
                          },
                          {
                            seriesName: "Yield rate",
                            opposite: true,
                            min: this.state.scal_min_YR,
                            max: this.state.scal_max_YR,
                            axisTicks: {
                              show: true,
                            },
                            axisBorder: {
                              show: true,
                              color: "#14D91A",
                            },
                            labels: {
                              style: {
                                colors: "#14D91A",
                              },
                            },
                            title: {
                              text: "Yield Rate (%)",
                              style: {
                                show: true,
                                color: "#14D91A",
                                fontSize: "18px",
                                fontWeight: 500,
                              },
                            },
                          },
                        ],
                        tooltip: {
                          fixed: {
                            enabled: false,
                            position: "topLeft", // topRight, topLeft, bottomRight, bottomLeft
                            offsetY: 30,
                            offsetX: 60,
                          },
                        },
                        legend: {
                          horizontalAlign: "center",
                          offsetX: 40,
                        },
                      }}
                      series={this.state.data_MD01}
                      type="line"
                      height={300}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card">
                <h5 className="card-header"> MBR_MD02</h5>
                <div className="card-body" style={{ padding: "0rem" }}>
                  <div id="chart" style={{ padding: "0rem" }}>
                    <ReactApexChart
                      options={{
                        chart: {
                          height: 350,
                          type: "line",
                          stacked: false,
                        },
                        colors: [
                          "rgb(0, 143, 251)",
                          "#FF3B3B",
                          "#14D91A",
                          "#FF8ED6",
                          "#936BDE",
                          "#A73970",
                        ],

                        dataLabels: {
                          enabled: true,
                        },
                        stroke: {
                          width: [1, 4, 4],
                        },
                        xaxis: {
                          labels: {
                            rotate: -45,
                          },
                          categories: [
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
                        },
                        yaxis: [
                          {
                            axisTicks: {
                              show: true,
                            },
                            axisBorder: {
                              show: true,
                              color: "#008FFB",
                            },
                            labels: {
                              style: {
                                colors: "#008FFB",
                              },
                            },
                            title: {
                              text: "Production (pcs)",
                              style: {
                                color: "#008FFB",
                                fontSize: "18px",
                                fontWeight: 500,
                              },
                            },
                            tooltip: {
                              enabled: true,
                            },
                            min: this.state.scal_min,
                            max: this.state.dataMax, //dataBox.scal_max,
                          },
                          {
                            axisTicks: {
                              show: false,
                            },
                            axisBorder: {
                              show: false,
                              color: "#FF3B3B",
                            },
                            labels: {
                              show: false,
                              style: {
                                colors: "#FF3B3B",
                              },
                            },
                            // title: {
                            //   show:true,
                            //   text: "",
                            //   style: {
                            //   color: "#FF3B3B",
                            //     fontSize: "18px",
                            //     fontWeight: 500,
                            //   },
                            // },
                            // tooltip: {
                            //   enabled: true,
                            // },
                            min: this.state.scal_min,
                            max: this.state.dataMax, //dataBox.scal_max,
                          },
                          {
                            seriesName: "Yield rate",
                            opposite: true,
                            min: this.state.scal_min_YR,
                            max: this.state.scal_max_YR,
                            axisTicks: {
                              show: true,
                            },
                            axisBorder: {
                              show: true,
                              color: "#14D91A",
                            },
                            labels: {
                              style: {
                                colors: "#14D91A",
                              },
                            },
                            title: {
                              text: "Yield Rate (%)",
                              style: {
                                show: true,
                                color: "#14D91A",
                                fontSize: "18px",
                                fontWeight: 500,
                              },
                            },
                          },
                        ],
                        tooltip: {
                          fixed: {
                            enabled: false,
                            position: "topLeft", // topRight, topLeft, bottomRight, bottomLeft
                            offsetY: 30,
                            offsetX: 60,
                          },
                        },
                        legend: {
                          horizontalAlign: "center",
                          offsetX: 40,
                        },
                      }}
                      series={this.state.data_MD02}
                      type="line"
                      height={300}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* 3 */}
          <div
            className="row justify-content-start"
            style={{ paddingTop: "15px" }}
          >
            <div className="col-lg-4">
              <div className="card">
                <h5 className="card-header"> MBR_MD03</h5>
                <div className="card-body" style={{ padding: "0rem" }}>
                  <div id="chart" style={{ padding: "0rem" }}>
                    <ReactApexChart
                      options={{
                        chart: {
                          height: 350,
                          type: "line",
                          stacked: false,
                        },
                        colors: [
                          "rgb(0, 143, 251)",
                          "#FF3B3B",
                          "#14D91A",
                          "#FF8ED6",
                          "#936BDE",
                          "#A73970",
                        ],

                        dataLabels: {
                          enabled: true,
                        },
                        stroke: {
                          width: [1, 4, 4],
                        },
                        xaxis: {
                          labels: {
                            rotate: -45,
                          },
                          categories: [
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
                        },
                        yaxis: [
                          {
                            axisTicks: {
                              show: true,
                            },
                            axisBorder: {
                              show: true,
                              color: "#008FFB",
                            },
                            labels: {
                              style: {
                                colors: "#008FFB",
                              },
                            },
                            title: {
                              text: "Production (pcs)",
                              style: {
                                color: "#008FFB",
                                fontSize: "18px",
                                fontWeight: 500,
                              },
                            },
                            tooltip: {
                              enabled: true,
                            },
                            min: this.state.scal_min,
                            max: this.state.dataMax, //dataBox.scal_max,
                          },
                          {
                            axisTicks: {
                              show: false,
                            },
                            axisBorder: {
                              show: false,
                              color: "#FF3B3B",
                            },
                            labels: {
                              show: false,
                              style: {
                                colors: "#FF3B3B",
                              },
                            },
                            // title: {
                            //   show:true,
                            //   text: "",
                            //   style: {
                            //   color: "#FF3B3B",
                            //     fontSize: "18px",
                            //     fontWeight: 500,
                            //   },
                            // },
                            // tooltip: {
                            //   enabled: true,
                            // },
                            min: this.state.scal_min,
                            max: this.state.dataMax, //dataBox.scal_max,
                          },
                          {
                            seriesName: "Yield rate",
                            opposite: true,
                            min: this.state.scal_min_YR,
                            max: this.state.scal_max_YR,
                            axisTicks: {
                              show: true,
                            },
                            axisBorder: {
                              show: true,
                              color: "#14D91A",
                            },
                            labels: {
                              style: {
                                colors: "#14D91A",
                              },
                            },
                            title: {
                              text: "Yield Rate (%)",
                              style: {
                                show: true,
                                color: "#14D91A",
                                fontSize: "18px",
                                fontWeight: 500,
                              },
                            },
                          },
                        ],
                        tooltip: {
                          fixed: {
                            enabled: false,
                            position: "topLeft", // topRight, topLeft, bottomRight, bottomLeft
                            offsetY: 30,
                            offsetX: 60,
                          },
                        },
                        legend: {
                          horizontalAlign: "center",
                          offsetX: 40,
                        },
                      }}
                      series={this.state.data_MD03}
                      type="line"
                      height={300}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card">
                <h5 className="card-header"> MBR_MD04</h5>
                <div className="card-body" style={{ padding: "0rem" }}>
                  <div id="chart" style={{ padding: "0rem" }}>
                    <ReactApexChart
                      options={{
                        chart: {
                          height: 350,
                          type: "line",
                          stacked: false,
                        },
                        colors: [
                          "rgb(0, 143, 251)",
                          "#FF3B3B",
                          "#14D91A",
                          "#FF8ED6",
                          "#936BDE",
                          "#A73970",
                        ],

                        dataLabels: {
                          enabled: true,
                        },
                        stroke: {
                          width: [1, 4, 4],
                        },
                        xaxis: {
                          labels: {
                            rotate: -45,
                          },
                          categories: [
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
                        },
                        yaxis: [
                          {
                            axisTicks: {
                              show: true,
                            },
                            axisBorder: {
                              show: true,
                              color: "#008FFB",
                            },
                            labels: {
                              style: {
                                colors: "#008FFB",
                              },
                            },
                            title: {
                              text: "Production (pcs)",
                              style: {
                                color: "#008FFB",
                                fontSize: "18px",
                                fontWeight: 500,
                              },
                            },
                            tooltip: {
                              enabled: true,
                            },
                            min: this.state.scal_min,
                            max: this.state.dataMax, //dataBox.scal_max,
                          },
                          {
                            axisTicks: {
                              show: false,
                            },
                            axisBorder: {
                              show: false,
                              color: "#FF3B3B",
                            },
                            labels: {
                              show: false,
                              style: {
                                colors: "#FF3B3B",
                              },
                            },
                            // title: {
                            //   show:true,
                            //   text: "",
                            //   style: {
                            //   color: "#FF3B3B",
                            //     fontSize: "18px",
                            //     fontWeight: 500,
                            //   },
                            // },
                            // tooltip: {
                            //   enabled: true,
                            // },
                            min: this.state.scal_min,
                            max: this.state.dataMax, //dataBox.scal_max,
                          },
                          {
                            seriesName: "Yield rate",
                            opposite: true,
                            min: this.state.scal_min_YR,
                            max: this.state.scal_max_YR,
                            axisTicks: {
                              show: true,
                            },
                            axisBorder: {
                              show: true,
                              color: "#14D91A",
                            },
                            labels: {
                              style: {
                                colors: "#14D91A",
                              },
                            },
                            title: {
                              text: "Yield Rate (%)",
                              style: {
                                show: true,
                                color: "#14D91A",
                                fontSize: "18px",
                                fontWeight: 500,
                              },
                            },
                          },
                        ],
                        tooltip: {
                          fixed: {
                            enabled: false,
                            position: "topLeft", // topRight, topLeft, bottomRight, bottomLeft
                            offsetY: 30,
                            offsetX: 60,
                          },
                        },
                        legend: {
                          horizontalAlign: "center",
                          offsetX: 40,
                        },
                      }}
                      series={this.state.data_MD04}
                      type="line"
                      height={300}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card">
                <h5 className="card-header"> MBR_MD05</h5>
                <div className="card-body" style={{ padding: "0rem" }}>
                  <div id="chart" style={{ padding: "0rem" }}>
                    <ReactApexChart
                      options={{
                        chart: {
                          height: 350,
                          type: "line",
                          stacked: false,
                        },
                        colors: [
                          "rgb(0, 143, 251)",
                          "#FF3B3B",
                          "#14D91A",
                          "#FF8ED6",
                          "#936BDE",
                          "#A73970",
                        ],

                        dataLabels: {
                          enabled: true,
                        },
                        stroke: {
                          width: [1, 4, 4],
                        },
                        xaxis: {
                          labels: {
                            rotate: -45,
                          },
                          categories: [
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
                        },
                        yaxis: [
                          {
                            axisTicks: {
                              show: true,
                            },
                            axisBorder: {
                              show: true,
                              color: "#008FFB",
                            },
                            labels: {
                              style: {
                                colors: "#008FFB",
                              },
                            },
                            title: {
                              text: "Production (pcs)",
                              style: {
                                color: "#008FFB",
                                fontSize: "18px",
                                fontWeight: 500,
                              },
                            },
                            tooltip: {
                              enabled: true,
                            },
                            min: this.state.scal_min,
                            max: this.state.dataMax, //dataBox.scal_max,
                          },
                          {
                            axisTicks: {
                              show: false,
                            },
                            axisBorder: {
                              show: false,
                              color: "#FF3B3B",
                            },
                            labels: {
                              show: false,
                              style: {
                                colors: "#FF3B3B",
                              },
                            },
                            // title: {
                            //   show:true,
                            //   text: "",
                            //   style: {
                            //   color: "#FF3B3B",
                            //     fontSize: "18px",
                            //     fontWeight: 500,
                            //   },
                            // },
                            // tooltip: {
                            //   enabled: true,
                            // },
                            min: this.state.scal_min,
                            max: this.state.dataMax, //dataBox.scal_max,
                          },
                          {
                            seriesName: "Yield rate",
                            opposite: true,
                            min: this.state.scal_min_YR,
                            max: this.state.scal_max_YR,
                            axisTicks: {
                              show: true,
                            },
                            axisBorder: {
                              show: true,
                              color: "#14D91A",
                            },
                            labels: {
                              style: {
                                colors: "#14D91A",
                              },
                            },
                            title: {
                              text: "Yield Rate (%)",
                              style: {
                                show: true,
                                color: "#14D91A",
                                fontSize: "18px",
                                fontWeight: 500,
                              },
                            },
                          },
                        ],
                        tooltip: {
                          fixed: {
                            enabled: false,
                            position: "topLeft", // topRight, topLeft, bottomRight, bottomLeft
                            offsetY: 30,
                            offsetX: 60,
                          },
                        },
                        legend: {
                          horizontalAlign: "center",
                          offsetX: 40,
                        },
                      }}
                      series={this.state.data_MD05}
                      type="line"
                      height={300}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* 4 */}
          <div
            className="row justify-content-start"
            style={{ paddingTop: "15px" }}
          >
            <div className="col-lg-4">
              <div className="card">
                <h5 className="card-header"> MBR_MD06</h5>
                <div className="card-body" style={{ padding: "0rem" }}>
                  <div id="chart" style={{ padding: "0rem" }}>
                    <ReactApexChart
                      options={{
                        chart: {
                          height: 350,
                          type: "line",
                          stacked: false,
                        },
                        colors: [
                          "rgb(0, 143, 251)",
                          "#FF3B3B",
                          "#14D91A",
                          "#FF8ED6",
                          "#936BDE",
                          "#A73970",
                        ],

                        dataLabels: {
                          enabled: true,
                        },
                        stroke: {
                          width: [1, 4, 4],
                        },
                        xaxis: {
                          labels: {
                            rotate: -45,
                          },
                          categories: [
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
                        },
                        yaxis: [
                          {
                            axisTicks: {
                              show: true,
                            },
                            axisBorder: {
                              show: true,
                              color: "#008FFB",
                            },
                            labels: {
                              style: {
                                colors: "#008FFB",
                              },
                            },
                            title: {
                              text: "Production (pcs)",
                              style: {
                                color: "#008FFB",
                                fontSize: "18px",
                                fontWeight: 500,
                              },
                            },
                            tooltip: {
                              enabled: true,
                            },
                            min: this.state.scal_min,
                            max: this.state.dataMax, //dataBox.scal_max,
                          },
                          {
                            axisTicks: {
                              show: false,
                            },
                            axisBorder: {
                              show: false,
                              color: "#FF3B3B",
                            },
                            labels: {
                              show: false,
                              style: {
                                colors: "#FF3B3B",
                              },
                            },
                            // title: {
                            //   show:true,
                            //   text: "",
                            //   style: {
                            //   color: "#FF3B3B",
                            //     fontSize: "18px",
                            //     fontWeight: 500,
                            //   },
                            // },
                            // tooltip: {
                            //   enabled: true,
                            // },
                            min: this.state.scal_min,
                            max: this.state.dataMax, //dataBox.scal_max,
                          },
                          {
                            seriesName: "Yield rate",
                            opposite: true,
                            min: this.state.scal_min_YR,
                            max: this.state.scal_max_YR,
                            axisTicks: {
                              show: true,
                            },
                            axisBorder: {
                              show: true,
                              color: "#14D91A",
                            },
                            labels: {
                              style: {
                                colors: "#14D91A",
                              },
                            },
                            title: {
                              text: "Yield Rate (%)",
                              style: {
                                show: true,
                                color: "#14D91A",
                                fontSize: "18px",
                                fontWeight: 500,
                              },
                            },
                          },
                        ],
                        tooltip: {
                          fixed: {
                            enabled: false,
                            position: "topLeft", // topRight, topLeft, bottomRight, bottomLeft
                            offsetY: 30,
                            offsetX: 60,
                          },
                        },
                        legend: {
                          horizontalAlign: "center",
                          offsetX: 40,
                        },
                      }}
                      series={this.state.data_MD07}
                      type="line"
                      height={300}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card">
                <h5 className="card-header"> MBR_MD08</h5>
                <div className="card-body" style={{ padding: "0rem" }}>
                  <div id="chart" style={{ padding: "0rem" }}>
                    <ReactApexChart
                      options={{
                        chart: {
                          height: 350,
                          type: "line",
                          stacked: false,
                        },
                        colors: [
                          "rgb(0, 143, 251)",
                          "#FF3B3B",
                          "#14D91A",
                          "#FF8ED6",
                          "#936BDE",
                          "#A73970",
                        ],

                        dataLabels: {
                          enabled: true,
                        },
                        stroke: {
                          width: [1, 4, 4],
                        },
                        xaxis: {
                          labels: {
                            rotate: -45,
                          },
                          categories: [
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
                        },
                        yaxis: [
                          {
                            axisTicks: {
                              show: true,
                            },
                            axisBorder: {
                              show: true,
                              color: "#008FFB",
                            },
                            labels: {
                              style: {
                                colors: "#008FFB",
                              },
                            },
                            title: {
                              text: "Production (pcs)",
                              style: {
                                color: "#008FFB",
                                fontSize: "18px",
                                fontWeight: 500,
                              },
                            },
                            tooltip: {
                              enabled: true,
                            },
                            min: this.state.scal_min,
                            max: this.state.dataMax, //dataBox.scal_max,
                          },
                          {
                            axisTicks: {
                              show: false,
                            },
                            axisBorder: {
                              show: false,
                              color: "#FF3B3B",
                            },
                            labels: {
                              show: false,
                              style: {
                                colors: "#FF3B3B",
                              },
                            },
                            // title: {
                            //   show:true,
                            //   text: "",
                            //   style: {
                            //   color: "#FF3B3B",
                            //     fontSize: "18px",
                            //     fontWeight: 500,
                            //   },
                            // },
                            // tooltip: {
                            //   enabled: true,
                            // },
                            min: this.state.scal_min,
                            max: this.state.dataMax, //dataBox.scal_max,
                          },
                          {
                            seriesName: "Yield rate",
                            opposite: true,
                            min: this.state.scal_min_YR,
                            max: this.state.scal_max_YR,
                            axisTicks: {
                              show: true,
                            },
                            axisBorder: {
                              show: true,
                              color: "#14D91A",
                            },
                            labels: {
                              style: {
                                colors: "#14D91A",
                              },
                            },
                            title: {
                              text: "Yield Rate (%)",
                              style: {
                                show: true,
                                color: "#14D91A",
                                fontSize: "18px",
                                fontWeight: 500,
                              },
                            },
                          },
                        ],
                        tooltip: {
                          fixed: {
                            enabled: false,
                            position: "topLeft", // topRight, topLeft, bottomRight, bottomLeft
                            offsetY: 30,
                            offsetX: 60,
                          },
                        },
                        legend: {
                          horizontalAlign: "center",
                          offsetX: 40,
                        },
                      }}
                      series={this.state.data_MD08}
                      type="line"
                      height={300}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card">
                <h5 className="card-header"> MBR_MD09</h5>
                <div className="card-body" style={{ padding: "0rem" }}>
                  <div id="chart" style={{ padding: "0rem" }}>
                    <ReactApexChart
                      options={{
                        chart: {
                          height: 350,
                          type: "line",
                          stacked: false,
                        },
                        colors: [
                          "rgb(0, 143, 251)",
                          "#FF3B3B",
                          "#14D91A",
                          "#FF8ED6",
                          "#936BDE",
                          "#A73970",
                        ],

                        dataLabels: {
                          enabled: true,
                        },
                        stroke: {
                          width: [1, 4, 4],
                        },
                        xaxis: {
                          labels: {
                            rotate: -45,
                          },
                          categories: [
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
                        },
                        yaxis: [
                          {
                            axisTicks: {
                              show: true,
                            },
                            axisBorder: {
                              show: true,
                              color: "#008FFB",
                            },
                            labels: {
                              style: {
                                colors: "#008FFB",
                              },
                            },
                            title: {
                              text: "Production (pcs)",
                              style: {
                                color: "#008FFB",
                                fontSize: "18px",
                                fontWeight: 500,
                              },
                            },
                            tooltip: {
                              enabled: true,
                            },
                            min: this.state.scal_min,
                            max: this.state.dataMax, //dataBox.scal_max,
                          },
                          {
                            axisTicks: {
                              show: false,
                            },
                            axisBorder: {
                              show: false,
                              color: "#FF3B3B",
                            },
                            labels: {
                              show: false,
                              style: {
                                colors: "#FF3B3B",
                              },
                            },
                            // title: {
                            //   show:true,
                            //   text: "",
                            //   style: {
                            //   color: "#FF3B3B",
                            //     fontSize: "18px",
                            //     fontWeight: 500,
                            //   },
                            // },
                            // tooltip: {
                            //   enabled: true,
                            // },
                            min: this.state.scal_min,
                            max: this.state.dataMax, //dataBox.scal_max,
                          },
                          {
                            seriesName: "Yield rate",
                            opposite: true,
                            min: this.state.scal_min_YR,
                            max: this.state.scal_max_YR,
                            axisTicks: {
                              show: true,
                            },
                            axisBorder: {
                              show: true,
                              color: "#14D91A",
                            },
                            labels: {
                              style: {
                                colors: "#14D91A",
                              },
                            },
                            title: {
                              text: "Yield Rate (%)",
                              style: {
                                show: true,
                                color: "#14D91A",
                                fontSize: "18px",
                                fontWeight: 500,
                              },
                            },
                          },
                        ],
                        tooltip: {
                          fixed: {
                            enabled: false,
                            position: "topLeft", // topRight, topLeft, bottomRight, bottomLeft
                            offsetY: 30,
                            offsetX: 60,
                          },
                        },
                        legend: {
                          horizontalAlign: "center",
                          offsetX: 40,
                        },
                      }}
                      series={this.state.data_MD09}
                      type="line"
                      height={300}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* 5 */}
          <div
            className="row justify-content-start"
            style={{ paddingTop: "15px" }}
          >
            <div className="col-lg-4">
              <div className="card">
                <h5 className="card-header"> MBR_MD10</h5>
                <div className="card-body" style={{ padding: "0rem" }}>
                  <div id="chart" style={{ padding: "0rem" }}>
                    <ReactApexChart
                      options={{
                        chart: {
                          height: 350,
                          type: "line",
                          stacked: false,
                        },
                        colors: [
                          "rgb(0, 143, 251)",
                          "#FF3B3B",
                          "#14D91A",
                          "#FF8ED6",
                          "#936BDE",
                          "#A73970",
                        ],

                        dataLabels: {
                          enabled: true,
                        },
                        stroke: {
                          width: [1, 4, 4],
                        },
                        xaxis: {
                          labels: {
                            rotate: -45,
                          },
                          categories: [
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
                        },
                        yaxis: [
                          {
                            axisTicks: {
                              show: true,
                            },
                            axisBorder: {
                              show: true,
                              color: "#008FFB",
                            },
                            labels: {
                              style: {
                                colors: "#008FFB",
                              },
                            },
                            title: {
                              text: "Production (pcs)",
                              style: {
                                color: "#008FFB",
                                fontSize: "18px",
                                fontWeight: 500,
                              },
                            },
                            tooltip: {
                              enabled: true,
                            },
                            min: this.state.scal_min,
                            max: this.state.dataMax, //dataBox.scal_max,
                          },
                          {
                            axisTicks: {
                              show: false,
                            },
                            axisBorder: {
                              show: false,
                              color: "#FF3B3B",
                            },
                            labels: {
                              show: false,
                              style: {
                                colors: "#FF3B3B",
                              },
                            },
                            // title: {
                            //   show:true,
                            //   text: "",
                            //   style: {
                            //   color: "#FF3B3B",
                            //     fontSize: "18px",
                            //     fontWeight: 500,
                            //   },
                            // },
                            // tooltip: {
                            //   enabled: true,
                            // },
                            min: this.state.scal_min,
                            max: this.state.dataMax, //dataBox.scal_max,
                          },
                          {
                            seriesName: "Yield rate",
                            opposite: true,
                            min: this.state.scal_min_YR,
                            max: this.state.scal_max_YR,
                            axisTicks: {
                              show: true,
                            },
                            axisBorder: {
                              show: true,
                              color: "#14D91A",
                            },
                            labels: {
                              style: {
                                colors: "#14D91A",
                              },
                            },
                            title: {
                              text: "Yield Rate (%)",
                              style: {
                                show: true,
                                color: "#14D91A",
                                fontSize: "18px",
                                fontWeight: 500,
                              },
                            },
                          },
                        ],
                        tooltip: {
                          fixed: {
                            enabled: false,
                            position: "topLeft", // topRight, topLeft, bottomRight, bottomLeft
                            offsetY: 30,
                            offsetX: 60,
                          },
                        },
                        legend: {
                          horizontalAlign: "center",
                          offsetX: 40,
                        },
                      }}
                      series={this.state.data_MD10}
                      type="line"
                      height={300}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card">
                <h5 className="card-header"> MBR_MD11</h5>
                <div className="card-body" style={{ padding: "0rem" }}>
                  <div id="chart" style={{ padding: "0rem" }}>
                    <ReactApexChart
                      options={{
                        chart: {
                          height: 350,
                          type: "line",
                          stacked: false,
                        },
                        colors: [
                          "rgb(0, 143, 251)",
                          "#FF3B3B",
                          "#14D91A",
                          "#FF8ED6",
                          "#936BDE",
                          "#A73970",
                        ],

                        dataLabels: {
                          enabled: true,
                        },
                        stroke: {
                          width: [1, 4, 4],
                        },
                        xaxis: {
                          labels: {
                            rotate: -45,
                          },
                          categories: [
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
                        },
                        yaxis: [
                          {
                            axisTicks: {
                              show: true,
                            },
                            axisBorder: {
                              show: true,
                              color: "#008FFB",
                            },
                            labels: {
                              style: {
                                colors: "#008FFB",
                              },
                            },
                            title: {
                              text: "Production (pcs)",
                              style: {
                                color: "#008FFB",
                                fontSize: "18px",
                                fontWeight: 500,
                              },
                            },
                            tooltip: {
                              enabled: true,
                            },
                            min: this.state.scal_min,
                            max: this.state.dataMax, //dataBox.scal_max,
                          },
                          {
                            axisTicks: {
                              show: false,
                            },
                            axisBorder: {
                              show: false,
                              color: "#FF3B3B",
                            },
                            labels: {
                              show: false,
                              style: {
                                colors: "#FF3B3B",
                              },
                            },
                            // title: {
                            //   show:true,
                            //   text: "",
                            //   style: {
                            //   color: "#FF3B3B",
                            //     fontSize: "18px",
                            //     fontWeight: 500,
                            //   },
                            // },
                            // tooltip: {
                            //   enabled: true,
                            // },
                            min: this.state.scal_min,
                            max: this.state.dataMax, //dataBox.scal_max,
                          },
                          {
                            seriesName: "Yield rate",
                            opposite: true,
                            min: this.state.scal_min_YR,
                            max: this.state.scal_max_YR,
                            axisTicks: {
                              show: true,
                            },
                            axisBorder: {
                              show: true,
                              color: "#14D91A",
                            },
                            labels: {
                              style: {
                                colors: "#14D91A",
                              },
                            },
                            title: {
                              text: "Yield Rate (%)",
                              style: {
                                show: true,
                                color: "#14D91A",
                                fontSize: "18px",
                                fontWeight: 500,
                              },
                            },
                          },
                        ],
                        tooltip: {
                          fixed: {
                            enabled: false,
                            position: "topLeft", // topRight, topLeft, bottomRight, bottomLeft
                            offsetY: 30,
                            offsetX: 60,
                          },
                        },
                        legend: {
                          horizontalAlign: "center",
                          offsetX: 40,
                        },
                      }}
                      series={this.state.data_MD11}
                      type="line"
                      height={300}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card">
                <h5 className="card-header"> MBR_MD12</h5>
                <div className="card-body" style={{ padding: "0rem" }}>
                  <div id="chart" style={{ padding: "0rem" }}>
                    <ReactApexChart
                      options={{
                        chart: {
                          height: 350,
                          type: "line",
                          stacked: false,
                        },
                        colors: [
                          "rgb(0, 143, 251)",
                          "#FF3B3B",
                          "#14D91A",
                          "#FF8ED6",
                          "#936BDE",
                          "#A73970",
                        ],

                        dataLabels: {
                          enabled: true,
                        },
                        stroke: {
                          width: [1, 4, 4],
                        },
                        xaxis: {
                          labels: {
                            rotate: -45,
                          },
                          categories: [
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
                        },
                        yaxis: [
                          {
                            axisTicks: {
                              show: true,
                            },
                            axisBorder: {
                              show: true,
                              color: "#008FFB",
                            },
                            labels: {
                              style: {
                                colors: "#008FFB",
                              },
                            },
                            title: {
                              text: "Production (pcs)",
                              style: {
                                color: "#008FFB",
                                fontSize: "18px",
                                fontWeight: 500,
                              },
                            },
                            tooltip: {
                              enabled: true,
                            },
                            min: this.state.scal_min,
                            max: this.state.dataMax, //dataBox.scal_max,
                          },
                          {
                            axisTicks: {
                              show: false,
                            },
                            axisBorder: {
                              show: false,
                              color: "#FF3B3B",
                            },
                            labels: {
                              show: false,
                              style: {
                                colors: "#FF3B3B",
                              },
                            },
                            // title: {
                            //   show:true,
                            //   text: "",
                            //   style: {
                            //   color: "#FF3B3B",
                            //     fontSize: "18px",
                            //     fontWeight: 500,
                            //   },
                            // },
                            // tooltip: {
                            //   enabled: true,
                            // },
                            min: this.state.scal_min,
                            max: this.state.dataMax, //dataBox.scal_max,
                          },
                          {
                            seriesName: "Yield rate",
                            opposite: true,
                            min: this.state.scal_min_YR,
                            max: this.state.scal_max_YR,
                            axisTicks: {
                              show: true,
                            },
                            axisBorder: {
                              show: true,
                              color: "#14D91A",
                            },
                            labels: {
                              style: {
                                colors: "#14D91A",
                              },
                            },
                            title: {
                              text: "Yield Rate (%)",
                              style: {
                                show: true,
                                color: "#14D91A",
                                fontSize: "18px",
                                fontWeight: 500,
                              },
                            },
                          },
                        ],
                        tooltip: {
                          fixed: {
                            enabled: false,
                            position: "topLeft", // topRight, topLeft, bottomRight, bottomLeft
                            offsetY: 30,
                            offsetX: 60,
                          },
                        },
                        legend: {
                          horizontalAlign: "center",
                          offsetX: 40,
                        },
                      }}
                      series={this.state.data_MD12}
                      type="line"
                      height={300}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* 6 */}
          <div
            className="row justify-content-start"
            style={{ paddingTop: "15px" }}
          >
            <div className="col-lg-4">
              <div className="card">
                <h5 className="card-header"> MBR_MD13</h5>
                <div className="card-body" style={{ padding: "0rem" }}>
                  <div id="chart" style={{ padding: "0rem" }}>
                    <ReactApexChart
                      options={{
                        chart: {
                          height: 350,
                          type: "line",
                          stacked: false,
                        },
                        colors: [
                          "rgb(0, 143, 251)",
                          "#FF3B3B",
                          "#14D91A",
                          "#FF8ED6",
                          "#936BDE",
                          "#A73970",
                        ],

                        dataLabels: {
                          enabled: true,
                        },
                        stroke: {
                          width: [1, 4, 4],
                        },
                        xaxis: {
                          labels: {
                            rotate: -45,
                          },
                          categories: [
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
                        },
                        yaxis: [
                          {
                            axisTicks: {
                              show: true,
                            },
                            axisBorder: {
                              show: true,
                              color: "#008FFB",
                            },
                            labels: {
                              style: {
                                colors: "#008FFB",
                              },
                            },
                            title: {
                              text: "Production (pcs)",
                              style: {
                                color: "#008FFB",
                                fontSize: "18px",
                                fontWeight: 500,
                              },
                            },
                            tooltip: {
                              enabled: true,
                            },
                            min: this.state.scal_min,
                            max: this.state.dataMax, //dataBox.scal_max,
                          },
                          {
                            axisTicks: {
                              show: false,
                            },
                            axisBorder: {
                              show: false,
                              color: "#FF3B3B",
                            },
                            labels: {
                              show: false,
                              style: {
                                colors: "#FF3B3B",
                              },
                            },
                            // title: {
                            //   show:true,
                            //   text: "",
                            //   style: {
                            //   color: "#FF3B3B",
                            //     fontSize: "18px",
                            //     fontWeight: 500,
                            //   },
                            // },
                            // tooltip: {
                            //   enabled: true,
                            // },
                            min: this.state.scal_min,
                            max: this.state.dataMax, //dataBox.scal_max,
                          },
                          {
                            seriesName: "Yield rate",
                            opposite: true,
                            min: this.state.scal_min_YR,
                            max: this.state.scal_max_YR,
                            axisTicks: {
                              show: true,
                            },
                            axisBorder: {
                              show: true,
                              color: "#14D91A",
                            },
                            labels: {
                              style: {
                                colors: "#14D91A",
                              },
                            },
                            title: {
                              text: "Yield Rate (%)",
                              style: {
                                show: true,
                                color: "#14D91A",
                                fontSize: "18px",
                                fontWeight: 500,
                              },
                            },
                          },
                        ],
                        tooltip: {
                          fixed: {
                            enabled: false,
                            position: "topLeft", // topRight, topLeft, bottomRight, bottomLeft
                            offsetY: 30,
                            offsetX: 60,
                          },
                        },
                        legend: {
                          horizontalAlign: "center",
                          offsetX: 40,
                        },
                      }}
                      series={this.state.data_MD13}
                      type="line"
                      height={300}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card">
                <h5 className="card-header"> MBR_MD14</h5>
                <div className="card-body" style={{ padding: "0rem" }}>
                  <div id="chart" style={{ padding: "0rem" }}>
                    <ReactApexChart
                      options={{
                        chart: {
                          height: 350,
                          type: "line",
                          stacked: false,
                        },
                        colors: [
                          "rgb(0, 143, 251)",
                          "#FF3B3B",
                          "#14D91A",
                          "#FF8ED6",
                          "#936BDE",
                          "#A73970",
                        ],

                        dataLabels: {
                          enabled: true,
                        },
                        stroke: {
                          width: [1, 4, 4],
                        },
                        xaxis: {
                          labels: {
                            rotate: -45,
                          },
                          categories: [
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
                        },
                        yaxis: [
                          {
                            axisTicks: {
                              show: true,
                            },
                            axisBorder: {
                              show: true,
                              color: "#008FFB",
                            },
                            labels: {
                              style: {
                                colors: "#008FFB",
                              },
                            },
                            title: {
                              text: "Production (pcs)",
                              style: {
                                color: "#008FFB",
                                fontSize: "18px",
                                fontWeight: 500,
                              },
                            },
                            tooltip: {
                              enabled: true,
                            },
                            min: this.state.scal_min,
                            max: this.state.dataMax, //dataBox.scal_max,
                          },
                          {
                            axisTicks: {
                              show: false,
                            },
                            axisBorder: {
                              show: false,
                              color: "#FF3B3B",
                            },
                            labels: {
                              show: false,
                              style: {
                                colors: "#FF3B3B",
                              },
                            },
                            // title: {
                            //   show:true,
                            //   text: "",
                            //   style: {
                            //   color: "#FF3B3B",
                            //     fontSize: "18px",
                            //     fontWeight: 500,
                            //   },
                            // },
                            // tooltip: {
                            //   enabled: true,
                            // },
                            min: this.state.scal_min,
                            max: this.state.dataMax, //dataBox.scal_max,
                          },
                          {
                            seriesName: "Yield rate",
                            opposite: true,
                            min: this.state.scal_min_YR,
                            max: this.state.scal_max_YR,
                            axisTicks: {
                              show: true,
                            },
                            axisBorder: {
                              show: true,
                              color: "#14D91A",
                            },
                            labels: {
                              style: {
                                colors: "#14D91A",
                              },
                            },
                            title: {
                              text: "Yield Rate (%)",
                              style: {
                                show: true,
                                color: "#14D91A",
                                fontSize: "18px",
                                fontWeight: 500,
                              },
                            },
                          },
                        ],
                        tooltip: {
                          fixed: {
                            enabled: false,
                            position: "topLeft", // topRight, topLeft, bottomRight, bottomLeft
                            offsetY: 30,
                            offsetX: 60,
                          },
                        },
                        legend: {
                          horizontalAlign: "center",
                          offsetX: 40,
                        },
                      }}
                      series={this.state.data_MD14}
                      type="line"
                      height={300}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card">
                <h5 className="card-header"> MBR_MD15</h5>
                <div className="card-body" style={{ padding: "0rem" }}>
                  <div id="chart" style={{ padding: "0rem" }}>
                    <ReactApexChart
                      options={{
                        chart: {
                          height: 350,
                          type: "line",
                          stacked: false,
                        },
                        colors: [
                          "rgb(0, 143, 251)",
                          "#FF3B3B",
                          "#14D91A",
                          "#FF8ED6",
                          "#936BDE",
                          "#A73970",
                        ],

                        dataLabels: {
                          enabled: true,
                        },
                        stroke: {
                          width: [1, 4, 4],
                        },
                        xaxis: {
                          labels: {
                            rotate: -45,
                          },
                          categories: [
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
                        },
                        yaxis: [
                          {
                            axisTicks: {
                              show: true,
                            },
                            axisBorder: {
                              show: true,
                              color: "#008FFB",
                            },
                            labels: {
                              style: {
                                colors: "#008FFB",
                              },
                            },
                            title: {
                              text: "Production (pcs)",
                              style: {
                                color: "#008FFB",
                                fontSize: "18px",
                                fontWeight: 500,
                              },
                            },
                            tooltip: {
                              enabled: true,
                            },
                            min: this.state.scal_min,
                            max: this.state.dataMax, //dataBox.scal_max,
                          },
                          {
                            axisTicks: {
                              show: false,
                            },
                            axisBorder: {
                              show: false,
                              color: "#FF3B3B",
                            },
                            labels: {
                              show: false,
                              style: {
                                colors: "#FF3B3B",
                              },
                            },
                            // title: {
                            //   show:true,
                            //   text: "",
                            //   style: {
                            //   color: "#FF3B3B",
                            //     fontSize: "18px",
                            //     fontWeight: 500,
                            //   },
                            // },
                            // tooltip: {
                            //   enabled: true,
                            // },
                            min: this.state.scal_min,
                            max: this.state.dataMax, //dataBox.scal_max,
                          },
                          {
                            seriesName: "Yield rate",
                            opposite: true,
                            min: this.state.scal_min_YR,
                            max: this.state.scal_max_YR,
                            axisTicks: {
                              show: true,
                            },
                            axisBorder: {
                              show: true,
                              color: "#14D91A",
                            },
                            labels: {
                              style: {
                                colors: "#14D91A",
                              },
                            },
                            title: {
                              text: "Yield Rate (%)",
                              style: {
                                show: true,
                                color: "#14D91A",
                                fontSize: "18px",
                                fontWeight: 500,
                              },
                            },
                          },
                        ],
                        tooltip: {
                          fixed: {
                            enabled: false,
                            position: "topLeft", // topRight, topLeft, bottomRight, bottomLeft
                            offsetY: 30,
                            offsetX: 60,
                          },
                        },
                        legend: {
                          horizontalAlign: "center",
                          offsetX: 40,
                        },
                      }}
                      series={this.state.data_MD15}
                      type="line"
                      height={300}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* 7 */}
          <div
            className="row justify-content-start"
            style={{ paddingTop: "15px" }}
          >
            <div className="col-lg-4">
              <div className="card">
                <h5 className="card-header"> MBR_MD16</h5>
                <div className="card-body" style={{ padding: "0rem" }}>
                  <div id="chart" style={{ padding: "0rem" }}>
                    <ReactApexChart
                      options={{
                        chart: {
                          height: 350,
                          type: "line",
                          stacked: false,
                        },
                        colors: [
                          "rgb(0, 143, 251)",
                          "#FF3B3B",
                          "#14D91A",
                          "#FF8ED6",
                          "#936BDE",
                          "#A73970",
                        ],

                        dataLabels: {
                          enabled: true,
                        },
                        stroke: {
                          width: [1, 4, 4],
                        },
                        xaxis: {
                          labels: {
                            rotate: -45,
                          },
                          categories: [
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
                        },
                        yaxis: [
                          {
                            axisTicks: {
                              show: true,
                            },
                            axisBorder: {
                              show: true,
                              color: "#008FFB",
                            },
                            labels: {
                              style: {
                                colors: "#008FFB",
                              },
                            },
                            title: {
                              text: "Production (pcs)",
                              style: {
                                color: "#008FFB",
                                fontSize: "18px",
                                fontWeight: 500,
                              },
                            },
                            tooltip: {
                              enabled: true,
                            },
                            min: this.state.scal_min,
                            max: this.state.dataMax, //dataBox.scal_max,
                          },
                          {
                            axisTicks: {
                              show: false,
                            },
                            axisBorder: {
                              show: false,
                              color: "#FF3B3B",
                            },
                            labels: {
                              show: false,
                              style: {
                                colors: "#FF3B3B",
                              },
                            },
                            // title: {
                            //   show:true,
                            //   text: "",
                            //   style: {
                            //   color: "#FF3B3B",
                            //     fontSize: "18px",
                            //     fontWeight: 500,
                            //   },
                            // },
                            // tooltip: {
                            //   enabled: true,
                            // },
                            min: this.state.scal_min,
                            max: this.state.dataMax, //dataBox.scal_max,
                          },
                          {
                            seriesName: "Yield rate",
                            opposite: true,
                            min: this.state.scal_min_YR,
                            max: this.state.scal_max_YR,
                            axisTicks: {
                              show: true,
                            },
                            axisBorder: {
                              show: true,
                              color: "#14D91A",
                            },
                            labels: {
                              style: {
                                colors: "#14D91A",
                              },
                            },
                            title: {
                              text: "Yield Rate (%)",
                              style: {
                                show: true,
                                color: "#14D91A",
                                fontSize: "18px",
                                fontWeight: 500,
                              },
                            },
                          },
                        ],
                        tooltip: {
                          fixed: {
                            enabled: false,
                            position: "topLeft", // topRight, topLeft, bottomRight, bottomLeft
                            offsetY: 30,
                            offsetX: 60,
                          },
                        },
                        legend: {
                          horizontalAlign: "center",
                          offsetX: 40,
                        },
                      }}
                      series={this.state.data_MD16}
                      type="line"
                      height={300}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card">
                <h5 className="card-header"> MBR_MD17</h5>
                <div className="card-body" style={{ padding: "0rem" }}>
                  <div id="chart" style={{ padding: "0rem" }}>
                    <ReactApexChart
                      options={{
                        chart: {
                          height: 350,
                          type: "line",
                          stacked: false,
                        },
                        colors: [
                          "rgb(0, 143, 251)",
                          "#FF3B3B",
                          "#14D91A",
                          "#FF8ED6",
                          "#936BDE",
                          "#A73970",
                        ],

                        dataLabels: {
                          enabled: true,
                        },
                        stroke: {
                          width: [1, 4, 4],
                        },
                        xaxis: {
                          labels: {
                            rotate: -45,
                          },
                          categories: [
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
                        },
                        yaxis: [
                          {
                            axisTicks: {
                              show: true,
                            },
                            axisBorder: {
                              show: true,
                              color: "#008FFB",
                            },
                            labels: {
                              style: {
                                colors: "#008FFB",
                              },
                            },
                            title: {
                              text: "Production (pcs)",
                              style: {
                                color: "#008FFB",
                                fontSize: "18px",
                                fontWeight: 500,
                              },
                            },
                            tooltip: {
                              enabled: true,
                            },
                            min: this.state.scal_min,
                            max: this.state.dataMax, //dataBox.scal_max,
                          },
                          {
                            axisTicks: {
                              show: false,
                            },
                            axisBorder: {
                              show: false,
                              color: "#FF3B3B",
                            },
                            labels: {
                              show: false,
                              style: {
                                colors: "#FF3B3B",
                              },
                            },
                            // title: {
                            //   show:true,
                            //   text: "",
                            //   style: {
                            //   color: "#FF3B3B",
                            //     fontSize: "18px",
                            //     fontWeight: 500,
                            //   },
                            // },
                            // tooltip: {
                            //   enabled: true,
                            // },
                            min: this.state.scal_min,
                            max: this.state.dataMax, //dataBox.scal_max,
                          },
                          {
                            seriesName: "Yield rate",
                            opposite: true,
                            min: this.state.scal_min_YR,
                            max: this.state.scal_max_YR,
                            axisTicks: {
                              show: true,
                            },
                            axisBorder: {
                              show: true,
                              color: "#14D91A",
                            },
                            labels: {
                              style: {
                                colors: "#14D91A",
                              },
                            },
                            title: {
                              text: "Yield Rate (%)",
                              style: {
                                show: true,
                                color: "#14D91A",
                                fontSize: "18px",
                                fontWeight: 500,
                              },
                            },
                          },
                        ],
                        tooltip: {
                          fixed: {
                            enabled: false,
                            position: "topLeft", // topRight, topLeft, bottomRight, bottomLeft
                            offsetY: 30,
                            offsetX: 60,
                          },
                        },
                        legend: {
                          horizontalAlign: "center",
                          offsetX: 40,
                        },
                      }}
                      series={this.state.data_MD17}
                      type="line"
                      height={300}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card">
                <h5 className="card-header"> MBR_MD18</h5>
                <div className="card-body" style={{ padding: "0rem" }}>
                  <div id="chart" style={{ padding: "0rem" }}>
                    <ReactApexChart
                      options={{
                        chart: {
                          height: 350,
                          type: "line",
                          stacked: false,
                        },
                        colors: [
                          "rgb(0, 143, 251)",
                          "#FF3B3B",
                          "#14D91A",
                          "#FF8ED6",
                          "#936BDE",
                          "#A73970",
                        ],

                        dataLabels: {
                          enabled: true,
                        },
                        stroke: {
                          width: [1, 4, 4],
                        },
                        xaxis: {
                          labels: {
                            rotate: -45,
                          },
                          categories: [
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
                        },
                        yaxis: [
                          {
                            axisTicks: {
                              show: true,
                            },
                            axisBorder: {
                              show: true,
                              color: "#008FFB",
                            },
                            labels: {
                              style: {
                                colors: "#008FFB",
                              },
                            },
                            title: {
                              text: "Production (pcs)",
                              style: {
                                color: "#008FFB",
                                fontSize: "18px",
                                fontWeight: 500,
                              },
                            },
                            tooltip: {
                              enabled: true,
                            },
                            min: this.state.scal_min,
                            max: this.state.dataMax, //dataBox.scal_max,
                          },
                          {
                            axisTicks: {
                              show: false,
                            },
                            axisBorder: {
                              show: false,
                              color: "#FF3B3B",
                            },
                            labels: {
                              show: false,
                              style: {
                                colors: "#FF3B3B",
                              },
                            },
                            // title: {
                            //   show:true,
                            //   text: "",
                            //   style: {
                            //   color: "#FF3B3B",
                            //     fontSize: "18px",
                            //     fontWeight: 500,
                            //   },
                            // },
                            // tooltip: {
                            //   enabled: true,
                            // },
                            min: this.state.scal_min,
                            max: this.state.dataMax, //dataBox.scal_max,
                          },
                          {
                            seriesName: "Yield rate",
                            opposite: true,
                            min: this.state.scal_min_YR,
                            max: this.state.scal_max_YR,
                            axisTicks: {
                              show: true,
                            },
                            axisBorder: {
                              show: true,
                              color: "#14D91A",
                            },
                            labels: {
                              style: {
                                colors: "#14D91A",
                              },
                            },
                            title: {
                              text: "Yield Rate (%)",
                              style: {
                                show: true,
                                color: "#14D91A",
                                fontSize: "18px",
                                fontWeight: 500,
                              },
                            },
                          },
                        ],
                        tooltip: {
                          fixed: {
                            enabled: false,
                            position: "topLeft", // topRight, topLeft, bottomRight, bottomLeft
                            offsetY: 30,
                            offsetX: 60,
                          },
                        },
                        legend: {
                          horizontalAlign: "center",
                          offsetX: 40,
                        },
                      }}
                      series={this.state.data_MD18}
                      type="line"
                      height={300}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* 8 */}
          <div
            className="row justify-content-start"
            style={{ paddingTop: "15px" }}
          >
            <div className="col-lg-4">
              <div className="card">
                <h5 className="card-header"> MBR_MD19</h5>
                <div className="card-body" style={{ padding: "0rem" }}>
                  <div id="chart" style={{ padding: "0rem" }}>
                    <ReactApexChart
                      options={{
                        chart: {
                          height: 350,
                          type: "line",
                          stacked: false,
                        },
                        colors: [
                          "rgb(0, 143, 251)",
                          "#FF3B3B",
                          "#14D91A",
                          "#FF8ED6",
                          "#936BDE",
                          "#A73970",
                        ],

                        dataLabels: {
                          enabled: true,
                        },
                        stroke: {
                          width: [1, 4, 4],
                        },
                        xaxis: {
                          labels: {
                            rotate: -45,
                          },
                          categories: [
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
                        },
                        yaxis: [
                          {
                            axisTicks: {
                              show: true,
                            },
                            axisBorder: {
                              show: true,
                              color: "#008FFB",
                            },
                            labels: {
                              style: {
                                colors: "#008FFB",
                              },
                            },
                            title: {
                              text: "Production (pcs)",
                              style: {
                                color: "#008FFB",
                                fontSize: "18px",
                                fontWeight: 500,
                              },
                            },
                            tooltip: {
                              enabled: true,
                            },
                            min: this.state.scal_min,
                            max: this.state.dataMax, //dataBox.scal_max,
                          },
                          {
                            axisTicks: {
                              show: false,
                            },
                            axisBorder: {
                              show: false,
                              color: "#FF3B3B",
                            },
                            labels: {
                              show: false,
                              style: {
                                colors: "#FF3B3B",
                              },
                            },
                            // title: {
                            //   show:true,
                            //   text: "",
                            //   style: {
                            //   color: "#FF3B3B",
                            //     fontSize: "18px",
                            //     fontWeight: 500,
                            //   },
                            // },
                            // tooltip: {
                            //   enabled: true,
                            // },
                            min: this.state.scal_min,
                            max: this.state.dataMax, //dataBox.scal_max,
                          },
                          {
                            seriesName: "Yield rate",
                            opposite: true,
                            min: this.state.scal_min_YR,
                            max: this.state.scal_max_YR,
                            axisTicks: {
                              show: true,
                            },
                            axisBorder: {
                              show: true,
                              color: "#14D91A",
                            },
                            labels: {
                              style: {
                                colors: "#14D91A",
                              },
                            },
                            title: {
                              text: "Yield Rate (%)",
                              style: {
                                show: true,
                                color: "#14D91A",
                                fontSize: "18px",
                                fontWeight: 500,
                              },
                            },
                          },
                        ],
                        tooltip: {
                          fixed: {
                            enabled: false,
                            position: "topLeft", // topRight, topLeft, bottomRight, bottomLeft
                            offsetY: 30,
                            offsetX: 60,
                          },
                        },
                        legend: {
                          horizontalAlign: "center",
                          offsetX: 40,
                        },
                      }}
                      series={this.state.data_MD19}
                      type="line"
                      height={300}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card">
                <h5 className="card-header"> MBR_MD20</h5>
                <div className="card-body" style={{ padding: "0rem" }}>
                  <div id="chart" style={{ padding: "0rem" }}>
                    <ReactApexChart
                      options={{
                        chart: {
                          height: 350,
                          type: "line",
                          stacked: false,
                        },
                        colors: [
                          "rgb(0, 143, 251)",
                          "#FF3B3B",
                          "#14D91A",
                          "#FF8ED6",
                          "#936BDE",
                          "#A73970",
                        ],

                        dataLabels: {
                          enabled: true,
                        },
                        stroke: {
                          width: [1, 4, 4],
                        },
                        xaxis: {
                          labels: {
                            rotate: -45,
                          },
                          categories: [
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
                        },
                        yaxis: [
                          {
                            axisTicks: {
                              show: true,
                            },
                            axisBorder: {
                              show: true,
                              color: "#008FFB",
                            },
                            labels: {
                              style: {
                                colors: "#008FFB",
                              },
                            },
                            title: {
                              text: "Production (pcs)",
                              style: {
                                color: "#008FFB",
                                fontSize: "18px",
                                fontWeight: 500,
                              },
                            },
                            tooltip: {
                              enabled: true,
                            },
                            min: this.state.scal_min,
                            max: this.state.dataMax, //dataBox.scal_max,
                          },
                          {
                            axisTicks: {
                              show: false,
                            },
                            axisBorder: {
                              show: false,
                              color: "#FF3B3B",
                            },
                            labels: {
                              show: false,
                              style: {
                                colors: "#FF3B3B",
                              },
                            },
                            // title: {
                            //   show:true,
                            //   text: "",
                            //   style: {
                            //   color: "#FF3B3B",
                            //     fontSize: "18px",
                            //     fontWeight: 500,
                            //   },
                            // },
                            // tooltip: {
                            //   enabled: true,
                            // },
                            min: this.state.scal_min,
                            max: this.state.dataMax, //dataBox.scal_max,
                          },
                          {
                            seriesName: "Yield rate",
                            opposite: true,
                            min: this.state.scal_min_YR,
                            max: this.state.scal_max_YR,
                            axisTicks: {
                              show: true,
                            },
                            axisBorder: {
                              show: true,
                              color: "#14D91A",
                            },
                            labels: {
                              style: {
                                colors: "#14D91A",
                              },
                            },
                            title: {
                              text: "Yield Rate (%)",
                              style: {
                                show: true,
                                color: "#14D91A",
                                fontSize: "18px",
                                fontWeight: 500,
                              },
                            },
                          },
                        ],
                        tooltip: {
                          fixed: {
                            enabled: false,
                            position: "topLeft", // topRight, topLeft, bottomRight, bottomLeft
                            offsetY: 30,
                            offsetX: 60,
                          },
                        },
                        legend: {
                          horizontalAlign: "center",
                          offsetX: 40,
                        },
                      }}
                      series={this.state.data_MD20}
                      type="line"
                      height={300}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card">
                <h5 className="card-header"> MBR_MD21</h5>
                <div className="card-body" style={{ padding: "0rem" }}>
                  <div id="chart" style={{ padding: "0rem" }}>
                    <ReactApexChart
                      options={{
                        chart: {
                          height: 350,
                          type: "line",
                          stacked: false,
                        },
                        colors: [
                          "rgb(0, 143, 251)",
                          "#FF3B3B",
                          "#14D91A",
                          "#FF8ED6",
                          "#936BDE",
                          "#A73970",
                        ],

                        dataLabels: {
                          enabled: true,
                        },
                        stroke: {
                          width: [1, 4, 4],
                        },
                        xaxis: {
                          labels: {
                            rotate: -45,
                          },
                          categories: [
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
                        },
                        yaxis: [
                          {
                            axisTicks: {
                              show: true,
                            },
                            axisBorder: {
                              show: true,
                              color: "#008FFB",
                            },
                            labels: {
                              style: {
                                colors: "#008FFB",
                              },
                            },
                            title: {
                              text: "Production (pcs)",
                              style: {
                                color: "#008FFB",
                                fontSize: "18px",
                                fontWeight: 500,
                              },
                            },
                            tooltip: {
                              enabled: true,
                            },
                            min: this.state.scal_min,
                            max: this.state.dataMax, //dataBox.scal_max,
                          },
                          {
                            axisTicks: {
                              show: false,
                            },
                            axisBorder: {
                              show: false,
                              color: "#FF3B3B",
                            },
                            labels: {
                              show: false,
                              style: {
                                colors: "#FF3B3B",
                              },
                            },
                            // title: {
                            //   show:true,
                            //   text: "",
                            //   style: {
                            //   color: "#FF3B3B",
                            //     fontSize: "18px",
                            //     fontWeight: 500,
                            //   },
                            // },
                            // tooltip: {
                            //   enabled: true,
                            // },
                            min: this.state.scal_min,
                            max: this.state.dataMax, //dataBox.scal_max,
                          },
                          {
                            seriesName: "Yield rate",
                            opposite: true,
                            min: this.state.scal_min_YR,
                            max: this.state.scal_max_YR,
                            axisTicks: {
                              show: true,
                            },
                            axisBorder: {
                              show: true,
                              color: "#14D91A",
                            },
                            labels: {
                              style: {
                                colors: "#14D91A",
                              },
                            },
                            title: {
                              text: "Yield Rate (%)",
                              style: {
                                show: true,
                                color: "#14D91A",
                                fontSize: "18px",
                                fontWeight: 500,
                              },
                            },
                          },
                        ],
                        tooltip: {
                          fixed: {
                            enabled: false,
                            position: "topLeft", // topRight, topLeft, bottomRight, bottomLeft
                            offsetY: 30,
                            offsetX: 60,
                          },
                        },
                        legend: {
                          horizontalAlign: "center",
                          offsetX: 40,
                        },
                      }}
                      series={this.state.data_MD21}
                      type="line"
                      height={300}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* 9 */}
          <div
            className="row justify-content-start"
            style={{ paddingTop: "15px" }}
          >
            <div className="col-lg-4">
              <div className="card">
                <h5 className="card-header"> MBR_MD22</h5>
                <div className="card-body" style={{ padding: "0rem" }}>
                  <div id="chart" style={{ padding: "0rem" }}>
                    <ReactApexChart
                      options={{
                        chart: {
                          height: 350,
                          type: "line",
                          stacked: false,
                        },
                        colors: [
                          "rgb(0, 143, 251)",
                          "#FF3B3B",
                          "#14D91A",
                          "#FF8ED6",
                          "#936BDE",
                          "#A73970",
                        ],

                        dataLabels: {
                          enabled: true,
                        },
                        stroke: {
                          width: [1, 4, 4],
                        },
                        xaxis: {
                          labels: {
                            rotate: -45,
                          },
                          categories: [
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
                        },
                        yaxis: [
                          {
                            axisTicks: {
                              show: true,
                            },
                            axisBorder: {
                              show: true,
                              color: "#008FFB",
                            },
                            labels: {
                              style: {
                                colors: "#008FFB",
                              },
                            },
                            title: {
                              text: "Production (pcs)",
                              style: {
                                color: "#008FFB",
                                fontSize: "18px",
                                fontWeight: 500,
                              },
                            },
                            tooltip: {
                              enabled: true,
                            },
                            min: this.state.scal_min,
                            max: this.state.dataMax, //dataBox.scal_max,
                          },
                          {
                            axisTicks: {
                              show: false,
                            },
                            axisBorder: {
                              show: false,
                              color: "#FF3B3B",
                            },
                            labels: {
                              show: false,
                              style: {
                                colors: "#FF3B3B",
                              },
                            },
                            // title: {
                            //   show:true,
                            //   text: "",
                            //   style: {
                            //   color: "#FF3B3B",
                            //     fontSize: "18px",
                            //     fontWeight: 500,
                            //   },
                            // },
                            // tooltip: {
                            //   enabled: true,
                            // },
                            min: this.state.scal_min,
                            max: this.state.dataMax, //dataBox.scal_max,
                          },
                          {
                            seriesName: "Yield rate",
                            opposite: true,
                            min: this.state.scal_min_YR,
                            max: this.state.scal_max_YR,
                            axisTicks: {
                              show: true,
                            },
                            axisBorder: {
                              show: true,
                              color: "#14D91A",
                            },
                            labels: {
                              style: {
                                colors: "#14D91A",
                              },
                            },
                            title: {
                              text: "Yield Rate (%)",
                              style: {
                                show: true,
                                color: "#14D91A",
                                fontSize: "18px",
                                fontWeight: 500,
                              },
                            },
                          },
                        ],
                        tooltip: {
                          fixed: {
                            enabled: false,
                            position: "topLeft", // topRight, topLeft, bottomRight, bottomLeft
                            offsetY: 30,
                            offsetX: 60,
                          },
                        },
                        legend: {
                          horizontalAlign: "center",
                          offsetX: 40,
                        },
                      }}
                      series={this.state.data_MD23}
                      type="line"
                      height={300}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card">
                <h5 className="card-header"> MBR_MD24</h5>
                <div className="card-body" style={{ padding: "0rem" }}>
                  <div id="chart" style={{ padding: "0rem" }}>
                    <ReactApexChart
                      options={{
                        chart: {
                          height: 350,
                          type: "line",
                          stacked: false,
                        },
                        colors: [
                          "rgb(0, 143, 251)",
                          "#FF3B3B",
                          "#14D91A",
                          "#FF8ED6",
                          "#936BDE",
                          "#A73970",
                        ],

                        dataLabels: {
                          enabled: true,
                        },
                        stroke: {
                          width: [1, 4, 4],
                        },
                        xaxis: {
                          labels: {
                            rotate: -45,
                          },
                          categories: [
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
                        },
                        yaxis: [
                          {
                            axisTicks: {
                              show: true,
                            },
                            axisBorder: {
                              show: true,
                              color: "#008FFB",
                            },
                            labels: {
                              style: {
                                colors: "#008FFB",
                              },
                            },
                            title: {
                              text: "Production (pcs)",
                              style: {
                                color: "#008FFB",
                                fontSize: "18px",
                                fontWeight: 500,
                              },
                            },
                            tooltip: {
                              enabled: true,
                            },
                            min: this.state.scal_min,
                            max: this.state.dataMax, //dataBox.scal_max,
                          },
                          {
                            axisTicks: {
                              show: false,
                            },
                            axisBorder: {
                              show: false,
                              color: "#FF3B3B",
                            },
                            labels: {
                              show: false,
                              style: {
                                colors: "#FF3B3B",
                              },
                            },
                            // title: {
                            //   show:true,
                            //   text: "",
                            //   style: {
                            //   color: "#FF3B3B",
                            //     fontSize: "18px",
                            //     fontWeight: 500,
                            //   },
                            // },
                            // tooltip: {
                            //   enabled: true,
                            // },
                            min: this.state.scal_min,
                            max: this.state.dataMax, //dataBox.scal_max,
                          },
                          {
                            seriesName: "Yield rate",
                            opposite: true,
                            min: this.state.scal_min_YR,
                            max: this.state.scal_max_YR,
                            axisTicks: {
                              show: true,
                            },
                            axisBorder: {
                              show: true,
                              color: "#14D91A",
                            },
                            labels: {
                              style: {
                                colors: "#14D91A",
                              },
                            },
                            title: {
                              text: "Yield Rate (%)",
                              style: {
                                show: true,
                                color: "#14D91A",
                                fontSize: "18px",
                                fontWeight: 500,
                              },
                            },
                          },
                        ],
                        tooltip: {
                          fixed: {
                            enabled: false,
                            position: "topLeft", // topRight, topLeft, bottomRight, bottomLeft
                            offsetY: 30,
                            offsetX: 60,
                          },
                        },
                        legend: {
                          horizontalAlign: "center",
                          offsetX: 40,
                        },
                      }}
                      series={this.state.data_MD24}
                      type="line"
                      height={300}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card">
                <h5 className="card-header"> MBR_MD25</h5>
                <div className="card-body" style={{ padding: "0rem" }}>
                  <div id="chart" style={{ padding: "0rem" }}>
                    <ReactApexChart
                      options={{
                        chart: {
                          height: 350,
                          type: "line",
                          stacked: false,
                        },
                        colors: [
                          "rgb(0, 143, 251)",
                          "#FF3B3B",
                          "#14D91A",
                          "#FF8ED6",
                          "#936BDE",
                          "#A73970",
                        ],

                        dataLabels: {
                          enabled: true,
                        },
                        stroke: {
                          width: [1, 4, 4],
                        },
                        xaxis: {
                          labels: {
                            rotate: -45,
                          },
                          categories: [
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
                        },
                        yaxis: [
                          {
                            axisTicks: {
                              show: true,
                            },
                            axisBorder: {
                              show: true,
                              color: "#008FFB",
                            },
                            labels: {
                              style: {
                                colors: "#008FFB",
                              },
                            },
                            title: {
                              text: "Production (pcs)",
                              style: {
                                color: "#008FFB",
                                fontSize: "18px",
                                fontWeight: 500,
                              },
                            },
                            tooltip: {
                              enabled: true,
                            },
                            min: this.state.scal_min,
                            max: this.state.dataMax, //dataBox.scal_max,
                          },
                          {
                            axisTicks: {
                              show: false,
                            },
                            axisBorder: {
                              show: false,
                              color: "#FF3B3B",
                            },
                            labels: {
                              show: false,
                              style: {
                                colors: "#FF3B3B",
                              },
                            },
                            // title: {
                            //   show:true,
                            //   text: "",
                            //   style: {
                            //   color: "#FF3B3B",
                            //     fontSize: "18px",
                            //     fontWeight: 500,
                            //   },
                            // },
                            // tooltip: {
                            //   enabled: true,
                            // },
                            min: this.state.scal_min,
                            max: this.state.dataMax, //dataBox.scal_max,
                          },
                          {
                            seriesName: "Yield rate",
                            opposite: true,
                            min: this.state.scal_min_YR,
                            max: this.state.scal_max_YR,
                            axisTicks: {
                              show: true,
                            },
                            axisBorder: {
                              show: true,
                              color: "#14D91A",
                            },
                            labels: {
                              style: {
                                colors: "#14D91A",
                              },
                            },
                            title: {
                              text: "Yield Rate (%)",
                              style: {
                                show: true,
                                color: "#14D91A",
                                fontSize: "18px",
                                fontWeight: 500,
                              },
                            },
                          },
                        ],
                        tooltip: {
                          fixed: {
                            enabled: false,
                            position: "topLeft", // topRight, topLeft, bottomRight, bottomLeft
                            offsetY: 30,
                            offsetX: 60,
                          },
                        },
                        legend: {
                          horizontalAlign: "center",
                          offsetX: 40,
                        },
                      }}
                      series={this.state.data_MD25}
                      type="line"
                      height={300}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* 10 */}
          <div
            className="row justify-content-start"
            style={{ paddingTop: "15px" }}
          >
            <div className="col-lg-4">
              <div className="card">
                <h5 className="card-header"> MBR_MD26</h5>
                <div className="card-body" style={{ padding: "0rem" }}>
                  <div id="chart" style={{ padding: "0rem" }}>
                    <ReactApexChart
                      options={{
                        chart: {
                          height: 350,
                          type: "line",
                          stacked: false,
                        },
                        colors: [
                          "rgb(0, 143, 251)",
                          "#FF3B3B",
                          "#14D91A",
                          "#FF8ED6",
                          "#936BDE",
                          "#A73970",
                        ],

                        dataLabels: {
                          enabled: true,
                        },
                        stroke: {
                          width: [1, 4, 4],
                        },
                        xaxis: {
                          labels: {
                            rotate: -45,
                          },
                          categories: [
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
                        },
                        yaxis: [
                          {
                            axisTicks: {
                              show: true,
                            },
                            axisBorder: {
                              show: true,
                              color: "#008FFB",
                            },
                            labels: {
                              style: {
                                colors: "#008FFB",
                              },
                            },
                            title: {
                              text: "Production (pcs)",
                              style: {
                                color: "#008FFB",
                                fontSize: "18px",
                                fontWeight: 500,
                              },
                            },
                            tooltip: {
                              enabled: true,
                            },
                            min: this.state.scal_min,
                            max: this.state.dataMax, //dataBox.scal_max,
                          },
                          {
                            axisTicks: {
                              show: false,
                            },
                            axisBorder: {
                              show: false,
                              color: "#FF3B3B",
                            },
                            labels: {
                              show: false,
                              style: {
                                colors: "#FF3B3B",
                              },
                            },
                            // title: {
                            //   show:true,
                            //   text: "",
                            //   style: {
                            //   color: "#FF3B3B",
                            //     fontSize: "18px",
                            //     fontWeight: 500,
                            //   },
                            // },
                            // tooltip: {
                            //   enabled: true,
                            // },
                            min: this.state.scal_min,
                            max: this.state.dataMax, //dataBox.scal_max,
                          },
                          {
                            seriesName: "Yield rate",
                            opposite: true,
                            min: this.state.scal_min_YR,
                            max: this.state.scal_max_YR,
                            axisTicks: {
                              show: true,
                            },
                            axisBorder: {
                              show: true,
                              color: "#14D91A",
                            },
                            labels: {
                              style: {
                                colors: "#14D91A",
                              },
                            },
                            title: {
                              text: "Yield Rate (%)",
                              style: {
                                show: true,
                                color: "#14D91A",
                                fontSize: "18px",
                                fontWeight: 500,
                              },
                            },
                          },
                        ],
                        tooltip: {
                          fixed: {
                            enabled: false,
                            position: "topLeft", // topRight, topLeft, bottomRight, bottomLeft
                            offsetY: 30,
                            offsetX: 60,
                          },
                        },
                        legend: {
                          horizontalAlign: "center",
                          offsetX: 40,
                        },
                      }}
                      series={this.state.data_MD26}
                      type="line"
                      height={300}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card">
                <h5 className="card-header"> MBR_MD27</h5>
                <div className="card-body" style={{ padding: "0rem" }}>
                  <div id="chart" style={{ padding: "0rem" }}>
                    <ReactApexChart
                      options={{
                        chart: {
                          height: 350,
                          type: "line",
                          stacked: false,
                        },
                        colors: [
                          "rgb(0, 143, 251)",
                          "#FF3B3B",
                          "#14D91A",
                          "#FF8ED6",
                          "#936BDE",
                          "#A73970",
                        ],

                        dataLabels: {
                          enabled: true,
                        },
                        stroke: {
                          width: [1, 4, 4],
                        },
                        xaxis: {
                          labels: {
                            rotate: -45,
                          },
                          categories: [
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
                        },
                        yaxis: [
                          {
                            axisTicks: {
                              show: true,
                            },
                            axisBorder: {
                              show: true,
                              color: "#008FFB",
                            },
                            labels: {
                              style: {
                                colors: "#008FFB",
                              },
                            },
                            title: {
                              text: "Production (pcs)",
                              style: {
                                color: "#008FFB",
                                fontSize: "18px",
                                fontWeight: 500,
                              },
                            },
                            tooltip: {
                              enabled: true,
                            },
                            min: this.state.scal_min,
                            max: this.state.dataMax, //dataBox.scal_max,
                          },
                          {
                            axisTicks: {
                              show: false,
                            },
                            axisBorder: {
                              show: false,
                              color: "#FF3B3B",
                            },
                            labels: {
                              show: false,
                              style: {
                                colors: "#FF3B3B",
                              },
                            },
                            // title: {
                            //   show:true,
                            //   text: "",
                            //   style: {
                            //   color: "#FF3B3B",
                            //     fontSize: "18px",
                            //     fontWeight: 500,
                            //   },
                            // },
                            // tooltip: {
                            //   enabled: true,
                            // },
                            min: this.state.scal_min,
                            max: this.state.dataMax, //dataBox.scal_max,
                          },
                          {
                            seriesName: "Yield rate",
                            opposite: true,
                            min: this.state.scal_min_YR,
                            max: this.state.scal_max_YR,
                            axisTicks: {
                              show: true,
                            },
                            axisBorder: {
                              show: true,
                              color: "#14D91A",
                            },
                            labels: {
                              style: {
                                colors: "#14D91A",
                              },
                            },
                            title: {
                              text: "Yield Rate (%)",
                              style: {
                                show: true,
                                color: "#14D91A",
                                fontSize: "18px",
                                fontWeight: 500,
                              },
                            },
                          },
                        ],
                        tooltip: {
                          fixed: {
                            enabled: false,
                            position: "topLeft", // topRight, topLeft, bottomRight, bottomLeft
                            offsetY: 30,
                            offsetX: 60,
                          },
                        },
                        legend: {
                          horizontalAlign: "center",
                          offsetX: 40,
                        },
                      }}
                      series={this.state.data_MD27}
                      type="line"
                      height={300}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card">
                <h5 className="card-header"> MBR_MD28</h5>
                <div className="card-body" style={{ padding: "0rem" }}>
                  <div id="chart" style={{ padding: "0rem" }}>
                    <ReactApexChart
                      options={{
                        chart: {
                          height: 350,
                          type: "line",
                          stacked: false,
                        },
                        colors: [
                          "rgb(0, 143, 251)",
                          "#FF3B3B",
                          "#14D91A",
                          "#FF8ED6",
                          "#936BDE",
                          "#A73970",
                        ],

                        dataLabels: {
                          enabled: true,
                        },
                        stroke: {
                          width: [1, 4, 4],
                        },
                        xaxis: {
                          labels: {
                            rotate: -45,
                          },
                          categories: [
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
                        },
                        yaxis: [
                          {
                            axisTicks: {
                              show: true,
                            },
                            axisBorder: {
                              show: true,
                              color: "#008FFB",
                            },
                            labels: {
                              style: {
                                colors: "#008FFB",
                              },
                            },
                            title: {
                              text: "Production (pcs)",
                              style: {
                                color: "#008FFB",
                                fontSize: "18px",
                                fontWeight: 500,
                              },
                            },
                            tooltip: {
                              enabled: true,
                            },
                            min: this.state.scal_min,
                            max: this.state.dataMax, //dataBox.scal_max,
                          },
                          {
                            axisTicks: {
                              show: false,
                            },
                            axisBorder: {
                              show: false,
                              color: "#FF3B3B",
                            },
                            labels: {
                              show: false,
                              style: {
                                colors: "#FF3B3B",
                              },
                            },
                            // title: {
                            //   show:true,
                            //   text: "",
                            //   style: {
                            //   color: "#FF3B3B",
                            //     fontSize: "18px",
                            //     fontWeight: 500,
                            //   },
                            // },
                            // tooltip: {
                            //   enabled: true,
                            // },
                            min: this.state.scal_min,
                            max: this.state.dataMax, //dataBox.scal_max,
                          },
                          {
                            seriesName: "Yield rate",
                            opposite: true,
                            min: this.state.scal_min_YR,
                            max: this.state.scal_max_YR,
                            axisTicks: {
                              show: true,
                            },
                            axisBorder: {
                              show: true,
                              color: "#14D91A",
                            },
                            labels: {
                              style: {
                                colors: "#14D91A",
                              },
                            },
                            title: {
                              text: "Yield Rate (%)",
                              style: {
                                show: true,
                                color: "#14D91A",
                                fontSize: "18px",
                                fontWeight: 500,
                              },
                            },
                          },
                        ],
                        tooltip: {
                          fixed: {
                            enabled: false,
                            position: "topLeft", // topRight, topLeft, bottomRight, bottomLeft
                            offsetY: 30,
                            offsetX: 60,
                          },
                        },
                        legend: {
                          horizontalAlign: "center",
                          offsetX: 40,
                        },
                      }}
                      series={this.state.data_MD28}
                      type="line"
                      height={300}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* 11 */}
          <div
            className="row justify-content-start"
            style={{ paddingTop: "15px" }}
          >
            <div className="col-lg-4">
              <div className="card">
                <h5 className="card-header"> MBR_MD29</h5>
                <div className="card-body" style={{ padding: "0rem" }}>
                  <div id="chart" style={{ padding: "0rem" }}>
                    <ReactApexChart
                      options={{
                        chart: {
                          height: 350,
                          type: "line",
                          stacked: false,
                        },
                        colors: [
                          "rgb(0, 143, 251)",
                          "#FF3B3B",
                          "#14D91A",
                          "#FF8ED6",
                          "#936BDE",
                          "#A73970",
                        ],

                        dataLabels: {
                          enabled: true,
                        },
                        stroke: {
                          width: [1, 4, 4],
                        },
                        xaxis: {
                          labels: {
                            rotate: -45,
                          },
                          categories: [
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
                        },
                        yaxis: [
                          {
                            axisTicks: {
                              show: true,
                            },
                            axisBorder: {
                              show: true,
                              color: "#008FFB",
                            },
                            labels: {
                              style: {
                                colors: "#008FFB",
                              },
                            },
                            title: {
                              text: "Production (pcs)",
                              style: {
                                color: "#008FFB",
                                fontSize: "18px",
                                fontWeight: 500,
                              },
                            },
                            tooltip: {
                              enabled: true,
                            },
                            min: this.state.scal_min,
                            max: this.state.dataMax, //dataBox.scal_max,
                          },
                          {
                            axisTicks: {
                              show: false,
                            },
                            axisBorder: {
                              show: false,
                              color: "#FF3B3B",
                            },
                            labels: {
                              show: false,
                              style: {
                                colors: "#FF3B3B",
                              },
                            },
                            // title: {
                            //   show:true,
                            //   text: "",
                            //   style: {
                            //   color: "#FF3B3B",
                            //     fontSize: "18px",
                            //     fontWeight: 500,
                            //   },
                            // },
                            // tooltip: {
                            //   enabled: true,
                            // },
                            min: this.state.scal_min,
                            max: this.state.dataMax, //dataBox.scal_max,
                          },
                          {
                            seriesName: "Yield rate",
                            opposite: true,
                            min: this.state.scal_min_YR,
                            max: this.state.scal_max_YR,
                            axisTicks: {
                              show: true,
                            },
                            axisBorder: {
                              show: true,
                              color: "#14D91A",
                            },
                            labels: {
                              style: {
                                colors: "#14D91A",
                              },
                            },
                            title: {
                              text: "Yield Rate (%)",
                              style: {
                                show: true,
                                color: "#14D91A",
                                fontSize: "18px",
                                fontWeight: 500,
                              },
                            },
                          },
                        ],
                        tooltip: {
                          fixed: {
                            enabled: false,
                            position: "topLeft", // topRight, topLeft, bottomRight, bottomLeft
                            offsetY: 30,
                            offsetX: 60,
                          },
                        },
                        legend: {
                          horizontalAlign: "center",
                          offsetX: 40,
                        },
                      }}
                      series={this.state.data_MD29}
                      type="line"
                      height={300}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card">
                <h5 className="card-header"> MBR_MD30</h5>
                <div className="card-body" style={{ padding: "0rem" }}>
                  <div id="chart" style={{ padding: "0rem" }}>
                    <ReactApexChart
                      options={{
                        chart: {
                          height: 350,
                          type: "line",
                          stacked: false,
                        },
                        colors: [
                          "rgb(0, 143, 251)",
                          "#FF3B3B",
                          "#14D91A",
                          "#FF8ED6",
                          "#936BDE",
                          "#A73970",
                        ],

                        dataLabels: {
                          enabled: true,
                        },
                        stroke: {
                          width: [1, 4, 4],
                        },
                        xaxis: {
                          labels: {
                            rotate: -45,
                          },
                          categories: [
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
                        },
                        yaxis: [
                          {
                            axisTicks: {
                              show: true,
                            },
                            axisBorder: {
                              show: true,
                              color: "#008FFB",
                            },
                            labels: {
                              style: {
                                colors: "#008FFB",
                              },
                            },
                            title: {
                              text: "Production (pcs)",
                              style: {
                                color: "#008FFB",
                                fontSize: "18px",
                                fontWeight: 500,
                              },
                            },
                            tooltip: {
                              enabled: true,
                            },
                            min: this.state.scal_min,
                            max: this.state.dataMax, //dataBox.scal_max,
                          },
                          {
                            axisTicks: {
                              show: false,
                            },
                            axisBorder: {
                              show: false,
                              color: "#FF3B3B",
                            },
                            labels: {
                              show: false,
                              style: {
                                colors: "#FF3B3B",
                              },
                            },
                            // title: {
                            //   show:true,
                            //   text: "",
                            //   style: {
                            //   color: "#FF3B3B",
                            //     fontSize: "18px",
                            //     fontWeight: 500,
                            //   },
                            // },
                            // tooltip: {
                            //   enabled: true,
                            // },
                            min: this.state.scal_min,
                            max: this.state.dataMax, //dataBox.scal_max,
                          },
                          {
                            seriesName: "Yield rate",
                            opposite: true,
                            min: this.state.scal_min_YR,
                            max: this.state.scal_max_YR,
                            axisTicks: {
                              show: true,
                            },
                            axisBorder: {
                              show: true,
                              color: "#14D91A",
                            },
                            labels: {
                              style: {
                                colors: "#14D91A",
                              },
                            },
                            title: {
                              text: "Yield Rate (%)",
                              style: {
                                show: true,
                                color: "#14D91A",
                                fontSize: "18px",
                                fontWeight: 500,
                              },
                            },
                          },
                        ],
                        tooltip: {
                          fixed: {
                            enabled: false,
                            position: "topLeft", // topRight, topLeft, bottomRight, bottomLeft
                            offsetY: 30,
                            offsetX: 60,
                          },
                        },
                        legend: {
                          horizontalAlign: "center",
                          offsetX: 40,
                        },
                      }}
                      series={this.state.data_MD30}
                      type="line"
                      height={300}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card">
                <h5 className="card-header"> MBR_MD31</h5>
                <div className="card-body" style={{ padding: "0rem" }}>
                  <div id="chart" style={{ padding: "0rem" }}>
                    <ReactApexChart
                      options={{
                        chart: {
                          height: 350,
                          type: "line",
                          stacked: false,
                        },
                        colors: [
                          "rgb(0, 143, 251)",
                          "#FF3B3B",
                          "#14D91A",
                          "#FF8ED6",
                          "#936BDE",
                          "#A73970",
                        ],

                        dataLabels: {
                          enabled: true,
                        },
                        stroke: {
                          width: [1, 4, 4],
                        },
                        xaxis: {
                          labels: {
                            rotate: -45,
                          },
                          categories: [
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
                        },
                        yaxis: [
                          {
                            axisTicks: {
                              show: true,
                            },
                            axisBorder: {
                              show: true,
                              color: "#008FFB",
                            },
                            labels: {
                              style: {
                                colors: "#008FFB",
                              },
                            },
                            title: {
                              text: "Production (pcs)",
                              style: {
                                color: "#008FFB",
                                fontSize: "18px",
                                fontWeight: 500,
                              },
                            },
                            tooltip: {
                              enabled: true,
                            },
                            min: this.state.scal_min,
                            max: this.state.dataMax, //dataBox.scal_max,
                          },
                          {
                            axisTicks: {
                              show: false,
                            },
                            axisBorder: {
                              show: false,
                              color: "#FF3B3B",
                            },
                            labels: {
                              show: false,
                              style: {
                                colors: "#FF3B3B",
                              },
                            },
                            // title: {
                            //   show:true,
                            //   text: "",
                            //   style: {
                            //   color: "#FF3B3B",
                            //     fontSize: "18px",
                            //     fontWeight: 500,
                            //   },
                            // },
                            // tooltip: {
                            //   enabled: true,
                            // },
                            min: this.state.scal_min,
                            max: this.state.dataMax, //dataBox.scal_max,
                          },
                          {
                            seriesName: "Yield rate",
                            opposite: true,
                            min: this.state.scal_min_YR,
                            max: this.state.scal_max_YR,
                            axisTicks: {
                              show: true,
                            },
                            axisBorder: {
                              show: true,
                              color: "#14D91A",
                            },
                            labels: {
                              style: {
                                colors: "#14D91A",
                              },
                            },
                            title: {
                              text: "Yield Rate (%)",
                              style: {
                                show: true,
                                color: "#14D91A",
                                fontSize: "18px",
                                fontWeight: 500,
                              },
                            },
                          },
                        ],
                        tooltip: {
                          fixed: {
                            enabled: false,
                            position: "topLeft", // topRight, topLeft, bottomRight, bottomLeft
                            offsetY: 30,
                            offsetX: 60,
                          },
                        },
                        legend: {
                          horizontalAlign: "center",
                          offsetX: 40,
                        },
                      }}
                      series={this.state.data_MD31}
                      type="line"
                      height={300}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* 12 */}
          <div
            className="row justify-content-start"
            style={{ paddingTop: "15px" }}
          >
            <div className="col-lg-4">
              <div className="card">
                <h5 className="card-header"> MBR_MD32</h5>
                <div className="card-body" style={{ padding: "0rem" }}>
                  <div id="chart" style={{ padding: "0rem" }}>
                    <ReactApexChart
                      options={{
                        chart: {
                          height: 350,
                          type: "line",
                          stacked: false,
                        },
                        colors: [
                          "rgb(0, 143, 251)",
                          "#FF3B3B",
                          "#14D91A",
                          "#FF8ED6",
                          "#936BDE",
                          "#A73970",
                        ],

                        dataLabels: {
                          enabled: true,
                        },
                        stroke: {
                          width: [1, 4, 4],
                        },
                        xaxis: {
                          labels: {
                            rotate: -45,
                          },
                          categories: [
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
                        },
                        yaxis: [
                          {
                            axisTicks: {
                              show: true,
                            },
                            axisBorder: {
                              show: true,
                              color: "#008FFB",
                            },
                            labels: {
                              style: {
                                colors: "#008FFB",
                              },
                            },
                            title: {
                              text: "Production (pcs)",
                              style: {
                                color: "#008FFB",
                                fontSize: "18px",
                                fontWeight: 500,
                              },
                            },
                            tooltip: {
                              enabled: true,
                            },
                            min: this.state.scal_min,
                            max: this.state.dataMax, //dataBox.scal_max,
                          },
                          {
                            axisTicks: {
                              show: false,
                            },
                            axisBorder: {
                              show: false,
                              color: "#FF3B3B",
                            },
                            labels: {
                              show: false,
                              style: {
                                colors: "#FF3B3B",
                              },
                            },
                            // title: {
                            //   show:true,
                            //   text: "",
                            //   style: {
                            //   color: "#FF3B3B",
                            //     fontSize: "18px",
                            //     fontWeight: 500,
                            //   },
                            // },
                            // tooltip: {
                            //   enabled: true,
                            // },
                            min: this.state.scal_min,
                            max: this.state.dataMax, //dataBox.scal_max,
                          },
                          {
                            seriesName: "Yield rate",
                            opposite: true,
                            min: this.state.scal_min_YR,
                            max: this.state.scal_max_YR,
                            axisTicks: {
                              show: true,
                            },
                            axisBorder: {
                              show: true,
                              color: "#14D91A",
                            },
                            labels: {
                              style: {
                                colors: "#14D91A",
                              },
                            },
                            title: {
                              text: "Yield Rate (%)",
                              style: {
                                show: true,
                                color: "#14D91A",
                                fontSize: "18px",
                                fontWeight: 500,
                              },
                            },
                          },
                        ],
                        tooltip: {
                          fixed: {
                            enabled: false,
                            position: "topLeft", // topRight, topLeft, bottomRight, bottomLeft
                            offsetY: 30,
                            offsetX: 60,
                          },
                        },
                        legend: {
                          horizontalAlign: "center",
                          offsetX: 40,
                        },
                      }}
                      series={this.state.data_MD32}
                      type="line"
                      height={300}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card">
                <h5 className="card-header"> MBR_MD33</h5>
                <div className="card-body" style={{ padding: "0rem" }}>
                  <div id="chart" style={{ padding: "0rem" }}>
                    <ReactApexChart
                      options={{
                        chart: {
                          height: 350,
                          type: "line",
                          stacked: false,
                        },
                        colors: [
                          "rgb(0, 143, 251)",
                          "#FF3B3B",
                          "#14D91A",
                          "#FF8ED6",
                          "#936BDE",
                          "#A73970",
                        ],

                        dataLabels: {
                          enabled: true,
                        },
                        stroke: {
                          width: [1, 4, 4],
                        },
                        xaxis: {
                          labels: {
                            rotate: -45,
                          },
                          categories: [
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
                        },
                        yaxis: [
                          {
                            axisTicks: {
                              show: true,
                            },
                            axisBorder: {
                              show: true,
                              color: "#008FFB",
                            },
                            labels: {
                              style: {
                                colors: "#008FFB",
                              },
                            },
                            title: {
                              text: "Production (pcs)",
                              style: {
                                color: "#008FFB",
                                fontSize: "18px",
                                fontWeight: 500,
                              },
                            },
                            tooltip: {
                              enabled: true,
                            },
                            min: this.state.scal_min,
                            max: this.state.dataMax, //dataBox.scal_max,
                          },
                          {
                            axisTicks: {
                              show: false,
                            },
                            axisBorder: {
                              show: false,
                              color: "#FF3B3B",
                            },
                            labels: {
                              show: false,
                              style: {
                                colors: "#FF3B3B",
                              },
                            },
                            // title: {
                            //   show:true,
                            //   text: "",
                            //   style: {
                            //   color: "#FF3B3B",
                            //     fontSize: "18px",
                            //     fontWeight: 500,
                            //   },
                            // },
                            // tooltip: {
                            //   enabled: true,
                            // },
                            min: this.state.scal_min,
                            max: this.state.dataMax, //dataBox.scal_max,
                          },
                          {
                            seriesName: "Yield rate",
                            opposite: true,
                            min: this.state.scal_min_YR,
                            max: this.state.scal_max_YR,
                            axisTicks: {
                              show: true,
                            },
                            axisBorder: {
                              show: true,
                              color: "#14D91A",
                            },
                            labels: {
                              style: {
                                colors: "#14D91A",
                              },
                            },
                            title: {
                              text: "Yield Rate (%)",
                              style: {
                                show: true,
                                color: "#14D91A",
                                fontSize: "18px",
                                fontWeight: 500,
                              },
                            },
                          },
                        ],
                        tooltip: {
                          fixed: {
                            enabled: false,
                            position: "topLeft", // topRight, topLeft, bottomRight, bottomLeft
                            offsetY: 30,
                            offsetX: 60,
                          },
                        },
                        legend: {
                          horizontalAlign: "center",
                          offsetX: 40,
                        },
                      }}
                      series={this.state.data_MD33}
                      type="line"
                      height={300}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card">
                <h5 className="card-header"> MBR_MD34</h5>
                <div className="card-body" style={{ padding: "0rem" }}>
                  <div id="chart" style={{ padding: "0rem" }}>
                    <ReactApexChart
                      options={{
                        chart: {
                          height: 350,
                          type: "line",
                          stacked: false,
                        },
                        colors: [
                          "rgb(0, 143, 251)",
                          "#FF3B3B",
                          "#14D91A",
                          "#FF8ED6",
                          "#936BDE",
                          "#A73970",
                        ],

                        dataLabels: {
                          enabled: true,
                        },
                        stroke: {
                          width: [1, 4, 4],
                        },
                        xaxis: {
                          labels: {
                            rotate: -45,
                          },
                          categories: [
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
                        },
                        yaxis: [
                          {
                            axisTicks: {
                              show: true,
                            },
                            axisBorder: {
                              show: true,
                              color: "#008FFB",
                            },
                            labels: {
                              style: {
                                colors: "#008FFB",
                              },
                            },
                            title: {
                              text: "Production (pcs)",
                              style: {
                                color: "#008FFB",
                                fontSize: "18px",
                                fontWeight: 500,
                              },
                            },
                            tooltip: {
                              enabled: true,
                            },
                            min: this.state.scal_min,
                            max: this.state.dataMax, //dataBox.scal_max,
                          },
                          {
                            axisTicks: {
                              show: false,
                            },
                            axisBorder: {
                              show: false,
                              color: "#FF3B3B",
                            },
                            labels: {
                              show: false,
                              style: {
                                colors: "#FF3B3B",
                              },
                            },
                            // title: {
                            //   show:true,
                            //   text: "",
                            //   style: {
                            //   color: "#FF3B3B",
                            //     fontSize: "18px",
                            //     fontWeight: 500,
                            //   },
                            // },
                            // tooltip: {
                            //   enabled: true,
                            // },
                            min: this.state.scal_min,
                            max: this.state.dataMax, //dataBox.scal_max,
                          },
                          {
                            seriesName: "Yield rate",
                            opposite: true,
                            min: this.state.scal_min_YR,
                            max: this.state.scal_max_YR,
                            axisTicks: {
                              show: true,
                            },
                            axisBorder: {
                              show: true,
                              color: "#14D91A",
                            },
                            labels: {
                              style: {
                                colors: "#14D91A",
                              },
                            },
                            title: {
                              text: "Yield Rate (%)",
                              style: {
                                show: true,
                                color: "#14D91A",
                                fontSize: "18px",
                                fontWeight: 500,
                              },
                            },
                          },
                        ],
                        tooltip: {
                          fixed: {
                            enabled: false,
                            position: "topLeft", // topRight, topLeft, bottomRight, bottomLeft
                            offsetY: 30,
                            offsetX: 60,
                          },
                        },
                        legend: {
                          horizontalAlign: "center",
                          offsetX: 40,
                        },
                      }}
                      series={this.state.data_MD34}
                      type="line"
                      height={300}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* 13 */}
          <div
            className="row justify-content-start"
            style={{ paddingTop: "15px" }}
          >
            <div className="col-lg-4">
              <div className="card">
                <h5 className="card-header"> MBR_MD35</h5>
                <div className="card-body" style={{ padding: "0rem" }}>
                  <div id="chart" style={{ padding: "0rem" }}>
                    <ReactApexChart
                      options={{
                        chart: {
                          height: 350,
                          type: "line",
                          stacked: false,
                        },
                        colors: [
                          "rgb(0, 143, 251)",
                          "#FF3B3B",
                          "#14D91A",
                          "#FF8ED6",
                          "#936BDE",
                          "#A73970",
                        ],

                        dataLabels: {
                          enabled: true,
                        },
                        stroke: {
                          width: [1, 4, 4],
                        },
                        xaxis: {
                          labels: {
                            rotate: -45,
                          },
                          categories: [
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
                        },
                        yaxis: [
                          {
                            axisTicks: {
                              show: true,
                            },
                            axisBorder: {
                              show: true,
                              color: "#008FFB",
                            },
                            labels: {
                              style: {
                                colors: "#008FFB",
                              },
                            },
                            title: {
                              text: "Production (pcs)",
                              style: {
                                color: "#008FFB",
                                fontSize: "18px",
                                fontWeight: 500,
                              },
                            },
                            tooltip: {
                              enabled: true,
                            },
                            min: this.state.scal_min,
                            max: this.state.dataMax, //dataBox.scal_max,
                          },
                          {
                            axisTicks: {
                              show: false,
                            },
                            axisBorder: {
                              show: false,
                              color: "#FF3B3B",
                            },
                            labels: {
                              show: false,
                              style: {
                                colors: "#FF3B3B",
                              },
                            },
                            // title: {
                            //   show:true,
                            //   text: "",
                            //   style: {
                            //   color: "#FF3B3B",
                            //     fontSize: "18px",
                            //     fontWeight: 500,
                            //   },
                            // },
                            // tooltip: {
                            //   enabled: true,
                            // },
                            min: this.state.scal_min,
                            max: this.state.dataMax, //dataBox.scal_max,
                          },
                          {
                            seriesName: "Yield rate",
                            opposite: true,
                            min: this.state.scal_min_YR,
                            max: this.state.scal_max_YR,
                            axisTicks: {
                              show: true,
                            },
                            axisBorder: {
                              show: true,
                              color: "#14D91A",
                            },
                            labels: {
                              style: {
                                colors: "#14D91A",
                              },
                            },
                            title: {
                              text: "Yield Rate (%)",
                              style: {
                                show: true,
                                color: "#14D91A",
                                fontSize: "18px",
                                fontWeight: 500,
                              },
                            },
                          },
                        ],
                        tooltip: {
                          fixed: {
                            enabled: false,
                            position: "topLeft", // topRight, topLeft, bottomRight, bottomLeft
                            offsetY: 30,
                            offsetX: 60,
                          },
                        },
                        legend: {
                          horizontalAlign: "center",
                          offsetX: 40,
                        },
                      }}
                      series={this.state.data_MD35}
                      type="line"
                      height={300}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card">
                <h5 className="card-header"> MBR_MD38</h5>
                <div className="card-body" style={{ padding: "0rem" }}>
                  <div id="chart" style={{ padding: "0rem" }}>
                    <ReactApexChart
                      options={{
                        chart: {
                          height: 350,
                          type: "line",
                          stacked: false,
                        },
                        colors: [
                          "rgb(0, 143, 251)",
                          "#FF3B3B",
                          "#14D91A",
                          "#FF8ED6",
                          "#936BDE",
                          "#A73970",
                        ],

                        dataLabels: {
                          enabled: true,
                        },
                        stroke: {
                          width: [1, 4, 4],
                        },
                        xaxis: {
                          labels: {
                            rotate: -45,
                          },
                          categories: [
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
                        },
                        yaxis: [
                          {
                            axisTicks: {
                              show: true,
                            },
                            axisBorder: {
                              show: true,
                              color: "#008FFB",
                            },
                            labels: {
                              style: {
                                colors: "#008FFB",
                              },
                            },
                            title: {
                              text: "Production (pcs)",
                              style: {
                                color: "#008FFB",
                                fontSize: "18px",
                                fontWeight: 500,
                              },
                            },
                            tooltip: {
                              enabled: true,
                            },
                            min: this.state.scal_min,
                            max: this.state.dataMax, //dataBox.scal_max,
                          },
                          {
                            axisTicks: {
                              show: false,
                            },
                            axisBorder: {
                              show: false,
                              color: "#FF3B3B",
                            },
                            labels: {
                              show: false,
                              style: {
                                colors: "#FF3B3B",
                              },
                            },
                            // title: {
                            //   show:true,
                            //   text: "",
                            //   style: {
                            //   color: "#FF3B3B",
                            //     fontSize: "18px",
                            //     fontWeight: 500,
                            //   },
                            // },
                            // tooltip: {
                            //   enabled: true,
                            // },
                            min: this.state.scal_min,
                            max: this.state.dataMax, //dataBox.scal_max,
                          },
                          {
                            seriesName: "Yield rate",
                            opposite: true,
                            min: this.state.scal_min_YR,
                            max: this.state.scal_max_YR,
                            axisTicks: {
                              show: true,
                            },
                            axisBorder: {
                              show: true,
                              color: "#14D91A",
                            },
                            labels: {
                              style: {
                                colors: "#14D91A",
                              },
                            },
                            title: {
                              text: "Yield Rate (%)",
                              style: {
                                show: true,
                                color: "#14D91A",
                                fontSize: "18px",
                                fontWeight: 500,
                              },
                            },
                          },
                        ],
                        tooltip: {
                          fixed: {
                            enabled: false,
                            position: "topLeft", // topRight, topLeft, bottomRight, bottomLeft
                            offsetY: 30,
                            offsetX: 60,
                          },
                        },
                        legend: {
                          horizontalAlign: "center",
                          offsetX: 40,
                        },
                      }}
                      series={this.state.data_MD38}
                      type="line"
                      height={300}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card">
                <h5 className="card-header"> MINI_FFL31</h5>
                <div className="card-body" style={{ padding: "0rem" }}>
                  <div id="chart" style={{ padding: "0rem" }}>
                    <ReactApexChart
                      options={{
                        chart: {
                          height: 350,
                          type: "line",
                          stacked: false,
                        },
                        colors: [
                          "rgb(0, 143, 251)",
                          "#FF3B3B",
                          "#14D91A",
                          "#FF8ED6",
                          "#936BDE",
                          "#A73970",
                        ],

                        dataLabels: {
                          enabled: true,
                        },
                        stroke: {
                          width: [1, 4, 4],
                        },
                        xaxis: {
                          labels: {
                            rotate: -45,
                          },
                          categories: [
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
                        },
                        yaxis: [
                          {
                            axisTicks: {
                              show: true,
                            },
                            axisBorder: {
                              show: true,
                              color: "#008FFB",
                            },
                            labels: {
                              style: {
                                colors: "#008FFB",
                              },
                            },
                            title: {
                              text: "Production (pcs)",
                              style: {
                                color: "#008FFB",
                                fontSize: "18px",
                                fontWeight: 500,
                              },
                            },
                            tooltip: {
                              enabled: true,
                            },
                            min: this.state.scal_min,
                            max: this.state.dataMax, //dataBox.scal_max,
                          },
                          {
                            axisTicks: {
                              show: false,
                            },
                            axisBorder: {
                              show: false,
                              color: "#FF3B3B",
                            },
                            labels: {
                              show: false,
                              style: {
                                colors: "#FF3B3B",
                              },
                            },
                            // title: {
                            //   show:true,
                            //   text: "",
                            //   style: {
                            //   color: "#FF3B3B",
                            //     fontSize: "18px",
                            //     fontWeight: 500,
                            //   },
                            // },
                            // tooltip: {
                            //   enabled: true,
                            // },
                            min: this.state.scal_min,
                            max: this.state.dataMax, //dataBox.scal_max,
                          },
                          {
                            seriesName: "Yield rate",
                            opposite: true,
                            min: this.state.scal_min_YR,
                            max: this.state.scal_max_YR,
                            axisTicks: {
                              show: true,
                            },
                            axisBorder: {
                              show: true,
                              color: "#14D91A",
                            },
                            labels: {
                              style: {
                                colors: "#14D91A",
                              },
                            },
                            title: {
                              text: "Yield Rate (%)",
                              style: {
                                show: true,
                                color: "#14D91A",
                                fontSize: "18px",
                                fontWeight: 500,
                              },
                            },
                          },
                        ],
                        tooltip: {
                          fixed: {
                            enabled: false,
                            position: "topLeft", // topRight, topLeft, bottomRight, bottomLeft
                            offsetY: 30,
                            offsetX: 60,
                          },
                        },
                        legend: {
                          horizontalAlign: "center",
                          offsetX: 40,
                        },
                      }}
                      series={this.state.data_FFL31}
                      type="line"
                      height={300}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* 14 */}
          <div
            className="row justify-content-start"
            style={{ paddingTop: "15px" }}
          >
            <div className="col-lg-4">
              <div className="card">
                <h5 className="card-header"> MINI_FFL32</h5>
                <div className="card-body" style={{ padding: "0rem" }}>
                  <div id="chart" style={{ padding: "0rem" }}>
                    <ReactApexChart
                      options={{
                        chart: {
                          height: 350,
                          type: "line",
                          stacked: false,
                        },
                        colors: [
                          "rgb(0, 143, 251)",
                          "#FF3B3B",
                          "#14D91A",
                          "#FF8ED6",
                          "#936BDE",
                          "#A73970",
                        ],

                        dataLabels: {
                          enabled: true,
                        },
                        stroke: {
                          width: [1, 4, 4],
                        },
                        xaxis: {
                          labels: {
                            rotate: -45,
                          },
                          categories: [
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
                        },
                        yaxis: [
                          {
                            axisTicks: {
                              show: true,
                            },
                            axisBorder: {
                              show: true,
                              color: "#008FFB",
                            },
                            labels: {
                              style: {
                                colors: "#008FFB",
                              },
                            },
                            title: {
                              text: "Production (pcs)",
                              style: {
                                color: "#008FFB",
                                fontSize: "18px",
                                fontWeight: 500,
                              },
                            },
                            tooltip: {
                              enabled: true,
                            },
                            min: this.state.scal_min,
                            max: this.state.dataMax, //dataBox.scal_max,
                          },
                          {
                            axisTicks: {
                              show: false,
                            },
                            axisBorder: {
                              show: false,
                              color: "#FF3B3B",
                            },
                            labels: {
                              show: false,
                              style: {
                                colors: "#FF3B3B",
                              },
                            },
                            // title: {
                            //   show:true,
                            //   text: "",
                            //   style: {
                            //   color: "#FF3B3B",
                            //     fontSize: "18px",
                            //     fontWeight: 500,
                            //   },
                            // },
                            // tooltip: {
                            //   enabled: true,
                            // },
                            min: this.state.scal_min,
                            max: this.state.dataMax, //dataBox.scal_max,
                          },
                          {
                            seriesName: "Yield rate",
                            opposite: true,
                            min: this.state.scal_min_YR,
                            max: this.state.scal_max_YR,
                            axisTicks: {
                              show: true,
                            },
                            axisBorder: {
                              show: true,
                              color: "#14D91A",
                            },
                            labels: {
                              style: {
                                colors: "#14D91A",
                              },
                            },
                            title: {
                              text: "Yield Rate (%)",
                              style: {
                                show: true,
                                color: "#14D91A",
                                fontSize: "18px",
                                fontWeight: 500,
                              },
                            },
                          },
                        ],
                        tooltip: {
                          fixed: {
                            enabled: false,
                            position: "topLeft", // topRight, topLeft, bottomRight, bottomLeft
                            offsetY: 30,
                            offsetX: 60,
                          },
                        },
                        legend: {
                          horizontalAlign: "center",
                          offsetX: 40,
                        },
                      }}
                      series={this.state.data_FFL32}
                      type="line"
                      height={300}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card">
                <h5 className="card-header"> MINI_FFL33</h5>
                <div className="card-body" style={{ padding: "0rem" }}>
                  <div id="chart" style={{ padding: "0rem" }}>
                    <ReactApexChart
                      options={{
                        chart: {
                          height: 350,
                          type: "line",
                          stacked: false,
                        },
                        colors: [
                          "rgb(0, 143, 251)",
                          "#FF3B3B",
                          "#14D91A",
                          "#FF8ED6",
                          "#936BDE",
                          "#A73970",
                        ],

                        dataLabels: {
                          enabled: true,
                        },
                        stroke: {
                          width: [1, 4, 4],
                        },
                        xaxis: {
                          labels: {
                            rotate: -45,
                          },
                          categories: [
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
                        },
                        yaxis: [
                          {
                            axisTicks: {
                              show: true,
                            },
                            axisBorder: {
                              show: true,
                              color: "#008FFB",
                            },
                            labels: {
                              style: {
                                colors: "#008FFB",
                              },
                            },
                            title: {
                              text: "Production (pcs)",
                              style: {
                                color: "#008FFB",
                                fontSize: "18px",
                                fontWeight: 500,
                              },
                            },
                            tooltip: {
                              enabled: true,
                            },
                            min: this.state.scal_min,
                            max: this.state.dataMax, //dataBox.scal_max,
                          },
                          {
                            axisTicks: {
                              show: false,
                            },
                            axisBorder: {
                              show: false,
                              color: "#FF3B3B",
                            },
                            labels: {
                              show: false,
                              style: {
                                colors: "#FF3B3B",
                              },
                            },
                            // title: {
                            //   show:true,
                            //   text: "",
                            //   style: {
                            //   color: "#FF3B3B",
                            //     fontSize: "18px",
                            //     fontWeight: 500,
                            //   },
                            // },
                            // tooltip: {
                            //   enabled: true,
                            // },
                            min: this.state.scal_min,
                            max: this.state.dataMax, //dataBox.scal_max,
                          },
                          {
                            seriesName: "Yield rate",
                            opposite: true,
                            min: this.state.scal_min_YR,
                            max: this.state.scal_max_YR,
                            axisTicks: {
                              show: true,
                            },
                            axisBorder: {
                              show: true,
                              color: "#14D91A",
                            },
                            labels: {
                              style: {
                                colors: "#14D91A",
                              },
                            },
                            title: {
                              text: "Yield Rate (%)",
                              style: {
                                show: true,
                                color: "#14D91A",
                                fontSize: "18px",
                                fontWeight: 500,
                              },
                            },
                          },
                        ],
                        tooltip: {
                          fixed: {
                            enabled: false,
                            position: "topLeft", // topRight, topLeft, bottomRight, bottomLeft
                            offsetY: 30,
                            offsetX: 60,
                          },
                        },
                        legend: {
                          horizontalAlign: "center",
                          offsetX: 40,
                        },
                      }}
                      series={this.state.data_FFL33}
                      type="line"
                      height={300}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card">
                <h5 className="card-header"> MINI_FFL34</h5>
                <div className="card-body" style={{ padding: "0rem" }}>
                  <div id="chart" style={{ padding: "0rem" }}>
                    <ReactApexChart
                      options={{
                        chart: {
                          height: 350,
                          type: "line",
                          stacked: false,
                        },
                        colors: [
                          "rgb(0, 143, 251)",
                          "#FF3B3B",
                          "#14D91A",
                          "#FF8ED6",
                          "#936BDE",
                          "#A73970",
                        ],

                        dataLabels: {
                          enabled: true,
                        },
                        stroke: {
                          width: [1, 4, 4],
                        },
                        xaxis: {
                          labels: {
                            rotate: -45,
                          },
                          categories: [
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
                        },
                        yaxis: [
                          {
                            axisTicks: {
                              show: true,
                            },
                            axisBorder: {
                              show: true,
                              color: "#008FFB",
                            },
                            labels: {
                              style: {
                                colors: "#008FFB",
                              },
                            },
                            title: {
                              text: "Production (pcs)",
                              style: {
                                color: "#008FFB",
                                fontSize: "18px",
                                fontWeight: 500,
                              },
                            },
                            tooltip: {
                              enabled: true,
                            },
                            min: this.state.scal_min,
                            max: this.state.dataMax, //dataBox.scal_max,
                          },
                          {
                            axisTicks: {
                              show: false,
                            },
                            axisBorder: {
                              show: false,
                              color: "#FF3B3B",
                            },
                            labels: {
                              show: false,
                              style: {
                                colors: "#FF3B3B",
                              },
                            },
                            // title: {
                            //   show:true,
                            //   text: "",
                            //   style: {
                            //   color: "#FF3B3B",
                            //     fontSize: "18px",
                            //     fontWeight: 500,
                            //   },
                            // },
                            // tooltip: {
                            //   enabled: true,
                            // },
                            min: this.state.scal_min,
                            max: this.state.dataMax, //dataBox.scal_max,
                          },
                          {
                            seriesName: "Yield rate",
                            opposite: true,
                            min: this.state.scal_min_YR,
                            max: this.state.scal_max_YR,
                            axisTicks: {
                              show: true,
                            },
                            axisBorder: {
                              show: true,
                              color: "#14D91A",
                            },
                            labels: {
                              style: {
                                colors: "#14D91A",
                              },
                            },
                            title: {
                              text: "Yield Rate (%)",
                              style: {
                                show: true,
                                color: "#14D91A",
                                fontSize: "18px",
                                fontWeight: 500,
                              },
                            },
                          },
                        ],
                        tooltip: {
                          fixed: {
                            enabled: false,
                            position: "topLeft", // topRight, topLeft, bottomRight, bottomLeft
                            offsetY: 30,
                            offsetX: 60,
                          },
                        },
                        legend: {
                          horizontalAlign: "center",
                          offsetX: 40,
                        },
                      }}
                      series={this.state.data_FFL34}
                      type="line"
                      height={300}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Mms_chart_mbrmd_test;
