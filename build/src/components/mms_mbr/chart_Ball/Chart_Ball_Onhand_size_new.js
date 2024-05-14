import React from "react";
import { httpClient } from "../../../utils/HttpClient";
import { server } from "../../../constance/contance";
import moment from "moment";
import Swal from "sweetalert2";

import { Hourglass } from "react-loader-spinner";

class Chart_Ball_Onhand_size_new extends React.Component {
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
      ballUsage: [],
      DateBall: [],
      ballUsage_All: [],
      DateBall_All: [],
      ballStock_All: [],
      DateBall_Stock: [],
      data_tb_onhand:[],
      time: this.props.time,
      seconds: "1200",
      txt: "Ball usage Daily of " + moment().format("MMMM") +" size "+this.state.size_part,
    };
  }

  componentDidMount = async () => {
    await this.getDate();
    // await this.getOutput_ball_All();
    await this.get_master_process();
    await this.getStock_ball_onHand();
    // await this.getStock_ball_turnover();
    this.timer = setInterval(this.tick, 1000);
  };

  getDate = () => {
    this.setState({
      start_date: moment().startOf("month").format("YYYY-MM-DD"),
    });
    this.setState({ end_date: moment().endOf("month").format("YYYY-MM-DD") });
  };

  tick() {
    if (this.state.seconds > 0) {
      this.setState({ seconds: this.state.seconds - 1 });
    } else {
      clearInterval(this.timer);
      window.location.reload();
    }
  }
  clear_state() {
    this.setState({ ballStock_All: [], DateBall_Stock: [],data_tb_onhand:[] });
  }
  getStock_ball_onHand = async () => {
    console.log(this.state.size_part);
    const array = await httpClient.post(
      server.realtime_MBRC_Ball_Stock_Size_SUJ +
        "/" +
        this.state.start_date +
        "/" +
        this.state.end_date,
      { size: this.state.size_part ,type : "SUJ"}
    );
    this.setState({ data_tb_onhand: array.data.result_table})
    // console.log(array.data.result_table);
    // console.log(array.data.length_data);
if (array.data.resultBall_onHand === "NO DATA" || array.data.length_data === 0) {
  Swal.fire({
    icon: "warning",
    title:
      "ไม่มีข้อมูล" ,
    showConfirmButton: false,
    timer: 1500,
  });
} else {
  let list_StockBall_All = array.data.resultBall_onHand;
  this.setState({ ballStock_All: list_StockBall_All });
  let listDateBall = array.data.resultDateBall_onHand;
  this.setState({ DateBall_Stock: listDateBall });
  
}
  };
  get_master_process = async () => {
    const array = await httpClient.get(server.master_process);
    // console.log(array.data.result[0].process);
    await this.setState({
      list_process: array.data.result,
      process: array.data.result[0].process,
    });
    // console.log("==>", this.state.process);
    await this.get_master_type(array.data.result[0].process);
    await this.get_master_size(array.data.result[0].process);
  };

  get_master_size = async (aa) => {
    // console.log("get_master_size", aa, this.state.process);
    const array = await httpClient.post(server.master_size, {
      process: aa, //this.state.process,
    });
    // console.log("---- llllll ----");
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
  renderTableOnhand = () => {
    try {
      if (this.state.data_tb_onhand !== null) {
        // console.log(this.state.data_table);
        return this.state.data_tb_onhand.map((item) => (
          <tr>
            <td>{item.lastestDate}</td>
            <td>{item.totalSize10}</td>
            <td>{item.totalSize20}</td>
            <td>{item.totalSize30}</td>
            <td>{item.totalSize40}</td>
            <td>{item.totalSize50}</td>
          </tr>
        ));
      }
    } catch (error) {}
  };
  render() {
    // console.log(this.state.Usage)

    //Ball
    return (
      <div className="wrapper">
        <section className="content">
          <div className="container-fluid">
            {/* Ball stock */}
            <div className="row-12" style={{ paddingTop: "15px" }}>
              <div className="card">
                <div
                  className="card-header"
                  style={{
                    marginBottom: "0",
                    fontWeight: 600,
                    fontSize: "2rem",
                  }}
                >
                  {" "}
                  Daily : Ball stock on hand (%) (All)
                </div>
                <div
                  className="row justify-content-center"
                  style={{ paddingTop: "10px" }}
                >
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
                      {/* <option value="DD">DD</option>
                        <option value="SUJ">SUJ</option> */}
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
                        await this.clear_state();
                        e.preventDefault();
                        await this.getStock_ball_onHand();
                      }}
                    >
                      submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="row-12">
              <div className="card">
              <h3 className="card-header">
              Data Daily
              {/* <ReactHTMLTableToExcel
                      id="test-table-xls-button"
                      className="col-1 btn btn-secondary btn-block float-right"
                      // className="download-table-xls-button"
                      table="tbreport"
                      // table="table-to-xls"
                      filename={this.state.txt} 
                      sheet={this.state.data_tb_onhand} 
                      buttonText="Export Excel"
                    /> */}
  </h3>
                <div className="card-body">
                  <div
                    className="card-body table-responsive p-0"
                    style={{ height: "400px" }}
                  >
                    <div className="overlay-wrapper">
                      {this.loadingScreen()}
                      <table
                        className="table table-head-fixed text-nowrap table-bordered table-hover"
                        id="tbreport"
                      >
                        <thead>
                          <tr>
                            <th>mfg_date</th>
                            <th>BALL SIZE -5.0</th>
                            <th>BALL SIZE -2.5</th>
                            <th>BALL SIZE +0.0</th>
                            <th>BALL SIZE +2.5</th>
                            <th>BALL SIZE +5.0</th>
                          </tr>
                        </thead>
                        <tbody>{this.renderTableOnhand()}</tbody>
                      </table>
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
export default Chart_Ball_Onhand_size_new;
