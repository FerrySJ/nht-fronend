import React, { Component } from "react";
// import Status_by_topic from "./chart/status_by_topic";
import Non_operatingtime_gd from "./chart/non_operatingtime_gd";
// import Status_by_topic_group from "./chart/status_by_topic_group";
import MMS_MC_COMPARE from "./MMS_mc_compare";
import Compare_alarmlist_topic from "./chart/compare_alarmlist_topic";
import Total_time_status_mc_gd from "./chart/total_time_status_mc_gd";
import Mms_status_mc from "../mms_alarmlist/grinding/mms_status_mc";

class MMS_MCstatus extends Component {
  constructor(props) {
    super(props);
    this.tick = this.tick.bind(this);
    this.state = { seconds: props.seconds };

    this.state = {
      time: this.props.time,
      seconds: "1200",
    };
  }
  componentDidMount = async () => {
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
  

  render() {
    return (
      <div className="content-wrapper">
        <div className="content">
          <div className="row">
            <div className="col-12">
              {/* <div className="card card-info"> */}
              <div className="card card-primary card-outline card-outline-tabs">
                <div className="card-header p-0 border-bottom-0" >
                {/* <div className="card-header p-0 border-bottom-0" style={{background:"#CDCDCD"}}> */}
                  <ul
                    className="nav nav-tabs"
                    id="custom-tabs-four-tab"
                    role="tablist"
                  >
                    <li className="nav-item">
                      <a
                        className="nav-link active"
                        id="custom-tabs-four-home-tab"
                        data-toggle="pill"
                        href="#custom-tabs-four-home"
                        role="tab"
                        aria-controls="custom-tabs-four-home"
                        aria-selected="true"
                      >
                        Non-Operating Time
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        id="custom-tabs-four-over_down-tab"
                        data-toggle="pill"
                        href="#custom-tabs-four-over_down"
                        role="tab"
                        aria-controls="custom-tabs-four-over_down"
                        aria-selected="false"
                      >
                        Over - Down (80%)
                      </a>
                    </li>
                    {/* <li className="nav-item">
                      <a
                        className="nav-link"
                        id="custom-tabs-four-mc_status-tab"
                        data-toggle="pill"
                        href="#custom-tabs-four-mc_status"
                        role="tab"
                        aria-controls="custom-tabs-four-mc_status"
                        aria-selected="false"
                      >
                        M/C by status
                      </a>
                    </li> */}
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        id="custom-tabs-four-compare_topic-tab"
                        data-toggle="pill"
                        href="#custom-tabs-four-compare_topic"
                        role="tab"
                        aria-controls="custom-tabs-four-compare_topic"
                        aria-selected="false"
                      >
                        Compare topic alarm list
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        id="custom-tabs-four-time_status-tab"
                        data-toggle="pill"
                        href="#custom-tabs-four-time_status"
                        role="tab"
                        aria-controls="custom-tabs-four-time_status"
                        aria-selected="false"
                      >
                        Total time status
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="card-body">
                  <div className="tab-content" id="custom-tabs-four-tabContent">
                    <div
                      className="tab-pane fade show active"
                      id="custom-tabs-four-home"
                      role="tabpanel"
                      aria-labelledby="custom-tabs-four-home-tab"
                    >
                    <Non_operatingtime_gd />
                    </div>
                    <div
                      className="tab-pane fade"
                      id="custom-tabs-four-over_down"
                      role="tabpanel"
                      aria-labelledby="custom-tabs-four-over_down-tab"
                    >
                      {/* <h1>Wait develop</h1> */}
                      < MMS_MC_COMPARE/>
                    </div>

                    {/* <div
                      className="tab-pane fade"
                      id="custom-tabs-four-mc_status"
                      role="tabpanel"
                      aria-labelledby="custom-tabs-four-mc_status-tab"
                    >
                      <Status_by_topic />
                    </div> */}
                    <div
                      className="tab-pane fade"
                      id="custom-tabs-four-compare_topic"
                      role="tabpanel"
                      aria-labelledby="custom-tabs-four-compare_topic-tab"
                    >
                      <Compare_alarmlist_topic />
                    </div>
                    <div
                      className="tab-pane fade"
                      id="custom-tabs-four-time_status"
                      role="tabpanel"
                      aria-labelledby="custom-tabs-four-time_status-tab"
                    >
                      <Total_time_status_mc_gd />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MMS_MCstatus;
