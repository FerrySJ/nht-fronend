import React from "react";
import ReactApexCharts from "react-apexcharts";
import { httpClient } from "../../../utils/HttpClient";
import { server } from "../../../constance/contance";
import moment from "moment";

class Table_onhand_mbr_size extends React.Component {
  constructor(props) {
    super(props);
    this.tick = this.tick.bind(this);
    this.state = { seconds: props.seconds };

    this.state = {
      ballUsage: [],
      DateBall: [],
      ballUsage_All: [],
      DateBall_All: [],
      ballStock_All: [],
      DateBall_Stock: [],
      time: this.props.time,
      seconds: "1200",
    };
  }

  componentDidMount = async () => {
    await this.getDate();
    // await this.getOutput_ball_All();
    await this.getStock_ball_onHand();
    // await this.getOutput_ball();
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

  getStock_ball_onHand = async () => {
    const array = await httpClient.get(
      server.realtime_MBRC_Ball_Stock_URL +
        "/" +
        this.state.start_date +
        "/" +
        this.state.end_date
    );
    console.log(array.data.resultBall_onHand);

    let list_StockBall_All = array.data.resultBall_onHand;
    this.setState({ ballStock_All: list_StockBall_All });
    let listDateBall = array.data.resultDateBall_onHand;
    this.setState({ DateBall_Stock: listDateBall });
  };
  renderTable_stock_onhand  = () => {
    try {
      if (this.state.data_table !== null) {
        // console.log(this.state.data_table);
        return this.state.data_table.map((item) => (
          <tr>
            <td>{item.mc_no}</td>
            <td>{item.model}</td>
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
        <div className="content-wrapper">
        <div className="content">
          <div className="row-12" style={{ paddingTop: "10px" }}>
            <div className="card">
              <h3 className="card-header">Amount of ball usage By Machine </h3>

              {/* <h5 className="card-title" style={{ color: "red", textAlign: "end" }}><b>( Total: {this.state.countitem} M/C )</b></h5> */}
              <div className="card-body">
                <div
                  className="row justify-content-center"
                  style={{ textAlign: "center", paddingBottom: "10px" }}
                >
                  <div className="col-auto">
                    <h5 style={{ paddingTop: "6px" }}>Date :</h5>
                  </div>
                  <div className="col-2">
                    <input
                      className="form-control"
                      type="date"
                      value={this.state.yesterday}
                      onChange={async (e) => {
                        await this.setState({
                          yesterday: moment(e.target.value).format(
                            "YYYY-MM-DD"
                          ),
                        });
                      }}
                    />
                  </div>
                </div>
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
                          <th>MC no</th>
                          <th>Model</th>
                          <th>BALL SIZE -5.0</th>
                          <th>BALL SIZE -2.5</th>
                          <th>BALL SIZE +0.0</th>
                          <th>BALL SIZE +2.5</th>
                          <th>BALL SIZE +5.0</th>
                        </tr>
                      </thead>
                      <tbody>{this.renderTable_stock_onhand()}</tbody>
                    </table>
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
export default Table_onhand_mbr_size;
