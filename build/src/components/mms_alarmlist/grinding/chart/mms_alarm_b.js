import React, { Component } from "react";
// import mqtt from "mqtt";
import { server } from "../../../../constance/contance";
import { httpClient } from "../../../../utils/HttpClient";
import ReactApexChart from "react-apexcharts";
import * as moment from "moment";
import Swal from "sweetalert2";
import { FallingLines } from "react-loader-spinner";
import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from "recharts";

class Mms_alarm_b extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mc_no: localStorage.getItem("machine"),
      timeline_series_B: [],
      timeline_options_B: [],
      selected_machine: "ic02b",
      loading:"on",
    };
  }

  componentDidMount = async () => {
    this.show_chart_timeline_B();
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
  show_chart_timeline_B = async () => {
    console.log("Topic Alarm B >> ", this.state.selected_machine);
    try {
      let mc_data = await httpClient.post(server.TIMELINE_ALARMLIST_GD, {
        date: "2024-04-04",//this.state.date_start,
        machine: "ic02b",//this.state.selected_machine + "B",
      });
      console.log("B", mc_data.data.result.length);
      console.log("B>> ", mc_data.data.result);
console.log("1");
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
console.log("else 1");
        for (let index = 0; index < mc_data.data.result.length; index++) {
          switch (mc_data.data.result[index].alarm) {
            case "DAY START":
              DAY_START.push({
                x: this.state.selected_machine + "B",
                y: [
                  new Date(mc_data.data.result[index].occurred).getTime(),
                  new Date(mc_data.data.result[index].restored).getTime(),
                ],
              });
              break;
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
              name: "DAY START",
              data: DAY_START,
            },
          ]})
        // await this.setState({
        //   timeline_series_B: [
        //     {
        //       name: "DAY START",
        //       data: DAY_START,
        //     },
        //     {
        //       name: "CHUTE EMPTY",
        //       data: CHUTE_EMPTY,
        //     },
        //     {
        //       name: "COLLANT LOW",
        //       data: COLLANT_LOW,
        //     },
        //     {
        //       name: "DOOR OPEN",
        //       data: DOOR_OPEN,
        //     },
        //     {
        //       name: "DOOR OPEN STOP",
        //       data: DOOR_OPEN_STOP,
        //     },
        //     {
        //       name: "FULL WORK",
        //       data: FULL_WORK,
        //     },
        //     {
        //       name: "GE NOISE CHECK",
        //       data: GE_NOISE_CHECK,
        //     },
        //     {
        //       name: "GE NOT ON",
        //       data: GE_NOT_ON,
        //     },
        //     {
        //       name: "HANDLE ENGAGED",
        //       data: HANDLE_ENGAGED,
        //     },
        //     {
        //       name: "HANDLE ENGAGED3",
        //       data: HANDLE_ENGAGED3,
        //     },
        //     {
        //       name: "NEXT M/C CHUTE FULL",
        //       data: NEXT_MC_CHUTE_FULL,
        //     },
        //     {
        //       name: "PART DROP P0S 6",
        //       data: PART_DROP_P0S_6,
        //     },
        //     {
        //       name: "REAR DOOR OPEN",
        //       data: REAR_DOOR_OPEN,
        //     },
        //     {
        //       name: "SERVO ALARM",
        //       data: SERVO_ALARM,
        //     },
        //     { name: "SIDE DRESS FOR ERROR", data: SIDE_DRESS_FOR_ERROR },
        //     {
        //       name: "SIDE DRESS REV ERROR",
        //       data: SIDE_DRESS_REV_ERROR,
        //     },
        //     {
        //       name: "WORN WHEEL",
        //       data: WORN_WHEEL,
        //     },
        //     {
        //       name: "LOADING ERROR",
        //       data: LOADING_ERROR,
        //     },
        //     {
        //       name: "TRANSFER LOADER ERROR",
        //       data: TRANSFER_LOADER_ERROR,
        //     },
        //     {
        //       name: "AFTERDRESSSTOP",
        //       data: AFTER_DRESS_STOP,
        //     },
        //     {
        //       name: "SPINOUT",
        //       data: SPINOUT,
        //     },
        //     {
        //       name: "G.WHEEL MOTOR OVER LOAD",
        //       data: G_WHEEL_MOTOR_OVER_LOAD,
        //     },
        //     {
        //       name: "RADIAL DRESS ERROR",
        //       data: RADIAL_DRESS_ERROR,
        //     },
        //     {
        //       name: "LINE UP PUSHER ERROR",
        //       data: LINE_UP_PUSHER_ERROR,
        //     },
        //     {
        //       name: "TRANSFER LOADER NO WORK",
        //       data: TRANSFER_LOADER_NO_WORK,
        //     },
        //     {
        //       name: "R/W BIG",
        //       data: RW_BIG,
        //     },
        //     {
        //       name: "ROTARY DRESSER RUN ERROR",
        //       data: ROTARY_DRESSER_RUN_ERROR,
        //     },
        //     {
        //       name: "DRESSER ERROR",
        //       data: DRESSER_ERROR,
        //     },
        //     {
        //       name: "GRINDER GAUGE ERROR",
        //       data: GRINDER_GAUGE_ERROR,
        //     },
        //     {
        //       name: "I.D SMALL",
        //       data: I_D_SMALL,
        //     },
        //     {
        //       name: "I.D LARGE",
        //       data: I_D_LARGE,
        //     },
        //     {
        //       name: "GRINDER FULL WORK",
        //       data: GRINDER_FULL_WORK,
        //     },
        //     {
        //       name: "GRINDER CHUTE EMPTY",
        //       data: GRINDER_CHUTE_EMPTY,
        //     },
        //     {
        //       name: "A/F ADJ. YIELD STOP",
        //       data: AF_ADJ_YIELD_STOP,
        //     },
        //     {
        //       name: "SORTING FULL WORK COUNTER",
        //       data: SORTING_FULL_WORK_COUNTER,
        //     },
        //     {
        //       name: "SORTING NO WORK",
        //       data: SORTING_NO_WORK,
        //     },
        //     {
        //       name: "REPEAT COUNTER",
        //       data: REPEAT_COUNTER,
        //     },

        //     {
        //       name: "ID SMALL (GE)",
        //       data: ID_SMALL_GE,
        //     },
        //     {
        //       name: "GE CRUSH",
        //       data: GE_CRUSH,
        //     },
        //     {
        //       name: "DPM.ERROR",
        //       data: DPM_ERROR,
        //     },
        //     {
        //       name: "TOTAL TAPER ADJ.LIMIT ERR",
        //       data: TOTAL_TAPER_ADJ_LIMIT_ERR,
        //     },
        //     {
        //       name: "GAUGE ERROR (NO SIGNAL)",
        //       data: GAUGE_ERROR_NO_SIGNAL,
        //     },
        //     {
        //       name: "OK1 TRAP SHUTTER ERROR",
        //       data: OK1_TRAP_SHUTTER_ERROR,
        //     },
        //     {
        //       name: "OK2 TRAP SHUTTER ERROR",
        //       data: OK2_TRAP_SHUTTER_ERROR,
        //     },
        //     {
        //       name: "-NG TRAP SHUTTER ERROR",
        //       data: M_NG_TRAP_SHUTTER_ERROR,
        //     },
        //     {
        //       name: "+NG TRAP SHUTTER ERROR",
        //       data: P_NG_TRAP_SHUTTER_ERROR,
        //     },
        //     {
        //       name: "SORTING NO WORK STOP",
        //       data: SORTING_NO_WORK_STOP,
        //     },
        //     {
        //       name: "GRINDING CYCLE TIME OVER",
        //       data: GRINDING_CYCLE_TIME_OVER,
        //     },
        //     {
        //       name: "RESET BY LOADING",
        //       data: RESET_BY_LOADING,
        //     },
        //   ],
        //   timeline_options_B: {
        //     // title: {
        //     //   text: "NON-OPERATING TIME TOPIC & M/C STATUS",
        //     //   align: "center",
        //     //   style: {
        //     //     fontSize: "24px",
        //     //     fontWeight: "bold",
        //     //   },
        //     // },
        //     chart: {
        //       // background: '#EBEDEF',
        //       height: 250,
        //       type: "rangeBar",
        //     },
        //     plotOptions: {
        //       bar: {
        //         horizontal: true,
        //         barHeight: "100%",
        //         rangeBarGroupRows: true,
        //       },
        //     },
        //     colors: [
        //       // "#D7263D",
        //       "#DA39FA",
        //       "#008b02",
        //       "#57aeff",
        //       "#F46036",
        //       "#02B0A9",
        //       "#CD6F97",
        //       "#0d1dfc",
        //       "#94bafb",
        //       "#195529",
        //       "#c37e41",
        //       "#a7037e",
        //       "#008DE8",
        //       "#00C40C",
        //       "#E800A9",
        //       "#CC9999",
        //       "#00908A",
        //       "#FF6666",
        //       "#9900FF",
        //       "#009360",
        //       "#66CCCC",
        //       "#000033",
        //       "#FF0066",
        //       "#C70039",
        //       "#FFC13D",
        //       "#45B39D",
        //       "#2962FF",
        //       "#18FFFF",
        //       "#7CB342",
        //       "#A5CC08",
        //       "#FF5722",
        //       "#E91E63",
        //       "#AB47BC",
        //       "#FF96C5",
        //       "#74737A",
        //       "#00C3AF",
        //       "#6C88C4",
        //       "#FFA23A",
        //       "#FDBB9F",
        //       "#FF1744",
        //     ],
        //     fill: {
        //       type: "solid",
        //     },
        //     // labels: Data_time,
        //     xaxis: {
        //       type: "datetime",
        //       labels: {
        //         datetimeUTC: false,
        //         rotate: -45,
        //         //   datetimeFormatter: {
        //         //     // year: 'yyyy',
        //         //     // month: "MMM 'yy",
        //         //     // day: 'dd MMM',
        //         //     hour: 'HH:mm',
        //         // },
        //         style: {
        //           fontSize: "19px",
        //           // fontWeight: "bold",
        //         },
        //       },
        //     },
        //     yaxis: {
        //       show: true,
        //       title: {
        //         style: {
        //           fontSize: "20px",
        //         },
        //       },
        //       labels: {
        //         // rotate: -90,
        //         style: {
        //           fontSize: "24px",
        //           fontWeight: "bold",
        //         },
        //       },
        //     },
        //     legend: {
        //       show: true,
        //       showForNullSeries: false,
        //       fontSize: "20px",
        //     },
        //     tooltip: {
        //       x: {
        //         format: "HH:mm:ss",
        //       },
        //     },
        //     // dataLabels: {
        //     //   enabled: true,
        //     // }
        //   },
        //   loading: "off",
        // });
        console.log("B==>",this.state.timeline_series_B);
      }
    } catch (error) {}
  };

  render() {
    return (
      <div className="content-wrapper">
        <div className="content">
          
        <div className="row">
                        <div className="col-md-12">
                          <div className="overlay-wrapper">
                            {/* {this.loadingScreen()} */}
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
                      </div></div>
      </div>
    );
  }
}
export default Mms_alarm_b;
