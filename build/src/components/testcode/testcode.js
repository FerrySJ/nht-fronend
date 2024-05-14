import React, { Component } from "react";
import * as moment from "moment";
import Swal from "sweetalert2";
class Testcode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      DateReq: moment().add(0, "days").format("YYYY-MM-DD"),
      Time: moment().format("HH:mm:ss"),
      ToTime: moment().format("HH:mm:ss"),
      ShiftMN: "",
      ShiftABC: "",
    };
  }
  componentDidMount(){
    console.log("xxxxxx");
    // const ApproveStart = new Date(`2023-11-01 00:04:00`).getTime();
    // const ApproveFinish = new Date(`2023-11-01 23:04:00`).getTime();
    // console.log(ApproveStart);
    // console.log(ApproveFinish);
    // console.log(Math.floor((ApproveFinish - ApproveStart) / (1000 * 60)).toLocaleString());
    const ApproveStart = new Date(`2023-11-02 00:05:00`).getTime();
const ApproveFinish = new Date(`2023-11-01 23:00:00`).getTime();
console.log(Math.floor((ApproveFinish - ApproveStart) / (1000 * 60 * 60)).toLocaleString());


  }
  ShiftStartTimeMN = (startTime) => {
    const hour = parseInt(startTime.split(":")[0]);
    if ((hour >= 7 && hour < 19) || hour == 0) {
      return "M";
    } else {
      return "N";
    }
  };
  ShiftStartTimeABC = (startTime) => {
    const hour = parseInt(startTime.split(":")[0]);
    if (hour >= 7 && hour <= 14) {
      return "A";
    } else if (hour >= 15 && hour <= 22) {
      return "B";
    } else {
      return "C";
    }
  };
  calculateWaiting = () => {
    const { DateReq, Time, ToTime } = this.state;
    const startDateTime = `${DateReq} ${Time}:00`;
    const startTimestamp = new Date(startDateTime).getTime();
    let reqDateTime = `${DateReq} ${ToTime}:00`;
    if (moment(ToTime, "HH:mm:ss").isBefore(moment(Time, "HH:mm:ss"))) {
      reqDateTime = moment(DateReq).add(1, "day").format("YYYY-MM-DD") + ` ${ToTime}:00`;
    }
    const reqTimestamp = new Date(reqDateTime).getTime();
    const WaitingInMinutes = Math.floor(
      (reqTimestamp - startTimestamp) / (1000 * 60)
    );
    return WaitingInMinutes;
  };
  calculateConfirmTime = async () => {
    try {
    const StartTime = new Date(`${this.state.ConfirmStartDate} ${this.state.ConfirmStartTime}:00`).getTime();
    const FinishTime = new Date(`${this.state.ConfirmDate} ${this.state.ConfirmTime}:00`).getTime();
    const CheckTime = new Date(`${this.state.CheckDate} ${this.state.CheckTime}:00`).getTime();
    const ApproveStart = new Date(`${this.state.ApproveStartDate} ${this.state.ApproveStartTime}:00`).getTime();
    const ApproveFinish = new Date(`${this.state.ApproveDate} ${this.state.ApproveTime}:00`).getTime();
      if (StartTime <= FinishTime) {
        await this.setState({
          ConfirmLeadTime : Math.floor((FinishTime - StartTime) / (1000 * 60)).toLocaleString(),
          TotalTime : Math.floor((FinishTime - CheckTime) / (1000 * 60)).toLocaleString(),
          TakeTimeCheck : Math.floor((StartTime - CheckTime) / (1000 * 60)).toLocaleString(),
          ApproveLeadTime: Math.floor((ApproveFinish - ApproveStart) / (1000 * 60)).toLocaleString(),
          FirstPartTime : Math.floor((ApproveFinish - CheckTime) / (1000 * 60)).toLocaleString(),
          WaitQC : Math.floor((ApproveStart - FinishTime) / (1000 * 60)).toLocaleString(),
        });
      } else {
        Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please confirm date&time",
      });
        await this.setState({
          ConfirmLeadTime :""
        });
      }
    } catch (error) {
      return;
    }
  };
  render() {
    const WaitingTime = this.calculateWaiting();
    // const WaitingTime = this.calculateConfirmTime();
    return (
      <div className="content-wrapper">
        <div className="content">
            <div className="row" style={{ justifyContent: "center" }}>
              <div
                className="form-container"
              >
                  <div className="form-group row">
                    <div
                      className="col-md-5"
                      style={{ textAlign: "left", padding: 0 }}
                    >
                      <label>
                        <h5 />
                        วันที่ (Date) :&nbsp;
                      </label>
                    </div>
                    <div className="col-md-6" style={{ padding: 0 }}>
                      <input
                        type="date"
                        className="form-control"
                        value={this.state.DateReq}
                        onChange={(e) => {
                          this.setState({ DateReq: e.target.value });
                        }}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <div
                      className="col-md-5"
                      style={{ textAlign: "left", padding: 0 }}
                    >
                      <label>
                        <h5 />
                        ตั้งแต่ (Time) &nbsp;:&nbsp;
                      </label>
                    </div>
                    <div className="col-md-4" style={{ padding: 0 }}>
                      <input
                        type="time"
                        className="form-control"
                        value={this.state.Time}
                        onChange={(e) => {
                          const ShiftMN = this.ShiftStartTimeMN(e.target.value);
                          const shiftABC = this.ShiftStartTimeABC(
                            e.target.value
                          );
                          this.setState({
                            Time: e.target.value,
                            ShiftMN: ShiftMN,
                            ShiftABC: shiftABC,
                          });
                        }}
                      />
                    </div>
                    <div className="col-md-2" style={{ padding: 0 }}>
                      <input
                        type="text"
                        className="form-control"
                        style={{
                          padding: 0,
                          textAlign: "left",
                          color: "blue",
                          backgroundColor: "white",
                          borderColor: "white",
                        }}
                        value={this.state.ShiftMN}
                        onChange={(e) => {
                          this.setState({ ShiftMN: e.target.value });
                        }}
                        disabled
                      />
                       <input
                        type="text"
                        className="form-control"
                        style={{
                          padding: 0,
                          textAlign: "left",
                          color: "blue",
                          backgroundColor: "white",
                          borderColor: "white",
                        }}
                        value={this.state.ShiftABC}
                        onChange={(e) => {
                          this.setState({ ShiftABC: e.target.value });
                        }}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <div
                      className="col-md-5"
                      style={{ textAlign: "left", padding: 0 }}
                    >
                      <label>
                        <h5 />
                        ถึงเวลา (To Time) :&nbsp;
                      </label>
                    </div>
                    <div className="col-md-4" style={{ padding: 0 }}>
                      <input
                        type="time"
                        className="form-control"
                        value={this.state.ToTime}
                        onChange={(e) => {
                          this.setState({ ToTime: e.target.value });
                        }}
                      />
                    </div>
                    <div className="col-md-2" style={{ padding: 0 }}>
                      <input
                        type="text"
                        className="form-control"
                        style={{
                          padding: 0,
                          textAlign: "left",
                          color: "blue",
                          backgroundColor: "white",
                          borderColor: "white",
                        }}
                        value={WaitingTime + " min."}
                        disabled
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
export default Testcode;
