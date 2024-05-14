import React, { Component } from "react";
import Mms_status_mc from "../mms_alarmlist/grinding/mms_status_mc";
// import Table_status_mc_UTL from "../mms_alarmlist/grinding/table_status_mc_utl";

class MMS_status_mc_UTL extends Component {
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
                <div className="card-header p-0 border-bottom-0">
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
                        Machine Status
                      </a>
                    </li>
                    {/* <li className="nav-item">
                      <a
                        className="nav-link"
                        id="custom-tabs-four-tb_status_utl-tab"
                        data-toggle="pill"
                        href="#custom-tabs-four-tb_status_utl"
                        role="tab"
                        aria-controls="custom-tabs-four-tb_status_utl"
                        aria-selected="false"
                      >
                        Table Machine Status
                      </a>
                      </li> */}
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
                      <Mms_status_mc />
                    </div>
                    {/* <div
                      className="tab-pane fade"
                      id="custom-tabs-four-tb_status_utl"
                      role="tabpanel"
                      aria-labelledby="custom-tabs-four-tb_status_utl-tab"
                    >
<Table_status_mc_UTL/>
                    </div> */}
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

export default MMS_status_mc_UTL;
