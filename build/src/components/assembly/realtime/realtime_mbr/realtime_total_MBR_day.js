import React from "react";

import { httpClient } from "../../../../utils/HttpClient";
import { server } from "../../../../constance/contance";
import moment from "moment";
import { Hourglass } from "react-loader-spinner";
import Swal from "sweetalert2";
import Chart_ball_usage_day from "./chart_ball_usage_day";




class Realtime_total_MBR_day extends React.Component {
  constructor(props) {
    super(props);
    this.tick = this.tick.bind(this);
    this.state = { seconds: props.seconds };

    this.state = {
      seconds: "1200",
      countitem: 0,
      yesterday: moment().subtract(1, "days").format("YYYY-MM-DD"),
      data_table: [],
      data_date: "",
      mcnoTB: "",
      DateBallTB: "",
      txt:
        "Amount of ball usage By Machine" +
        moment().add(-1, "days").format("YYYY-MM-DD"),
      loading: "on",
      dataSet1:[
        { name: "Name 1", value: "Value 1" },
        { name: "Name 2", value: "Value 2" },
        // Add more data as needed
      ],
    };
  }

  componentDidMount = async () => {
    // this.getOutput_ball_table();
    this.click_getOutput_ball_table();
  };

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
  // getOutput_ball_table = async () => {
  //   const array = await httpClient.get(
  //     server.realtime_MBRC_Ball_tb_URL + "/" + this.state.yesterday
  //   );
  //   if (array.data.result[1] === 0) {
  //     Swal.fire({
  //       icon: "warning",
  //       title: "ไม่พบข้อมูล Date : " + this.state.yesterday,
  //       showConfirmButton: false,
  //       timer: 1500,
  //     });
  //     this.setState({ loading: "off" });
  //   } else {
  //     this.setState({
  //       data_table: array.data.result[0],
  //       countitem: array.data.result[0].length,
  //       data_date: array.data.result[0][0].mfg_date,
  //       loading: "off",
  //     });
  //     let listUsageMC_name = array.data.result_mcname;
  //     this.setState({ mcnoTB: listUsageMC_name });
  //     let listDateBall = array.data.resultDateBall;
  //     this.setState({ DateBallTB: listDateBall });
  //   }
  // };
  click_getOutput_ball_table = async () => {
    // console.log("cdccd", this.state.yesterday);
    const array = await httpClient.get(
      server.realtime_MBRC_Ball_tb_URL + "/" + this.state.yesterday
    );

    if (array.data.result[1] === 0) {
      Swal.fire({
        icon: "warning",
        title: "ไม่พบข้อมูล Date : " + this.state.yesterday,
        showConfirmButton: false,
        timer: 1500,
      });
      this.setState({ loading: "off" });
    } else {
      this.setState({
        data_table: array.data.result[0],
        countitem: array.data.result[0].length,
        data_date: array.data.result[0][0].mfg_date,
        loading: "off",
      });
      // console.log(array.data.result[0]);
      // console.log(array.data.resultDateBall);
      let listUsageMC_name = array.data.result_mcname;
      this.setState({ mcnoTB: listUsageMC_name });
      let listDateBall = array.data.resultDateBall;
      this.setState({ DateBallTB: listDateBall });
    }
    setTimeout(
      function () {
        //Start the timer
        this.click_getOutput_ball_table();
      }.bind(this),
      600000 //10 min
    );
  };
  clear_state = () => {
    this.setState({
      data_table: [],
      countitem: 0,
      loading: "on",
    }); // clear state
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.yesterday !== this.state.yesterday) {
      this.setState({ loading: "on" });
      this.click_getOutput_ball_table();
    }
  }

  handleSearch = (event) => {
    this.setState({
      yesterday: moment(event.target.value).format("YYYY-MM-DD"),
    });
  };
  renderTableByMC = () => {
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

  // exportToExcel = () => { // .xlsx
  //   const { data_table } = this.state;
  
  //   // Define the header row
  //   const header = ['MC no', 'Model', 'BALL SIZE -5.0', 'BALL SIZE -2.5', 'BALL SIZE +0.0', 'BALL SIZE +2.5', 'BALL SIZE +5.0'];
  
  //   // Create a worksheet with header and data
  //   const ws = XLSX.utils.aoa_to_sheet([header, ...data_table.map((row) => [row.mc_no, row.model, row.totalSize10, row.totalSize20, row.totalSize30, row.totalSize40, row.totalSize50])]);
  
  //   // Create a workbook
  //   const wb = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  
  //   // Save the workbook as XLSX file
  //   XLSX.writeFile(wb, 'exported_data.xlsx');
  // };
  
  exportToExcel = () => { // .csv
    const { data_table } = this.state;
  
    // Define the header row
    const header = ['Date','MC no', 'Model', 'BALL SIZE -5.0', 'BALL SIZE -2.5', 'BALL SIZE +0.0', 'BALL SIZE +2.5', 'BALL SIZE +5.0'];
  
    // Add the header row and data rows
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [header, ...data_table.map((row) => [row.mfg_date, row.mc_no, row.model, row.totalSize10, row.totalSize20, row.totalSize30, row.totalSize40, row.totalSize50])]
        .map((row) => row.join(','))
        .join('\n');
  
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', this.state.txt + '.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link); // Cleanup the DOM
  };
  
  

  render() {
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
                  className="row justify-content-end"
                  style={{ padding: "10px" }}
                >
                  <h6
                    className="col-auto"
                    style={{ color: "red", paddingTop: "8px" }}
                  >
                    <b>( Total: {this.state.countitem} M/C )</b>
                  </h6>

    
                  <div className="col-auto">
                   {/* <ExcelFile filename={this.state.txt} element={<button className="btn btn-secondary">Export Excel</button>}>
      <ExcelSheet data={this.state.data_table} name="Ball usage">
        <ExcelColumn label="Date" value="mfg_date" />
        <ExcelColumn label="MC No" value="mc_no" />
        <ExcelColumn label="Model" value="model" />
        <ExcelColumn label="BALL SIZE -5.0" value="totalSize10" />
        <ExcelColumn label="BALL SIZE -2.5" value="totalSize20" />
        <ExcelColumn label="BALL SIZE +0.0" value="totalSize30" />
        <ExcelColumn label="BALL SIZE +2.5" value="totalSize40" />
        <ExcelColumn label="BALL SIZE +5.0" value="totalSize50" />
      </ExcelSheet>
    </ExcelFile> */}
    <button className="btn btn-secondary" onClick={this.exportToExcel}>Export Excel</button>


    
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
                      id="dataTable" //id="tbreport"
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
                      <tbody>{this.renderTableByMC()}</tbody>
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

export default Realtime_total_MBR_day;
