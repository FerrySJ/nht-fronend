import React, { Component } from "react";
import ReactApexCharts from "react-apexcharts";
import { httpClient } from "../../../utils/HttpClient";
import { server } from "../../../constance/contance";
import moment from "moment";
import Swal from "sweetalert2";

class Compare_alarmlist_topic extends Component {
  constructor(props) {
    super(props);
    this.tick = this.tick.bind(this);
    this.state = { seconds: props.seconds };

    this.state = {
      data_all: [],
      DateAll: [],
      list_machine: [],
      list_topic: [],
      mcno: "",
      topic: "",
      time: this.props.time,
      seconds: "1200",
    };
  }
  componentDidMount = async () => {
    await this.getDate();
    await this.Get_MC_Master();
    await this.sleep(500);
    this.getOutput_data();
    console.log("Compare tipic alarm list");
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
    // console.log("LOL",this.state.topic);
    const array = await httpClient.post(
      server.Topic_Alarmlist_daily_GD 
      +
        "/" +
        this.state.start_date +
        "/" +
        this.state.end_date +
        "/" +
        this.state.mcno 
        // +
        // "/" +
        // this.state.topic
        ,{topic: this.state.topic,}
    );
    if (array.data.result.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "Can not find data!",
        showConfirmButton: false,
        timer: 1500,
      });
      this.setState({ data_all: [], DateAll: [] });
    } else {
      let list_data = array.data.result;
      this.setState({ data_all: list_data });
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
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  Get_MC_Master = async () => {
    let mc_list_data = await httpClient.post(server.GET_MASTER_MC_GD);
    if (mc_list_data.data.result_basic.length > 0) {
      // console.log("data mc");
      await this.setState({
        list_machine: mc_list_data.data.result_basic,
        mcno: mc_list_data.data.result_basic[0].mc_no,
      });
      await this.sleep(500);
      this.Get_Topic_Master();
    } else {
      Swal.fire({
        icon: "warning",
        text: "Can not find data master M/C!",
        timer: 1500,
      });
    }
  };
  Get_Topic_Master = async () => {
    // console.log("put Get_Topic_Master");
    let mc_list_data = await httpClient.post(server.GET_MASTER_MC_GD, {
      mc_no: this.state.mcno,
    });
    // console.log(mc_list_data.data.result_topic[0]);
    if (mc_list_data.data.result_topic.length > 0) {
      await this.setState({
        list_topic: mc_list_data.data.result_topic,
        topic: mc_list_data.data.result_topic[0].topic,
      });
      await this.sleep(500);
      // console.log(this.state.topic);
    }
  };
  renderTableRow = () => {
    // console.log("mc",this.state.list_machine);
    try {
      if (this.state.list_machine !== null) {
        const myResult = this.state.list_machine;
        return myResult.map((item) => <option>{item.mc_no}</option>);
      }
    } catch (error) {}
  };
  renderTableRow_Topic = () => {
    // console.log("mc",this.state.list_topic);
    try {
      if (this.state.list_topic !== null) {
        const myResult = this.state.list_topic;
        return myResult.map((item) => <option>{item.topic}</option>);
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
            {/* chart Compare Topic Alarm List By M/C */}
            Data time of topic alarm list
            {/* < Popup_status_mc_gd/> */}
          </div>
          <div
            className="row justify-content-center"
            style={{ paddingTop: "10px", textAlign: "center" }}
          >
            <div className="col-auto">
              <h5>Start Date :</h5>
            </div>
            <div className="col-auto">
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

            <div className="col-auto">
              <h5>End Date :</h5>
            </div>
            <div className="col-auto">
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
            <div className="col-auto">
              <h5>Machine No. : </h5>
            </div>
            <div className="col-1">
              <select
                value={this.state.mcno}
                className="form-control"
                onChange={async (e) => {
                  await this.setState({
                    mcno: e.target.value,
                  });
                  this.Get_Topic_Master();
                }}
              >
                {/* <option>---</option> */}
                {this.renderTableRow()}
                {/* {this.state.list_machine.map((item) => <option key={item.mc_no}>{item.mc_no}</option>)}; */}
              </select>
            </div>
            <div className="col-auto">
              <h5>Topic : </h5>
            </div>
            <div className="col-2">
              <select
                value={this.state.topic}
                className="form-control"
                onChange={(e) => {
                  this.setState({ topic: e.target.value });
                }}
              >
                {/* <option>---</option> */}
                {this.renderTableRow_Topic()}
                {/* {this.state.list_machine.map((item) => <option key={item.mc_no}>{item.mc_no}</option>)}; */}
              </select>
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
                    height: 350,
                    type: "bar",
                  },
                  plotOptions: {
                    bar: {
                      borderRadius: 10,
                      dataLabels: {
                        position: "top", // top, center, bottom
                      },
                    },
                  },
                  dataLabels: {
                    enabled: true,
                    formatter: function (val) {
                      return val;
                    },
                    offsetY: -20,
                    style: {
                      fontSize: "14px",
                      colors: ["#304758"],
                    },
                  },

                  xaxis: {
                    categories: this.state.DateAll, //["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                    position: "bottom",
                    axisBorder: {
                      show: false,
                    },
                    axisTicks: {
                      show: false,
                    },
                    crosshairs: {
                      fill: {
                        type: "gradient",
                        gradient: {
                          colorFrom: "#D8E3F0",
                          colorTo: "#FFD1E6",
                          stops: [0, 100],
                          opacityFrom: 0.4,
                          opacityTo: 0.5,
                        },
                      },
                    },
                    tooltip: {
                      enabled: true,
                    },
                  },
                  yaxis: {
                    axisBorder: {
                      show: false,
                    },
                    axisTicks: {
                      show: true,
                    },
                    labels: {
                      show: true,
                      formatter: function (val) {
                        return val + " sec";
                      },
                    },
                  },
                  title: {
                    text: "Topic Alarm List",
                    floating: true,
                    offsetY: 330,
                    align: "center",
                    style: {
                      color: "#444",
                    },
                  },
                  colors: [
                    "#EDB51F",
                    "#2E93fA",
                    "#546E7A",
                    "#E91E63",
                    "#FF9800",
                  ],
                }}
                series={this.state.data_all}
                type="bar"
                height={350}
              />
            </div>
            <span className="input-help">
              <small id="passwordHelpBlock" className="form-text text-muted">
                * Displays the total time of each day of the Topic Alarm List.
              </small>
              <small id="passwordHelpBlock" className="form-text text-muted">
                * แสดงข้อมูลเวลาทั้งหมดของแต่ละวัน ของ Topic Alarm List
              </small>
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default Compare_alarmlist_topic;
