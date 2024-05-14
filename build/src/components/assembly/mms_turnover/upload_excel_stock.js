import React, { Component } from "react";
import { httpClient } from "../../../utils/HttpClient.js";
import Swal from "sweetalert2";
import readXlsxFile from "read-excel-file";
import * as moment from "moment";
import { server } from "../../../constance/contance.js";

class Upload_excel_stock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: "on",
      excel_data: [],
      data_table: [],
      data_table_desc: [],
      issue_date: moment().format("YYYY-MM-DD"),
      issue_time: moment().format("HH:mm:ss"),
      // breakdown: moment().format("HH:mm:ss"), //moment.utc().format("HH:mm:ss"),
      //  timeexp:moment(localStorage.getItem("editissue_timeexp")).utc().format("HH:mm:ss"), //ใช้อันนี้ //แก้ time ไม่ขึ้น + timezone +7
      countitem: "0",

      stock_date: moment().format("YYYY-MM-DD"),
      time: moment().format("HH:mm:ss"),
      ac: "",
      item_no: "",
      item_name: "",
      spec: "",
      maker: "",
      vender: "",
      unit_price: 0,
      cur: "",
      pur_unit: "",
      pur_lt: "",
      safety_stock: "",
      pr_balance: "",
      po_balance: "",
      allocate: "",
      on_hand: 0,
      stock_unit: "",
    };
  }
  get_req_all = async () => {
    let list_all = await httpClient.post("request/report");
    this.setState({
      data_table: list_all.data.result,
      countitem: list_all.data.result.length,
    });
    // console.log(list_all.data.result);
  };
  componentDidMount() {
    this.checkdata()
  }
  renderTableRow = () => {
    // console.log("data_table", this.state.data_table);
    // console.log("data_table", this.state.data_table.length);
    try {
      if (this.state.data_table !== null) {
        const myResult = this.state.data_table;
        return myResult.map((item) => (
          <tr>
            <td>{item.stock_date}</td>
            <td>{item.time}</td>
            <td>{item.ac}</td>
            <td>{item.item_no}</td>
            <td>{item.item_name}</td>
            <td>{item.spec}</td>
            <td>{item.maker}</td>
            <td>{item.vender}</td>
            <td>{item.unit_price}</td>
            <td>{item.cur}</td>
            <td>{item.pur_unit}</td>
            <td>{item.pur_lt}</td>
            <td>{item.safety_stock}</td>
            <td>{item.pr_balance}</td>
            <td>{item.po_balance}</td>
            <td>{item.allocate}</td>
            <td>{item.on_hand}</td>
            <td>{item.stock_unit}</td>
          </tr>
        ));
      }
    } catch (error) {}
  };

  click_showdata = async () => {
    // console.log(this.state.excel_data);
    const input = document.getElementById("input");
    input.addEventListener("change", async () => {});
    const data1 = await readXlsxFile(input.files[0]);
    // console.log("data1", data1);
    for (let index = 1; index < data1.length; index++) {
      let excel = this.state.excel_data.push({
        // stock_date: moment(data1[index][0]).format("YYYY-MM-DD"),
        stock_date: moment.utc(data1[index][0]).format("YYYY-MM-DD"),
        time: data1[index][1]
          ? moment.utc(data1[index][1], "HH:mm:ss").format("HH:mm:ss")
          : null, // moment(data1[index][1]).format("HH:mm:ss"),
        ac: data1[index][2],
        item_no: data1[index][3],
        item_name: data1[index][4],
        spec: data1[index][5],
        maker: data1[index][6],
        vender: data1[index][7],
        unit_price: data1[index][8],
        cur: data1[index][9],
        pur_unit: data1[index][10],
        pur_lt: data1[index][11],
        safety_stock: data1[index][12],
        pr_balance: data1[index][13],
        po_balance: data1[index][14],
        allocate: data1[index][15],
        on_hand: data1[index][16],
        stock_unit: data1[index][17],
      });
    }
    for (let index = 1; index < data1.length; index++) {
      let datata = this.state.data_table.push({
        stock_date: moment.utc(data1[index][0]).format("YYYY-MM-DD"),
        time: data1[index][1]
          ? moment.utc(data1[index][1], "HH:mm:ss").format("HH:mm:ss")
          : null, //moment.utc(data1[index][1]).format("HH:mm:ss"),
        ac: data1[index][2],
        item_no: data1[index][3],
        item_name: data1[index][4],
        spec: data1[index][5],
        maker: data1[index][6],
        vender: data1[index][7],
        unit_price: data1[index][8],
        cur: data1[index][9],
        pur_unit: data1[index][10],
        pur_lt: data1[index][11],
        safety_stock: data1[index][12],
        pr_balance: data1[index][13],
        po_balance: data1[index][14],
        allocate: data1[index][15],
        on_hand: data1[index][16],
        stock_unit: data1[index][17],
      });
      // console.log("count",datata);
    }
    // console.log("test",this.state.data_table);
    // return
    let datata = this.setState({
      stock_date: this.state.data_table[0].stock_date,
      time: this.state.data_table[0].time,
      ac: this.state.data_table[0].ac,
      item_no: this.state.data_table[0].item_no,
      item_name: this.state.data_table[0].item_name,
      spec: this.state.data_table[0].spec,
      maker: this.state.data_table[0].maker,
      vender: this.state.data_table[0].vender,
      unit_price: this.state.data_table[0].unit_price,
      cur: this.state.data_table[0].cur,
      pur_unit: this.state.data_table[0].pur_unit,
      pur_lt: this.state.data_table[0].pur_lt,
      safety_stock: this.state.data_table[0].safety_stock,
      pr_balance: this.state.data_table[0].pr_balance,
      po_balance: this.state.data_table[0].po_balance,
      allocate: this.state.data_table[0].allocate,
      on_hand: this.state.data_table[0].on_hand,
      stock_unit: this.state.data_table[0].stock_unit,
    });
    // console.log("insert", datata);
    // }
    // this.enter_save()
  };
  enter_save = async () => {
    // console.log(this.state.excel_data);
    const input = document.getElementById("input");
    input.addEventListener("change", async () => {});
    const data1 = await readXlsxFile(input.files[0]);
    // console.log("data1", data1);
    for (let index = 1; index < data1.length; index++) {
      this.state.excel_data.push({
        stock_date: data1[index][0],
        time: data1[index][1],
        ac: data1[index][2],
        item_no: data1[index][3],
        item_name: data1[index][4],
        spec: data1[index][5],
        maker: data1[index][6],
        vender: data1[index][7],
        unit_price: data1[index][8],
        cur: data1[index][9],
        pur_unit: data1[index][10],
        pur_lt: data1[index][11],
        safety_stock: data1[index][12],
        pr_balance: data1[index][13],
        po_balance: data1[index][14],
        allocate: data1[index][15],
        on_hand: data1[index][16],
        stock_unit: data1[index][17],
      });
    }
try{
    for (let index = 1; index < data1.length; index++) {
      this.state.data_table.push({
        stock_date: data1[index][0],
        time: data1[index][1],
        ac: data1[index][2],
        item_no: data1[index][3],
        item_name: data1[index][4],
        spec: data1[index][5],
        maker: data1[index][6],
        vender: data1[index][7],
        unit_price: data1[index][8],
        cur: data1[index][9],
        pur_unit: data1[index][10],
        pur_lt: data1[index][11],
        safety_stock: data1[index][12],
        pr_balance: data1[index][13],
        po_balance: data1[index][14],
        allocate: data1[index][15],
        on_hand: data1[index][16],
        stock_unit: data1[index][17],
      });
      // }
      //for save all
      let dataall = {
        stock_date: data1[index][0],
        time: data1[index][1],
        ac: data1[index][2],
        item_no: data1[index][3],
        item_name: data1[index][4],
        spec: data1[index][5],
        maker: data1[index][6],
        vender: data1[index][7],
        unit_price: data1[index][8],
        cur: data1[index][9],
        pur_unit: data1[index][10],
        pur_lt: data1[index][11],
        safety_stock: data1[index][12],
        pr_balance: data1[index][13],
        po_balance: data1[index][14],
        allocate: data1[index][15],
        on_hand: data1[index][16],
        stock_unit: data1[index][17],
      };
      // console.log("save", dataall);
      // let check = await httpClient.post("request/checkreqno", {
      //   reqno: data1[index][0],
      // });
      // if (check.data.error == "reqno_found") {
      //   Swal.fire({
      //     icon: "error",
      //     title: "Req No. ซ้ำ!",
      //     timer: 1500,
      //   });
      //   window.location.reload();
      //   return;
      // } else {
     let command = await httpClient.post(server.API_UPLOAD_STOCK, dataall);
      // }
    }
    
    Swal.fire({
      icon: "success",
      title: "Complete",
      text: "Save data is complete!",
      showConfirmButton: false,
      timer: 1500,
    });
    window.location.reload();
  
  } catch (error) {
    // หากมีข้อผิดพลาดที่ไม่ได้เกิดจาก API ในลูป
    console.error("save",error);
    Swal.fire({
      icon: "error",
      title: "Not Complete!",
      text:"กรุณาตรวจสอบข้อมูลล่าสุดอีกครั้ง",
      timer: 1500,
    });
    window.location.reload();
  }
  };
  checkdata = async () => {
    let data = await httpClient.post(server.CHECK_DATE_STOCK, {
      stock_date: this.state.issue_date,
    });
    // console.log("data", data.data.result);
    if (data.data.result.length === 0) {
      Swal.fire({
              icon: "warning",
              title: "เกิดข้อผิดหลาด กรุณาลองใหม่",
              showConfirmButton: false,
              timer: 1500,
            });
    } else {
      // console.log("ELSE");
      this.setState({ data_table_desc: data.data.result });
    }
  };
  checkdata_date = async () => {
    let data = await httpClient.post(server.CHECK_DATE_STOCK, {
      stock_date: this.state.issue_date,
    });
    // console.log("data", data.data.result);
    if (data.data.result_date.length === 0) {
      Swal.fire({
              icon: "warning",
              title: "เกิดข้อผิดหลาด กรุณาลองใหม่",
              showConfirmButton: false,
              timer: 1500,
            });
    } else {
      // console.log("ELSE");
      this.setState({ data_table_desc: data.data.result_date });
    }
  };

  enter_delete = async () => {
    let data = await httpClient.post(server.DEL_STOCK, {
      stock_date: this.state.issue_date,
    });
    console.log("data", data.data.result);
    if (data.data.result === 0) {
      Swal.fire({
              icon: "warning",
              title: "ไม่พบข้อมูลของวันที่ "+ this.state.issue_date,
              showConfirmButton: false,
              timer: 1500,
            });
            // upload 2024-01-05 ด้วย
    } else {
      Swal.fire({
        title: "Are You sure!.",
        text: "คุณต้องการจะลบข้อมูลของ "+ this.state.issue_date,
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "Yes",
        denyButtonText: `No`,
      }).then(async (result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
  
          this.send_mail();
        } else if (result.isDenied) {
          this.componentDidMount();
        }
      });
    }
  };

  renderTableRow_desc = () => {
    // console.log("data_table", this.state.data_table_desc);
    // console.log("data_table", this.state.data_table.length);
    try {
      if (this.state.data_table_desc !== null) {
        const myResult = this.state.data_table_desc;
        return myResult.map((item) => (
          <tr>
            <td><span className="badge bg-warning">{item.stock_date}</span></td>
            <td>{item.convert_time}</td>
            <td>{item.ac}</td>
            <td>{item.item_no}</td>
            <td>{item.item_name}</td>
            <td>{item.spec}</td>
            <td>{item.maker}</td>
            <td>{item.vender}</td>
            <td>{item.unit_price}</td>
            <td>{item.cur}</td>
            <td>{item.pur_unit}</td>
            <td>{item.pur_lt}</td>
            <td>{item.safety_stock}</td>
            <td>{item.pr_balance}</td>
            <td>{item.po_balance}</td>
            <td>{item.allocate}</td>
            <td>{item.on_hand}</td>
            <td>{item.stock_unit}</td>
          </tr>
        ));
      }
    } catch (error) {}
  };

  render() {
    return (
      <div className="content-wrapper">
        <div className="content">
          <div
            style={{
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              paddingTop: "15px",
            }}
          >
            <h3>Import File : Stock Ball</h3>
          </div>
          <div
            className="row"
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            <div className="col-md-12">
              <div className="card">
                <div
                  className="card-header"
                  style={{ backgroundColor: "#DAEAE8" }}
                >
                  <h3 className="card-title">
                    <b>Check Last Data</b>
                  </h3>
                  <div style={{ color: "red", textAlign: "right" }}>
                    <b>(Item: {this.state.data_table.length})</b>
                  </div>
                </div>

                <div
                  className="card-body"
                  style={{ backgroundColor: "#F5FBFA" }}
                >
                  {/* <div style={{ display: this.state.display1 }}> */}
                  <div className="row justify-content-md-center">
                    <div className="col-auto">
                      <label>Date : </label>
                    </div>
                    <div className="col-2">
                      <input
                        type="date"
                        className="form-control"
                        value={this.state.issue_date}
                        onChange={(e) => {
                          e.preventDefault();
                          this.setState({
                            issue_date: moment(e.target.value).format(
                              "YYYY-MM-DD"
                            ),
                          });
                        }}
                      />
                    </div>
                    <div className="col-auto">
                      <button
                        type="submit"
                        className="btn btn-primary"
                        onClick={(e) => {
                          e.preventDefault();
                          // this.click_check();
                          this.checkdata_date();
                        }}
                      >
                        Check
                      </button>
                    </div>
                    <div className="col-auto">
                      <button
                        type="submit"
                        className="btn btn-danger"
                        onClick={(e) => {
                          e.preventDefault();
                          this.enter_delete();
                        }}
                      >
                        Delete
                      </button>
    <small className="d-block">* กรุณาเลือกวันที่ก่อนลบ</small>
                    </div>
                    <div className="col-auto">
                      <button
                        type="submit"
                        className="btn btn-secondary"
                        onClick={(e) => {
                          e.preventDefault();
                          this.setState({
                            issue_date: moment().format("YYYY-MM-DD"),
                            data_table_desc: [],
                          });
                          // window.location.reload();
                        }}
                      >
                        Reset
                      </button>
                    </div>
                  </div>
                  <div
                    className="card-body table-responsive p-0"
                    style={{ height: "120px", marginTop: "15px" }}
                  >
                    <table
                      className="table table-head-fixed text-nowrap table-bordered table-hover"
                      id="tbupload"
                    >
                      <thead>
                        <tr>
                          {/* <th rowSpan={2} className="align-middle text-center"> */}
                          <th>stock_date</th>
                          <th>time</th>
                          <th>ac</th>
                          <th>item_no</th>
                          <th>item_name</th>
                          <th>spec</th>
                          <th>maker</th>
                          <th>vender</th>
                          <th>unit_price</th>
                          <th>cur</th>
                          <th>pur_unit</th>
                          <th>pur_lt</th>
                          <th>safety_stock</th>
                          <th>pr_balance</th>
                          <th>po_balance</th>
                          <th>allocate</th>
                          <th>on_hand</th>
                          <th>stock_unit</th>
                        </tr>
                      </thead>
                      <tbody>{this.renderTableRow_desc()}</tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="row"
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            <div className="col-md-12">
              <div className="card">
                <div
                  className="card-header"
                  style={{ backgroundColor: "#DAEAE8" }}
                >
                  <h3 className="card-title">
                    <b>Upload Data Excel</b>
                  </h3>
                  <div style={{ color: "red", textAlign: "right" }}>
                    <b>(Item: {this.state.data_table.length})</b>
                  </div>
                </div>

                <div
                  className="card-body"
                  style={{ backgroundColor: "#F5FBFA" }}
                >
                  {/* <div style={{ display: this.state.display1 }}> */}
                  <div className="row justify-content-md-center">
                    <div className="col-auto">
                      <label>Upload file : </label>
                    </div>
                    <div className="col-5">
                      <input
                        type="file"
                        id="input"
                        className="form-control"
                        // value={this.state.excel_data}
                        onFileLoaded={(data, fileInfo, originalFile) =>
                          this.setState({
                            excel_data: data,
                          })
                        }
                      />
                    </div>
                    <div className="col-auto">
                      <button
                        type="submit"
                        className="btn btn-primary"
                        onClick={(e) => {
                          e.preventDefault();
                          // this.click_check();
                          this.click_showdata();
                        }}
                      >
                        Upload
                      </button>
                    </div>
                    <div className="col-auto">
                      <button
                        type="submit"
                        className="btn btn-success"
                        onClick={(e) => {
                          e.preventDefault();
                          this.enter_save();
                        }}
                      >
                        Save
                      </button>
                    </div>
                    <div className="col-auto">
                      <button
                        type="submit"
                        className="btn btn-secondary"
                        onClick={(e) => {
                          e.preventDefault();
                          this.setState({ excel_data: [], data_table: [] });
                          // window.location.reload();
                        }}
                      >
                        Reset
                      </button>
                    </div>
                  </div>
                  <div
                    className="card-body table-responsive p-0"
                    style={{ height: "350px", marginTop: "15px" }}
                  >
                    <table
                      className="table table-head-fixed text-nowrap table-bordered table-hover"
                      id="tbupload"
                    >
                      <thead>
                        <tr>
                          {/* <th rowSpan={2} className="align-middle text-center"> */}
                          <th>stock_date</th>
                          <th>time</th>
                          <th>ac</th>
                          <th>item_no</th>
                          <th>item_name</th>
                          <th>spec</th>
                          <th>maker</th>
                          <th>vender</th>
                          <th>unit_price</th>
                          <th>cur</th>
                          <th>pur_unit</th>
                          <th>pur_lt</th>
                          <th>safety_stock</th>
                          <th>pr_balance</th>
                          <th>po_balance</th>
                          <th>allocate</th>
                          <th>on_hand</th>
                          <th>stock_unit</th>
                        </tr>
                      </thead>
                      <tbody>{this.renderTableRow()}</tbody>
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

export default Upload_excel_stock;
