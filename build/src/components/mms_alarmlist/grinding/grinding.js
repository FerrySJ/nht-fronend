
 /* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-pascal-case */
import React from "react";
// import Turning_mms_gantchart from "../realtimeChart/turning_mms_gantchart";
import Gd_mms_chart from "../grinding/chart/gd_mms_chart"
import MMS_gantchart from "../grinding/chart/mms_gantchart"
import moment from "moment";

class Grinding extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      start_date: moment().startOf("month").format("YYYY-MM-DD"),
      end_date: moment().endOf("month").format("YYYY-MM-DD"),
    };
  }

  render() {
    return (
      <div className="wrapper">
        <div className="content-wrapper" style={{ minHeight: "1000px" }}>
          <div className="position-relative card-body"></div>

          <section className="content">
            <div className="mb-2 row">
              <div className="col-12 col-lg-7">
                <div className="text-left col-auto">
                  <h1
                    style={{
                      marginBottom: "0",
                      fontWeight: 600,
                      fontSize: "3rem",
                      color: "gray",
                    }}
                  >
                    Daily: Non opearating time
                  </h1>
                </div>
              </div>
              <div className="col-12 col-lg-5">
                <div className="text-right col-auto">
                  {" "}
                  <h1
                    style={{
                      marginBottom: "0",
                      fontWeight: 600,
                      fontSize: "2rem",
                      color: "black",
                    }}
                  >
                    Date : {moment().format("DD-MM-YYYY")} === Time:{" "}
                    {moment().format("hh:mm:ss")}
                  </h1>
                </div>
              </div>
            </div>
            <div className="container-fluid">
              {/* Start 1st row */}
              <div className="card card-primary">
                <div className="card-header"></div>
                <MMS_gantchart />
              </div>
              {/* <div className="card card-primary">
                <div className="card-header"></div>
                <Turning_mms_gantchart />
              </div> */}
            </div>
            <div className="container-fluid">
              {/* Start 1st row */}
              <div className="card card-primary">
                <div className="card-header"></div>

                <div className="row-12">
                  <div className="page-content">
                    <div>
                      < Gd_mms_chart/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
          </section>
        </div>
      </div>
    );
  }
}

export default Grinding;
