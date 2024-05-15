import React, { Component } from "react";

import { httpClient } from "../../../utils/HttpClient";
import { server } from "../../../constance/contance";
import moment from "moment";
import ReactApexChart from "react-apexcharts";
import "./mms_brh_allmc.css"

class Mms_brh_allmc extends Component {
  constructor(props) {
    super(props);
    this.tick = this.tick.bind(this);
    this.state = { seconds: props.seconds };

    this.state = {
      start_date: moment().format("YYYY-MM-DD"),
      time: this.props.time,
      seconds: "1200",
      countitem: 0,
      loading: "on",
      selected_machine: "",
      list_machine: [],
      data_status_B: [],
      name_label_B: [],
      avg_ct_B: "",
      ect_B: "",
      idle_time_B: "",
      ng_total_B: "",
      tng_B: "",
      prod_total_B: "",
      yr_B: "",
      utl_B: "",
      // R
      data_status_R: [],
      name_label_R: [],
      ect_R: "",
      idle_time_R: "",
      prod_total_R: "",
      utl_R: "",
      // H
      data_status_H: [],
      name_label_H: [],
      avg_ct_H: "",
      ect1_H: "",
      ect2_H: "",
      idle_time1_H: "",
      idle_time2_H: "",
      prod_total_H: "",
      // prod
      data_prod_H: [],
      series_prod_H: [],

      last_prod_R: "",
      last_prod_B: "",
      last_prod_H: "",
      prod_shift_A_H: 0,
      prod_shift_B_H: 0,
      prod_shift_C_H: 0,
    };
  }

  componentDidMount = async () => {
    await this.get_mc();
    // await this.getOutput_ball_B();
  };
  get_mc = async () => {
    // console.log("get_mc");
    let mc_list_data = await httpClient.post(server.GET_MASTER_MC_GD);
    await this.setState({
      list_machine: mc_list_data.data.result,
      selected_machine: mc_list_data.data.result[0].mc_no,
    });
    // console.log(this.state.selected_machine);
  };

  renderOption_MC = () => {
    try {
      if (this.state.list_machine !== null) {
        const myResult = this.state.list_machine;
        return myResult.map((item) => (
          <option key={item.id}>{item.mc_no}</option>
        ));
      }
    } catch (error) {
      // Handle any potential errors here
      console.error("Error rendering options:", error);
      return null; // or return a default option or message
    }
  };

  get_prod_gd_B_R = async () => {
    // console.log("get_prod_gd");
    let data_B = await httpClient.post(
      server.MMS_PROD_GD_SET_MC +
        "/" +
        this.state.selected_machine +
        "B" +
        "/" +
        this.state.start_date
    );
    // console.log(data_B.data.result_PD);
    await this.setState({
      last_prod_B: data_B.data.result_PD.pop(),
    });
    let data_R = await httpClient.post(
      server.MMS_PROD_GD_SET_MC +
        "/" +
        this.state.selected_machine +
        "R" +
        "/" +
        this.state.start_date
    );
    await this.setState({
      last_prod_R: data_R.data.result_PD.pop(),
    });

    setTimeout(
      function () {
        //Start the timer
        this.get_prod_gd_B_R();
      }.bind(this),
      600000 //10 min
    );
  };

  get_prod_gd = async () => {
    // console.log("get_prod_gd");
    let data = await httpClient.post(
      server.MMS_PROD_GD_SET_MC +
        "/" +
        this.state.selected_machine +
        "H" +
        "/" +
        this.state.start_date
    );
    let data_A = data.data.result_prod_sh;
    // console.log("prod_shift_A_H",data_A);
    for (let index = 0; index < data_A.length; index++) {
      if (data_A[index].shift === "A") {
        console.log("A", data_A[index].total_prod);
        this.setState({ prod_shift_A_H: data_A[index].total_prod });
      } else if (data_A[index].shift === "B") {
        console.log("B", data_A[index].total_prod);
        this.setState({ prod_shift_B_H: data_A[index].total_prod });
      } else if (data_A[index].shift === "C") {
        console.log("C", data_A[index].total_prod);
        this.setState({ prod_shift_C_H: data_A[index].total_prod });
      } else {
        console.log("...");
      }
    }
    // สร้าง promise สำหรับแต่ละ shift
    // const promises = data.data.result_prod_sh.map(async (item) => {
    //   console.log("item",item);
    //   if (item.shift === "A") {
    //     return { prod_shift_A_H: item.total_prod };
    //   } else if (item.shift === "B") {
    //     return { prod_shift_B_H: item.total_prod };
    //   } else if (item.shift === "C") {
    //     return { prod_shift_C_H: item.total_prod };
    //   } else {
    //     return { prod_shift_other_H: item.total_prod };
    //   }
    // });
    // // รอให้ทุก promises เสร็จสิ้น
    // const results = await Promise.all(promises);

    // // รวมผลลัพธ์จาก promises และตั้งค่า state ทีละครั้ง
    // results.forEach(async (result) => {
    //   await this.setState(result);
    // });
    await this.setState({
      data_prod_H: data.data.resultOutput,
      last_prod_H: data.data.result_PD.pop(),
      // prod_shift_A_H: data.data.result_prod_sh[0].total_prod,
      // prod_shift_B_H: data.data.result_prod_sh[1].total_prod,
      // prod_shift_C_H: data.data.result_prod_sh[2].total_prod,
      // series_prod_H: data.data.result[0].mc_no,
      //date_start: moment().add(-0, "days").format("2023-01-13"),
    });
    // console.log("[[[[[[[[[[[[[[",data.data.result_PD.pop());
    setTimeout(
      function () {
        //Start the timer
        this.get_prod_gd();
      }.bind(this),
      600000 //10 min
    );
  };

  getOutput_ball_B = async () => {
    // console.log(this.state.selected_machine);
    const get_data = await httpClient.post(
      server.GET_MMS_GD_ALL_MC +
        "/" +
        this.state.start_date +
        "/" +
        this.state.selected_machine +
        "B",
      { mc_no: this.state.selected_machine + "B" }
      // { mc_no: arr_mc[index].mc_no  }
    );
    // console.log(get_data.data.result[0]);
    if (get_data.data.result.length === 0) {
      this.clear_state_B();
    } else {
      this.setState({
        avg_ct_B: get_data.data.result[0].avgct,
        ect_B: get_data.data.result[0].eachct,
        idle_time_B: get_data.data.result[0].idl,
        ng_total_B:
          get_data.data.result[0].ng_n +
          get_data.data.result[0].ng_p +
          get_data.data.result[0].tng,
        prod_total_B: get_data.data.result[0].prod_total,
        yr_B: get_data.data.result[0].yieldrt,
        utl_B: get_data.data.result[0].utl_total,
      });
    }
    // let array = await httpClient.post(server.MMS_CHART_ALARMLIST_GD, {
    //   date: this.state.start_date,
    //   machine: this.state.selected_machine + "B",
    // });
    // // console.log("B", array.data);
    // // console.log(mc_data.data.result);
    // // console.log(mc_data.data.result[0].topic);

    // let arrayData = array.data.result;
    // const data_status = arrayData.map((item) => item.sumtime);
    // const name = arrayData.map((item) => item.alarm);
    // // console.log(data_status);
    // // console.log(name);

    // await this.setState({
    //   data_status_B: data_status, //[run[0], stop[0], alarm[0], wait[0], full[0]],
    //   name_label_B: name,
    //   data_mc_B: this.state.selected_machine + "B",
    //   count_mc_B: 999, //newArr_MC.length,
    //   loading: "off",
    // });
    // console.log("=================");
    // console.log(this.state.data_status);

    setTimeout(
      function () {
        //Start the timer
        this.getOutput_ball_B();
      }.bind(this),
      600000 //10 min
    );
  };
  getOutput_ball_R = async () => {
    // console.log(this.state.selected_machine + "R");
    const get_data = await httpClient.post(
      server.GET_MMS_GD_ALL_MC +
        "/" +
        this.state.start_date +
        "/" +
        this.state.selected_machine +
        "R",
      { mc_no: this.state.selected_machine + "R" }
      // { mc_no: arr_mc[index].mc_no  }
    );
    // console.log(get_data.data.result[0]);

    if (get_data.data.result.length === 0) {
      this.clear_state_R();
    } else {
      this.setState({
        ect_R: get_data.data.result[0].eachct,
        idle_time_R: get_data.data.result[0].idl,
        prod_total_R: get_data.data.result[0].prod_total,
        utl_R: get_data.data.result[0].utl_total,
      });
    }
    // let array = await httpClient.post(server.MMS_CHART_ALARMLIST_GD, {
    //   date: this.state.start_date,
    //   machine: this.state.selected_machine + "R",
    // });
    // // console.log("R", array.data);
    // // console.log(mc_data.data.result);
    // // console.log(mc_data.data.result[0].topic);

    // let arrayData = array.data.result;
    // const data_status = arrayData.map((item) => item.sumtime);
    // const name = arrayData.map((item) => item.topic);
    // // console.log(data_status);
    // // console.log(name);

    // await this.setState({
    //   data_status_R: data_status, //[run[0], stop[0], alarm[0], wait[0], full[0]],
    //   name_label_R: name,
    //   data_mc_R: this.state.selected_machine + "R",
    //   count_mc_R: 999, //newArr_MC.length,
    //   loading: "off",
    // });
    // console.log("=================");
    // console.log(this.state.data_status);

    setTimeout(
      function () {
        //Start the timer
        this.getOutput_ball_R();
      }.bind(this),
      600000 //10 min
    );
  };

  getOutput_ball_H = async () => {
    // console.log(this.state.selected_machine + "H");
    const get_data = await httpClient.post(
      server.GET_MMS_GD_ALL_MC +
        "/" +
        this.state.start_date +
        "/" +
        this.state.selected_machine +
        // "B",
        "H",
      { mc_no: this.state.selected_machine + "H" }
      // { mc_no: arr_mc[index].mc_no  }
    );
    // console.log(get_data.data);
    if (get_data.data.result.length === 0) {
      this.clear_state_H();
    } else {
      this.setState({
        avg_ct_H: get_data.data.result[0].avgct,
        ect1_H: get_data.data.result[0].cth1,
        ect2_H: get_data.data.result[0].cth2,
        idle_time1_H: get_data.data.result[0].idh1,
        idle_time2_H: get_data.data.result[0].idh2,
        prod_total_H: get_data.data.result[0].prod_total,
      });
    }

    // for (let index = 0; index < arr_mc.length; index++) {
    // let array = await httpClient.post(server.MMS_CHART_ALARMLIST_GD, {
    //   date: this.state.start_date,
    //   machine: this.state.selected_machine + "H",
    // });
    // // console.log("R", array.data);
    // // console.log(mc_data.data.result);
    // // console.log(mc_data.data.result[0].topic);

    // let arrayData = array.data.result;
    // const data_status = arrayData.map((item) => item.sumtime);
    // const name = arrayData.map((item) => item.topic);
    // // console.log(data_status);
    // // console.log(name);

    // await this.setState({
    //   data_status_H: data_status, //[run[0], stop[0], alarm[0], wait[0], full[0]],
    //   name_label_H: name,
    //   data_mc_H: this.state.selected_machine + "H",
    //   count_mc_H: 999, //newArr_MC.length,
    //   loading: "off",
    // });
    // console.log("=================");
    // console.log(this.state.data_status);

    setTimeout(
      function () {
        //Start the timer
        this.getOutput_ball_H();
      }.bind(this),
      600000 //10 min
    );
  };

  getChart_B = async () => {
    let array = await httpClient.post(server.MMS_CHART_ALARMLIST_GD, {
      date: this.state.start_date,
      machine: this.state.selected_machine + "B",
    });
    // console.log("B", array.data);
    // console.log(mc_data.data.result);
    // console.log(mc_data.data.result[0].topic);
    let arrayData = array.data.result;
    if (arrayData.length > 0) {
      const data_status = arrayData.map((item) => item.sumtime);
      const name = arrayData.map((item) => item.alarm);
      // console.log(data_status);
      // console.log(name);

      await this.setState({
        data_status_B: data_status, //[run[0], stop[0], alarm[0], wait[0], full[0]],
        name_label_B: name,
        data_mc_B: this.state.selected_machine + "B",
        count_mc_B: 999, //newArr_MC.length,
        loading: "off",
      });
    } else {
      console.log("B >> No chart");
    }
    //  R
    let array_R = await httpClient.post(server.MMS_CHART_ALARMLIST_GD, {
      date: this.state.start_date,
      machine: this.state.selected_machine + "R",
    });
    let arrayData_R = array_R.data.result;
    if (arrayData_R.length > 0) {
      const data_status_R = arrayData_R.map((item) => item.sumtime);
      const name_R = arrayData_R.map((item) => item.alarm);
      // console.log(data_status);
      // console.log(name);

      await this.setState({
        data_status_R: data_status_R, //[run[0], stop[0], alarm[0], wait[0], full[0]],
        name_label_R: name_R,
        data_mc_R: this.state.selected_machine + "R",
        count_mc_R: 999, //newArr_MC.length,
      });
    } else {
      console.log("R >> No chart");
    }
    // H
    let array_H = await httpClient.post(server.MMS_CHART_ALARMLIST_GD, {
      date: this.state.start_date,
      machine: this.state.selected_machine + "H",
    });
    let arrayData_H = array_H.data.result;
    if (arrayData_H.length > 0) {
      const data_status_H = arrayData_H.map((item) => item.sumtime);
      const name_H = arrayData_H.map((item) => item.alarm);
      // console.log(data_status);
      // console.log(name);

      await this.setState({
        data_status_H: data_status_H, //[run[0], stop[0], alarm[0], wait[0], full[0]],
        name_label_H: name_H,
        data_mc_H: this.state.selected_machine + "H",
        count_mc_H: 999, //newArr_MC.length,
      });
    } else {
      console.log("H >> No chart");
    }
    setTimeout(
      function () {
        //Start the timer
        this.getChart_B();
      }.bind(this),
      600000 //10 min
    );
  };
  clear_state_B = async () => {
    await this.setState({
      data_status_B: [],
      data_mc_B: [],
      count_mc_B: 0,
      avg_ct_B: 0,
      ect_B: 0,
      idle_time_B: 0,
      ng_total_B: 0,
      tng_B: 0,
      prod_total_B: 0,
      yr_B: 0,
      utl_B: 0,
      loading: "on",
    });
  };
  clear_state_R = async () => {
    await this.setState({
      data_status_R: [],
      data_mc_R: [],
      count_mc_R: 0,
      ect_R: 0,
      idle_time_R: 0,
      prod_total_R: 0,
      utl_R: 0,
      //   loading: "on",
    });
  };
  clear_state_H = async () => {
    await this.setState({
      data_status_H: [],
      data_mc_H: [],
      count_mc_H: 0,
      avg_ct_H: 0,
      ect1_H: 0,
      idle_time1_H: 0,
      idle_time2_H: 0,
      prod_total_H: 0,
      //   loading: "on",
    });
  };
  componentDidUpdate = async (prevProps, prevState) => {
    if (prevState.start_date !== this.state.start_date) {
      await this.setState({ loading: "on" });
      await this.getOutput_ball_B();
      // await this.getOutput_ball_R();
      await this.getOutput_ball_H();
      await this.get_prod_gd();
      await this.get_prod_gd_B_R();
      await this.getChart_B();
    } else if (prevState.selected_machine !== this.state.selected_machine) {
      await this.setState({ loading: "on" });
      await this.getOutput_ball_B();
      // await this.getOutput_ball_R();
      await this.getOutput_ball_H();
      await this.get_prod_gd();
      await this.get_prod_gd_B_R();
      await this.getChart_B();
    }
  };
  handleSearch_MC = (event) => {
    this.setState({ selected_machine: event.target.value });
  };
  handleSearch_date = (event) => {
    this.setState({
      start_date: moment(event.target.value).format("YYYY-MM-DD"),
    });
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
    // console.log("M?C", this.state.selected_machine);
    return (
      <div className="content-wrapper">
        <div className="content">
          <h6 className="row justify-content-end">
            Date: {moment().format("YYYY-MM-DD")} {moment().format("HH:mm:ss")}
          </h6>

          <div
            className="row justify-content-center"
            style={{
              // paddingTop: "10px",
              textAlign: "center",
              paddingBottom: "10px",
            }}
          >
            <h6 className="col-auto">Date :</h6>
            <div className="col-2">
              <input
                className="form-control form-control-sm"
                type="date"
                value={this.state.start_date}
                onChange={this.handleSearch_date}
                // onChange={async (e) => {
                //   await moment(e.target.value).format("YYYY-MM-DD");
                // }}
              />
            </div>
            <h6 className="col-auto">Select M/C No. :</h6>

            <div className="col-md-2">
              <select
                value={this.state.selected_machine}
                className="form-control form-control-sm"
                onChange={this.handleSearch_MC}
                // onChange={(e) => {
                //   this.setState({ selected_machine: e.target.value });
                // }}
              >
                {this.renderOption_MC()}
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col-4">
              <div className="card" id="card-B">

                <div className="card-body">
                  {/*<h4 className="card-title">Bore</h4> */}
                  {/* <h3
                    className="card-subtitle mb-2 text-muted"
                    style={{ textAlign: "center" }}
                  >
                    Bore
                  </h3> */}
                  <div className="d-flex justify-content-between">
                    <h6
                      className="card-subtitle mb-2 text-muted"
                      style={{ textAlign: "center" }}
                    >
                      Bore
                    </h6>
                    <h6
                      className="card-subtitle mb-2 text-muted"
                      style={{ textAlign: "right" }}
                    >
                      {this.state.selected_machine + "B"}
                    </h6>
                  </div>

                  <div>
                    <div style={{ height: "280px" }}>
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
                          className="form-control form-control-sm"
                          style={{ flex: "1" }}
                          placeholder="value"
                          value={this.state.ect_B / 100 + " sec"}
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
                          className="form-control form-control-sm"
                          style={{ flex: "1" }}
                          placeholder="value"
                          value={this.state.idle_time_B / 100 + " sec"}
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
                          className="form-control form-control-sm"
                          style={{ flex: "1" }}
                          placeholder="value"
                          value={this.state.yr_B / 10 + " %"}
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
                          className="form-control form-control-sm"
                          style={{ flex: "1" }}
                          placeholder="value"
                          // value={
                          //   ((this.state.utl_B / 1440) * 100).toFixed(2) +
                          //   " %"
                          // }
                          value={
                            ((this.state.last_prod_B / 1440) * 100).toFixed(2) +
                            " %"
                          }
                        />
                      </div>
                    </div>
                    <div
                      style={{
                        // display: "flex",
                        alignItems: "center",
                        // marginTop: "145px",
                      }}
                    >
                      <ReactApexChart
                        options={{
                          chart: {
                            type: "pie",
                          },
                          legend: {
                            position: 'bottom'
                          },
                          title: {
                            text: "Time alarm list",
                            align: "center",
                            style: {
                              fontSize: "18px",
                              fontWeight: "bold",
                            },
                          },
                          //[
                          labels: this.state.name_label_B,
                          responsive: [
                            {
                              breakpoint: 480,
                              options: {
                                chart: {
                                  width: "100%",
                                },
                                legend: {
                                  position: "bottom",
                                },
                              },
                            },
                          ],
                          colors: [
                            "#E8A21F",
                            "#E254FC",
                            "#54FCC7",
                            "#54B2FC",
                            "#23A49A",
                            "#ED4514",
                            "#ED14C9",
                            "#7723CF",
                            "#9CEA92",
                            "#FC9B57",
                            "#F1F76B",
                            "#6BA1DE",
                            "#E3B3EB",
                            "#FF8ED6",
                            "#936BDE",
                          ],
                          tooltip: {
                            y: {
                              formatter: function (val) {
                                return val + " sec";
                              },
                            },
                          },
                        }}
                        series={this.state.data_status_B}
                        height={400}
                        type="pie"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-4">
              <div className="card" id="card-R">
                <div className="card-body">
                  {/*<h4 className="card-title">Bore</h4> */}
                  {/* <h3
                    className="card-subtitle mb-2 text-muted"
                    style={{ textAlign: "center" }}
                  >
                    R/W
                  </h3> */}
                  <div className="d-flex justify-content-between">
                    <h6
                      className="card-subtitle mb-2 text-muted"
                      style={{ textAlign: "center" }}
                    >
                      R/W
                    </h6>
                    <h6
                      className="card-subtitle mb-2 text-muted"
                      style={{ textAlign: "right" }}
                    >
                      {this.state.selected_machine + "R"}
                    </h6>
                  </div>
                  <div>
                    <div style={{ height: "280px" }}>
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
                          className="form-control form-control-sm"
                          style={{ flex: "1" }}
                          placeholder="value"
                          value={this.state.ect_R / 100 + " sec"}
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
                          className="form-control form-control-sm"
                          style={{ flex: "1" }}
                          placeholder="value"
                          value={this.state.idle_time_R / 100 + " sec"}
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
                          className="form-control form-control-sm"
                          style={{ flex: "1" }}
                          placeholder="value"
                          value={
                            ((this.state.last_prod_R / 1440) * 100).toFixed(2) +
                            " %"
                          }
                        />
                      </div>
                    </div>
                    <div
                      style={{
                        // display: "flex",
                        alignItems: "center",
                        // marginTop: "180px",
                      }}
                    >
                      <ReactApexChart
                        options={{
                          chart: {
                            type: "pie",
                          },
                          legend: {
                            position: 'bottom'
                          },
                          title: {
                            text: "Time alarm list",
                            align: "center",
                            style: {
                              fontSize: "18px",
                              fontWeight: "bold",
                            },
                          },
                          //[
                          labels: this.state.name_label_R,
                          responsive: [
                            {
                              breakpoint: 480,
                              options: {
                                chart: {
                                  // width: "100%",
                                  width: 500,
                                },
                                legend: {
                                  position: "bottom",
                                },
                              },
                            },
                          ],
                          colors: [
                            "#E8A21F",
                            "#E254FC",
                            "#54FCC7",
                            "#54B2FC",
                            "#23A49A",
                            "#ED4514",
                            "#ED14C9",
                            "#7723CF",
                            "#9CEA92",
                            "#FC9B57",
                            "#F1F76B",
                            "#6BA1DE",
                            "#E3B3EB",
                            "#FF8ED6",
                            "#936BDE",
                          ],
                          tooltip: {
                            y: {
                              formatter: function (val) {
                                return val + " sec";
                              },
                            },
                          },
                        }}
                        series={this.state.data_status_R}
                        height={400}
                        type="pie"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-4">
              <div className="card" id="card-H">
                <div className="card-body">
                  {/*<h4 className="card-title">Bore</h4> */}
                  {/* <h3
                    className="card-subtitle mb-2 text-muted"
                    style={{ textAlign: "center" }}
                  >
                    S/F
                  </h3> */}
                  <div className="d-flex justify-content-between">
                    <h6
                      className="card-subtitle mb-2 text-muted"
                      style={{ textAlign: "center" }}
                    >
                      S/F
                    </h6>
                    <h6
                      className="card-subtitle mb-2 text-muted"
                      style={{ textAlign: "right" }}
                    >
                      {this.state.selected_machine + "H"}
                    </h6>
                  </div>
                  <div>
                    <div style={{ height: "280px" }}>
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
                          className="form-control form-control-sm"
                          style={{ flex: "1" }}
                          placeholder="value"
                          value={this.state.ect1_H / 100 + " sec"}
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
                          className="form-control form-control-sm"
                          style={{ flex: "1" }}
                          placeholder="value"
                          value={this.state.ect2_H / 100 + " sec"}
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
                          className="form-control form-control-sm"
                          style={{ flex: "1" }}
                          placeholder="value"
                          value={this.state.idle_time1_H / 100 + " sec"}
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
                          className="form-control form-control-sm"
                          style={{ flex: "1" }}
                          placeholder="value"
                          value={this.state.idle_time1_H / 100 + " sec"}
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
                          className="form-control form-control-sm"
                          style={{ flex: "1" }}
                          placeholder="value"
                          value={
                            ((this.state.last_prod_H / 1440) * 100).toFixed(2) +
                            " %"
                          }
                        />
                      </div>
                    </div>
                    <div
                      style={{
                        // display: "flex",
                        alignItems: "center",
                        // marginBottom: "5px",
                      }}
                    >
                      <ReactApexChart
                        options={{
                          chart: {
                            type: "pie",
                          },
                          legend: {
                            position: 'bottom'
                          },
                          title: {
                            text: "Time alarm list",
                            align: "center",
                            style: {
                              fontSize: "18px",
                              fontWeight: "bold",
                            },
                          },
                          //[
                          labels: this.state.name_label_H,
                          responsive: [
                            {
                              breakpoint: 480,
                              options: {
                                chart: {
                                  // width: "100%",
                                  width: 200,
                                },
                                legend: {
                                  position: "bottom",
                                },
                              },
                            },
                          ],
                          colors: [
                            "#E8A21F",
                            "#E254FC",
                            "#54FCC7",
                            "#54B2FC",
                            "#23A49A",
                            "#ED4514",
                            "#ED14C9",
                            "#7723CF",
                            "#9CEA92",
                            "#FC9B57",
                            "#F1F76B",
                            "#6BA1DE",
                            "#E3B3EB",
                            "#FF8ED6",
                            "#936BDE",
                          ],
                          tooltip: {
                            y: {
                              formatter: function (val) {
                                return val + " sec";
                              },
                            },
                          },
                        }}
                        series={this.state.data_status_H}
                        height={400}
                        type="pie"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="card" id="chart-prod">
                <h5 className="card-header">
                  Production : {this.state.selected_machine + "H"}
                </h5>
                <div className="card-body">
                  <div id="chart">
                    <ReactApexChart
                      options={{
                        chart: {
                          height: 350,
                          type: "line",
                          stacked: false,
                        },
                        colors: [
                          "rgb(0, 143, 251)",
                          "#FF3B3B",
                          "#14D91A",
                          "#FF8ED6",
                          "#936BDE",
                          "#A73970",
                        ],

                        dataLabels: {
                          enabled: true,
                        },
                        stroke: {
                          width: [1, 4, 4],
                        },
                        xaxis: {
                          labels: {
                            rotate: -45,
                          },
                          categories: [
                            "08:00",
                            "09:00",
                            "10:00",
                            "11:00",
                            "12:00",
                            "13:00",
                            "14:00",
                            "15:00",
                            "16:00",
                            "17:00",
                            "18:00",
                            "19:00",
                            "20:00",
                            "21:00",
                            "22:00",
                            "23:00",
                            "00:00",
                            "01:00",
                            "02:00",
                            "03:00",
                            "04:00",
                            "05:00",
                            "06:00",
                            "07:00",
                          ],
                        },
                        yaxis: [
                          {
                            axisTicks: {
                              show: true,
                            },
                            axisBorder: {
                              show: true,
                              color: "#008FFB",
                            },
                            labels: {
                              style: {
                                colors: "#008FFB",
                              },
                            },
                            title: {
                              text: "Production (pcs)",
                              style: {
                                color: "#008FFB",
                                fontSize: "18px",
                                fontWeight: 500,
                              },
                            },
                            tooltip: {
                              enabled: true,
                            },
                            // min: [1440,1440,1440,1440,1440,1440,1440,1440,1440,1440,1440,1440,1440,1440,1440,1440,1440,1440,1440,1440,1440,1440,1440,1440]//dataBox.scal_min,
                            // max: dataMax, //dataBox.scal_max,
                          },
                          {
                            axisTicks: {
                              show: false,
                            },
                            axisBorder: {
                              show: false,
                              color: "#FF3B3B",
                            },
                            labels: {
                              show: false,
                              style: {
                                colors: "#FF3B3B",
                              },
                            },
                            // min: dataBox.scal_min,
                            // max: dataMax, //dataBox.scal_max,
                          },
                          {
                            seriesName: "Yield rate",
                            opposite: false,
                            // min: dataBox.scal_min_YR,
                            // max: dataBox.scal_max_YR,
                            axisTicks: {
                              show: false,
                            },
                            axisBorder: {
                              show: false,
                              color: "#ddd", //"#14D91A",
                            },
                            labels: {
                              style: {
                                colors: "#ddd", //"#14D91A",
                              },
                            },
                            // title: {
                            //   text: "Yield Rate (%)",
                            //   style: {
                            //     show: true,
                            //     color: "#14D91A",
                            //     fontSize: "18px",
                            //     fontWeight: 500,
                            //   },
                            // },
                          },
                        ],
                        tooltip: {
                          fixed: {
                            enabled: false,
                            position: "topLeft", // topRight, topLeft, bottomRight, bottomLeft
                            offsetY: 30,
                            offsetX: 60,
                          },
                        },
                        legend: {
                          horizontalAlign: "center",
                          offsetX: 40,
                        },
                      }}
                      series={this.state.data_prod_H}
                      type="line"
                      height={350}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-3">
              <div className="card" id="shift-A">
                <div
                  className="card-body"
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h5 style={{ marginRight: "auto" }}>Shift A</h5>
                  <h5
                    style={{
                      color:
                        this.state.prod_shift_A_H < 1440 * 8 ? "red" : "black",
                      marginLeft: "auto",
                    }}
                  >
                    {this.state.prod_shift_A_H + " pcs"}
                  </h5>
                </div>
              </div>
            </div>
            <div className="col-3">
              <div className="card" id="shift-B">
                <div
                  className="card-body"
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h5 style={{ marginRight: "auto" }}>Shift B</h5>
                  <h5
                    style={{
                      color:
                        this.state.prod_shift_B_H < 1440 * 8 ? "red" : "black",
                      marginLeft: "auto",
                    }}
                  >
                    {this.state.prod_shift_B_H + " pcs"}
                  </h5>
                </div>
              </div>
            </div>
            <div className="col-3">
              <div className="card" id="shift-C">
                <div
                  className="card-body"
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h5 style={{ marginRight: "auto" }}>Shift C</h5>
                  <h5
                    style={{
                      color:
                        this.state.prod_shift_C_H < 1440 * 8 ? "red" : "black",
                      marginLeft: "auto",
                    }}
                  >
                    {this.state.prod_shift_C_H + " pcs"}
                  </h5>
                </div>
              </div>
            </div>
            <div className="col-3">
              <div className="card" id="shift-total">
                <div
                  className="card-body"
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h5 style={{ marginRight: "auto" }}>Shift Total</h5>
                  <h5
                    style={{
                      color: 1 < 1440 * 24 ? "red" : "black",
                      marginLeft: "auto",
                    }}
                  >
                    {this.state.prod_shift_A_H +
                      this.state.prod_shift_B_H +
                      this.state.prod_shift_C_H +
                      " pcs"}
                  </h5>
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
