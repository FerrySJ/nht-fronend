import React, { Component } from "react";
// import mqtt from "mqtt";
import { server } from "../../../constance/contance";
import { httpClient } from "../../../utils/HttpClient";
import ReactApexChart from "react-apexcharts";
import * as moment from "moment";
import { FallingLines } from "react-loader-spinner";

import "./grinding.css";
class MMS_GD_BY_MC extends Component {
  constructor(props) {
    super(props); 

    this.state = {
      show_alert_box: "block",
      show_alert_txt_b: "none",
      date_start: moment().add(-0, "days").format("YYYY-MM-DD"),
      // date_start2: moment().add(-1, "days").format("YYYY-MM-DD 07:00:00"),
      // date_end: moment()
      //   .add(-0, "days")
      //   .format("YYYY-MM-DD 07:00:00"),
      date_start2: moment().add(-0, "days").format("YYYY-MM-DD 07:00:00"),
      date_end: moment().add(+1, "days").format("YYYY-MM-DD 07:00:00"),
      timeline_series: [],
      timeline_options: {},
      timeline_series1: [],
      timeline_options1: {},
      list_machine: [],
      selected_machine: "",
      data_table: [],
      data_table_B: [],
      data_topic_B: [],
      total_time_topic_B: [],
      total_time_status_B: [],
      timeline_options_test: {},
      timeline_series_test: [],
      timeline_series_B: [],
      timeline_options_B: {},
      status_series_B: [],
      status_options_B: {},
      loading: "on",
      yieldR_B: 0,
      eachCT_B: 0,
      eff_B: 0,
      yieldR_R: 0,
      eachCT_R: 0,
      eff_R: 0,
      yieldR_H: 0,
      eachCT_H: 0,
      eff_H: 0,
      mc: "",
    };
  }

  componentDidMount = async () => {
    await this.get_mc();
    await this.search_data();
  };
  get_mc = async () => {
    // console.log("get_mc");
    let mc_list_data = await httpClient.post(server.GET_MASTER_MC_GD_BASIC);
    // console.log(";;;",mc_list_data.data.result_basic);
    await this.setState({
      list_machine: mc_list_data.data.result_basic,
      selected_machine: mc_list_data.data.result_basic[0].mc_no,
      mc: mc_list_data.data.result_basic[0].mc_no.slice(0, -1),
      //date_start: moment().add(-0, "days").format("2023-01-13"),
    });
  };

  loadingScreen() {
    if (this.state.loading === "on") {
      return (
        <div className="overlay">
          <FallingLines
            color="#4fa94d"
            width="80"
            visible={true}
            ariaLabel="falling-lines-loading"
          />
        </div>
      );
    }
  }
  handleChangeMC = (event) => {
    const { value } = event.target;
    this.setState({ selected_machine: value });
    this.search_data(
      value,
      this.state.date_start,
      this.state.date_start2,
      this.state.date_end
    );
  };
  handleChangeDate = (e) => {
    const { value } = e.target;
    // console.log(value);
    this.setState({
      date_start: moment(value).format("YYYY-MM-DD"),
      date_start2: moment(value).format("YYYY-MM-DD 07:00:00"),
      date_end: moment(value).add(+1, "days").format("YYYY-MM-DD 07:00:00"),
    });
    // this.search_data(this.state.selected_machine,date_start,date_start2,date_end)
    this.search_data();
  };

  renderTableRow = () => {
    try {
      if (this.state.list_machine !== null) {
        const myResult = this.state.list_machine;
        return myResult.map((item) => <option  key={item.mc_no}>{item.mc_no}</option>);
      }
    } catch (error) {}
  };

  search_data = async (selected_machine, date_start, date_start2, date_end) => {
    // console.log("kkk",this.state.selected_machine);
    // console.log(selected_machine);
    await this.setState({ loading: "on" });
    await this.timeline_alarmlist_log_B();
    await this.timeline_alarmlist_log_B();
    await this.timeline_status_log_B();
    await this.alarm_timeB();
    await this.listTopic_time_B();
// เปิด yield all M/C
    await this.get_yield_ct_B();
    await this.get_yield_ct_R();
    await this.get_yield_ct_H();

    setTimeout(
      function () {
        //Start the timer
        this.search_data();
      }.bind(this),
      // 1800 // 1 min
      600000 // 10 min
    );
  };

  timeline_status_log_B = async () => {
    // console.log(this.state.timeline_series);
    try {
      let data_status_log = await httpClient.post(server.mc_status_log_GD, {
        date: this.state.date_start,
        machine: this.state.selected_machine //+ "B",
      });
      // console.log("B MC status", data_status_log.data.result);
      // console.log(data_status_log.data.result);
      if (data_status_log.data.result.length === 0) {
        // Swal.fire({
        //   icon: "warning",
        //   title: "ไม่พบข้อมูล M/C Status B!",
        //   showConfirmButton: false,
        //   timer: 1500,
        // });
        await this.clear_state_Status_B();
      } else {
        var data_STOP = [];
        var data_RUN = [];
        var data_ALARM = [];
        var data_FULL_PART = [];
        var data_WAIT_PART = [];
        for (
          let index = 0;
          index < data_status_log.data.result.length;
          index++
        ) {
          switch (data_status_log.data.result[index].mc_status) {
            case "mc_run":
              data_RUN.push({
                // x: "MC Log : " + this.state.selected_machine + "B",
                x: this.state.selected_machine,
                y: [
                  new Date(
                    data_status_log.data.result[index].occurred
                  ).getTime(),
                  new Date(
                    data_status_log.data.result[index].NextTimeStamp
                  ).getTime(),
                  data_status_log.data.result[index].min_timediff,
                ],
              });
              break;
            case "mc_stop":
              data_STOP.push({
                x: this.state.selected_machine,
                y: [
                  new Date(
                    data_status_log.data.result[index].occurred
                  ).getTime(),
                  new Date(
                    data_status_log.data.result[index].NextTimeStamp
                  ).getTime(),
                ],
              });
              break;
            case "mc_alarm":
              data_ALARM.push({
                x: this.state.selected_machine,
                y: [
                  new Date(
                    data_status_log.data.result[index].occurred
                  ).getTime(),
                  new Date(
                    data_status_log.data.result[index].NextTimeStamp
                  ).getTime(),
                ],
              });
              break;
            case "mc_waitpart":
              data_WAIT_PART.push({
                x: this.state.selected_machine,
                y: [
                  new Date(
                    data_status_log.data.result[index].occurred
                  ).getTime(),
                  new Date(
                    data_status_log.data.result[index].NextTimeStamp
                  ).getTime(),
                ],
              });
              break;
            case "mc_fullWork":
              data_FULL_PART.push({
                x: this.state.selected_machine,
                y: [
                  new Date(
                    data_status_log.data.result[index].occurred
                  ).getTime(),
                  new Date(
                    data_status_log.data.result[index].NextTimeStamp
                  ).getTime(),
                ],
              });
              break;
            default:
            // code block
          }
        }

        await this.setState({
          status_series_B: [
            {
              name: "RUN",
              data: data_RUN,
            },
            {
              name: "STOP",
              data: data_STOP,
            },
            // {
            //   name: "ALARM (3)",
            //   data: data_ALARM,
            // },
            // {
            //   name: "WAIT PART (4)",
            //   data: data_WAIT_PART,
            // },
            // {
            //   name: "FULL PART (5)",
            //   data: data_FULL_PART,
            // },
          ],
          status_options_B: {
            // title: {
            //   text: "NON-OPERATING TIME TOPIC & M/C STATUS",
            //   align: "center",
            //   style: {
            //     fontSize: "24px",
            //     fontWeight: "bold",
            //   },
            // },
            // title: {
            //   text: "MACHINE STATUS",
            //   align: "center",
            //   style: {
            //     fontSize: "20px",
            //     fontWeight: "bold",
            //   },
            // },
            chart: {
              // background: '#EBEDEF',
              height: 120,
              width: 500,
              type: "rangeBar",
            },
            plotOptions: {
              bar: {
                horizontal: true,
                barHeight: "80%",
                rangeBarGroupRows: true,
              },
            },
            colors: [
              "#2ce340",
              "#F4171B",
              "#ff6900",
              "#da39fa",
              "#399dfa",
              "#ffe60c",
            ],
            fill: {
              type: "solid",
            },
            // labels: Data_time,
            xaxis: {
              type: "datetime",
              labels: {
                datetimeUTC: false,
                style: {
                  fontSize: "19px",
                },
              },
            },
            yaxis: {
              show: true,
              labels: {
                // rotate: -45 ,
                style: {
                  fontSize: "24px",
                  fontWeight: "bold",
                },
              },
            },
            legend: {
              show: true,
              showForNullSeries: false,
              fontSize: "20px",
            },

            tooltip: {
              x: {
                format: "HH:mm:ss",
              },
              // shared: true,
              //   intersect: false,
              //   y: {
              //   format: "HH:mm:ss",
              //     formatter: function (m) {
              //       if(typeof m !== "undefined") {
              //         return  m + " min";
              //       }
              //       return m;
              //     }
              //   }
            },
            // tooltip: {
            //   custom: function({ series, seriesIndex, dataPointIndex, w }) {
            //     console.log(series, seriesIndex, dataPointIndex, w )
            //     return (
            //     '<div className="arrow_box">' +
            //       "<span>" +
            //       w.globals.labels[dataPointIndex] +
            //       ": " +
            //       series[seriesIndex][dataPointIndex] +
            //       "</span>" +
            //       "</div>"
            //     );
            //   }
            // },
          },
        });

        // console.log(data_STOP);
        // console.log(data_RUN);
        // console.log(data_WAIT_PART);
        // await console.log(this.state.timeline_series);
      }
    } catch (error) {}
  };

  timeline_alarmlist_log_B = async () => {
    // console.log("Topic Alarm B >> ", this.state.selected_machine);
    try {
      let mc_data = await httpClient.post(server.TIMELINE_ALARMLIST_GD, {
        date: this.state.date_start,
        machine: this.state.selected_machine //+ "B",
      });
      // console.log(mc_data.data);
      if (mc_data.data.result.length === 0) {
        // await Swal.fire({
        //   icon: "warning",
        //   title: "ไม่พบข้อมูล Topic: B!",
        //   showConfirmButton: false,
        //   timer: 1500,
        // });
        await this.clear_state_B();
        //   // .then(() => {
        //   await  this.setState({timeline_series_B: [], timeline_options_B: {},})
        // // })
        // console.log(this.state.timeline_series_B);
      } else {
        // DATA For B,R
        var DAY_START = [],
          CHUTE_EMPTY = [],
          COLLANT_LOW = [],
          DOOR_OPEN = [],
          DOOR_OPEN_STOP = [],
          FULL_WORK = [],
          GE_NOISE_CHECK = [],
          GE_NOT_ON = [],
          HANDLE_ENGAGED = [],
          HANDLE_ENGAGED3 = [],
          NEXT_MC_CHUTE_FULL = [],
          PART_DROP_P0S_6 = [],
          REAR_DOOR_OPEN = [],
          SERVO_ALARM = [],
          SIDE_DRESS_FOR_ERROR = [],
          SIDE_DRESS_REV_ERROR = [],
          WORN_WHEEL = [],
          LOADING_ERROR = [],
          TRANSFER_LOADER_ERROR = [],
          AFTER_DRESS_STOP = [],
          SPINOUT = [],
          G_WHEEL_MOTOR_OVER_LOAD = [],
          RADIAL_DRESS_ERROR = [],
          LINE_UP_PUSHER_ERROR = [],
          TRANSFER_LOADER_NO_WORK = [],
          RW_BIG = [],
          ROTARY_DRESSER_RUN_ERROR = [],
          DRESSER_ERROR = [],
          GRINDER_GAUGE_ERROR = [],
          I_D_SMALL = [],
          I_D_LARGE = [],
          GRINDER_FULL_WORK = [],
          GRINDER_CHUTE_EMPTY = [],
          AF_ADJ_YIELD_STOP = [],
          SORTING_FULL_WORK_COUNTER = [],
          SORTING_NO_WORK = [],
          REPEAT_COUNTER = [],
          ID_SMALL_GE = [],
          GE_CRUSH = [],
          DPM_ERROR = [],
          TOTAL_TAPER_ADJ_LIMIT_ERR = [],
          GAUGE_ERROR_NO_SIGNAL = [],
          OK1_TRAP_SHUTTER_ERROR = [],
          OK2_TRAP_SHUTTER_ERROR = [],
          M_NG_TRAP_SHUTTER_ERROR = [],
          P_NG_TRAP_SHUTTER_ERROR = [],
          SORTING_NO_WORK_STOP = [],
          GRINDING_CYCLE_TIME_OVER = [],
          RESET_BY_LOADING = [];
// DATA FOR H
var H1_LOADING_ERROR = [],
          H1_ARM_FWD_ERROR = [],
          H1_TOOL_ENGAGE_IN_ERROR = [],
          H1_TOOL_ENGAGE_OUT_ERROR = [],
          H1_ARM_REV_ERROR = [],
          TR1_LOADER_ERROR = [],
          TR1_STEP_CHECK_ERROR = [],
          TR1_PUSHER_ERROR = [],
          H1_ARM_CENTER_ERROR = [],
          TR1_NO_PART = [],
          H1_NO_WORK = [],
          H2_NO_WORK = [],
          H1_FULL_WORK = [],
          H2_FULL_WORK = [],
          H1_FLOATLESS_SW_ERROR = [],
          H2_LOADING_ERROR = [],
          H2_ARM_FWD_ERROR = [],
          H2_TOOL_ENGAGE_IN_ERROR = [],
          H2_TOOL_ENGAGE_OUT_ERROR = [],
          H2_ARM_REV_ERROR = [],
          TR2_LOADER_ERROR = [],
          TR2_STEP_CHECK_ERROR = [],
          TR2_PUSHER_ERROR = [],
          H2_ARM_CENTER_ERROR = [],
          H2_FLOATLESS_SW_ERROR = [],
          H1_NO_PART = [],
          H2_NO_PART = [],
          H1_FULL_PART = [],
          H2_FULL_PART = [];
        for (let index = 0; index < mc_data.data.result.length; index++) {
          switch (mc_data.data.result[index].alarm) {
            case "DAY START":
              DAY_START.push({
                x: this.state.selected_machine,
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "CHUTE EMPTY":
              CHUTE_EMPTY.push({
                x: this.state.selected_machine,
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "COLLANT LOW":
              COLLANT_LOW.push({
                x: this.state.selected_machine,
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "DOOR OPEN":
              DOOR_OPEN.push({
                x: this.state.selected_machine,
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "DOOR OPEN STOP":
              DOOR_OPEN_STOP.push({
                x: this.state.selected_machine,
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "FULL WORK":
              FULL_WORK.push({
                x: this.state.selected_machine,
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "GE NOISE CHECK":
              GE_NOISE_CHECK.push({
                x: this.state.selected_machine,
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "GE NOT ON":
              GE_NOT_ON.push({
                x: this.state.selected_machine,
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "HANDLE ENGAGED":
              HANDLE_ENGAGED.push({
                x: this.state.selected_machine,
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "HANDLE ENGAGED3":
              HANDLE_ENGAGED3.push({
                x: this.state.selected_machine,
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "NEXT M/C CHUTE FULL":
              NEXT_MC_CHUTE_FULL.push({
                x: this.state.selected_machine,
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "PART DROP P0S 6":
              PART_DROP_P0S_6.push({
                x: this.state.selected_machine,
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "REAR DOOR OPEN":
              REAR_DOOR_OPEN.push({
                x: this.state.selected_machine,
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "SERVO ALARM":
              SERVO_ALARM.push({
                x: this.state.selected_machine,
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
        
            case "SIDE DRESS FOR ERROR":
              SIDE_DRESS_FOR_ERROR.push({
                x: this.state.selected_machine,
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "SIDE DRESS REV ERROR":
              SIDE_DRESS_REV_ERROR.push({
                x: this.state.selected_machine,
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "WORN WHEEL":
              WORN_WHEEL.push({
                x: this.state.selected_machine,
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "LOADING ERROR":
              LOADING_ERROR.push({
                x: this.state.selected_machine,
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "TRANSFER LOADER ERROR":
              TRANSFER_LOADER_ERROR.push({
                x: this.state.selected_machine,
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "AFTER DRESS STOP":
              AFTER_DRESS_STOP.push({
                x: this.state.selected_machine,
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "SPINOUT":
              SPINOUT.push({
                x: this.state.selected_machine,
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "G.WHEEL MOTOR OVER LOAD":
              G_WHEEL_MOTOR_OVER_LOAD.push({
                x: this.state.selected_machine,
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "RADIAL DRESS ERROR":
              RADIAL_DRESS_ERROR.push({
                x: this.state.selected_machine,
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "LINE UP PUSHER ERROR":
              LINE_UP_PUSHER_ERROR.push({
                x: this.state.selected_machine,
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "TRANSFER LOADER NO WORK":
              TRANSFER_LOADER_NO_WORK.push({
                x: this.state.selected_machine,
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "R/W BIG":
              RW_BIG.push({
                x: this.state.selected_machine,
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "ROTARY DRESSER RUN ERROR":
              ROTARY_DRESSER_RUN_ERROR.push({
                x: this.state.selected_machine,
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "DRESSER ERROR":
              DRESSER_ERROR.push({
                x: this.state.selected_machine,
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "GRINDER GAUGE ERROR":
              GRINDER_GAUGE_ERROR.push({
                x: this.state.selected_machine,
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "I.D SMALL":
              I_D_SMALL.push({
                x: this.state.selected_machine,
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "I.D LARGE":
              I_D_LARGE.push({
                x: this.state.selected_machine,
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "GRINDER FULL WORK":
              GRINDER_FULL_WORK.push({
                x: this.state.selected_machine,
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "GRINDER CHUTE EMPTY":
              GRINDER_CHUTE_EMPTY.push({
                x: this.state.selected_machine,
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "A/F ADJ. YIELD STOP":
              AF_ADJ_YIELD_STOP.push({
                x: this.state.selected_machine,
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "SORTING FULL WORK COUNTER":
              SORTING_FULL_WORK_COUNTER.push({
                x: this.state.selected_machine,
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "SORTING NO WORK":
              SORTING_NO_WORK.push({
                x: this.state.selected_machine,
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "REPEAT COUNTER":
              REPEAT_COUNTER.push({
                x: this.state.selected_machine,
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "ID SMALL (GE)":
              ID_SMALL_GE.push({
                x: this.state.selected_machine,
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "GE CRUSH":
              GE_CRUSH.push({
                x: this.state.selected_machine,
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "DPM.ERROR":
              DPM_ERROR.push({
                x: this.state.selected_machine,
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "TOTAL TAPER ADJ.LIMIT ERR":
              TOTAL_TAPER_ADJ_LIMIT_ERR.push({
                x: this.state.selected_machine,
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "GAUGE ERROR (NO SIGNAL)":
              GAUGE_ERROR_NO_SIGNAL.push({
                x: this.state.selected_machine,
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "OK1 TRAP SHUTTER ERROR":
              OK1_TRAP_SHUTTER_ERROR.push({
                x: this.state.selected_machine,
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "OK2 TRAP SHUTTER ERROR":
              OK2_TRAP_SHUTTER_ERROR.push({
                x: this.state.selected_machine,
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "-NG TRAP SHUTTER ERROR":
              M_NG_TRAP_SHUTTER_ERROR.push({
                x: this.state.selected_machine,
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "+NG TRAP SHUTTER ERROR":
              P_NG_TRAP_SHUTTER_ERROR.push({
                x: this.state.selected_machine,
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "SORTING NO WORK STOP":
              SORTING_NO_WORK_STOP.push({
                x: this.state.selected_machine,
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "GRINDING CYCLE TIME OVER":
              GRINDING_CYCLE_TIME_OVER.push({
                x: this.state.selected_machine,
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "RESET BY LOADING":
              RESET_BY_LOADING.push({
                x: this.state.selected_machine,
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
              // H
              case "H-1 LOADING ERROR":
              H1_LOADING_ERROR.push({
                x: this.state.selected_machine,
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "H-1 ARM FWD ERROR":
              H1_ARM_FWD_ERROR.push({
                x: this.state.selected_machine,
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "H-1 TOOL ENGAGE IN ERROR":
              H1_TOOL_ENGAGE_IN_ERROR.push({
                x: this.state.selected_machine,
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "H-1 TOOL ENGAGE OUT ERROR":
              H1_TOOL_ENGAGE_OUT_ERROR.push({
                x: this.state.selected_machine,
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "H-1 ARM REV ERROR":
              H1_ARM_REV_ERROR.push({
                x: this.state.selected_machine,
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "TR-1 LOADER ERROR":
              TR1_LOADER_ERROR.push({
                x: this.state.selected_machine,
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "TR-1 STEP CHECK ERROR":
              TR1_STEP_CHECK_ERROR.push({
                x: this.state.selected_machine,
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "TR-1 PUSHER ERROR":
              TR1_PUSHER_ERROR.push({
                x: this.state.selected_machine,
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "H-1 ARM CENTER ERROR":
              H1_ARM_CENTER_ERROR.push({
                x: this.state.selected_machine,
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "TR-1 NO PART":
              TR1_NO_PART.push({
                x: this.state.selected_machine,
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "H1 NO WORK":
              H1_NO_WORK.push({
                x: this.state.selected_machine,
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "H2 NO WORK":
              H2_NO_WORK.push({
                x: this.state.selected_machine,
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "H1 FULL WORK":
              H1_FULL_WORK.push({
                x: this.state.selected_machine,
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "H2 FULL WORK":
              H2_FULL_WORK.push({
                x: this.state.selected_machine,
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "H-1 FLOATLESS SW ERROR":
              H1_FLOATLESS_SW_ERROR.push({
                x: this.state.selected_machine,
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "H-2 LOADING ERROR":
              H2_LOADING_ERROR.push({
                x: this.state.selected_machine,
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "H-2 ARM FWD ERROR":
              H2_ARM_FWD_ERROR.push({
                x: this.state.selected_machine,
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "H-2 TOOL ENGAGE IN ERROR":
              H2_TOOL_ENGAGE_IN_ERROR.push({
                x: this.state.selected_machine,
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "H-2 TOOL ENGAGE OUT ERROR":
              H2_TOOL_ENGAGE_OUT_ERROR.push({
                x: this.state.selected_machine,
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "H-2 ARM REV ERROR":
              H2_ARM_REV_ERROR.push({
                x: this.state.selected_machine,
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "TR-2 LOADER ERROR":
              TR2_LOADER_ERROR.push({
                x: this.state.selected_machine,
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "TR-2 STEP CHECK ERROR":
              TR2_STEP_CHECK_ERROR.push({
                x: this.state.selected_machine,
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "TR-2 PUSHER ERROR":
              TR2_PUSHER_ERROR.push({
                x: this.state.selected_machine,
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "H-2 ARM CENTER ERROR":
              H2_ARM_CENTER_ERROR.push({
                x: this.state.selected_machine,
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "H-2 FLOATLESS SW ERROR":
              H2_FLOATLESS_SW_ERROR.push({
                x: this.state.selected_machine,
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "H-1 NO PART":
              H1_NO_PART.push({
                x: this.state.selected_machine,
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "H-2 NO PART":
              H2_NO_PART.push({
                x: this.state.selected_machine,
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "H-1 FULL PART":
              H1_FULL_PART.push({
                x: this.state.selected_machine,
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "H-2 FULL PART":
              H2_FULL_PART.push({
                x: this.state.selected_machine,
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            default:
            // code block
          }
        }
        // console.log(this.state.timeline_series_B);
        await this.setState({
          timeline_series_B: [
            {
              name: "DAY START",
              data: DAY_START,
            },
            {
              name: "CHUTE EMPTY",
              data: CHUTE_EMPTY,
            },
            {
              name: "COLLANT LOW",
              data: COLLANT_LOW,
            },
            {
              name: "DOOR OPEN",
              data: DOOR_OPEN,
            },
            {
              name: "DOOR OPEN STOP",
              data: DOOR_OPEN_STOP,
            },
            {
              name: "FULL WORK",
              data: FULL_WORK,
            },
            {
              name: "GE NOISE CHECK",
              data: GE_NOISE_CHECK,
            },
            {
              name: "GE NOT ON",
              data: GE_NOT_ON,
            },
            {
              name: "HANDLE ENGAGED",
              data: HANDLE_ENGAGED,
            },
            {
              name: "HANDLE ENGAGED3",
              data: HANDLE_ENGAGED3,
            },
            {
              name: "NEXT M/C CHUTE FULL",
              data: NEXT_MC_CHUTE_FULL,
            },
            {
              name: "PART DROP P0S 6",
              data: PART_DROP_P0S_6,
            },
            {
              name: "REAR DOOR OPEN",
              data: REAR_DOOR_OPEN,
            },
            {
              name: "SERVO ALARM",
              data: SERVO_ALARM,
            },
            { name: "SIDE DRESS FOR ERROR", data: SIDE_DRESS_FOR_ERROR },
            {
              name: "SIDE DRESS REV ERROR",
              data: SIDE_DRESS_REV_ERROR,
            },
            {
              name: "WORN WHEEL",
              data: WORN_WHEEL,
            },
            {
              name: "LOADING ERROR",
              data: LOADING_ERROR,
            },
            {
              name: "TRANSFER LOADER ERROR",
              data: TRANSFER_LOADER_ERROR,
            },
            {
              name: "AFTERDRESSSTOP",
              data: AFTER_DRESS_STOP,
            },
            {
              name: "SPINOUT",
              data: SPINOUT,
            },
            {
              name: "G.WHEEL MOTOR OVER LOAD",
              data: G_WHEEL_MOTOR_OVER_LOAD,
            },
            {
              name: "RADIAL DRESS ERROR",
              data: RADIAL_DRESS_ERROR,
            },
            {
              name: "LINE UP PUSHER ERROR",
              data: LINE_UP_PUSHER_ERROR,
            },
            {
              name: "TRANSFER LOADER NO WORK",
              data: TRANSFER_LOADER_NO_WORK,
            },
            {
              name: "R/W BIG",
              data: RW_BIG,
            },
            {
              name: "ROTARY DRESSER RUN ERROR",
              data: ROTARY_DRESSER_RUN_ERROR,
            },
            {
              name: "DRESSER ERROR",
              data: DRESSER_ERROR,
            },
            {
              name: "GRINDER GAUGE ERROR",
              data: GRINDER_GAUGE_ERROR,
            },
            {
              name: "I.D SMALL",
              data: I_D_SMALL,
            },
            {
              name: "I.D LARGE",
              data: I_D_LARGE,
            },
            {
              name: "GRINDER FULL WORK",
              data: GRINDER_FULL_WORK,
            },
            {
              name: "GRINDER CHUTE EMPTY",
              data: GRINDER_CHUTE_EMPTY,
            },
            {
              name: "A/F ADJ. YIELD STOP",
              data: AF_ADJ_YIELD_STOP,
            },
            {
              name: "SORTING FULL WORK COUNTER",
              data: SORTING_FULL_WORK_COUNTER,
            },
            {
              name: "SORTING NO WORK",
              data: SORTING_NO_WORK,
            },
            {
              name: "REPEAT COUNTER",
              data: REPEAT_COUNTER,
            },

            {
              name: "ID SMALL (GE)",
              data: ID_SMALL_GE,
            },
            {
              name: "GE CRUSH",
              data: GE_CRUSH,
            },
            {
              name: "DPM.ERROR",
              data: DPM_ERROR,
            },
            {
              name: "TOTAL TAPER ADJ.LIMIT ERR",
              data: TOTAL_TAPER_ADJ_LIMIT_ERR,
            },
            {
              name: "GAUGE ERROR (NO SIGNAL)",
              data: GAUGE_ERROR_NO_SIGNAL,
            },
            {
              name: "OK1 TRAP SHUTTER ERROR",
              data: OK1_TRAP_SHUTTER_ERROR,
            },
            {
              name: "OK2 TRAP SHUTTER ERROR",
              data: OK2_TRAP_SHUTTER_ERROR,
            },
            {
              name: "-NG TRAP SHUTTER ERROR",
              data: M_NG_TRAP_SHUTTER_ERROR,
            },
            {
              name: "+NG TRAP SHUTTER ERROR",
              data: P_NG_TRAP_SHUTTER_ERROR,
            },
            {
              name: "SORTING NO WORK STOP",
              data: SORTING_NO_WORK_STOP,
            },
            {
              name: "GRINDING CYCLE TIME OVER",
              data: GRINDING_CYCLE_TIME_OVER,
            },
            {
              name: "RESET BY LOADING",
              data: RESET_BY_LOADING,
            },
            // H
            {
              name: "H-1 LOADING ERROR",
              data: H1_LOADING_ERROR,
            },
            {
              name: "H-1 ARM FWD ERROR",
              data: H1_ARM_FWD_ERROR,
            },
            {
              name: "H-1 TOOL ENGAGE IN ERROR",
              data: H1_TOOL_ENGAGE_IN_ERROR,
            },
            {
              name: "H-1 TOOL ENGAGE OUT ERROR",
              data: H1_TOOL_ENGAGE_OUT_ERROR,
            },
            {
              name: "H-1 ARM REV ERROR",
              data: H1_ARM_REV_ERROR,
            },
            {
              name: "TR-1 LOADER ERROR",
              data: TR1_LOADER_ERROR,
            },
            {
              name: "TR-1 STEP CHECK ERROR",
              data: TR1_STEP_CHECK_ERROR,
            },
            {
              name: "TR-1 PUSHER ERROR",
              data: TR1_PUSHER_ERROR,
            },
            {
              name: "H-1 ARM CENTER ERROR",
              data: H1_ARM_CENTER_ERROR,
            },
            {
              name: "TR-1 NO PART",
              data: TR1_NO_PART,
            },
            {
              name: "H1 NO WORK",
              data: H1_NO_WORK,
            },
            {
              name: "H2 NO WORK",
              data: H2_NO_WORK,
            },
            {
              name: "H1 FULL WORK",
              data: H1_FULL_WORK,
            },
            {
              name: "H2 FULL WORK",
              data: H2_FULL_WORK,
            },
            {
              name: "H-1 FLOATLESS SW ERROR",
              data: H1_FLOATLESS_SW_ERROR,
            },
            {
              name: "H-2 LOADING ERROR",
              data: H2_LOADING_ERROR,
            },
            {
              name: "H-2 ARM FWD ERROR",
              data: H2_ARM_FWD_ERROR,
            },
            {
              name: "H-2 TOOL ENGAGE IN ERROR",
              data: H2_TOOL_ENGAGE_IN_ERROR,
            },
            {
              name: "H-2 TOOL ENGAGE OUT ERROR",
              data: H2_TOOL_ENGAGE_OUT_ERROR,
            },
            {
              name: "H-2 ARM REV ERROR",
              data: H2_ARM_REV_ERROR,
            },
            {
              name: "TR-2 LOADER ERROR",
              data: TR2_LOADER_ERROR,
            },
            {
              name: "TR-2 STEP CHECK ERROR",
              data: TR2_STEP_CHECK_ERROR,
            },
            {
              name: "TR-2 PUSHER ERROR",
              data: TR2_PUSHER_ERROR,
            },
            {
              name: "H-2 ARM CENTER ERROR",
              data: H2_ARM_CENTER_ERROR,
            },
            {
              name: "H-2 FLOATLESS SW ERROR",
              data: H2_FLOATLESS_SW_ERROR,
            },
            {
              name: "H-1 NO PART",
              data: H1_NO_PART,
            },
            {
              name: "H-2 NO PART",
              data: H2_NO_PART,
            },
            {
              name: "H-1 FULL PART",
              data: H1_FULL_PART,
            },
            {
              name: "H-2 FULL PART",
              data: H2_FULL_PART,
            },
          ],
          timeline_options_B: {
            // title: {
            //   text: "NON-OPERATING TIME TOPIC & M/C STATUS",
            //   align: "center",
            //   style: {
            //     fontSize: "24px",
            //     fontWeight: "bold",
            //   },
            // },
            chart: {
              // background: '#EBEDEF',
              height: 200,
              type: "rangeBar",
            },
            plotOptions: {
              bar: {
                horizontal: true,
                barHeight: "100%",
                rangeBarGroupRows: true,
              },
            },
            colors: [
              // "#D7263D",
              "#DA39FA",
              "#008b02",
              "#57aeff",
              "#F46036",
              "#02B0A9",
              "#CD6F97",
              "#0d1dfc",
              "#94bafb",
              "#195529",
              "#c37e41",
              "#a7037e",
              "#008DE8",
              "#00C40C",
              "#E800A9",
              "#CC9999",
              "#00908A",
              "#FF6666",
              "#9900FF",
              "#009360",
              "#66CCCC",
              "#000033",
              "#FF0066",
              "#C70039",
              "#FFC13D",
              "#45B39D",
              "#2962FF",
              "#18FFFF",
              "#7CB342",
              "#A5CC08",
              "#FF5722",
              "#E91E63",
              "#AB47BC",
              "#FF96C5",
              "#74737A",
              "#00C3AF",
              "#6C88C4",
              "#FFA23A",
              "#FDBB9F",
              "#FF1744",
              "#5264AB",
              "#9385C0",
              "#E304D8",
              "#BD3A41",
            ],
            fill: {
              type: "solid",
            },
            // labels: Data_time,
            xaxis: {
              type: "datetime",
              labels: {
                datetimeUTC: false,
                rotate: -45,
                //   datetimeFormatter: {
                //     // year: 'yyyy',
                //     // month: "MMM 'yy",
                //     // day: 'dd MMM',
                //     hour: 'HH:mm',
                // },
                style: {
                  fontSize: "19px",
                  // fontWeight: "bold",
                },
              },
            },
            yaxis: {
              show: true,
              title: {
                style: {
                  fontSize: "20px",
                },
              },
              labels: {
                // rotate: -90,
                style: {
                  fontSize: "24px",
                  fontWeight: "bold",
                },
              },
            },
            legend: {
              show: true,
              showForNullSeries: false,
              fontSize: "20px",
            },
            tooltip: {
              x: {
                format: "HH:mm:ss",
              },
            },
            // dataLabels: {
            //   enabled: true,
            // }
          },
          loading: "off",
        });
        // console.log("B==>",this.state.timeline_series_B);
      }
    } catch (error) {}
  };
  clear_state_Status = async () => {
    //H
    await this.setState({
      timeline_series1: [],
      timeline_options1: {},
      data_table_B: [],
    });
  };
  clear_state_Status_B = async () => {
    await this.setState({
      status_series_B: [],
      status_options_B: {},
    });
  };
  clear_state_B = async () => {
    await this.setState({
      timeline_series_B: [],
      timeline_options_B: {},
      data_topic_B: [],
    });
  };

  clear_yr_B = async () => {
    await this.setState({
      yieldR_B: [],
      eachCT_B: {},
      eff_B: [],
    });
  };
  clear_yr_R = async () => {
    await this.setState({
      yieldR_R: [],
      eachCT_R: {},
      eff_R: [],
    });
  };
  clear_yr_H = async () => {
    await this.setState({
      yieldR_H: [],
      eachCT_H: {},
      eff_H: [],
    });
  };
  alarm_timeB = async () => {
    // console.log("alarm B");
    let alarm = await httpClient.post(server.AlarmTopic_time_GD2, {
      // date2: this.state.date_start2,
      date2: this.state.date_start,
      dateEnd: this.state.date_end,
      machine: this.state.selected_machine,
    });
    
    if (alarm.data.result.length > 0) {
      await this.setState({
        data_table_B: alarm.data.result,
      });
    }else{
      console.log("out");
    }
    if (alarm.data.result_time_total.length > 0) {
      await this.setState({
        total_time_status_B: alarm.data.result_time_total[0].total_time,
      });
    }else{
      console.log("out2");
    }
  };
  
  listTopic_time_B = async () => {
    // console.log("alarm B");
    let topic = await httpClient.post(server.ListTopic_time_GD, {
      // date2: this.state.date_start2,
      date2: this.state.date_start,
      dateEnd: this.state.date_end,
      machine: this.state.selected_machine,
    });
    // console.log(topic.data.result);
    if (topic.data.result.length > 0) {
      await this.setState({
        data_topic_B: topic.data.result,
      });
    }else{
      console.log("topic < 0");
    }
    if (topic.data.result_time_total.length > 0) {
      await this.setState({
        total_time_topic_B: topic.data.result_time_total[0].total_time,
      });
    }else{
      console.log("time topic < 0");
    }

    // setTimeout(
    //   function () {
    //     //Start the timer
    //     window.location.reload(true);
    //   }.bind(this),
    //   54000000 // 15 Hr
    // );
  };

  renderTable_B() {
    if (this.state.data_table_B != null) {
      return this.state.data_table_B.map((item) => (
        <tr key={item.id}>
          <td>
            <span className={item.bg_badge}>{item.status}</span>
          </td>
          <td>{item.Alarm}</td>
        </tr>
      ));
    }
  }

  renderTopic_B() {
    if (this.state.data_topic_B != null) {
      return this.state.data_topic_B.map((item) => (
        <tr key={item.id}>
          <td>
            <span className={item.bg_badge}>{item.alarm}</span>
          </td>
          <td>{item.Alarm}</td>
        </tr>
      ));
    }
  }

  get_yield_ct_B = async () => {
    // console.log(this.state.selected_machine + "<====");
console.log(this.state.mc);

    let data = await httpClient.post(
      server.GET_YIELD_EACH_CT +
        "/" +
        this.state.date_start +
        "/" +
        this.state.mc + "B",
      {
        date: this.state.date_start,
        mc: this.state.selected_machine + "B",
      }
    );
    // console.log("get_yield_ct_B");
    // console.log(data.data.result);
    if (data.data.result.length > 0) {
      await this.setState({
        yieldR_B: data.data.result[0].yield_rate,
        eachCT_B: data.data.result[0].each_ct,
        eff_B: data.data.result[0].eff,
      });
    } else {
      await this.setState({
        yieldR_B: 0,
        eachCT_B: 0,
        eff_B: 0,
      });
    }
  };

  get_yield_ct_R = async () => {
let mc = this.state.selected_machine.slice(0, -1);

    let data = await httpClient.post(
      server.GET_YIELD_EACH_CT +
        "/" +
        this.state.date_start +
        "/" +
        mc +
        "R",
      {
        date: this.state.date_start,
        mc: this.state.selected_machine + "R",
      }
    );
    // console.log("get_yield_ct_R");
    // console.log(data.data.result);
    if (data.data.result.length > 0) {
      await this.setState({
        yieldR_R: data.data.result[0].yield_rate,
        eachCT_R: data.data.result[0].each_ct,
        eff_R: data.data.result[0].eff,
      });
    } else {
      await this.setState({
        yieldR_R: 0,
        eachCT_R: 0,
        eff_R: 0,
      });
    }
  };

  get_yield_ct_H = async () => {
let mc = this.state.selected_machine.slice(0, -1);
let data = await httpClient.post(
      server.GET_YIELD_EACH_CT +
        "/" +
        this.state.date_start +
        "/" +
        mc +
        "H",
      {
        date: this.state.date_start,
        mc: mc + "H",
      }
    );
    // console.log("get_yield_ct_H");
    // console.log(data.data.result);
    if (data.data.result.length > 0) {
      await this.setState({
        yieldR_H: data.data.result[0].yield_rate,
        eachCT_H: data.data.result[0].each_ct,
        eff_H: data.data.result[0].eff,
      });
    } else {
      await this.setState({
        yieldR_H: 0,
        eachCT_H: 0,
        eff_H: 0,
      });
    }
  };
  render() {
    return (
      <div className="content-wrapper">
      <div className="content">
        <section className="content">
          <div className="container-fluid">
            <h4 className="text-center" style={{ fontWeight: "bold" }}>
              MACHINE MONITORING STATUS
            </h4>
            {/* <MMS_TB_ALERT /> */}
          </div>
        </section>
        <div className="row">
          <div className="col-md-12">
            <div className="card color-palette-box">
              {/* <div className="card card-primary color-palette-box"> */}
              {/* <div className="card-header">
                <h2 className="card-title">
                  <i className="fas fa-chart-bar" />
                  <b> DAILY RESULT </b>
                </h2>
              </div> */}
              <div className="card card-warning col-md-12">
                <div className="card-body">
                  <div className="col-md-12">
                    <div className="row justify-content-center">
                      <div className="col-md-1"> </div>
                      <div className="col-md-2">
                        <h6>
                          <i className="fas fa-calendar-day">&nbsp;</i>DATE
                        </h6>
                        <input
                          className="form-control is-valid form-control-sm"
                          type="date"
                          id="id_daydate"
                          name="name_daydate"
                          value={this.state.date_start}
                          onChange={this.handleChangeDate}
                      
                        />
                      </div>
                      <div className="col-md-2">
                        <h6>
                          <i className="fa fa-layer-group">&nbsp;</i>PROCESS
                        </h6>
                        <input
                          style={{
                            fontWeight: "bold",
                            fontSize: 20,
                            textAlign: "center",
                          }}
                          value="GRINDING"
                          type="text"
                          className="form-control form-control-sm"
                          disabled
                        />
                      </div>

                      <div className="col-md-2">
                        <h6>
                          <i className="fa fa-memory">&nbsp;</i> MACHINE
                        </h6>
                        <select
                          value={this.state.selected_machine}
                          className="form-control form-control-sm"
                          onChange={this.handleChangeMC}
                        >
                          {/* <option>---</option> */}
                          {this.renderTableRow()}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="row"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div className="col-md-2 col-3">
                  
                    <div className="small-box" id="box_y">
                      <div className="inner" style={{background: "rgba(129, 201, 250, 1)",borderRadius:"15px",border: "2px solid rgba(0, 118, 199, 0.2)"}}>
                        <h6>
                          Yield Rate{" "}
                          <b id="flashing-text" style={{ float: "right" }}>
                            {this.state.mc}B
                          </b>
                        </h6>
                        <h5>{this.state.yieldR_B} %</h5>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-2 col-3">
                    <div className="small-box" id="box_y">
                      <div className="inner" style={{ background: "rgba(129, 201, 250, 1)",borderRadius:"15px",border: "2px solid rgba(0, 118, 199, 0.2)"}}>
                        <h6>Cycle Time</h6>
                        <h5>{this.state.eachCT_B} sec</h5>
                      </div>
                    </div>
                    
                  </div>
                  <div className="col-lg-1 col-3">
                    <div className="small-box" id="box_y">
                      <div className="inner" style={{background: "rgba(129, 201, 250, 1)",borderRadius:"15px",border: "2px solid rgba(0, 118, 199, 0.2)" }}>
                        <h6>Eff </h6>
                        <h5>{this.state.eff_B} %</h5>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-2 col-3">
                    <div className="small-box" id="box_y">
                      <div className="inner" style={{ background: "rgba(129, 250, 131, 1)" ,borderRadius:"15px",border: "2px solid rgba(0, 175, 3, 0.2)" }}>
                        <h6>
                          Cycle Time{" "}
                          <b id="flashing-text" style={{ float: "right" }}>
                            {this.state.mc}R
                          </b>
                        </h6>
                        <h5>{this.state.eachCT_R} sec</h5>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-1 col-3">
                    <div className="small-box" id="box_y">
                      <div className="inner" style={{ background: "rgba(129, 250, 131, 1)" ,borderRadius:"15px",border: "2px solid rgba(0, 175, 3, 0.2)" }}>
                        <h6>Eff </h6>
                        <h5>{this.state.eff_R} %</h5>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-2 col-3">
                    <div className="small-box" id="box_y">
                      <div className="inner" style={{ background: "rgba(221, 158, 255, 1)",borderRadius:"15px",border: "2px solid rgba(136, 4, 207, 0.2)" }}>
                        <h6>
                          Cycle Time{" "}
                          <b id="flashing-text" style={{ float: "right" }}>
                            {this.state.mc}H
                          </b>
                        </h6>
                        <h5>{this.state.eachCT_H} sec</h5>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-1 col-3">
                    <div className="small-box" id="box_y">
                      <div className="inner" style={{ background: "rgba(221, 158, 255, 1)",borderRadius:"15px",border: "2px solid rgba(136, 4, 207, 0.2)"}}>
                        <h6>Eff </h6>
                        <h5>{this.state.eff_H} %</h5>
                      </div>
                    </div>
                  </div>
                </div>
                <h4 style={{ textAlign: "center" }}>
                  M/C STATUS & NON-OPERATING TIME TOPIC
                </h4>
                <div className="row">
                  {/* <div className="col-md-12">B</div> */}
                  <div className="card card-warning" style={{ width: "100%" }}>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-12">
                          <div id="chart">
                            <ReactApexChart
                              options={this.state.status_options_B}
                              series={this.state.status_series_B}
                              type="rangeBar"
                              height={120}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="overlay-wrapper">
                            {this.loadingScreen()}
                            <div id="chart">
                              <ReactApexChart
                                options={this.state.timeline_options_B}
                                series={this.state.timeline_series_B}
                                type="rangeBar"
                                height={200}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row justify-content-center">
                <div className="col-4">
                  <div
                    className="card"
                    style={{ textAlign: "center", fontSize: "16px" }}
                  >
                    <div>
                      <div
                        className="card-header"
                        id="gradient"
                        // style={{ backgroundColor: "#AEFCCC", border: true }}
                      >
                        <h5
                          className="card-title"
                          style={{
                            textAlign: "center",
                            fontSize: "16px",
                            // color: "#F0E000",
                            fontWeight: "'bold'",
                          }}
                        >
                          <i className="fas fa-exclamation-triangle"></i> TOTAL
                          MACHINE STATUS :
                          <b>{this.state.selected_machine}</b>
                        </h5>
                      </div>
                    </div>
                    <div className="overlay-wrapper">
                      {this.loadingScreen()}
                      <div className="card-body">
                        <table className="table table-bordered table-hover" style={{
                            fontSize: "16px",
                          }}>
                          <thead>


                            <tr>
                              <th>STATUS</th>
                              <th>TIME (HH:mm:ss)</th>
                            </tr>
                          </thead>
                          <tbody>{this.renderTable_B()}</tbody>
                          <tfoot>
                            <tr>
                              <th>Total Time</th>
                              <th>{this.state.total_time_status_B}</th>
                            </tr>
                          </tfoot>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-4">
                  <div
                    className="card"
                    style={{ textAlign: "center", fontSize: "16px" }}
                  >
                    <div
                      className="card-header"
                      style={{ backgroundColor: "#FFCA77", border: true }}
                    >
                      <h5
                        className="card-title"
                        style={{
                          textAlign: "center",
                          fontSize: "16px",
                          // color: "#F0E000",
                          fontWeight: "'bold'",
                        }}
                      >
                        <i className="fas fa-exclamation-triangle"></i>Topic
                        Non-operating :
                        <b>{this.state.selected_machine}</b>
                      </h5>
                    </div>
                    <div className="overlay-wrapper">
                      {this.loadingScreen()}
                      <div className="card-body">
                      <div
                  className="card-body table-responsive p-0"
                  style={{ height: "300px" }}
                >
                  <table
                    className="table table-head-fixed text-nowrap table-bordered table-hover"
                    id="tbreport"
                  >
                        {/* <table className="table table-bordered table-hover" style={{ fontSize: "16px",}}> */}
                          <thead>
                            <tr>
                              <th>LIST TOPIC</th>
                              <th>TIME(HH:mm:ss)</th>
                            </tr>
                          </thead>
                          <tbody>{this.renderTopic_B()}</tbody>
                          <tfoot>
                            <tr>
                              <th>Total Time</th>
                              <th>{this.state.total_time_topic_B}</th>
                            </tr>
                          </tfoot>
                        </table>
                      </div>
                      </div>
                    </div>
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

export default MMS_GD_BY_MC;