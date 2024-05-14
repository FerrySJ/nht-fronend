import React from "react";
import ReactApexCharts from "react-apexcharts";
import { httpClient } from "../../../../utils/HttpClient";
import { server } from "../../../../constance/contance";
import moment from "moment";
import Swal from "sweetalert2";
import { Hourglass } from "react-loader-spinner";

class Realtime_sizeball_MBR_Monthly extends React.Component {
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
      year: "", //moment().format("YYYY"),
      list_year: [],
      monthly_ball: [],
      ballUsage_Monthly:[],
      data_tableDaily:[],
      time: this.props.time,
      seconds: "1200",
      countitem: 0,
      loading: "on",
    };
  }

  componentDidMount = async () => {
    // console.log(moment().format("YYYY"));
    await this.get_year();
    await this.get_master_process();
    // await this.Click_value_ball_size();
    // this.timer = setInterval(this.tick, 1000);
  };

  tick() {
    if (this.state.seconds > 0) {
      this.setState({ seconds: this.state.seconds - 1 });
    } else {
      clearInterval(this.timer);
      window.location.reload();
    }
  }

  get_year = async () => {
    const array = await httpClient.get(server.master_year);
    // console.log(array.data.result[0]);
    this.setState({
      list_year: array.data.result,
      year: array.data.result[0].year,
    });
  };

  get_master_process = async () => {
    const array = await httpClient.get(server.master_process);
    console.log(array.data.result[0].process);
    await this.setState({
      list_process: array.data.result,
      process: array.data.result[0].process,
    });
    console.log("==>", this.state.process);
    await this.get_master_type(array.data.result[0].process);
    await this.get_master_size(array.data.result[0].process);
  };

  get_master_size = async (aa) => {
    console.log("get_master_size", aa, this.state.process);
    const array = await httpClient.post(server.master_size, {
      process: aa, //this.state.process,
    });
    console.log("---- llllll ----");
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
    console.log("m type", aa, this.state.process);
    const array = await httpClient.post(server.master_type, {
      process: aa, //this.state.process,
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

  renderOption_year = () => {
    try {
      if (this.state.list_year !== null) {
        const myResult = this.state.list_year;
        return myResult.map((item) => <option>{item.year}</option>);
      }
    } catch (error) {}
  };

  Click_value_ball_size = async () => {
    // console.log("click");
    // console.log("click size => ",this.state.size_part);
    if (this.state.process === "MA") {
      // console.log("click MA");
      const array = await httpClient.post(
        server.realtime_MBRC_Ball_Monthly_MA + "/" + this.state.year,
        { size: this.state.size_part, type: this.state.type_part }
      );
      // console.log(array.data.resultBall[0].data.length);
      // console.log(array.data.result[1])
      console.log(array.data);
      if (array.data.result === "NO DATA") {
        Swal.fire({
          icon: "warning",
          title: "ไม่พบข้อมูล Type : " + this.state.type_part,
          showConfirmButton: false,
          timer: 1500,
        });
        // await this.clear_state();
        // window.location.reload();
      } else {
        console.log("=========1==========");
        // if (array.data.result[1] === 0) {
        //     // if (array.data.resultBall[0].data.length === 0) {
        // console.log("=========2==========")
        // Swal.fire({
        //       icon: "warning",
        //       title:
        //         "ไม่พบข้อมูล Process : " +
        //         this.state.process +
        //         " และ SIZE : " +
        //         this.state.size_part,
        //       showConfirmButton: false,
        //       timer: 1500,
        //     });
        //     await this.clear_state();
        //   } else {
        console.log("=========3==========");
        console.log("click MD");
        console.log(array.data);
        this.setState({
          ballUsage_Monthly: array.data.resultBall_All,
          data_tableDaily: array.data.result[0],
          monthly_ball: array.data.resultDateBall_All,
          loading: "off", });
        console.log("===================");
        console.log(this.state.ballUsage_Monthly);
        console.log(this.state.data_tableDaily);
        console.log(this.state.monthly_ball);
      }
    }

    // }

    setTimeout(
      function () {
        //Start the timer
        this.Click_value_ball_size();
      }.bind(this),
      600000 //10 min
    );
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
                      <h5 style={{ paddingTop: "6px" }}>Year :</h5>
                    </div>
                    <div className="col-1">
                      <select
                        value={this.state.year}
                        className="form-control"
                        onChange={async (e) => {
                          await this.setState({ year: e.target.value });
                        }}
                      >
                        {this.renderOption_year()}
                      </select>
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
                            categories: this.state.monthly_ball,
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
                            },
                          },
                        }}
                        series={this.state.ballUsage_Monthly}
                        type="bar"
                        height={400}
                      />
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

export default Realtime_sizeball_MBR_Monthly;
