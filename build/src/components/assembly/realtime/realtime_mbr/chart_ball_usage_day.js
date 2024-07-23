import React from "react";
import ReactApexCharts from "react-apexcharts";
import { httpClient } from "../../../../utils/HttpClient";
import { server } from "../../../../constance/contance";
import moment from "moment";
import Swal from "sweetalert2";
import { Hourglass } from "react-loader-spinner";

class Chart_ball_usage_day extends React.Component {
  constructor(props) {
    super(props);
    // this.tick = this.tick.bind(this);
    // this.state = { seconds: props.seconds };

    this.state = {

      mcno: [],
      ballUsage: [],
      count_mc: 0,
      DateBall: [],
      list_process: [],
      process: "",
      list_size_part: [],
      size_part: "",
      list_type_part: [],
      type_part: "",
      seconds: "1200",
      loading: "on",
      datetoday: moment().format("YYYY-MM-DD"),
    };
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
  tick() {
    if (this.state.seconds > 0) {
      this.setState({ seconds: this.state.seconds - 1 });
    } else {
      clearInterval(this.timer);
      window.location.reload();
    }
  }
  componentDidMount = async () => {
    await this.get_master_process();
    await this.get_master_size();
    await this.Click_value_ball_size();
    // this.timer = setInterval(this.tick, 1000);
  };
  Click_value_ball_size = async () => {
    // console.log("click size => ", this.state.size_part, this.state.type_part);
    if (this.state.process === "MA") {
      console.log("click MA");
      const array = await httpClient.post(
        server.realtime_MBRC_Ball_Size_MA +
          "/" +
          moment().format("YYYY-MM-DD") +
          "/" +
          moment().format("YYYY-MM-DD"),
        { size: this.state.size_part, type: this.state.type_part }
      );
      
      if (array.data.result === "NO DATA") { //check type
        Swal.fire({
          icon: "warning",
          title: "ไม่พบข้อมูล ", //Type : "+ this.state.type_part +" และ Size : "+this.state.type_part,
          text:
            "Type : " +
            this.state.type_part +
            " และ Size : " +
            this.state.size_part,
          showConfirmButton: false,
          timer: 1800,
        });
        await this.clear_state();
        // window.location.reload();
      } else {
        if (array.data.result[1] === 0) {
          Swal.fire({
            icon: "warning",
            title: "ไม่พบข้อมูล ", //Type : "+ this.state.type_part +" และ Size : "+this.state.type_part,
            text:
              "Type : " +
              this.state.type_part +
              " และ Size : " +
              this.state.size_part,
            showConfirmButton: false,
            timer: 1800,
          });
          await this.clear_state();
        } else {
        this.setState(
          {
            ballUsage: array.data.resultBall,
            count_mc: array.data.result[1],
            mcno: array.data.result_mcname,
            DateBall: array.data.resultDateBall,
          }
          // ,
          //     accept
        );
      }
    }
    } else {
      
      const array = await httpClient.post(
        server.realtime_MBRC_Ball_Size_MD +
          "/" +
          moment().format("YYYY-MM-DD") +
          "/" +
          moment().format("YYYY-MM-DD"),
        { size: this.state.size_part, type: this.state.type_part }
      );
      
      if (array.data.result === "NO DATA") {
        Swal.fire({
          icon: "warning",
          title: "ไม่พบข้อมูล ", //Type : "+ this.state.type_part +" และ Size : "+this.state.type_part,
          text:
            "Type : " +
            this.state.type_part +
            " และ Size : " +
            this.state.size_part,
          showConfirmButton: false,
          timer: 1800,
        });
        await this.clear_state();
        // window.location.reload();
      } else {
        if (array.data.result[1] === 0) {
          Swal.fire({
            icon: "warning",
            title: "ไม่พบข้อมูล ", //Type : "+ this.state.type_part +" และ Size : "+this.state.type_part,
            text:
              "Type : " +
              this.state.type_part +
              " และ Size : " +
              this.state.size_part,
            showConfirmButton: false,
            timer: 1800,
          });
          await this.clear_state();
        } else {
        // console.log("array.data.result[1]", array.data.result[1]);
        // await new Promise((accept) =>
        this.setState(
          {
            ballUsage: array.data.resultBall,
            count_mc: array.data.result[1],
            mcno: array.data.result_mcname,
            DateBall: array.data.resultDateBall,
          }
          // ,
          //     accept
        );
      }
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

  clear_state = () => {
    this.setState({
      mcno: [],
      ballUsage: [],
      count_mc: 0,
      // type_part: "",
    }); // clear state
  };
  get_master_process = async () => {
    const array = await httpClient.get(server.master_process);
    await this.setState({
      list_process: array.data.result,
      process: array.data.result[0].process,
    });
    await this.get_master_type(array.data.result[0].process);
    await this.get_master_size(array.data.result[0].process);
  };

  get_master_size = async (aa) => {
    console.log("get_master_size", aa, this.state.process);
    const array = await httpClient.post(server.master_size, {
      process: this.state.process,
    });

    await new Promise((accept) =>
      this.setState(
        {
          list_size_part: array.data.result_size,
          size_part: array.data.result_size[0].size,
        },
        accept
      )
    );
  };

  get_master_type = async (aa) => {
    console.log("m type", aa, this.state.process);
    const array = await httpClient.post(server.master_type, {
      process: aa, //this.state.process,
    });
    // console.log("--------------");
    await new Promise((accept) =>
      this.setState(
        {
          list_type_part: array.data.result_type,
          type_part: array.data.result_type[0].type,
        },
        accept
      )
    );
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

  render() {
    //Ball
    return (
            <div className="row-12">
            <div className="card">
                <div
                  className="card-header"
                  style={{
                    marginBottom: "0",
                    fontWeight: 600,
                    fontSize: 18 ,//"2rem",
                  }}
                >
                  {/* Total: Ball usage (%) */}
                  {this.state.datetoday} : Realtime Ball usage (%) by Machine
                </div>
                <div className="card-body">
                <div
                  className="row justify-content-center"
                  style={{ textAlign: "center", paddingBottom: "10px" }}
                >
                  <div className="col-auto">
                    <h6 style={{ paddingTop: "6px" }}>Process :</h6>
                  </div>
                  <div className="col-2">
                    <select
                      value={this.state.process}
                      className="form-control form-control-sm"
                      onChange={async (e) => {
                        await this.setState({ process: e.target.value });
                        await this.get_master_type(this.state.process);
                        await this.get_master_size(this.state.process);
                      }}
                    >
                      {this.renderOption_process()}
                    </select>
                  </div>
                  <div className="col-1">
                    <h6>Type :</h6>
                  </div>
                  <div className="col-1">
                    <select
                      value={this.state.type_part}
                      className="form-control form-control-sm"
                      onChange={(e) => {
                        this.setState({ type_part: e.target.value });
                      }}
                    >
                      {this.renderOption_type_part()}
                    </select>
                  </div>
                  <div className="col-1">
                    <h6>Size :</h6>
                  </div>
                  <div className="col-2">
                    <select
                      value={this.state.size_part}
                      className="form-control form-control-sm"
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
                      className="btn btn-primary btn-sm"
                      onClick={async (e) => {
                        // await this.clear_state();
                        e.preventDefault();
                        await this.Click_value_ball_size();
                        // console.log(this.state.process,this.state.type_part,this.state.size_part)
                      }}
                    >
                      submit
                    </button>
                  </div>
                  <b
                    className="col-auto"
                    style={{ color: "red", paddingTop: "0px" }}
                  >
                    ( Online: {this.state.count_mc} M/C ) 
                    {/* <br/> Data at time :                    */}
                    </b>
                </div>

                <div id="chart">
                  {/* <div className="overlay-wrapper"> */}
                    {/* {this.loadingScreen()} */}
                    <ReactApexCharts
                      options={{
                        chart: {
                          type: "bar",
                          height: 400,
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
                          colors: ["#E5E1E1"],
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
                          },
                        },
                      }}
                      series={this.state.ballUsage}
                      type="bar"
                      height={500}
                    />
                  {/* </div> */}
                </div>
              </div>
              </div>
            </div>
    );
  }
}

export default Chart_ball_usage_day;
