/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-pascal-case */
import React from "react";
import { httpClient } from "../../../utils/HttpClient";
import { server } from "../../../constance/contance";
import moment from "moment";
import { Hourglass } from "react-loader-spinner";
import Swal from "sweetalert2";

class Table_status_mc_UTL extends React.Component {
  constructor(props) {
    super(props);
    this.tick = this.tick.bind(this);
    this.state = { seconds: props.seconds };

    this.state = {
      start_date: moment().format("YYYY-MM-DD"),
      // start_date: moment().startOf("month").format("YYYY-MM-DD"),
      end_date: moment().endOf("month").format("YYYY-MM-DD"),
      data_table: [],
      data_mc: [],
      data_status: [],
      time: this.props.time,
      seconds: "1200",
      loading: "on",
    };
  }
  componentDidMount() {
    this.getOutput_ball_All();
    this.timer = setInterval(this.tick, 1000);
  }

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
          <Hourglass
            visible={true}
            height="60"
            width="60"
            ariaLabel="hourglass-loading"
            wrapperStyle={{}}
            wrapperclassName=""
            colors={["#306cce", "#72a1ed"]}
          />
        </div>
      );
    }
  }
  getOutput_ball_All = async () => {
    const array = await httpClient.post(
      server.Realtime_status_daily_GD_Table + "/" + this.state.start_date
    );

    // console.log(array.data);
    this.setState({
      data_table: array.data.result,
      loading: "off",
    });

    setTimeout(
      function () {
        //Start the timer
        this.getOutput_ball_All();
      }.bind(this),
      600000 //10 min
    );
  };
  renderTable = () => {
    try {
      if (this.state.data_table !== null) {
        // console.log(this.state.data_table);
        return this.state.data_table.map((item) => (
          <tr>
            <td
              onClick={async (e) => {
                // localStorage.setItem("page", "click_table");
                // localStorage.setItem("mc_no", item.mc_no);
                // localStorage.setItem("start_date", this.state.start_date);
                Swal.fire({
                  icon: "warning",
                  title: "In Progress...",
                  test: "กำลังดำเนินการ...",
                  showConfirmButton: false,
                  timer: 1500,
                });
              }}
            >
              {item.mc_no}
            </td>
            <td>{item.RUN}</td>
            <td>{item.STOP}</td>
            <td>{item.AL}</td>
            <td>{item.WAIT_PART}</td>
            <td>{item.FULL_PART}</td>
            {/* <td>{((item.RUN / item.sum_all) * 100).toFixed(2)}</td>
            <td>{((item.STOP / item.sum_all) * 100).toFixed(2)}</td>
            <td>{((item.AL / item.sum_all) * 100).toFixed(2)}</td>
            <td>{((item.WAIT_PART / item.sum_all) * 100).toFixed(2)}</td>
            <td>{((item.FULL_PART / item.sum_all) * 100).toFixed(2)}</td> */}
          </tr>
        ));
      }
    } catch (error) {}
  };
  render() {
    return (
      // <div className="wrapper">
      //   <div className="content-wrapper">
      // {/* <div className="content-wrapper" style={{ minHeight: "1000px" }}> */}
      //    {/* <div className="position-relative card-body"></div> */}

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
            Table Status Machine (%)
          </div>
          <div className="card-body">
            <div
              className="row justify-content-center"
              style={{ paddingBottom: "15px", textAlign: "center" }}
            >
              <div className="col-auto">
                <h5>Select Date :</h5>
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
              <div className="col-1">
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={async (e) => {
                    e.preventDefault();
                    await this.getOutput_ball_All();
                  }}
                >
                  submit
                </button>
              </div>
            </div>

            <div className="overlay-wrapper">
              {this.loadingScreen()}
              <div
                className="card-body table-responsive p-0"
                style={{ height: "450px", paddingTop: "10px" }}
              >
                <table
                  className="table table-head-fixed text-nowrap table-bordered table-hover"
                  id="tbreport"
                >
                  <thead>
                    <tr>
                      <th>M/C NO.</th>
                      <th>RUN (%)</th>
                      <th>STOP (%)</th>
                      <th>ALARM (%)</th>
                      <th>WAIT PART (%)</th>
                      <th>FULL PART (%)</th>
                    </tr>
                  </thead>
                  <tbody>{this.renderTable()}</tbody>
                </table>
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

export default Table_status_mc_UTL;
