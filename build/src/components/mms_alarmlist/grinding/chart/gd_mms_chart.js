/* eslint-disable no-dupe-keys */
import React from "react";
import ReactApexCharts from "react-apexcharts";
import { httpClient } from "../../../../utils/HttpClient";
import { server } from "../../../../constance/contance";
import moment from "moment";

import Select from "react-select";

class Gd_mms_chart extends React.Component {
  constructor(props) {
    super(props);

    this.state = { currentCount: 60 };
    this.state = {
      MMS_list: [],
      MMS_Date: [],
      selectMc: [],
      ListMc: [],
    };
  }

  timer() {
    this.setState({
      currentCount: this.state.currentCount - 1,
    });
    if (this.state.currentCount < 1) {
      clearInterval(this.intervalId);
    }
  }

  getDate = () => {
    this.setState({
      start_date: moment().startOf("month").format("YYYY-MM-DD"),
    });
    this.setState({ end_date: moment().endOf("month").format("YYYY-MM-DD") });
  };

  getData_mc = async () => {
    const array = await httpClient.get(server.Master_mc_URL);
    console.log(array.data.resultMc);
    const Machine = array.data.resultMc.map((d) => ({
      label: d.mc_no,
    }));
    this.setState({ ListMc: Machine });
  };

  getMMS_data = async () => {
    const array = await httpClient.get(
      server.chart_GD_mms_URL +
        "/" +
        // this.state.start_date +
        "2023-06-01"+
        "/" +
        "2023-06-30"+
        // this.state.end_date +
        "/" +
        this.state.selectMc
    );

    for (let index = 0; index < array.data.resultMMS.length; index++) {
      this.state.MMS_list.push({
        name: array.data.resultMMS[index].name,
        data: array.data.resultMMS[index].data[0].split(`,`),
      });
    }

    let listDate = array.data.resultDate_MMS;
    this.setState({ MMS_Date: listDate });
  };

  componentDidMount = async () => {
    await this.getData_mc();
    await this.getDate();
    this.intervalId = setInterval(this.timer.bind(this), 1000);
  };
  componentWillUnmount() {
    clearInterval(this.intervalId);
    this.getMMS_data(this.state.MMS_list);
  }

  render() {
    console.log(this.state.MMS_list);
    console.log(this.state.MMS_Date);

    return (
      <div className="wrapper">
        <div>
          <div>
            <h1 className="m-0 text-dark">Machine alarm history</h1>

          </div>
          <div className="position-relative card-body"></div>
        </div>
        <section className="content">
          <div className="container-fluid">
            <div
              className="form-group row"
              style={{
                marginBottom: "0",
                fontWeight: 600,
                fontSize: "1.5rem",
              }}
            >

              <h4>Machine_no </h4>
              <div className="col-3">
                <Select
                  options={this.state.ListMc}
                  onChange={async (e) => {
                    this.setState({ MMS_list: [] });
                    await this.setState({
                      selectMc: e.label,
                    });
                    this.getMMS_data();
                  }}

                />
              </div>
            </div>
            <div className="card">
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
                          borderRadius: 10,

                          dataLabels: {
                            total: {
                              enabled: true,
                              style: {
                                fontSize: "15px",
                                fontWeight: 900,
                             
                              },
                            },
                          },
                        },
                      },
                      xaxis: {
                        type: "date",
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
                        },

                        categories: this.state.MMS_Date,
                      },

                      yaxis: {
                        labels: {
                          show: true,
                          align: "right",
                          minWidth: 0,
                          maxWidth: 100,
                          formatter: function (val) {
                            return val.toFixed(0);
                          },
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
                          text: "Alarm break down (Minute)",
                          style: {
                            color: undefined,
                            fontSize: "20px",
                            fontFamily: "Helvetica, Arial, sans-serif",
                            fontWeight: 1000,
                            cssClass: "apexcharts-yaxis-title",
                          },
                        },
                      },
                      dataLabels: {
                        formatter: function (val) {
                          return val.toFixed(0);
                        },
                        style: {
                          colors: ["#2E294E"],
                          fontSize: "18px",
                        },
                      },
                      colors: [
                        "#008FFB",
                        "#00E396",
                        "#FEB019",
                        "#FF4560",
                        "#775DD0",
                        "#3F51B5",
                        "#546E7A",
                        "#D4526E",
                        "#8D5B4C",
                        "#F86624",
                        "#D7263D",
                        "#1B998B",
                        "#2E294E",
                        "#F46036",
                        "#E2C044",
                      ],
                      legend: {
                        position: "right",
                        offsetY: 100,
                      },
                      fill: {
                        opacity: 1,
                      },

                      legend: {
                        showForNullSeries: false,
                        horizontalAlign: "center",
                        floating: false,
                        fontSize: "20px",
                        fontFamily: "Helvetica, Arial",
                        position: "right",
                        offsetX: -20,
                        offsetY: 10,

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

                      grid: {
                        row: {
                          colors: ["#e5e5e5", "transparent"],
                          opacity: 0.5,
                          fontSize: "15px",
                        },
                        column: {
                          colors: ["#f8f8f8", "transparent"],
                          fontSize: "15px",
                        },
                      },
                    }}
                    series={this.state.MMS_list}
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
export default Gd_mms_chart;
