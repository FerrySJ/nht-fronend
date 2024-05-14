import React, { Component } from 'react';
import { httpClient } from "../../../utils/HttpClient";
import { server } from "../../../constance/contance";
import moment from "moment";

class Icb extends Component {
  constructor(props) {
    super(props);
    this.state = { seconds: props.seconds };
    
    this.state = {
      data: null,
      start_date: moment().format("YYYY-MM-DD"),
      clear_state: [],
      time: this.props.time,
      seconds: "1200",
      mc_no: "IC11B",
      // selected_topic: "",
      list_topic: [],

    };
  }
componentDidMount (){
  this.getData();
}
  getData = async () => {
    let command = await httpClient.post(server.MMS_GD_ICB, {
      mc_no: "IC11B",
    });
    console.log(command.data.result);
    this.setState({ data_set : command.data.result,
      prod_total : command.data.result[0].prod_total,
      avg_cycletime : command.data.result[0].avg_cycletime,
      utl_total : command.data.result[0].utl_total,
    })
  }
  render() {
    return(
    <div className="content-wrapper">
      <div className="content">
        {/* <div className="row" style={{ paddingTop: "15px" }}> */}
        {/* <div className="col-lg-12"> */}
        <div className="row justify-content-end">
          <h4>
            Date: {moment().format("YYYY-MM-DD")} {moment().format("HH:mm:ss")}
          </h4>
        </div>
        <div className="row justify-content-center">
          <h2>M/C No. : {this.state.mc_no}</h2>
        </div>
        <div
          className="row justify-content-center"
          style={{ paddingTop: "15px" }}
        >
          <div className="col-auto">
            <div
              className="card"
              style={{
                borderRadius: "10px",
                background: "#E5EAF9",
              }}
            >
              <h1
                className="card-header"
                style={{
                  background: "#9DACD6",
                  borderRadius: "10px",
                }}
              >
                Production
              </h1>
              <div className="card-body">
                <h1>{this.state.prod_total}</h1>
              </div>
            </div>
          </div>
          <div className="col-auto">
            <div
              className="card"
              style={{
                borderRadius: "10px",
                background: "#E5EAF9",
              }}
            >
              <h1
                className="card-header"
                style={{
                  background: "#9DACD6",
                  borderRadius: "10px",
                }}
              >
                Cycle Time
              </h1>
              <div className="card-body">
                {/* <h1>1.7 sec</h1> */}
                <h1>{this.state.avg_cycletime / 100} sec</h1>
              </div>
            </div>
          </div>
          <div className="col-auto">
            <div
              className="card"
              style={{
                borderRadius: "10px",
                background: "#E5EAF9",
              }}
            >
              <h1
                className="card-header"
                style={{
                  background: "#9DACD6",
                  borderRadius: "10px",
                }}
              >
                Yield
              </h1>
              <div className="card-body">
                {/* <h1>99.23%</h1> */}
                <h1>
                  {((this.state.prod_total / this.state.utl_total)  * 100).toFixed(
                    2
                  )}
                  %
                </h1>
              </div>
            </div>
          </div>
          <div className="col-auto">
            <div
              className="card"
              style={{
                borderRadius: "10px",
                background: "#E5EAF9",
              }}
            >
              <h1
                className="card-header"
                style={{
                  background: "#9DACD6",
                  borderRadius: "10px",
                }}
              >
                Utillization
              </h1>
              <div className="card-body">
                 <h1>{(( this.state.prod_total/((5*3600)/(this.state.avg_cycletime/100) ))  * 100).toFixed(2
                  )}%</h1> 
                                {/* <h1>{((dataOK/data.target_utl)*100).toFixed(2)} %</h1> */}

              </div>
            </div>
          </div>
        </div>
        {/* </div> */}
        {/* </div> */}
      </div>
    </div>
    );
  }
}

export default Icb;
