import React, { Component } from "react";
import ReactApexCharts from "react-apexcharts";
import { httpClient } from "../../../utils/HttpClient";
import { server } from "../../../constance/contance";
import moment from "moment";
import Swal from "sweetalert2";

class Non_operatingtime_gd extends Component {
  constructor(props) {
    super(props);
    this.tick = this.tick.bind(this);
    this.state = { seconds: props.seconds };

    this.state = {
      data_all: [],
      data_B: [],
      data_R: [],
      data_H: [],
      DateAll: [],
      date_B: [],
      date_R: [],
      date_H: [],
      list_machine:[],
      mcno: "",
      time: this.props.time,
      seconds: "1200",
      data_test: [
        { name: "Non - Operating time", data: [86291, 36659, 16858] },
        { name: "Operating time", data: [86176, 36923, 16904] },
      ],
      series_test: ["2023-08-22", "2023-08-23", "2023-08-24"],
    };
  }
  componentDidMount = async () => {
    await this.getDate();
    await this.Get_MC_Master();
    // console.log(this.state.start_date , this.state.end_date);
    this.getOutput_data();
    console.log("Non_operatingtime_gd");
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
    // console.log("LOL");
    const array = await httpClient.post(
      server.Alarm_Non_Operating_GD +
        "/" +
        this.state.start_date +
        "/" +
        this.state.end_date +
        "/" +
        this.state.mcno
    );
    // console.log("non oper");
    // console.log(array.data.result.length);
    // console.log(array.data.result);
    // console.log(array.data.resultDate);

    if (array.data.result_length=== 0) {
     
        Swal.fire({
          icon: "warning",
          text: "Can not find data!",
          timer: 1500,
        });
        this.setState({data_all:[],DateAll:[] })
    }else{
      let list_oper_all = array.data.result;
      this.setState({ data_all: list_oper_all });
      let listDate = array.data.resultDate;
      this.setState({ DateAll: listDate });
  }

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
    this.setState({ end_date: moment().endOf("month").format("YYYY-MM-DD") });
  };
  click_search = async () => {
    
    this.getOutput_data();
  };
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  Get_MC_Master = async ()=>{
    
    let mc_list_data = await httpClient.post(server.GET_MASTER_MC_GD);
    if (mc_list_data.data.result_basic.length > 0) {
      // console.log("data mc");
      await this.setState({
        list_machine: mc_list_data.data.result_basic,
        mcno: mc_list_data.data.result_basic[0].mc_no,
      });
      await this.sleep(1000);
  } else {
    Swal.fire({
      icon: "warning",
      text: "Can not find data master M/C!",
      timer: 1500,
    });
    }
    
  }
  renderTableRow = () => {
    // console.log("mc",this.state.list_machine);
    try {
      if (this.state.list_machine !== null) {
        const myResult = this.state.list_machine;
        return myResult.map((item) => <option >{item.mc_no}</option>);
      }
    } catch (error) {}
  };

  render() {
    return (
      
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
                {/* chart non-operting time  */}
                Non-Operating time
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
                        start_date: moment(e.target.value).format("YYYY-MM-DD"),
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
                        end_date: moment(e.target.value).format("YYYY-MM-DD"),
                      });
                    }}
                  />
                </div>
                <div className="col-1">
                  <b>MACHINE : </b>
                </div>
                <div className="col-2">
                        <select
                          value={this.state.mcno}
                          className="form-control"
                          onChange={(e) => {
                            this.setState({ mcno: e.target.value });
                          }}
                        >
                          {/* <option>---</option> */}
                          {this.renderTableRow()}
                          {/* {this.state.list_machine.map((item) => <option key={item.mc_no}>{item.mc_no}</option>)}; */}
                          
                        </select>
                      </div>
                <div className="col-1">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={async (e) => {
                      e.preventDefault();
                      localStorage.setItem("start_date", this.state.start_date);
                      localStorage.setItem("end_date", this.state.end_date);
                      await this.click_search();
                    }}
                  >
                    submit
                  </button>
                </div>
              </div>
            {/* B */}
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
                        colors: ["#000"],
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
                          return seriesName;
                          // if (seriesName === "MBR_MD24") {
                          //   return ["BALL SIZE -5.0"];
                          // }
                        },
                      },
                    }}
                    // series={this.state.data_test}
                    series={this.state.data_all}
                    type="bar"
                    height={400}
                  />
                </div>
                <span className="input-help">
  <small id="passwordHelpBlock" className="form-text text-muted">* Displays the time (percent) of each day of the Non - Operating time. </small>
  <small id="passwordHelpBlock" className="form-text text-muted">* แสดงข้อมูลเวลา (%) ทั้งหมดของแต่ละวัน ของ Non - Operating time  </small>
</span>
              </div>
              {/* R */}
              {/* <div className="page-content">
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
                          return seriesName;
                          // if (seriesName === "MBR_MD24") {
                          //   return ["BALL SIZE -5.0"];
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
              </div> */}
              {/* H */}
              {/* <div className="page-content">
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
                          return seriesName;
                          // if (seriesName === "MBR_MD24") {
                          //   return ["BALL SIZE -5.0"];
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
              </div> */}
              

            </div>
          </div>
          
    );
  }
}

export default Non_operatingtime_gd;
