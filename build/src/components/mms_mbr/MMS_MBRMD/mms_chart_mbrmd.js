//display All ???

import React, { Component } from "react";
import axios from "axios";
import moment from "moment";
import { httpClient } from "../../../utils/HttpClient";
import { server } from "../../../constance/contance";
import ReactApexChart from "react-apexcharts";

import ReactApexCharts from "react-apexcharts";
import Swal from "sweetalert2";

class Mms_chart_mbrmd extends Component {
  
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
      arr_mcno: [],
      set_mbr:[],
      
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
    // let set_mbr = [];
    for (let index = 0; index < this.state.aa.length; index++) {
      const arr_name = await httpClient.post(
        server.realtime_chartPD_MBR_MD_URL +"/"+this.state.aa[index] +"/"+ this.state.start_date
      );
this.state.set_mbr.push(arr_name.data.resultOutput_MBR)
    // console.log(arr_name.data.resultOutput_MBR);
  }
  console.log(this.state.set_mbr);


    // const arr_MA03 = await httpClient.post(
    //   server.realtime_chartPD_MBR_MD_URL + "/MBR_MD03/" + this.state.start_date
    // );
    // const arr_MA08 = await httpClient.post(
    //   server.realtime_chartPD_MBR_MD_URL + "/MBR_MD08/" + this.state.start_date
    // );
    // const arr_MA12 = await httpClient.post(
    //   server.realtime_chartPD_MBR_MD_URL + "/MBR_MD12/" + this.state.start_date
    // );

    // // console.log("ChartPD ==>", arr_MA03.data.resultOutput_MBR);
    // this.setState({
    //   data_MA03: arr_MA03.data.resultOutput_MBR,
    //   data_MA08: arr_MA08.data.resultOutput_MBR,
    //   data_MA12: arr_MA12.data.resultOutput_MBR,
    // });
// console.log("dataMA03",this.state.data_MA03);
    setTimeout(
      function () {
        //Start the timer
        this.getOutput_data();
       this.renderCard();
    }.bind(this),
      600000 //10 min
    );
  };
  renderCard() {
    if (this.state.set_mbr != null) {
      return this.state.set_mbr.map((data) => (
    <div className="col-lg-4">
        <div className="card">
          <h5 className="card-header">MC</h5>
          {/* <h5 className="card-header">{this.state.aa.map((mcno) => (mcno))}</h5> */}
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

                series={data}
                type="line"
                height={300}
              />
            </div>
          </div>
        </div>
      </div>
  ))}
    
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
    let replies = null
    if(this.props.replies){
      replies = this.props.replies.map((data) => {
        return (
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
                  series={data}
                  type="line"
                  height={300}
                />
              </div>
            </div>
          </div>
        </div> 
        )
      })
    }
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
          {/* <div
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
          </div> */}
          {/* new */}
          <div
            className="row justify-content-start"
            style={{ paddingTop: "15px" }}
          >
        {this.renderCard()}
        {/* <div className="comment">
        <div className="replies">{ replies }</div>
      </div> */}
            </div>
        </div>
      </div>
    );
  }
}

export default Mms_chart_mbrmd;
