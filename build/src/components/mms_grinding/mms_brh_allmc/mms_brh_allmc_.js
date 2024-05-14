import React, { Component } from "react";
import moment from "moment";

class Mms_brh_allmc extends Component {
  constructor(props) {
    super(props);
   // this.tick = this.tick.bind(this);
    this.state = { seconds: props.seconds };

    this.state = {
      start_date: moment().format("YYYY-MM-DD"),
      time: this.props.time,
      seconds: "1200",
      countitem: 0,
      loading: "on",
    };
  }
  render() {
    return (
      <div className="content-wrapper">
        <div className="content">
        <h4 className="row justify-content-end">
          Date: {moment().format("YYYY-MM-DD")} {moment().format("HH:mm:ss")}
        </h4>

        <div
          className="row justify-content-center"
          style={{
            // paddingTop: "10px",
            textAlign: "center",
            paddingBottom: "10px",
          }}
        >
          <h5 className="col-auto">Date :</h5>
          <div className="col-2">
            <input
              className="form-control"
              type="date"
              value={this.state.start_date}
              onChange={async (e) => {
                await (moment(e.target.value).format("YYYY-MM-DD"));
              }}
            />
          </div>
          <h5 className="col-auto">Select M/C No. :</h5>
          <div className="col-2">
            <select
              className="custom-select"
              //value={dataMC}
              onChange={async (e) => {
                await (e.target.value);
              }}
            >
              <option disabled selected value="">
                select mc_no
              </option>
              { /*{data_masterMC.map((item) => (
                <option key={item.machine_no}>{item.machine_no}</option>
              ))}
              */ }
            </select>
          </div>
        </div>
          <div className="row">
            <div className="col-4">
              <div className="card">
                <div className="card-body">
                  {/*<h4 className="card-title">Bore</h4> */}
                  <h3 className="card-subtitle mb-2 text-muted" style={{textAlign: "center"}}>Bore</h3>
                  <div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "10px",
                      }}
                    >
                      <label style={{ width: "100px", marginRight: "10px" }}>
                        C/T
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        style={{ flex: "1" }}
                        placeholder="value"
                      />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "10px",
                      }}
                    >
                      <label style={{ width: "100px", marginRight: "10px" }}>
                        IDLE TIME
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        style={{ flex: "1" }}
                        placeholder="value"
                      />
                    </div>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "10px",
                      }}
                    >
                      <label style={{ width: "100px", marginRight: "10px" }}>
                        Yield
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        style={{ flex: "1" }}
                        placeholder="value"
                      />
                    </div>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "10px",
                      }}
                    >
                      <label style={{ width: "100px", marginRight: "10px" }}>
                        UTL
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        style={{ flex: "1" }}
                        placeholder="value"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-4">
            <div className="card">
                <div className="card-body">
                  {/*<h4 className="card-title">Bore</h4> */}
                  <h3 className="card-subtitle mb-2 text-muted" style={{textAlign: "center"}}>R/W</h3>
                  <div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "10px",
                      }}
                    >
                      <label style={{ width: "100px", marginRight: "10px" }}>
                        C/T
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        style={{ flex: "1" }}
                        placeholder="value"
                      />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "10px",
                      }}
                    >
                      <label style={{ width: "100px", marginRight: "10px" }}>
                        IDLE TIME
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        style={{ flex: "1" }}
                        placeholder="value"
                      />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "10px",
                      }}
                    >
                      <label style={{ width: "100px", marginRight: "10px" }}>
                        UTL
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        style={{ flex: "1" }}
                        placeholder="value"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-4">
            <div className="card">
                <div className="card-body">
                  {/*<h4 className="card-title">Bore</h4> */}
                  <h3 className="card-subtitle mb-2 text-muted" style={{textAlign: "center"}}>S/F</h3>
                  <div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "10px",
                      }}
                    >
                      <label style={{ width: "100px", marginRight: "10px" }}>
                        C/T H1
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        style={{ flex: "1" }}
                        placeholder="value"
                      />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "10px",
                      }}
                    >
                      <label style={{ width: "100px", marginRight: "10px" }}>
                        C/T H2
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        style={{ flex: "1" }}
                        placeholder="value"
                      />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        // marginBottom: "10px",
                      }}
                    >
                      <label style={{ width: "100px", marginRight: "10px" }}>
                        IDLE TIME H1
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        style={{ flex: "1" }}
                        placeholder="value"
                      />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                       // marginBottom: "10px",
                      }}
                    >
                      <label style={{ width: "100px", marginRight: "10px" }}>
                        IDLE TIME H2
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        style={{ flex: "1" }}
                        placeholder="value"
                      />
                    </div>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "10px",
                      }}
                    >
                      <label style={{ width: "100px", marginRight: "10px" }}>
                        Yield
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        style={{ flex: "1" }}
                        placeholder="value"
                      />
                    </div>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "10px",
                      }}
                    >
                      <label style={{ width: "100px", marginRight: "10px" }}>
                        UTL
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        style={{ flex: "1" }}
                        placeholder="value"
                      />
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

export default Mms_brh_allmc;
