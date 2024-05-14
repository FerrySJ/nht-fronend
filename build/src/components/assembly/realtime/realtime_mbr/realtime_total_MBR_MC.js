import React from "react";

import ReactApexCharts from "react-apexcharts";
import { httpClient } from "../../../../utils/HttpClient";
import { server } from "../../../../constance/contance";
import moment from "moment";

class Realtime_total_MBR_MC extends React.Component {
  constructor(props) {
    super(props);
    this.tick = this.tick.bind(this);
    this.state = { seconds: props.seconds };

    this.state = {
      list_process: [],
      process: "",
      list_size_part: [],
      size_part: "",
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
      time: this.props.time,
      seconds: "1200",
      countitem: 0,
      txt:
        "Amount of ball usage By Machine" +
        moment().add(-1, "days").format("YYYY-MM-DD"),
        
    };
  }

  componentDidMount = async () => {
    // console.log(moment().add(-1, "month").format("YYYY-MM"));
    await this.getDate();
    await this.get_master_process();
    await this.getOutput_ball_All();
    // await this.getStock_ball_onHand();
    await this.getOutput_ball();
    await this.getOutput_ball_table();
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
  get_master_process = async () => {
    const array = await httpClient.post(server.master_size);
    // console.log(array.data.result[0].process);
    await this.setState({
      list_process: array.data.result,
      process: array.data.result[0].process,
    });
    await this.get_master_size();
  };
  get_master_size = async () => {
    console.log("process", this.state.process);
    const array = await httpClient.post(server.master_size, {
      process: this.state.process,
    });
    console.log(array.data.result_size);
    this.setState({ list_size_part: array.data.result_size });
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
  //chart ball daily
  getOutput_ball = async () => {
    const array = await httpClient.get(
      server.realtime_MBRC_Ball_URL +
        "/" +
        // this.state.start_date
        this.state.start_date_def +
        "/" +
        this.state.end_date_def
      // this.state.end_date
    );
    console.log("getOutput_ball");
    // console.log(this.state.start_date, this.state.end_date);
    // console.log(array.data.resultBall);
    // console.log(array.data.result_mcname);
    // console.log(array.data.resultDateBall);

    let listUsageBall = array.data.resultBall;
    this.setState({ ballUsage: listUsageBall }); //, data_table: array.data.result[0]
    let listUsageMC_name = array.data.result_mcname;
    this.setState({ mcno: listUsageMC_name });
    let listDateBall = array.data.resultDateBall;
    this.setState({ DateBall: listDateBall });

    setTimeout(
      function () {
        //Start the timer
        this.getOutput_ball();
      }.bind(this),
      600000 //10 min
    );
  };
  //table ball daily
  getOutput_ball_table = async () => {
    const array = await httpClient.get(
      server.realtime_MBRC_Ball_tb_URL +
        "/" +
        // this.state.start_date
        this.state.yesterday
      // +
      // "/" +
      // this.state.end_date_def
    );

    // console.log(array.data.result[0]);
    // console.log(array.data.result[0][0].mfg_date);
    // console.log("ball daily");
    // console.log(this.state.start_date, this.state.end_date);

    let listUsageBall = array.data.resultBall;

    this.setState({
      ballUsageTB: listUsageBall,
      data_table: array.data.result[0],
      countitem: array.data.result[0].length,
      data_date: array.data.result[0][0].mfg_date,
    });
    let listUsageMC_name = array.data.result_mcname;
    this.setState({ mcnoTB: listUsageMC_name });
    let listDateBall = array.data.resultDateBall;
    this.setState({ DateBallTB: listDateBall });

    setTimeout(
      function () {
        //Start the timer
        this.getOutput_ball_table();
      }.bind(this),
      600000 //10 min
    );
  };
  //table ball daily
  getOutput_ball_All = async () => {
    const array = await httpClient.get(
      server.realtime_MBRC_Ball_Daily_URL +
        "/" +
        this.state.start_date +
        "/" +
        this.state.end_date
    );

    // console.log(array.data.result);

    let listUsageBall_All = array.data.resultBall;
    this.setState({
      ballUsage_Daily: listUsageBall_All,
      data_tableDaily: array.data.result[0],
    });
    let listDateBall = array.data.resultDateBall;
    this.setState({ DateBall_Daily: listDateBall });
    // console.log(this.state.ballUsage_Daily);

    setTimeout(
      function () {
        //Start the timer
        this.getOutput_ball_All();
      }.bind(this),
      600000 //10 min
    );
  };
  Click_getOutput_ball = async () => {
    const array = await httpClient.get(
      server.realtime_MBRC_Ball_URL +
        "/" +
        this.state.start_date_def +
        "/" +
        this.state.end_date_def
    );
    console.log("Click ball daily");
    // console.log(this.state.datetoday);
    // console.log(array.data.resultBall);
    // console.log(array.data.result_mcname);
    // console.log(array.data.resultDateBall);

    let listUsageBall = array.data.resultBall;
    this.setState({ ballUsage: listUsageBall });
    let listUsageMC_name = array.data.result_mcname;
    this.setState({ mcno: listUsageMC_name });
    let listDateBall = array.data.resultDateBall;
    this.setState({ DateBall: listDateBall });
  };
  Click_value_ball = async () => {
    const array = await httpClient.get(
      server.realtime_MBRC_Ball_tb_URL +
        "/" +
        // this.state.start_date
        this.state.yesterday
      // +
      // "/" +
      // this.state.end_yesterday
    );
    console.log("click value");

    this.setState({
      data_table: array.data.result[0],
      mfg_date: array.data.result[0].mfg_date,
      data_date: array.data.result[0][0].mfg_date,
    });
  };
  Click_value_ball_size = async () => {
    console.log("Click_value_ball_size");
    if (this.state.process === "MA") {
      const array = await httpClient.post(
        server.realtime_MBRC_Ball_Size_MA_URL + "/" + this.state.start_date + "/" + this.state.end_date
      );
      console.log("click value");
      this.setState({
        data_table: array.data.result[0],
        mfg_date: array.data.result[0].mfg_date,
        data_date: array.data.result[0][0].mfg_date,
      });
    } else {
      const array = await httpClient.post(
        server.realtime_MBRC_Ball_Size_MD_URL + "/" + this.state.yesterday
      );
      console.log("click value");

      this.setState({
        data_table: array.data.result[0],
        mfg_date: array.data.result[0].mfg_date,
        data_date: array.data.result[0][0].mfg_date,
      });
    }
  };
  clear_state = () => {
    this.setState({ ballUsage: [] }); // clear state
  };
  renderTableByMC = () => {
    try {
      if (this.state.data_table !== null) {
        // console.log(this.state.data_table);
        return this.state.data_table.map((item) => (
          <tr>
            <td>{item.mc_no}</td>
            <td>{item.model}</td>
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
                  {/* Total: Ball usage (%) */}
                  {this.state.datetoday} : Ball usage (%) by Machine
                </div>
                {/* <div
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
                      value={this.state.start_date_def}
                      onChange={async (e) => {
                        await this.setState({
                          start_date_def: moment(e.target.value).format("YYYY-MM-DD"),
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
                      value={this.state.end_date_def}
                      onChange={async (e) => {
                        await this.setState({
                          end_date_def: moment(e.target.value).format("YYYY-MM-DD"),
                        });
                      }}
                    />
                  </div>

                  <div className="col-1">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      onClick={async (e) => {
                        await this.clear_state();
                        e.preventDefault();
                        await this.Click_getOutput_ball();
                      }}
                    >
                      submit
                    </button>
                  </div>
                </div> */}
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
                          categories: this.state.mcno,
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
                              return val + "pcs";
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
                      series={this.state.ballUsage}
                      type="bar"
                      height={500}
                    />
                  </div>
                </div>
              </div>
            </div>
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
                      <h5 style={{ paddingTop: "6px" }}>Process :</h5>
                    </div>
                    <div className="col-2">
                      <select
                        value={this.state.process}
                        className="form-control"
                        onChange={async (e) => {
                          await this.setState({ process: e.target.value });
                          this.get_master_size();
                        }}
                      >
                        {this.renderOption_process()}
                      </select>
                    </div>
                    <div className="col-1">
                      <h5>Size :</h5>
                    </div>
                    <div className="col-2">
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
                          // await this.clear_state();
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
                            categories: this.state.DateBall_Daily,
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
                  Amount of ball usage By Machine{" "}
                </h3>

                {/* <h5 className="card-title" style={{ color: "red", textAlign: "end" }}><b>( Total: {this.state.countitem} M/C )</b></h5> */}
                <div className="card-body">
                  <div
                    className="row justify-content-center"
                    style={{ textAlign: "center", paddingBottom: "10px" }}
                  >
                    <div className="col-auto">
                      <h5 style={{ paddingTop: "6px" }}>Date :</h5>
                    </div>
                    <div className="col-2">
                      <input
                        className="form-control"
                        type="date"
                        value={this.state.yesterday}
                        onChange={async (e) => {
                          await this.setState({
                            yesterday: moment(e.target.value).format(
                              "YYYY-MM-DD"
                            ),
                          });
                        }}
                      />
                    </div>

                    {/* <div className="col-1">
                      <h5>End Date</h5>
                    </div>
                    <div className="col-2">
                      <input
                        className="form-control"
                        type="date"
                        value={this.state.end_yesterday}
                        onChange={async (e) => {
                          await this.setState({
                            end_yesterday: moment(e.target.value).format(
                              "YYYY-MM-DD"
                            ),
                          });
                        }}
                      />
                    </div> */}

                    <div className="col-1">
                      <button
                        type="submit"
                        className="btn btn-primary"
                        onClick={async (e) => {
                          await this.clear_state();
                          e.preventDefault();
                          await this.Click_value_ball();
                        }}
                      >
                        submit
                      </button>
                    </div>
                  </div>
                  <div
                    className="row justify-content-end"
                    style={{ padding: "10px" }}
                  >
                    <h6
                      className="col-auto"
                      style={{ color: "red", paddingTop: "8px" }}
                    >
                      <b>( Total: {this.state.countitem} M/C )</b>
                    </h6>
                    <div className="col-auto">
                    
                      {/* <ReactHTMLTableToExcel
                        id="test-table-xls-button"
                        className="btn btn-secondary btn-block"
                        // className="download-table-xls-button"
                        table="tbreport"
                        // table="table-to-xls"
                        filename={this.state.txt} //"data test file ball"
                        sheet={this.state.data_date} //{moment().add(-1, "days").format("YYYY-MM-DD")}
                        buttonText="Export Excel"
                      /> */}
                      {/* <ExcelFile
                      element={
                        <button className="btn btn-secondary btn-block" >
                          <i className="fas fa-table"></i>
                          &nbsp; Export Excel
                        </button>
                      }
                      filename={this.state.txt}
                      // fileExtension="XLSX"
                    >
                    </ExcelFile> */}
                    </div>
                  </div>
                  <div
                    className="card-body table-responsive p-0"
                    style={{ height: "350px" }}
                  >
                    <table
                      className="table table-head-fixed text-nowrap table-bordered table-hover"
                      id="tbreport"
                    >
                      <thead>
                        <tr>
                          <th>MC no</th>
                          <th>Model</th>
                          <th>BALL SIZE -5.0</th>
                          <th>BALL SIZE -2.5</th>
                          <th>BALL SIZE +0.0</th>
                          <th>BALL SIZE +2.5</th>
                          <th>BALL SIZE +5.0</th>
                        </tr>
                      </thead>
                      <tbody>{this.renderTableByMC()}</tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="row-12">
              <div className="card">
                <h3 className="card-header">Daily</h3>
                <div className="card-body">
                  <div
                    className="card-body table-responsive p-0"
                    style={{ height: "350px" }}
                  >
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
        </section>
      </div>
    );
  }
}

export default Realtime_total_MBR_MC;
