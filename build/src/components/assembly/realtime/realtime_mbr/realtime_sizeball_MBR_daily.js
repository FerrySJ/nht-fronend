import React from "react";

import ReactApexCharts from "react-apexcharts";
import { httpClient } from "../../../../utils/HttpClient";
import { server } from "../../../../constance/contance";
import moment from "moment";
import Swal from "sweetalert2";
import { Hourglass } from "react-loader-spinner";

class Realtime_sizeball_MBR_daily extends React.Component {
  constructor(props) {
    super(props);
    this.tick = this.tick.bind(this);
    this.state = { seconds: props.seconds };

    this.state = {
      list_process: [],
      process: "",
      list_type_part: [],
      type_part: "",
      list_size_part: [],
      size_part: "",
      first_size: "",
      ballUsage: [],
      ballUsageTB: [],
      DateBallTB: [],
      DateBall: [],
      data_table: [],
      data_tableDaily: [],
      data_table_MD: [],
      ballUsage_Daily: [],
      DateBall_Daily: [],
      ballStock_All: [],
      DateBall_Stock: [],
      start_date: moment().startOf("month").format("YYYY-MM-DD"),
      end_date: moment().endOf("month").format("YYYY-MM-DD"),
      time: this.props.time,
      seconds: "1200",
      countitem: 0,
      txt: "Ball usage Daily of " + moment().format("MMMM") ,
      loading: "on",
    };
  }

  componentDidMount = async () => {
    // console.log(moment().format("MMMM"));
    await this.getDate();
    await this.get_master_process();
    await this.Click_value_ball_size();
    // await this.value_ball_size();
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
      yesterday: moment().subtract(1, "days").format("YYYY-MM-DD"),
      end_yesterday: moment().subtract(1, "days").format("YYYY-MM-DD"),
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

  loadingScreen() {
    if (this.state.loading === "on") {
      return (
        <div className="overlay">
          {/* <img src="dist/img/dots-loading.gif" style={{maxWidth: "45px"}} /> */}

          <Hourglass
            visible={true}
            height="80"
            width="80"
            ariaLabel="hourglass-loading"
            wrapperStyle={{}}
            wrapperclassName=""
            colors={["#306cce", "#72a1ed"]}
          />
        </div>
      );
    }
  }
  get_master_process = async () => {
    const array = await httpClient.get(server.master_process);
    // console.log(array.data.result[0].process);
    await this.setState({
      list_process: array.data.result,
      process: array.data.result[0].process,
    });
    // console.log("==>", this.state.process);
    await this.get_master_type(array.data.result[0].process);
    await this.get_master_size(array.data.result[0].process);
  };

  get_master_size = async (aa) => {
    // console.log("get_master_size", aa, this.state.process);
    const array = await httpClient.post(server.master_size, {
      process: aa, //this.state.process,
    });
    // console.log("---- llllll ----");
    // console.log(array.data.result_size);
    //  this.setState({ list_size_part: array.data.result_size ,first_size: array.data.result_size[1].size });
    await new Promise((accept) =>
      this.setState(
        {
          list_size_part: array.data.result_size,
          size_part: array.data.result_size[0].size,
        },
        accept
      )
    );
    // console.log(this.state.first_size);
    // return this.state.first_size
  };

  get_master_type = async (aa) => {
    console.log("m type",aa, this.state.process);
    const array = await httpClient.post(server.master_type, {
      process: aa//this.state.process,
    });
    // console.log("--------------");
    // console.log(array.data.result_type);
    await new Promise((accept) =>
      this.setState(
        {
          list_type_part: array.data.result_type,
          type_part: array.data.result_type[0].type,
        },
        accept
      )
    );
    // console.log(this.state.first_size);
    // return this.state.first_size
  };

  renderOption_process = () => {
    try {
      if (this.state.list_process !== null) {
        const myResult = this.state.list_process;
        return myResult.map((item) => <option>{item.process}</option>);
      }
    } catch (error) {}
  };

  renderOption_size_part = () => {
    try {
      if (this.state.list_size_part !== null) {
        const myResult = this.state.list_size_part;
        return myResult.map((item) => <option>{item.size}</option>);
      }
    } catch (error) {}
  };

  renderOption_type_part = () => {
    try {
      if (this.state.list_type_part !== null) {
        const myResult = this.state.list_type_part;
        return myResult.map((item) => <option>{item.type}</option>);
      }
    } catch (error) {}
  };

  Click_value_ball_size = async () => {
    // console.log("click");
    // console.log("click size => ",this.state.size_part);
    if (this.state.process === "MA") {
      // console.log("click MA");
      const array = await httpClient.post(
        server.realtime_MBRC_Ball_Size_MA_URL +
          "/" +
          this.state.start_date +
          "/" +
          this.state.end_date,
        { size: this.state.size_part,type: this.state.type_part }
      );
      // console.log(array.data.resultBall);
      // console.log(array.data.resultBall[0].data.length);
      // console.log(array.data.result);
      if (array.data.result ==="NO DATA") {
        Swal.fire({
          icon: "warning",
          title:
            "ไม่พบข้อมูล Type : " +
            this.state.type_part ,
          showConfirmButton: false,
          timer: 1500,
        });
        await this.clear_state();
        // window.location.reload();
      }
      else{
        if (array.data.result[1] === 0) {
          // if (array.data.resultBall[0].data.length === 0) {
          Swal.fire({
            icon: "warning",
            title:
              "ไม่พบข้อมูล Process : " +
              this.state.process +
              " และ SIZE : " +
              this.state.size_part,
            showConfirmButton: false,
            timer: 1500,
          });
          await this.clear_state();
        } else {
          console.log("click MD");
          let listUsageBall_All = array.data.resultBall;
          this.setState({
            ballUsage_Daily: listUsageBall_All,
            data_tableDaily: array.data.result[0],
            loading: "off",
          });
          let listDateBall = array.data.resultDateBall;
          this.setState({ DateBall_Daily: listDateBall });
          // console.log(this.state.ballUsage_Daily);
        }

      }

    } else {
      const array = await httpClient.post(
        server.realtime_MBRC_Ball_Size_MD_URL +
          "/" +
          this.state.start_date +
          "/" +
          this.state.end_date,
        { size: this.state.size_part }
      );
      // console.log(array.data.result.length);
      if (array.data.result[1] === 0) {
        Swal.fire({
          icon: "warning",
          title:
            "ไม่พบข้อมูล Process : " +
            this.state.process +
            "ไม่พบข้อมูล SIZE : " +
            this.state.size_part,
          showConfirmButton: false,
          timer: 1500,
        });
        await this.clear_state();
      } else {
        let listUsageBall_All = array.data.resultBall;
        this.setState({
          ballUsage_Daily: listUsageBall_All,
          data_tableDaily: array.data.result[0],
          loading: "off",
        });
        let listDateBall = array.data.resultDateBall;
        this.setState({ DateBall_Daily: listDateBall });
      }
    }
    setTimeout(
      function () {
        //Start the timer
        this.Click_value_ball_size();
      }.bind(this),
      600000 //10 min
    );
  };
  value_ball_size = async () => {
    // console.log("size => ",this.state.first_size);
    if (this.state.process === "MA") {
      // console.log("no click MA");
      const array = await httpClient.post(
        server.realtime_MBRC_Ball_Size_MA_URL +
          "/" +
          this.state.start_date +
          "/" +
          this.state.end_date,
        { size: this.state.first_size }
      );
      if (array.data.result.length === 0) {
        // if (array.data.resultBall[0].data.length === 0) {
        Swal.fire({
          icon: "warning",
          title:
            "ไม่พบข้อมูล Process : " +
            this.state.process +
            "ไม่พบข้อมูล SIZE : " +
            this.state.size_part,
          showConfirmButton: false,
          timer: 1500,
        });
        await this.clear_state();
      } else {
        console.log("no click MD");
        let listUsageBall_All = array.data.resultBall;
        this.setState({
          ballUsage_Daily: listUsageBall_All,
          data_tableDaily: array.data.result[0],
          loading: "off",
        });
        let listDateBall = array.data.resultDateBall;
        this.setState({ DateBall_Daily: listDateBall });
        // console.log(this.state.ballUsage_Daily);
      }
    } else {
      const array = await httpClient.post(
        server.realtime_MBRC_Ball_Size_MD_URL +
          "/" +
          this.state.start_date +
          "/" +
          this.state.end_date,
        { size: this.state.first_size }
      );
      // console.log(array.data.result.length);
      if (array.data.result.length === 0) {
        Swal.fire({
          icon: "warning",
          title:
            "ไม่พบข้อมูล Process : " +
            this.state.process +
            "ไม่พบข้อมูล SIZE : " +
            this.state.size_part,
          showConfirmButton: false,
          timer: 1500,
        });
        await this.clear_state();
      } else {
        let listUsageBall_All = array.data.resultBall;
        this.setState({
          ballUsage_Daily: listUsageBall_All,
          data_tableDaily: array.data.result[0],
          loading: "off",
        });
        let listDateBall = array.data.resultDateBall;
        this.setState({ DateBall_Daily: listDateBall });
      }
    }
    setTimeout(
      function () {
        //Start the timer
        this.value_ball_size();
      }.bind(this),
      600000 //10 min
    );
  };
  clear_state = () => {
    this.setState({
      ballUsage_Daily: [],
      data_tableDaily: [],
      DateBall_Daily: [],
      loading: "on",
    }); // clear state
  };

  renderTableByDaily = () => {
    try {
      if (this.state.data_tableDaily !== null) {
        // console.log(this.state.data_table);
        return this.state.data_tableDaily.map((item) => (
          <tr>
            <td>{item.mfg_date}</td>
            <td>{item.totalSize10}</td>
            <td>{item.totalSize20}</td>
            <td>{item.totalSize30}</td>
            <td>{item.totalSize40}</td>
            <td>{item.totalSize50}</td>
          </tr>
        ));
      }
    } catch (error) {}
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
                  Daily: Ball usage (%)
                </div>
                <div className="card-body">
                  <div
                    className="row justify-content-center"
                    style={{ textAlign: "center", paddingBottom: "10px" }}
                  >
                     <div className="col-auto">
                    <h5 style={{ paddingTop: "6px" }}>Start Date :</h5>
                  </div>
                  <div className="col-1">
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
                  <div className="col-auto">
                    <h5 style={{ paddingTop: "6px" }}>End Date :</h5>
                  </div>
                  <div className="col-1">
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
                    <div className="col-auto">
                      <h5 style={{ paddingTop: "6px" }}>Process :</h5>
                    </div>
                    <div className="col-1">
                      <select
                        value={this.state.process}
                        className="form-control"
                        onChange={async (e) => {
                          await this.setState({ process: e.target.value });
                          await this.get_master_type(this.state.process);
                          await this.get_master_size(this.state.process);
                        }}
                      >
                        {this.renderOption_process()}
                      </select>
                    </div>
                    <div className="col-auto">
                      <h5>Type :</h5>
                    </div>
                    <div className="col-1">
                      <select
                        value={this.state.type_part}
                        className="form-control"
                        onChange={(e) => {
                          this.setState({ type_part: e.target.value });
                        }}
                      >
                        {/* <option value="DD">DD</option>
                        <option value="SUJ">SUJ</option> */}
                        {this.renderOption_type_part()}
                      </select>
                    </div>
                    <div className="col-auto">
                      <h5>Size :</h5>
                    </div>
                    <div className="col-1">
                      <select
                        value={this.state.size_part}
                        className="form-control"
                        onChange={(e) => {
                          this.setState({ size_part: e.target.value });
                        }}
                      >
                        {/* <option>---</option> */}
                        {this.renderOption_size_part()}
                      </select>
                    </div>

                    <div className="col-1">
                      <button
                        type="submit"
                        className="btn btn-primary"
                        onClick={async (e) => {
                          await this.clear_state();
                          e.preventDefault();
                          await this.Click_value_ball_size();
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
                              horizontal: false,
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
                            categories: this.state.DateBall_Daily,
                          },
                          yaxis: [
                            {
                              labels: {
                                style: {
                                  colors: "black",
                                  fontSize: "20px",
                                  fontWeight: "bold",
                              rotate: -45,
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
                                return val;
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
                              // console.log(seriesName);
                              return seriesName;
                              // if (seriesName === "BALL SIZE -5.0") {
                              //   return ["BALL SIZE -5.0"];
                              // }
                              // if (seriesName === "BALL SIZE -2.5") {
                              //   return ["BALL SIZE -2.5"];
                              // }
                              // if (seriesName === "BALL SIZE 0.0") {
                              //   return ["BALL SIZE 0.0"];
                              // }
                              // if (seriesName === "BALL SIZE +2.5") {
                              //   return ["BALL SIZE +2.5"];
                              // }
                              // if (seriesName === "BALL SIZE +5.0") {
                              //   return ["BALL SIZE +5.0"];
                              // }
                            },
                          },
                        }}
                        series={this.state.ballUsage_Daily}
                        type="bar"
                        height={400}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row-12">
              <div className="card">
              <h3 className="card-header">
              Data Daily
              {/* <ReactHTMLTableToExcel
                      id="test-table-xls-button"
                      className="col-1 btn btn-secondary btn-block float-right"
                      // className="download-table-xls-button"
                      table="tbreport"
                      // table="table-to-xls"
                      filename={this.state.txt} 
                      sheet={this.state.data_tableDaily} 
                      buttonText="Export Excel"
                    /> */}
  </h3>
                <div className="card-body">
                  <div
                    className="card-body table-responsive p-0"
                    style={{ height: "400px" }}
                  >
                    <div className="overlay-wrapper">
                      {this.loadingScreen()}
                      <table
                        className="table table-head-fixed text-nowrap table-bordered table-hover"
                        id="tbreport"
                      >
                        <thead>
                          <tr>
                            <th>mfg_date</th>
                            <th>BALL SIZE -5.0</th>
                            <th>BALL SIZE -2.5</th>
                            <th>BALL SIZE +0.0</th>
                            <th>BALL SIZE +2.5</th>
                            <th>BALL SIZE +5.0</th>
                          </tr>
                        </thead>
                        <tbody>{this.renderTableByDaily()}</tbody>
                      </table>
                    </div>
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

export default Realtime_sizeball_MBR_daily;
