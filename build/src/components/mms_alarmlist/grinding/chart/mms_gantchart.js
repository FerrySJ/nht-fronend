import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";
import { httpClient } from "../../../../utils/HttpClient";
import { server } from "../../../../constance/contance";
import Swal from "sweetalert2";
import Select from "react-select";
import moment from "moment";

window.Swal = Swal;

class MMS_gantchart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      ganttData: [],
      ganttData1: [],
      date_validate: "form-control is-invalid",
      start_date: moment().format("YYYY-MM-DD"),

      selectMC: [],
      showMC: [],
      MC: "",

      options: {
        chart: {
          height: 350,
          type: "rangeBar",
        },
        plotOptions: {
          bar: {
            horizontal: true,
            barHeight: "50%",
            rangeBarGroupRows: true,
          },
        },
        colors: ["#00E396", "#D7263D", "#FEB019"],
        fill: {
          type: "solid",
        },
        xaxis: {
          type: "datetime",
        },
        legend: {
          position: "right",
        },
        // tooltip: {
        //   custom: function (opts) {
        //     const fromYear = new Date(opts.y1).getFullYear();
        //     const toYear = new Date(opts.y2).getFullYear();
        //     const values = opts.ctx.rangeBar.getTooltipValues(opts);
        //     return "";
        //   },
        // },
      },
    };

    // design button
    this.style = {
      background: "blue",
      color: "white",
      fontSize: "25px",
      textAlign: "center",
      borderRadius: "5px",
      height: 65,
    };
  }

  getGanttDataMC = async () => {
    const array = await httpClient.get(server.Master_mc_URL);
    console.log(array.data.resultMc);
    const Machine = array.data.resultMc.map((d) => ({
      label: d.mc_no,
    }));
    this.setState({ showMC: Machine });
  };

  componentDidMount = async () => {
    await this.getGanttDataMC();
    await this.getGanttData();
  };

  getGanttData = async () => {
    let result = await httpClient.get(
      server.GANTT_MMS_URL +
        "/" +
        this.state.start_date +
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
    } else {
      // ค่าที่ get ได้ส่งไปที่ state prop ชื่อ ganttData
      await this.setState({ ganttData: result.data.series });
    }
    console.log(result.data.series);
    // console.log(result.data.series[0].data[0].x);
    //console.log(result.data.series[0].data[0].y[0]);
    //console.log(new Date(result.data.series[0].data[0].y[0]).getTime());
  };
  // onchange label will fix value at selectMC
  handleChange(e) {
    this.setState({ selectMC: e.label });
  }

  render() {
    console.log(this.state.showMC);
    console.log(this.state.selectMC);
    // const mystyle = {
    //   color: "white",
    //   backgroundColor: "DodgerBlue",
    //   padding: "10px",
    //   fontFamily: "Arial",
    //   width: "10px",
    //   height: "200px",
    // };

    return (
      <div>
        <div>
          <div>
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0 text-dark">Machine status Timeline chart</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="content">
          <div className="container-fluid">
            <div>
              <div className="card-header"></div>
              <div className="card-body">
                <div className="row">
                  <div className="col-3">
                    <h4>Start Date</h4>
                    <input
                      style={{
                        blockSize: "50px",
                        fontWeight: 600,
                        fontSize: "1.5rem",
                      }}
                      className="form-control is-valid"
                      type="date"
                      id="id_daydate"
                      name="name_daydate"
                      value={this.state.start_date}
                      onChange={async (e) => {
                        await this.setState({
                          // date_validate: "form-control is-valid",
                          start_date: moment(e.target.value).format(
                            "YYYY-MM-DD"
                          ),
                        });
                      }}
                    />
                  </div>

                  <div
                    className="col-3"
                    style={{
                      marginBottom: "0",
                      fontWeight: 600,
                      fontSize: "1.5rem",
                    }}
                  >
                    <h4>Machine_no</h4>
                    <Select
                      options={this.state.showMC}
                      onChange={this.handleChange.bind(this)}
                    />
                  </div>
                  <div className="col-3">
                    <br />
                    <button
                      style={this.style}
                      onClick={async () => {
                        await this.getGanttData();
                      }}
                    >
                      Click
                    </button>
                  </div>
                </div>
                <div id="chart">
                  <ReactApexChart
                    options={this.state.options}
                    series={this.state.ganttData}
                    type="rangeBar"
                    height={350}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default MMS_gantchart;
