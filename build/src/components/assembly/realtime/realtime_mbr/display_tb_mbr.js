import React from "react";
import ReactApexCharts from "react-apexcharts";
import { httpClient } from "../../../../utils/HttpClient";
import { server } from "../../../../constance/contance";
import moment from "moment";
import { Hourglass } from "react-loader-spinner";
import Chart_ball_usage_day from "./chart_ball_usage_day";

class Display_tb_mbr extends React.Component {
  constructor(props) {
    super(props);
    this.tick = this.tick.bind(this);
    this.state = { seconds: props.seconds };

    this.state = {
      data_table: [],
      time: this.props.time,
      seconds: "3600", //20 sec
      // seconds: "1200", //20 sec
      countitem: 0,
      loading: "on",
      start_date: moment().format("YYYY-MM-DD"),
      // start_date: moment().startOf("month").format("YYYY-MM-DD"),
      yesterday: moment().subtract(1, "days").format("YYYY-MM-DD"),
      attime: "",
    };
  }

  componentDidMount = async () => {
    await this.getOutput_table();
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

  //table production
  getOutput_table = async () => {
    const array = await httpClient.post(
      server.mms_mbrc_all_tb + "/" + this.state.start_date, // Find by date = Today
      { yesterday: this.state.yesterday }
    );
    // console.log(this.state.start_date, this.state.end_date);
    // console.log(array.data.result[0].length);
    if (array.data.result[0].length > 0) {
      this.setState({
        data_table: array.data.result[0],
        countitem: array.data.result[0].length,
        attime: array.data.result[0][0].at_time,
        loading: "off",
      });
      setTimeout(
        function () {
          this.getOutput_table();
        }.bind(this),
        300000 //5 min
        // 600000 //10 min
      );
    } else {
      setTimeout(
        function () {
          //Start the timer
          this.setState({ loading: "off" });
        }.bind(this),
        5000 //5 sec
        // 600000 //10 min
      );
    }
  };

  clear_state = () => {
    this.setState({ data_table: [] }); // clear state
  };
  renderTable = () => {
    try {
      if (this.state.data_table !== null) {
        // console.log(this.state.data_table);
        return this.state.data_table.map((item) => (
          <tr>
            <td>{item.mc_no}</td>
            <td>{item.model}</td>
            <td>{item.production_ok}</td>
            <td style={{ color: item.production_ng > 1000 ? "red" : "black" }}>
              {item.production_ng}
            </td>
            <td style={{ color: item.bg_ct }}>{item.ct}</td>
            <td style={{ color: item.bg_yield }}>{item.yield}</td>
            <td style={{ color: item.bg_utl }}>{item.UTL}</td>
            <td>{item.DT}</td>
          </tr>
        ));
      }
    } catch (error) {}
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevState.start_date !== this.state.start_date) {
      this.setState({ loading: "on" });
      this.getOutput_table();
    }
  }

  handleSearch = (event) => {
    this.setState({
      start_date: moment(event.target.value).format("YYYY-MM-DD"),
    });
  };

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
  render() {
    // console.log(this.state.ballUsage)

    //Ball
    return (
      <div className="content-wrapper">
        <section className="content">
          <div className="container-fluid">
            <div className="row-12" style={{ paddingTop: "10px" }}>
              <div className="card">
                <h4 className="card-header">Mornitoring All Machine NO.</h4>

                {/* <h5 className="card-title" style={{ color: "red", textAlign: "end" }}><b>( Total: {this.state.countitem} M/C )</b></h5> */}
                <div className="card-body">
                  <div
                    className="row justify-content-center"
                    style={{ textAlign: "center", paddingBottom: "10px" }}
                  >
                    <div className="col-auto">
                      <h5 style={{ paddingTop: "6px" }}>Select Date :</h5>
                    </div>
                    <div className="col-2">
                      <input
                        className="form-control"
                        type="date"
                        value={this.state.start_date}
                        // onChange={async (e) => {
                        //   await this.setState({
                        //     start_date: moment(e.target.value).format(
                        //       "YYYY-MM-DD"
                        //     ),
                        //   });
                        // }}
                        onChange={this.handleSearch} // เมื่อมีการเปลี่ยนแปลงของ input ให้เรียกใช้ handleSearch
                      />
                    </div>
                    <div className="col-end"></div>
                  </div>
                  <div className="row justify-content-end">
                    <div className="col-auto" style={{ color: "red" }}>
                      <b>( Total: {this.state.countitem} M/C )</b>
                    </div>
                    <div className="col-auto">
                      At time : {this.state.attime}
                    </div>
                  </div>
                  <div className="overlay-wrapper">
                    {this.loadingScreen()}
                    <div
                      className="card-body table-responsive p-0"
                      style={{ height: "450px" }}
                    >
                      <table
                        className="table table-head-fixed text-nowrap table-bordered table-hover"
                        id="tbreport"
                      >
                        <thead>
                          <tr>
                            <th>MC no</th>
                            <th>Model</th>
                            <th>
                              Production <b style={{ color: "#35FB00" }}>OK</b>{" "}
                              total (pcs)
                            </th>
                            <th>
                              Production <b style={{ color: "red" }}>NG</b>{" "}
                              total (pcs)
                            </th>
                            <th>Cycle time (sec)</th>
                            <th>Yield (%)</th>
                            <th>Utillization (%)</th>
                            <th>Down time (min)</th>
                          </tr>
                        </thead>
                        <tbody>{this.renderTable()}</tbody>
                      </table>
                    </div>
                    <small>
                      * If <b>Production NG</b> more, then 1000 show message
                      red, if <b>UTL</b> less, then 80 show message red, if{" "}
                      <b>Yield</b> less, then 80 show message red and if{" "}
                      <b>Cycle time</b> more, then 3.5 show message red.
                    </small>
                  </div>
                </div>
              </div>
            </div>
            <div className="row-12" style={{ paddingTop: "10px" }}>
              <Chart_ball_usage_day />
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Display_tb_mbr;
