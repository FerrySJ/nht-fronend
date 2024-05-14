import React, { Component } from "react";
// import mqtt from "mqtt";
import { server } from "../../../constance/contance";
import { httpClient } from "../../../utils/HttpClient";
import ReactApexChart from "react-apexcharts";
import * as moment from "moment";
import Swal from "sweetalert2";
import { FallingLines } from "react-loader-spinner";

import "./grinding.css";
class MMS_GD_HOUR extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date_start: moment().add(-0, "days").format("YYYY-MM-DD"),
      // date_start2: moment().add(-1, "days").format("YYYY-MM-DD 07:00:00"),
      // date_end: moment()
      //   .add(-0, "days")
      //   .format("YYYY-MM-DD 07:00:00"),
      date_start2: moment().add(-0, "days").format("YYYY-MM-DD 07:00:00"),
      date_end: moment().add(+1, "days").format("YYYY-MM-DD 07:00:00"),
      selected_process: "",
      timeline_series: [],
      timeline_options: {},
      timeline_series1: [],
      timeline_options1: {},
      list_machine: [],
      selected_machine: "",
      data_table: [],
      data_table_B: [],
      data_table_R: [],
      data_table_H: [],
      data_topic_B: [],
      data_topic_R: [],
      data_topic_H: [],
      total_time_topic_B: [],
      total_time_topic_R: [],
      total_time_topic_H: [],
      total_time_status_B: [],
      total_time_status_R: [],
      total_time_status_H: [],
      timeline_options_test: {},
      timeline_series_test: [],
      timeline_series_B: [],
      timeline_options_B: {},
      timeline_series_R: [],
      timeline_options_R: {},
      timeline_series_H: [],
      timeline_options_H: {},
      loading: "on",
      hour:7,
      data_hour: [],
    };
  }

  componentDidMount = async () => {
    await this.get_mc();
    await this.get_hour();
    // console.log("time", this.state.date_start2);
    await this.search_data();
    // await this.setState({ loading: "on" });
    // await this.get_mc();

    // await this.setState({ loading: "on" });
    // await this.show_chart_timeline_B();
    // await this.show_chart_timeline_R();
    // await this.show_chart_timeline_H();
    // await this.timeline_status_log();
    // await this.alarm_timeB();
    // await this.alarm_timeR();
    // await this.alarm_timeH();
    // await this.listTopic_time_B();
    // await this.listTopic_time_R();
    // await this.listTopic_time_H();
  };
  get_mc = async () => {
    console.log("get_mc");
    let mc_list_data = await httpClient.post(server.GET_MASTER_MC_GD);
    await this.setState({
      list_machine: mc_list_data.data.result,
      selected_machine: mc_list_data.data.result[0].mc_no,
      //date_start: moment().add(-0, "days").format("2023-01-13"),
    });
    // console.log(this.state.selected_machine);
  };
  
  get_hour = async () => {
    console.log("GET HOUR",this.state.date_start);
    let mc_list_data = await httpClient.post(server.GET_MASTER_HOUR +"/"+ this.state.date_start);
    await this.setState({
      data_hour: mc_list_data.data.result,
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
          {/* <Hourglass
  visible={true}
  height="60"
  width="60"
  ariaLabel="hourglass-loading"
  wrapperStyle={{}}
  wrapperclassName=""
  colors={['#306cce', '#72a1ed']}
/> */}
        </div>
      );
    }
  }

  renderTableRow = () => {
    try {
      if (this.state.list_machine !== null) {
        const myResult = this.state.list_machine;
        return myResult.map((item) => <option>{item.mc_no}</option>);
      }
    } catch (error) {}
  };
  render_listHour = () => {
    try {
      if (this.state.data_hour !== null) {
        const myResult = this.state.data_hour;
        return myResult.map((item) => <option value={item.hour}>{item.hour}</option>);
      }
    } catch (error) {}
  };
  search_data = async () => {
    await this.setState({ loading: "on" });
    await this.get_hour();
    await this.show_chart_timeline_R();
    await this.show_chart_timeline_R();
    await this.show_chart_timeline_B();
    await this.show_chart_timeline_H();
    await this.timeline_status_log();
    await this.alarm_timeB();
    await this.alarm_timeR();
    await this.alarm_timeH();
    await this.listTopic_time_B();
    await this.listTopic_time_R();
    await this.listTopic_time_H();

    setTimeout(
      function () {
        //Start the timer
        this.search_data();
      }.bind(this),
      // 1800 // 1 min
      600000 // 10 min
    );
  };
  
  timeline_status_log = async () => {
    // console.log(this.state.timeline_series);
    try {
      let data_status_log = await httpClient.post(server.mc_status_log_GD_HOUR, {
        date: this.state.date_start,
        machine: this.state.selected_machine + "H",
        hour: this.state.hour,
      });
      console.log("MC status", data_status_log.data.result.length);
      // console.log(data_status_log.data.result);
      if (data_status_log.data.result.length === 0) {
        Swal.fire({
          icon: "warning",
          title: "ไม่พบข้อมูล M/C Status!",
          showConfirmButton: false,
          timer: 1500,
        });
        await this.clear_state_Status();
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
            case "1":
              data_RUN.push({
                x: "MC Log : " + this.state.selected_machine + "H",
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
            case "2":
              data_STOP.push({
                x: "MC Log : " + this.state.selected_machine + "H",
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
            case "3":
              data_ALARM.push({
                x: "MC Log : " + this.state.selected_machine + "H",
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
            case "4":
              data_WAIT_PART.push({
                x: "MC Log : " + this.state.selected_machine + "H",
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
            case "5":
              data_FULL_PART.push({
                x: "MC Log : " + this.state.selected_machine + "H",
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
          timeline_series1: [
            {
              name: "RUN (1)",
              data: data_RUN,
            },
            {
              name: "STOP (2)",
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
          timeline_options1: {
            title: {
              text: "MACHINE STATUS",
              align: "center",
              style: {
                fontSize: "18px",
                fontWeight: "bold",
              },
            },
            chart: {
              // background: '#EBEDEF',
              height: 350,
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
              },
            },
            yaxis: {
              show: true,
            },
            legend: {
              show: true,
              showForNullSeries: false,
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

  show_chart_timeline_B = async () => {
    console.log("Topic Alarm B", this.state.selected_machine);
    console.log("Hour", this.state.hour);
    try {
      let mc_data = await httpClient.post(server.TIMELINE_ALARMLIST_GD_HOUR, {
        date: this.state.date_start,
        machine: this.state.selected_machine + "B",
        hour: this.state.hour,
      });
      console.log("B", mc_data.data.result.length);
      // console.log(mc_data.data.result);
      //   console.log(mc_data.data.result[0].topic);
      if (mc_data.data.result.length === 0) {
        await Swal.fire({
          icon: "warning",
          title: "ไม่พบข้อมูล Topic: B!",
          showConfirmButton: false,
          timer: 1500,
        });
        await this.clear_state_B();
        //   // .then(() => {
        //   await  this.setState({timeline_series_B: [], timeline_options_B: {},})
        // // })
        // console.log(this.state.timeline_series_B);
      } else {
        var CHUTE_EMPTY = [],
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

        for (let index = 0; index < mc_data.data.result.length; index++) {
          // console.log(mc_data.data.result[index].mc_no);
          switch (mc_data.data.result[index].topic) {
            case "CHUTE EMPTY":
              CHUTE_EMPTY.push({
                x: this.state.selected_machine + "B",
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "COLLANT LOW":
              COLLANT_LOW.push({
                x: this.state.selected_machine + "B",
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "DOOR OPEN":
              DOOR_OPEN.push({
                x: this.state.selected_machine + "B",
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "DOOR OPEN STOP":
              DOOR_OPEN_STOP.push({
                x: this.state.selected_machine + "B",
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "FULL WORK":
              FULL_WORK.push({
                x: this.state.selected_machine + "B",
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "GE NOISE CHECK":
              GE_NOISE_CHECK.push({
                x: this.state.selected_machine + "B",
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "GE NOT ON":
              GE_NOT_ON.push({
                x: this.state.selected_machine + "B",
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "HANDLE ENGAGED":
              HANDLE_ENGAGED.push({
                x: this.state.selected_machine + "B",
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "HANDLE ENGAGED3":
              HANDLE_ENGAGED3.push({
                x: this.state.selected_machine + "B",
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "NEXT M/C CHUTE FULL":
              NEXT_MC_CHUTE_FULL.push({
                x: this.state.selected_machine + "B",
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "PART DROP P0S 6":
              PART_DROP_P0S_6.push({
                x: this.state.selected_machine + "B",
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "REAR DOOR OPEN":
              REAR_DOOR_OPEN.push({
                x: this.state.selected_machine + "B",
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "SERVO ALARM":
              SERVO_ALARM.push({
                x: this.state.selected_machine + "B",
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;

            case "SIDE DRESS FOR ERROR":
              SIDE_DRESS_FOR_ERROR.push({
                x: this.state.selected_machine + "B",
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "SIDE DRESS REV ERROR":
              SIDE_DRESS_REV_ERROR.push({
                x: this.state.selected_machine + "B",
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "WORN WHEEL":
              WORN_WHEEL.push({
                x: this.state.selected_machine + "B",
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "LOADING ERROR":
              LOADING_ERROR.push({
                x: this.state.selected_machine + "B",
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "TRANSFER LOADER ERROR":
              TRANSFER_LOADER_ERROR.push({
                x: this.state.selected_machine + "B",
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "AFTER DRESS STOP":
              AFTER_DRESS_STOP.push({
                x: this.state.selected_machine + "B",
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "SPINOUT":
              SPINOUT.push({
                x: this.state.selected_machine + "B",
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "G.WHEEL MOTOR OVER LOAD":
              G_WHEEL_MOTOR_OVER_LOAD.push({
                x: this.state.selected_machine + "B",
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "RADIAL DRESS ERROR":
              RADIAL_DRESS_ERROR.push({
                x: this.state.selected_machine + "B",
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "LINE UP PUSHER ERROR":
              LINE_UP_PUSHER_ERROR.push({
                x: this.state.selected_machine + "B",
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "TRANSFER LOADER NO WORK":
              TRANSFER_LOADER_NO_WORK.push({
                x: this.state.selected_machine + "B",
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "R/W BIG":
              RW_BIG.push({
                x: this.state.selected_machine + "B",
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "ROTARY DRESSER RUN ERROR":
              ROTARY_DRESSER_RUN_ERROR.push({
                x: this.state.selected_machine + "B",
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "DRESSER ERROR":
              DRESSER_ERROR.push({
                x: this.state.selected_machine + "B",
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "GRINDER GAUGE ERROR":
              GRINDER_GAUGE_ERROR.push({
                x: this.state.selected_machine + "B",
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "I.D SMALL":
              I_D_SMALL.push({
                x: this.state.selected_machine + "B",
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "I.D LARGE":
              I_D_LARGE.push({
                x: this.state.selected_machine + "B",
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "GRINDER FULL WORK":
              GRINDER_FULL_WORK.push({
                x: this.state.selected_machine + "B",
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "GRINDER CHUTE EMPTY":
              GRINDER_CHUTE_EMPTY.push({
                x: this.state.selected_machine + "B",
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "A/F ADJ. YIELD STOP":
              AF_ADJ_YIELD_STOP.push({
                x: this.state.selected_machine + "B",
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "SORTING FULL WORK COUNTER":
              SORTING_FULL_WORK_COUNTER.push({
                x: this.state.selected_machine + "B",
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "SORTING NO WORK":
              SORTING_NO_WORK.push({
                x: this.state.selected_machine + "B",
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "REPEAT COUNTER":
              REPEAT_COUNTER.push({
                x: this.state.selected_machine + "B",
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "ID SMALL (GE)":
              ID_SMALL_GE.push({
                x: this.state.selected_machine + "B",
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "GE CRUSH":
              GE_CRUSH.push({
                x: this.state.selected_machine + "B",
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "DPM.ERROR":
              DPM_ERROR.push({
                x: this.state.selected_machine + "B",
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "TOTAL TAPER ADJ.LIMIT ERR":
              TOTAL_TAPER_ADJ_LIMIT_ERR.push({
                x: this.state.selected_machine + "B",
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "GAUGE ERROR (NO SIGNAL)":
              GAUGE_ERROR_NO_SIGNAL.push({
                x: this.state.selected_machine + "B",
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "OK1 TRAP SHUTTER ERROR":
              OK1_TRAP_SHUTTER_ERROR.push({
                x: this.state.selected_machine + "B",
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "OK2 TRAP SHUTTER ERROR":
              OK2_TRAP_SHUTTER_ERROR.push({
                x: this.state.selected_machine + "B",
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "-NG TRAP SHUTTER ERROR":
              M_NG_TRAP_SHUTTER_ERROR.push({
                x: this.state.selected_machine + "B",
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "+NG TRAP SHUTTER ERROR":
              P_NG_TRAP_SHUTTER_ERROR.push({
                x: this.state.selected_machine + "B",
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "SORTING NO WORK STOP":
              SORTING_NO_WORK_STOP.push({
                x: this.state.selected_machine + "B",
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "GRINDING CYCLE TIME OVER":
              GRINDING_CYCLE_TIME_OVER.push({
                x: this.state.selected_machine + "B",
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "RESET BY LOADING":
              RESET_BY_LOADING.push({
                x: this.state.selected_machine + "B",
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
        await this.setState({
          timeline_series_B: [
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
              name: "WORN WHEEL",
              data: WORN_WHEEL,
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
              name: "LOADING ERROR",
              data: LOADING_ERROR,
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
              name: "TRANSFER LOADER ERROR",
              data: TRANSFER_LOADER_ERROR,
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
          ],
          timeline_options_B: {
            title: {
              text: "NON-OPERATING TIME TOPIC",
              align: "center",
              style: {
                fontSize: "18px",
                fontWeight: "bold",
              },
            },
            chart: {
              // background: '#EBEDEF',
              height: 250,
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
              },
            },
            yaxis: {
              show: true,
              title: {
                style: {
                  fontSize: "10px",
                },
              },
            },
            legend: {
              show: true,
              showForNullSeries: false,
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
  show_chart_timeline_R = async () => {
    console.log("Topic Alarm R", this.state.selected_machine);
    try {
      let mc_data = await httpClient.post(server.TIMELINE_ALARMLIST_GD_HOUR, {
        date: this.state.date_start,
        machine: this.state.selected_machine + "R",
        hour: this.state.hour,
      });
      console.log("R", mc_data.data.result.length);
      // console.log(mc_data.data.result);
      // console.log(mc_data.data.result[0].topic);
      if (mc_data.data.result.length === 0) {
        Swal.fire({
          icon: "warning",
          title: "ไม่พบข้อมูล Topic: R!",
          showConfirmButton: false,
          timer: 1500,
        });
        await this.clear_state_R();
        //   // .then(() => {
        //     this.setState({timeline_series_R: [],
        //       timeline_options_R: {},});
        // // })
      } else {
        var CHUTE_EMPTY = [],
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
          WORN_WHEEL = [],
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

        for (let index = 0; index < mc_data.data.result.length; index++) {
          // console.log(mc_data.data.result[index].mc_no);
          switch (mc_data.data.result[index].topic) {
            case "CHUTE EMPTY":
              CHUTE_EMPTY.push({
                x: this.state.selected_machine + "R",
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "COLLANT LOW":
              COLLANT_LOW.push({
                x: this.state.selected_machine + "R",
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "DOOR OPEN":
              DOOR_OPEN.push({
                x: this.state.selected_machine + "R",
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "DOOR OPEN STOP":
              DOOR_OPEN_STOP.push({
                x: this.state.selected_machine + "R",
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "FULL WORK":
              FULL_WORK.push({
                x: this.state.selected_machine + "R",
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "GE NOISE CHECK":
              GE_NOISE_CHECK.push({
                x: this.state.selected_machine + "R",
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "GE NOT ON":
              GE_NOT_ON.push({
                x: this.state.selected_machine + "R",
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "HANDLE ENGAGED":
              HANDLE_ENGAGED.push({
                x: this.state.selected_machine + "R",
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "HANDLE ENGAGED3":
              HANDLE_ENGAGED3.push({
                x: this.state.selected_machine + "R",
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "NEXT M/C CHUTE FULL":
              NEXT_MC_CHUTE_FULL.push({
                x: this.state.selected_machine + "R",
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "PART DROP P0S 6":
              PART_DROP_P0S_6.push({
                x: this.state.selected_machine + "R",
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "REAR DOOR OPEN":
              REAR_DOOR_OPEN.push({
                x: this.state.selected_machine + "R",
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "SERVO ALARM":
              SERVO_ALARM.push({
                x: this.state.selected_machine + "R",
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "SIDE DRESS FOR ERROR":
              SIDE_DRESS_FOR_ERROR.push({
                x: this.state.selected_machine + "R",
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "SIDE DRESS REV ERROR":
              SIDE_DRESS_REV_ERROR.push({
                x: this.state.selected_machine + "R",
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "WORN WHEEL":
              WORN_WHEEL.push({
                x: this.state.selected_machine + "R",
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "LOADING ERROR":
              LOADING_ERROR.push({
                x: this.state.selected_machine + "R",
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "TRANSFER LOADER ERROR":
              TRANSFER_LOADER_ERROR.push({
                x: this.state.selected_machine + "R",
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "AFTER DRESS STOP":
              AFTER_DRESS_STOP.push({
                x: this.state.selected_machine + "R",
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "SPINOUT":
              SPINOUT.push({
                x: this.state.selected_machine + "R",
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "G.WHEEL MOTOR OVER LOAD":
              G_WHEEL_MOTOR_OVER_LOAD.push({
                x: this.state.selected_machine + "R",
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "RADIAL DRESS ERROR":
              RADIAL_DRESS_ERROR.push({
                x: this.state.selected_machine + "R",
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "LINE UP PUSHER ERROR":
              LINE_UP_PUSHER_ERROR.push({
                x: this.state.selected_machine + "R",
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "TRANSFER LOADER NO WORK":
              TRANSFER_LOADER_NO_WORK.push({
                x: this.state.selected_machine + "R",
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "R/W BIG":
              RW_BIG.push({
                x: this.state.selected_machine + "R",
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "ROTARY DRESSER RUN ERROR":
              ROTARY_DRESSER_RUN_ERROR.push({
                x: this.state.selected_machine + "R",
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "DRESSER ERROR":
              DRESSER_ERROR.push({
                x: this.state.selected_machine + "R",
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "GRINDER GAUGE ERROR":
              GRINDER_GAUGE_ERROR.push({
                x: this.state.selected_machine + "R",
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "I.D SMALL":
              I_D_SMALL.push({
                x: this.state.selected_machine + "R",
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "I.D LARGE":
              I_D_LARGE.push({
                x: this.state.selected_machine + "R",
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "GRINDER FULL WORK":
              GRINDER_FULL_WORK.push({
                x: this.state.selected_machine + "R",
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "GRINDER CHUTE EMPTY":
              GRINDER_CHUTE_EMPTY.push({
                x: this.state.selected_machine + "R",
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "A/F ADJ. YIELD STOP":
              AF_ADJ_YIELD_STOP.push({
                x: this.state.selected_machine + "R",
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "SORTING FULL WORK COUNTER":
              SORTING_FULL_WORK_COUNTER.push({
                x: this.state.selected_machine + "R",
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "SORTING NO WORK":
              SORTING_NO_WORK.push({
                x: this.state.selected_machine + "R",
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "REPEAT COUNTER":
              REPEAT_COUNTER.push({
                x: this.state.selected_machine + "R",
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "ID SMALL (GE)":
              ID_SMALL_GE.push({
                x: this.state.selected_machine + "R",
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "GE CRUSH":
              GE_CRUSH.push({
                x: this.state.selected_machine + "R",
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "DPM.ERROR":
              DPM_ERROR.push({
                x: this.state.selected_machine + "R",
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "TOTAL TAPER ADJ.LIMIT ERR":
              TOTAL_TAPER_ADJ_LIMIT_ERR.push({
                x: this.state.selected_machine + "R",
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "GAUGE ERROR (NO SIGNAL)":
              GAUGE_ERROR_NO_SIGNAL.push({
                x: this.state.selected_machine + "R",
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "OK1 TRAP SHUTTER ERROR":
              OK1_TRAP_SHUTTER_ERROR.push({
                x: this.state.selected_machine + "R",
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "OK2 TRAP SHUTTER ERROR":
              OK2_TRAP_SHUTTER_ERROR.push({
                x: this.state.selected_machine + "R",
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "-NG TRAP SHUTTER ERROR":
              M_NG_TRAP_SHUTTER_ERROR.push({
                x: this.state.selected_machine + "R",
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "+NG TRAP SHUTTER ERROR":
              P_NG_TRAP_SHUTTER_ERROR.push({
                x: this.state.selected_machine + "R",
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "SORTING NO WORK STOP":
              SORTING_NO_WORK_STOP.push({
                x: this.state.selected_machine + "R",
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "GRINDING CYCLE TIME OVER":
              GRINDING_CYCLE_TIME_OVER.push({
                x: this.state.selected_machine + "R",
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "RESET BY LOADING":
              RESET_BY_LOADING.push({
                x: this.state.selected_machine + "R",
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
        await this.setState({
          timeline_series_R: [
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
              name: "WORN WHEEL",
              data: WORN_WHEEL,
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
              name: "LOADING ERROR",
              data: LOADING_ERROR,
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
              name: "TRANSFER LOADER ERROR",
              data: TRANSFER_LOADER_ERROR,
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
          ],
          timeline_options_R: {
            // title: {
            //   text: "NON-OPERATING TIME TOPIC",
            //   align: "center",
            //   style: {
            //     fontSize: "15px",
            //     fontWeight: "bold",
            //   },
            // },
            chart: {
              // background: '#EBEDEF',
              height: 250,
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
            ],
            fill: {
              type: "solid",
            },
            // labels: Data_time,
            xaxis: {
              type: "datetime",
              labels: {
                datetimeUTC: false,
              },
            },
            yaxis: {
              show: true,
              title: {
                style: {
                  fontSize: "10px",
                },
              },
            },
            legend: {
              show: true,
              showForNullSeries: false,
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
        // console.log("R==>",this.state.timeline_series_R);
      }
    } catch (error) {}
  };
  show_chart_timeline_H = async () => {
    console.log("Topic Alarm H", this.state.selected_machine);
    try {
      let mc_data = await httpClient.post(server.TIMELINE_ALARMLIST_GD_HOUR, {
        date: this.state.date_start,
        machine: this.state.selected_machine + "H",
        hour: this.state.hour,
      });
      console.log("H", mc_data.data.result.length);
      // console.log(mc_data.data.result);
      // console.log(mc_data.data.result[0].topic);
      if (mc_data.data.result.length === 0) {
        Swal.fire({
          icon: "warning",
          title: "ไม่พบข้อมูล Topic: H!",
          showConfirmButton: false,
          timer: 1500,
        });
        await this.clear_state_H();

        //   // .then(() => {
        //     this.setState({timeline_series_H: [],
        //       timeline_options_H: {},});
        // // })
      } else {
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
          H2_FLOATLESS_SW_ERROR = [];

        for (let index = 0; index < mc_data.data.result.length; index++) {
          // console.log(mc_data.data.result[index].mc_no);
          switch (mc_data.data.result[index].topic) {
            case "H-1 LOADING ERROR":
              H1_LOADING_ERROR.push({
                x: this.state.selected_machine + "H",
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "H-1 ARM FWD ERROR":
              H1_ARM_FWD_ERROR.push({
                x: this.state.selected_machine + "H",
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "H-1 TOOL ENGAGE IN ERROR":
              H1_TOOL_ENGAGE_IN_ERROR.push({
                x: this.state.selected_machine + "H",
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "H-1 TOOL ENGAGE OUT ERROR":
              H1_TOOL_ENGAGE_OUT_ERROR.push({
                x: this.state.selected_machine + "H",
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "H-1 ARM REV ERROR":
              H1_ARM_REV_ERROR.push({
                x: this.state.selected_machine + "H",
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "TR-1 LOADER ERROR":
              TR1_LOADER_ERROR.push({
                x: this.state.selected_machine + "H",
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "TR-1 STEP CHECK ERROR":
              TR1_STEP_CHECK_ERROR.push({
                x: this.state.selected_machine + "H",
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "TR-1 PUSHER ERROR":
              TR1_PUSHER_ERROR.push({
                x: this.state.selected_machine + "H",
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "H-1 ARM CENTER ERROR":
              H1_ARM_CENTER_ERROR.push({
                x: this.state.selected_machine + "H",
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "TR-1 NO PART":
              TR1_NO_PART.push({
                x: this.state.selected_machine + "H",
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "H1 NO WORK":
              H1_NO_WORK.push({
                x: this.state.selected_machine + "H",
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "H2 NO WORK":
              H2_NO_WORK.push({
                x: this.state.selected_machine + "H",
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "H1 FULL WORK":
              H1_FULL_WORK.push({
                x: this.state.selected_machine + "H",
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "H2 FULL WORK":
              H2_FULL_WORK.push({
                x: this.state.selected_machine + "H",
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "H-1 FLOATLESS SW ERROR":
              H1_FLOATLESS_SW_ERROR.push({
                x: this.state.selected_machine + "H",
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "H-2 LOADING ERROR":
              H2_LOADING_ERROR.push({
                x: this.state.selected_machine + "H",
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "H-2 ARM FWD ERROR":
              H2_ARM_FWD_ERROR.push({
                x: this.state.selected_machine + "H",
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "H-2 TOOL ENGAGE IN ERROR":
              H2_TOOL_ENGAGE_IN_ERROR.push({
                x: this.state.selected_machine + "H",
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "H-2 TOOL ENGAGE OUT ERROR":
              H2_TOOL_ENGAGE_OUT_ERROR.push({
                x: this.state.selected_machine + "H",
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "H-2 ARM REV ERROR":
              H2_ARM_REV_ERROR.push({
                x: this.state.selected_machine + "H",
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "TR-2 LOADER ERROR":
              TR2_LOADER_ERROR.push({
                x: this.state.selected_machine + "H",
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "TR-2 STEP CHECK ERROR":
              TR2_STEP_CHECK_ERROR.push({
                x: this.state.selected_machine + "H",
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "TR-2 PUSHER ERROR":
              TR2_PUSHER_ERROR.push({
                x: this.state.selected_machine + "H",
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "H-2 ARM CENTER ERROR":
              H2_ARM_CENTER_ERROR.push({
                x: this.state.selected_machine + "H",
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            case "H-2 FLOATLESS SW ERROR":
              H2_FLOATLESS_SW_ERROR.push({
                x: this.state.selected_machine + "H",
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
            default:
          }
        }
        await this.setState({
          timeline_series_H: [
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
          ],
          timeline_options_H: {
            // title: {
            //   text: "NON-OPERATING TIME TOPIC",
            //   align: "center",
            //   style: {
            //     fontSize: "15px",
            //     fontWeight: "bold",
            //   },
            // },
            chart: {
              // background: '#EBEDEF',
              height: 250,
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
            ],
            fill: {
              type: "solid",
            },
            // labels: Data_time,
            xaxis: {
              type: "datetime",
              labels: {
                datetimeUTC: false,
              },
            },
            yaxis: {
              show: true,
              title: {
                style: {
                  fontSize: "10px",
                },
              },
            },
            legend: {
              show: true,
              showForNullSeries: false,
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
        // console.log("R==>",this.state.timeline_series_R);
      }
    } catch (error) {}
  };
  clear_state_Status = async () => {
    await this.setState({
      timeline_series1: [],
      timeline_options1: {},
      data_table_B: [],
      data_table_R: [],
      data_table_H: [],
    });
  };
  clear_state_B = async () => {
    await this.setState({
      timeline_series_B: [],
      timeline_options_B: {},
      data_topic_B: [],
    });
  };
  clear_state_R = async () => {
    await this.setState({
      timeline_series_R: [],
      timeline_options_R: {},
      data_topic_R: [],
    });
  };
  clear_state_H = async () => {
    await this.setState({
      timeline_series_H: [],
      timeline_options_H: {},
      data_topic_H: [],
    });
  };
  alarm_timeB = async () => {
    console.log("alarm B");
    let alarm = await httpClient.post(server.AlarmTopic_time_GD2_HOUR, {
      // date2: this.state.date_start2,
      date2: this.state.date_start,
      dateEnd: this.state.date_end,
      machine: this.state.selected_machine + "B",
      hour: this.state.hour,
    });
    // console.log(alarm);
    // console.log("time2", this.state.date_end);
    // console.log("time3", this.state.date_start2);
    await this.setState({
      data_table_B: alarm.data.result,
      total_time_status_B: alarm.data.result_time_total[0].total_time,
    });
  };
  alarm_timeR = async () => {
    console.log("alarm R");
    let alarm = await httpClient.post(server.AlarmTopic_time_GD2_HOUR, {
      // date2: this.state.date_start2,
      date2: this.state.date_start,
      dateEnd: this.state.date_end,
      machine: this.state.selected_machine + "R",
      hour: this.state.hour,
    });
    // console.log(alarm);
    // console.log("time2", this.state.date_end);
    // console.log("time3", this.state.date_start2);
    await this.setState({
      data_table_R: alarm.data.result,
      total_time_status_R: alarm.data.result_time_total[0].total_time,
    });
  };
  alarm_timeH = async () => {
    console.log("alarm H");
    let alarm = await httpClient.post(server.AlarmTopic_time_GD2_HOUR, {
      // date2: this.state.date_start2,
      date2: this.state.date_start,
      dateEnd: this.state.date_end,
      machine: this.state.selected_machine + "H",
      hour: this.state.hour,
    });
    // console.log(alarm);
    // console.log("time2", this.state.date_end);
    // console.log("time3", this.state.date_start2);
    await this.setState({
      data_table_H: alarm.data.result,
      total_time_status_H: alarm.data.result_time_total[0].total_time,
    });
  };
  listTopic_time_B = async () => {
    console.log("alarm B");
    let topic = await httpClient.post(server.ListTopic_time_GD_HOUR, {
      // date2: this.state.date_start2,
      date2: this.state.date_start,
      dateEnd: this.state.date_end,
      machine: this.state.selected_machine + "B",
      hour: this.state.hour,
    });
    console.log(topic.data.result_time_total[0].total_time);
    await this.setState({
      data_topic_B: topic.data.result,
      total_time_topic_B: topic.data.result_time_total[0].total_time,
    });
    // setTimeout(
    //   function () {
    //     //Start the timer
    //     window.location.reload(true);
    //   }.bind(this),
    //   54000000 // 15 Hr
    // );
  };
  listTopic_time_R = async () => {
    let topic = await httpClient.post(server.ListTopic_time_GD_HOUR, {
      // date2: this.state.date_start2,
      date2: this.state.date_start,
      dateEnd: this.state.date_end,
      machine: this.state.selected_machine + "R",
      hour: this.state.hour,
    });
    await this.setState({
      data_topic_R: topic.data.result,
      total_time_topic_R: topic.data.result_time_total[0].total_time,
    });
  };
  listTopic_time_H = async () => {
    let topic = await httpClient.post(server.ListTopic_time_GD_HOUR, {
      // date2: this.state.date_start2,
      date2: this.state.date_start,
      dateEnd: this.state.date_end,
      machine: this.state.selected_machine + "H",
      hour: this.state.hour,
    });
    await this.setState({
      data_topic_H: topic.data.result,
      total_time_topic_H: topic.data.result_time_total[0].total_time,
    });
  };
  // renderTable_stop() {
  //   if (this.state.data_table1 != null) {
  //     return this.state.data_table1.map((item) => (
  //       <tr>
  //         <td>{item.topic2}</td>
  //         <td>{item.Time}</td>
  //       </tr>
  //     ));
  //   }
  // }

  renderTable_B() {
    if (this.state.data_table_B != null) {
      return this.state.data_table_B.map((item) => (
        <tr>
          <td>
            <span className={item.bg_badge}>{item.status}</span>
          </td>
          <td>{item.Alarm}</td>
        </tr>
      ));
    }
  }
  renderTable_R() {
    if (this.state.data_table_R != null) {
      return this.state.data_table_R.map((item) => (
        <tr>
          <td>
            <span className={item.bg_badge}>{item.status}</span>
          </td>
          <td>{item.Alarm}</td>
        </tr>
      ));
    }
  }
  renderTable_H() {
    if (this.state.data_table_H != null) {
      return this.state.data_table_H.map((item) => (
        <tr>
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
        <tr>
          <td>
            <span className={item.bg_badge}>{item.topic}</span>
          </td>
          <td>{item.Alarm}</td>
        </tr>
      ));
    }
  }
  renderTopic_R() {
    if (this.state.data_topic_R != null) {
      return this.state.data_topic_R.map((item) => (
        <tr>
          <td>
            <span className={item.bg_badge}>{item.topic}</span>
          </td>
          <td>{item.Alarm}</td>
        </tr>
      ));
    }
  }
  renderTopic_H() {
    if (this.state.data_topic_H != null) {
      return this.state.data_topic_H.map((item) => (
        <tr>
          <td>
            <span className={item.bg_badge}>{item.topic}</span>
          </td>
          <td>{item.Alarm}</td>
        </tr>
      ));
    }
  }
  render() {
    return (
      <div className="content-wrapper">
        <section className="content-header">
          <div className="container-fluid">
            <h2 className="text-center" style={{ fontWeight: "bold" }}>
              MACHINE MONITORING STATUS
            </h2>
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
                        <h5>
                          <i className="fas fa-calendar-day">&nbsp;</i>DATE
                        </h5>
                        <input
                          className="form-control is-valid"
                          type="date"
                          id="id_daydate"
                          name="name_daydate"
                          value={this.state.date_start}
                          onChange={async (e) => {
                            await this.setState({
                              date_start: moment(e.target.value).format(
                                "YYYY-MM-DD"
                              ),
                              date_start2: moment(e.target.value).format(
                                "YYYY-MM-DD 07:00:00"
                              ),
                              date_end: moment(e.target.value)
                                .add(+1, "days")
                                .format("YYYY-MM-DD 07:00:00"),
                            });
                          }}
                        />
                      </div>
                      <div className="col-md-2">
                        <h5>
                          <i className="fa fa-layer-group">&nbsp;</i>PROCESS
                        </h5>
                        <input
                          style={{
                            fontWeight: "bold",
                            fontSize: 20,
                            textAlign: "center",
                          }}
                          value="GRINDING"
                          type="text"
                          className="form-control"
                        />
                      </div>

                      <div className="col-md-2">
                        <h5>
                          <i className="fa fa-memory">&nbsp;</i> MACHINE
                        </h5>
                        <select
                          value={this.state.selected_machine}
                          className="form-control"
                          onChange={(e) => {
                            this.setState({ selected_machine: e.target.value });
                          }}
                        >
                          {/* <option>---</option> */}
                          {this.renderTableRow()}
                        </select>
                      </div>
                      <div className="col-md-1">
                      <i className="fas fa-clock fa-beat" id="clock">&nbsp;</i>
                        <h5 style={{paddingLeft:"20px"}}>
                        {/* <div className='container'>
  <span className='pulse-button'>pulse</span>
</div> */}
                           HOUR
                        </h5>
                        <select
                          value={this.state.hour}
                          className="form-control"
                          onChange={(e) => {
                            this.setState({ hour: e.target.value });
                          }}
                        >
                          {this.render_listHour()}
                          {/* <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                          <option value="7" selected>7</option>
                          <option value="8">8</option>
                          <option value="9" >9</option>
                          <option value="10">10</option>
                          <option value="11">11</option>
                          <option value="12">12</option>
                          <option value="13">13</option>
                          <option value="14">14</option>
                          <option value="15">15</option>
                          <option value="16">16</option>
                          <option value="17">17</option>
                          <option value="18">18</option>
                          <option value="19">19</option>
                          <option value="20">20</option>
                          <option value="20">20</option>
                          <option value="20">20</option>
                          <option value="20">20</option>
                          <option value="20">20</option> */}
                        </select>
                      </div>
                      <div className="col-md-1">
                        <h5>&nbsp;</h5>
                        <button
                          type="button"
                          className="btn btn-block btn-danger"
                          onClick={async (e) => {
                            e.preventDefault();
                            this.search_data();
                          }}
                        >
                          <span className="fas fa-redo-alt" />
                        </button>
                      </div>
                      {/* <div><MMS_TB_ALERT/></div> */}
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12"></div>
                  <div className="card card-warning" style={{ width: "100%" }}>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="overlay-wrapper">
                            {this.loadingScreen()}
                            <div id="chart">
                              <ReactApexChart
                                options={this.state.timeline_options_B}
                                series={this.state.timeline_series_B}
                                type="rangeBar"
                                height={300}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="overlay-wrapper">
                            {this.loadingScreen()}
                            <div id="chart">
                              <ReactApexChart
                                options={this.state.timeline_options_R}
                                series={this.state.timeline_series_R}
                                type="rangeBar"
                                height={300}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="overlay-wrapper">
                            {this.loadingScreen()}
                            <div id="chart">
                              <ReactApexChart
                                options={this.state.timeline_options_H}
                                series={this.state.timeline_series_H}
                                type="rangeBar"
                                height={300}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-12"></div>
                  <div className="card card-warning" style={{ width: "100%" }}>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-12">
                          <div id="chart">
                            <ReactApexChart
                              options={this.state.timeline_options1}
                              series={this.state.timeline_series1}
                              type="rangeBar"
                              height={300}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <div className="row" >
                  <div className="col-md-12">

                    <div className="col-md-12">
                      <ReactApexChart options={this.state.timeline_options1} series={this.state.timeline_series1} type="rangeBar" height={300} />
                    </div>
                  </div>
                </div> */}
              {/* <div className="row justify-content-end">
              <Testcode/>
                </div> */}
              </div>
              <div className="row justify-content-center">
                {/* <div className="col-1"></div> */}
                {/* <div className="col-5">
                  <div
                    className="card"
                    style={{ textAlign: "center", fontSize: "16px" }}
                  >
                    <div
                      className="card-header"
                      style={{ backgroundColor: "#FFCCCC", border: true }}
                    >
                      <h3
                        className="card-title"
                        style={{
                          textAlign: "center",
                          fontSize: "20px",
                          color: "#FF0000",
                          fontWeight: "'bold'",
                        }}
                      >
                        
                        <i className="fas fa-exclamation-triangle"></i> 3 WORST
                        ALARM-STOP
                      </h3>
                    </div>
                    <div className="card-body">
                      <table className="table table-bordered table-hover">
                        <thead>
                          <tr>
                            <th>TOPIC</th>
                            <th>TIME (HH:mm:ss)</th>
                          </tr>
                        </thead>
                        <tbody>{this.renderTable()}</tbody>
                      </table>
                    </div>
                  </div>
                </div> */}
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
                        <h3
                          className="card-title"
                          style={{
                            textAlign: "center",
                            fontSize: "20px",
                            // color: "#F0E000",
                            fontWeight: "'bold'",
                          }}
                        >
                          <i className="fas fa-exclamation-triangle"></i> TOTAL
                          MACHINE STATUS :
                          <b>{this.state.selected_machine + "B"}</b>
                        </h3>
                      </div>
                    </div>
                    <div className="overlay-wrapper">
                      {this.loadingScreen()}
                      <div className="card-body">
                        <table className="table table-bordered table-hover">
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
                      id="gradient"
                      // style={{ backgroundColor: "#AEFCCC", border: true }}
                    >
                      <h3
                        className="card-title"
                        style={{
                          textAlign: "center",
                          fontSize: "20px",
                          // color: "#F0E000",
                          fontWeight: "'bold'",
                        }}
                      >
                        <i className="fas fa-exclamation-triangle"></i> TOTAL
                        MACHINE STATUS :
                        <b>{this.state.selected_machine + "R"}</b>
                      </h3>
                    </div>
                    <div className="overlay-wrapper">
                      {this.loadingScreen()}
                      <div className="card-body">
                        <table className="table table-bordered table-hover">
                          <thead>
                            <tr>
                              <th>STATUS</th>
                              <th>TIME (HH:mm:ss)</th>
                            </tr>
                          </thead>
                          <tbody>{this.renderTable_R()}</tbody>
                          <tfoot>
                            <tr>
                              <th>Total Time</th>
                              <th>{this.state.total_time_status_R}</th>
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
                      id="gradient"
                      // style={{ backgroundColor: "#AEFCCC", border: true }}
                    >
                      <h3
                        className="card-title"
                        style={{
                          textAlign: "center",
                          fontSize: "20px",
                          // color: "#F0E000",
                          fontWeight: "'bold'",
                        }}
                      >
                        <i className="fas fa-exclamation-triangle"></i> TOTAL
                        MACHINE STATUS :
                        <b>{this.state.selected_machine + "H"}</b>
                      </h3>
                    </div>
                    <div className="overlay-wrapper">
                      {this.loadingScreen()}
                      <div className="card-body">
                        <table className="table table-bordered table-hover">
                          <thead>
                            <tr>
                              <th>STATUS</th>
                              <th>TIME (HH:mm:ss)</th>
                            </tr>
                          </thead>
                          <tbody>{this.renderTable_H()}</tbody>
                          <tfoot>
                            <tr>
                              <th>Total Time</th>
                              <th>{this.state.total_time_status_H}</th>
                            </tr>
                          </tfoot>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Table Top Topic */}
              <div className="row justify-content-center">
                <div className="col-4">
                  <div
                    className="card"
                    style={{ textAlign: "center", fontSize: "16px" }}
                  >
                    <div
                      className="card-header"
                      style={{ backgroundColor: "#FFCA77", border: true }}
                    >
                      <h3
                        className="card-title"
                        style={{
                          textAlign: "center",
                          fontSize: "20px",
                          // color: "#F0E000",
                          fontWeight: "'bold'",
                        }}
                      >
                        <i className="fas fa-exclamation-triangle"></i>Topic
                        Non-operating :
                        <b>{this.state.selected_machine + "B"}</b>
                      </h3>
                    </div>
                    <div className="overlay-wrapper">
                      {this.loadingScreen()}
                      <div className="card-body">
                        <table className="table table-bordered table-hover">
                          <thead>
                            <tr>
                              <th>LIST TOPIC</th>
                              <th>TIME (HH:mm:ss)</th>
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
                <div className="col-4">
                  <div
                    className="card"
                    style={{ textAlign: "center", fontSize: "16px" }}
                  >
                    <div
                      className="card-header"
                      style={{ backgroundColor: "#FFCA77", border: true }}
                    >
                      <h3
                        className="card-title"
                        style={{
                          textAlign: "center",
                          fontSize: "20px",
                          // color: "#F0E000",
                          fontWeight: "'bold'",
                        }}
                      >
                        <i className="fas fa-exclamation-triangle"></i> Topic
                        Non-operating :
                        <b>{this.state.selected_machine + "R"}</b>
                      </h3>
                    </div>
                    <div className="overlay-wrapper">
                      {this.loadingScreen()}
                      <div className="card-body">
                        <table className="table table-bordered table-hover">
                          <thead>
                            <tr>
                              <th>LIST TOPIC</th>
                              <th>TIME (HH:mm:ss)</th>
                            </tr>
                          </thead>
                          <tbody>{this.renderTopic_R()}</tbody>
                          <tfoot>
                            <tr>
                              <th>Total Time</th>
                              <th>{this.state.total_time_topic_R}</th>
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
                      <h3
                        className="card-title"
                        style={{
                          textAlign: "center",
                          fontSize: "20px",
                          // color: "#F0E000",
                          fontWeight: "'bold'",
                        }}
                      >
                        <i className="fas fa-exclamation-triangle"></i> Topic
                        Non-operating :
                        <b>{this.state.selected_machine + "H"}</b>
                      </h3>
                    </div>
                    <div className="overlay-wrapper">
                      {this.loadingScreen()}
                      <div className="card-body">
                        <table className="table table-bordered table-hover">
                          <thead>
                            <tr>
                              <th>LIST TOPIC</th>
                              <th>TIME (HH:mm:ss)</th>
                            </tr>
                          </thead>
                          <tbody>{this.renderTopic_H()}</tbody>
                          <tfoot>
                            <tr>
                              <th>Total Time</th>
                              <th>{this.state.total_time_topic_H}</th>
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
    );
  }
}

export default MMS_GD_HOUR;
