import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";
import { httpClient } from "../../utils/HttpClient";
import { server } from "../../constance/contance";
import moment from "moment";
import Swal from "sweetalert2";

class MMS_MC_COMPARE extends Component {
  constructor(props) {
    super(props);
    this.tick = this.tick.bind(this);
    this.state = { seconds: props.seconds };

    this.state = {
      data_all: [],
      DateAll: [],
      mcno: "ic11r",
      time: this.props.time,
      seconds: "1200",
      data_mc_over: [],
      data_mc_down: [],
      option_mc_over: [],
      date_mc_over: [],
      data_test: [
        { name: "Non - Operating time", data: [86291, 36659, 16858] },
        { name: "Operating time", data: [86176, 36923, 16904] },
      ],
      series_test: ["2023-08-22", "2023-08-23", "2023-08-24"],
      series: [
        {
          name: "Non-operatingtime",
          data: [440, 550, 410, 210],
        },
        {
          name: "Operatingtime",
          data: [53, 13, 43, 32],
        },
      ],
      options: {
        chart: {
          type: "bar",
          height: 350,
          stacked: true,
          stackType: "100%",
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
        title: {
          text: "Chart machine over 80%",
          style: {
            fontSize: "18px",
            fontWeight: "bold",
            fontFamily: undefined,
            color: "#263238",
          },
        },
        xaxis: {
          categories: ["IC02R", "IC04R", "IC06R", "IC07R"],
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return val + " min";
            },
          },
        },
        fill: {
          opacity: 1,
        },
        colors: [
          "#E81616",
          "#46E816",
          // "#FF9700",
          // "#FFFB00",
          // "#003EFF",
        ],
        legend: {
          position: "bottom",
          horizontalAlign: "center",
          offsetX: 40,
        },
      },

      series2: [
        {
          name: "Non-operatingtime",
          data: [44, 55, 41, 37],
        },
        {
          name: "Operatingtime",
          data: [530, 320, 330, 520],
        },
      ],
      options2: {
        chart: {
          type: "bar",
          height: 350,
          stacked: true,
          stackType: "100%",
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
        title: {
          text: "Chart machine down 80%",
          style: {
            fontSize: "18px",
            fontWeight: "bold",
            fontFamily: undefined,
            color: "#263238",
          },
        },
        xaxis: {
          categories: ["IC01R", "IC03R", "IC05R", "IC09R"],
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return val + " min";
            },
          },
        },
        fill: {
          opacity: 1,
        },
        colors: [
          "#E81616",
          "#46E816",
          // "#FF9700",
          // "#FFFB00",
          // "#003EFF",
        ],
        legend: {
          position: "bottom",
          horizontalAlign: "center",
          offsetX: 40,
        },
      },

      series3: [
        {
          mc_no: "ic01r",
          array: [
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "1",
            "1",
            "1",
            "0",
            "1",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
          ],
        },
        {
          mc_no: "ic02r",
          array: [
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "1",
            "1",
            "0",
            "0",
            "1",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
          ],
        },
        {
          mc_no: "ic03r",
          array: [
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "1",
            "1",
            "1",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
          ],
        },
        {
          mc_no: "ic11r",
          array: [
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "1",
            "1",
            "1",
            "1",
            "0",
            "1",
            "0",
            "0",
            "0",
            "0",
          ],
        },
      ],
      // [{
      //   name: 'PRODUCT A',
      //   data: [44, 55, 41, 67, 22, 43]
      // }, {
      //   name: 'PRODUCT B',
      //   data: [13, 23, 20, 8, 13, 27]
      // }, {
      //   name: 'PRODUCT C',
      //   data: [11, 17, 15, 15, 21, 14]
      // }, {
      //   name: 'PRODUCT D',
      //   data: [21, 7, 25, 13, 22, 8]
      // }],
      options3: {
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
                  fontSize: "13px",
                  fontWeight: 900,
                },
              },
            },
          },
        },
        xaxis: {
          type: "date",
          categories: [
            "2023-08-01",
            "2023-08-02",
            "2023-08-03",
            "2023-08-04",
            "2023-08-05",
            "2023-08-06",
            "2023-08-07",
            "2023-08-08",
            "2023-08-09",
            "2023-08-10",
            "2023-08-11",
            "2023-08-12",
            "2023-08-13",
            "2023-08-14",
            "2023-08-15",
            "2023-08-16",
            "2023-08-17",
            "2023-08-18",
            "2023-08-19",
            "2023-08-20",
            "2023-08-21",
            "2023-08-22",
            "2023-08-23",
            "2023-08-24",
            "2023-08-25",
            "2023-08-26",
            "2023-08-27",
            "2023-08-28",
            "2023-08-29",
            "2023-08-30",
            "2023-08-31",
          ],
          //this.state.date_mc_over,
        },
        yaxis:{
          min: 0,
      // max: 6,
        },
        legend: {
          position: "right",
          offsetY: 40,
        },
        fill: {
          opacity: 1,
        },
      },
      series4: [
        {
          name: "PRODUCT A",
          data: [44, 55, 41, 67, 22, 43],
        },
        {
          name: "PRODUCT B",
          data: [13, 23, 20, 8, 13, 27],
        },
        {
          name: "PRODUCT C",
          data: [11, 17, 15, 15, 21, 14],
        },
        {
          name: "PRODUCT D",
          data: [21, 7, 25, 13, 22, 8],
        },
      ],
      options4: {
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
                  fontSize: "13px",
                  fontWeight: 900,
                },
              },
            },
          },
        },
        xaxis: {
          type: "datetime",
          categories: [
            "01/01/2011 GMT",
            "01/02/2011 GMT",
            "01/03/2011 GMT",
            "01/04/2011 GMT",
            "01/05/2011 GMT",
            "01/06/2011 GMT",
          ],
        },
        legend: {
          position: "right",
          offsetY: 40,
        },
        fill: {
          opacity: 1,
        },
      },
    };
  }
  componentDidMount = async () => {
    await this.getDate();
    this.getOutput_mc_over();
    // this.getOutput_data();
    console.log("Over - Down (80%)");
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
    // console.log("chart");
    // console.log(array.data.result);
    // console.log(array.data.resultDate);

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

  getOutput_mc_over = async () => {
    // console.log("getOutput_mc_over");
    const array = await httpClient.get(
      server.MC_status_daily_GD +
        "/" +
        this.state.start_date +
        "/" +
        this.state.end_date
    );
    // console.log(array.data.result_Over);
    // console.log(array.data.resultDate);

    let list_over = array.data.result_Over;
    let list_down = array.data.result_Down;
    this.setState({ data_mc_over: list_over, data_mc_down: list_down });
    let listDate = array.data.resultDate;
    this.setState({ date_mc_over: listDate });

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
    let result = await httpClient.post(
      server.Alarm_Non_Operating_GD +
        "/" +
        this.state.start_date +
        "/" +
        this.state.end_date +
        "/" +
        this.state.selectMC
    );
    // console.log(result);
    if (result.data.series[0].data[0] === undefined) {
      Swal.fire({
        icon: "error",
        text: "Can not find data!",
      }).then(() => {
        window.location.replace("../grinding_MMS_alarm");
      });
    }
  };
  render() {
    return (
      // <div className="content-wrapper">
      //   <div className="content">
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
                {/* chart non-operting time  */}
                Status
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
                  <h5>Type</h5>
                </div>
                <div className="col-1">
                  <select className="form-control">
                    <option value="B">B</option>
                    <option value="R">R</option>
                    <option value="H">H</option>
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
              <div className="row">
                <div className="col-6">
                  <div className="page-content">
                    <div id="chart">
                      <ReactApexChart
                        options={this.state.options}
                        series={this.state.series}
                        type="bar"
                        height={350}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="page-content">
                    <div id="chart">
                      <ReactApexChart
                        options={this.state.options2}
                        series={this.state.series2}
                        type="bar"
                        height={350}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <div className="page-content">
                    <div id="chart">
                      <ReactApexChart
                        options={this.state.options3}
                        series={this.state.data_mc_over}
                        type="bar"
                        height={350}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="page-content">
                    <div id="chart">
                      <ReactApexChart
                        options={this.state.options4}
                        series={this.state.series4}
                        type="bar"
                        height={350}
                      />
                    </div>
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

export default MMS_MC_COMPARE;
