// backup mms_gd

import React, { Component } from "react";
// import mqtt from "mqtt";
import { server } from "../../../constance/contance";
import { httpClient } from "../../../utils/HttpClient";
import ReactApexChart from "react-apexcharts";
import * as moment from "moment";
import Swal from "sweetalert2";
// import MMS_TB_ALERT from "./mms_gd_alert";

class MMS_GD_GROUP extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date_start: moment().add(-0, "days").format("YYYY-MM-DD"),
      // date_start2: moment().add(-1, "days").format("YYYY-MM-DD 07:00:00"),
      // date_end: moment()
      //   .add(-0, "days")
      //   .format("YYYY-MM-DD 07:00:00"),
      date_start2: moment().add(-0, "days").format("YYYY-MM-DD 07:00:00"),
      date_end: moment()
        .add(+1, "days")
        .format("YYYY-MM-DD 07:00:00"),
      selected_process: "",
      timeline_series: [],
      timeline_options: {},
      timeline_series1: [],
      timeline_options1: {},
      list_machine: [],
      selected_machine: "",
      data_table: [],
      data_table2: [],
      timeline_options_test: {},
      timeline_series_test: [],
      timeline_series_B: [],
      timeline_options_B: {},
      timeline_series_R: [],
      timeline_options_R: {},
    };
  }

  componentDidMount = async () => {
    let mc_list_data = await httpClient.post(server.GET_MASTER_MC_GD);
    await this.setState({
      list_machine: mc_list_data.data.result,
      selected_machine: mc_list_data.data.result[0].mc_no,
      //date_start: moment().add(-0, "days").format("2023-01-13"),
    });
    // console.log(mc_list_data.data.result);
    console.log("time", this.state.date_start2);
    await this.click_update();
    setTimeout(
      function () {
        //Start the timer
        this.click_update();
      }.bind(this),
      600000
    );
  };

  renderTableRow = () => {
    try {
      if (this.state.list_machine !== null) {
        const myResult = this.state.list_machine;
        return myResult.map((item) => <option>{item.mc_no}</option>);
      }
    } catch (error) {}
  };

  click_update = async () => {
    // await this.show_chart_timeline();
    await this.timeline_status_log();
    await this.show_chart_timeline_test();
    // await this.alarm_time();
    // await this.stop_time();
    await this.alarm_time2();
  };

  timeline_status_log = async () => {
    // console.log(this.state.timeline_series);
    try {
      let data_status_log = await httpClient.post(server.mc_status_log_GD, {
        date: this.state.date_start,
        machine: this.state.selected_machine,
      });
      // console.log("]]]]]] ]]]]]]");
      // console.log(data_status_log.data.result);
      if (data_status_log.data.result.length === 0) {
        Swal.fire({
          icon: "warning",
          title: "ไม่พบข้อมูล M/C STATUS!",
          showConfirmButton: false,
          timer: 1500,
        });
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
                x: "MC Log",
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
            case "2":
              data_STOP.push({
                x: "MC Log",
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
                x: "MC Log",
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
                x: "MC Log",
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
                x: "MC Log",
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
          // timeline_series1: [
          //   {
          //     name: "STOP (0)",
          //     data: data_STOP,
          //   },
          //   {
          //     name: "START (1)",
          //     data: data_RUN,
          //   },
          //   {
          //     name: "ALARM (2)",
          //     data: data_ALARM,
          //   },
          //   {
          //     name: "SETUP (3)",
          //     data: data_SETUP,
          //   },
          //   {
          //     name: "WAIT PART (4)",
          //     data: data_WAIT_PART,
          //   },
          //   {
          //     name: "WAIT QC (5)",
          //     data: data_WAIT_QC,
          //   },
          // ],
          timeline_series1: [
            {
              name: "RUN (1)",
              data: data_RUN,
            },
            {
              name: "STOP (2)",
              data: data_STOP,
            },
            {
              name: "ALARM (3)",
              data: data_ALARM,
            },
            {
              name: "WAIT PART (4)",
              data: data_WAIT_PART,
            },
            {
              name: "FULL PART (5)",
              data: data_FULL_PART,
            },
          ],
          timeline_options1: {
            title: {
              text: "MACHINE STATUS",
              align: "center",
              style: {
                fontSize: "15px",
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
            },
           
          },
        });

        // console.log(data_STOP);
        // console.log(data_RUN);
        // console.log(data_WAIT_PART);
        // await console.log(this.state.timeline_series);
      }
    } catch (error) {}
  };

  show_chart_timeline_test = async () => {
    console.log("Topic Alarm");
    try {
      let mc_data = await httpClient.post(server.TIMELINE_ALARMLIST_GD, {
        date: this.state.date_start,
        machine: this.state.selected_machine,
      });
      console.log(mc_data.data.result);
      // console.log(mc_data.data.result[0].topic);
      if (mc_data.data.result.length === 0) {
        Swal.fire({
          icon: "warning",
          title: "ไม่พบข้อมูล M/C STATUS!",
          showConfirmButton: false,
          timer: 1500,
        });
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
          WORN_WHEEL = [],
          DRESSER_ERROR = [],
          GRINDER_GAUGE_ERROR = [],
          LOADING_ERROR = [],
          I_D_SMALL = [],
          I_D_LARGE = [],
          GRINDER_FULL_WORK = [],
          GRINDER_CHUTE_EMPTY = [],
          AF_ADJ_YIELD_STOP = [],
          SORTING_FULL_WORK_COUNTER = [],
          SORTING_NO_WORK = [],
          REPEAT_COUNTER = [],
          TRANSFER_LOADER_ERROR = [],
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
        let set_mcno = mc_data.data.result
          .map((item) => item.mc_no)
          .filter((value, index, self) => self.indexOf(value) === index);
        // Map group mc_no
        console.log("1111111111111111111111",set_mcno);
        let sasa = mc_data.data.result;
        let groupByMC_NO = sasa.reduce((group, mcno) => {
          let { mc_no } = mcno;
          group[mc_no] = group[mc_no] ?? [];
          group[mc_no].push(mcno);
          return group;
        }, {});
        console.log(groupByMC_NO);
        console.log(groupByMC_NO["IC11R"][0].topic);
        // var elements = Object.keys(groupByMC_NO).map(function (k) {
        //   return groupByMC_NO[k];
        // });
        // console.log(elements);
        // let resultList_MMS = [];
        // sasa.forEach(function (a) {
        //   if (!this[a.mc_no]) {
        //     this[a.mc_no] = { mc_no: a.mc_no, data: [] };
        //     resultList_MMS.push(this[a.mc_no]);
        //   }
        //   this[a.mc_no].data.push(a.topic, a.occurred, a.restored);
        // }, Object.create(null));
        // console.log(resultList_MMS);
        // for (var topic in groupByMC_NO) {
          for (let i = 0; i < set_mcno.length; i++) {
            let val_mc = `groupByMC_NO["`+set_mcno[i]+`"]` ;
            let val_mc_l = `groupByMC_NO["`+set_mcno[i]+`"].length` ;
           console.log(val_mc,val_mc_l);
           console.log(groupByMC_NO["IC11R"].length);
          for (let index = 0; index < groupByMC_NO["IC11R"].length; index++) {
            // for (let index = 0; index < mc_data.data.result.length; index++) {
              console.log("ppppp");
              switch (groupByMC_NO["IC11R"][index].topic) {
                case "CHUTE EMPTY":
                  // console.log("CHUTECHUTE");
                  CHUTE_EMPTY.push({
                    x: "ALARM",
                    y: [
                      new Date(groupByMC_NO["IC11R"][index].occurred).getTime(),
                      new Date(groupByMC_NO["IC11R"][index].restored).getTime(),
                    ],
                    data1 : new Date(groupByMC_NO["IC11R"][index].occurred).getTime(),
                    data2 : new Date(groupByMC_NO["IC11R"][index].restored).getTime(),
                  });
                  break;
                case "COLLANT LOW":
                  COLLANT_LOW.push({
                    x: "ALARM",
                    y: [
                      new Date(groupByMC_NO["IC11R"][index].occurred).getTime(),
                      new Date(groupByMC_NO["IC11R"][index].restored).getTime(),
                    ],
                  });
                  break;
                case "DOOR OPEN":
                  DOOR_OPEN.push({
                    x: "ALARM",
                    y: [
                      new Date(groupByMC_NO["IC11R"][index].occurred).getTime(),
                      new Date(groupByMC_NO["IC11R"][index].restored).getTime(),
                    ],
                  });
                  break;
                case "DOOR OPEN STOP":
                  DOOR_OPEN_STOP.push({
                    x: "ALARM",
                    y: [
                      new Date(groupByMC_NO["IC11R"][index].occurred).getTime(),
                      new Date(groupByMC_NO["IC11R"][index].restored).getTime(),
                    ],
                  });
                  break;
                case "FULL WORK":
                  FULL_WORK.push({
                    x: "ALARM",
                    y: [
                      new Date(groupByMC_NO["IC11R"][index].occurred).getTime(),
                      new Date(groupByMC_NO["IC11R"][index].restored).getTime(),
                    ],
                  });
                  break;
                case "GE NOISE CHECK":
                  GE_NOISE_CHECK.push({
                    x: "ALARM",
                    y: [
                      new Date(groupByMC_NO["IC11R"][index].occurred).getTime(),
                      new Date(groupByMC_NO["IC11R"][index].restored).getTime(),
                    ],
                  });
                  break;
                case "GE NOT ON":
                  GE_NOT_ON.push({
                    x: "ALARM",
                    y: [
                      new Date(groupByMC_NO["IC11R"][index].occurred).getTime(),
                      new Date(groupByMC_NO["IC11R"][index].restored).getTime(),
                    ],
                  });
                  break;
                case "HANDLE ENGAGED":
                  HANDLE_ENGAGED.push({
                    x: "ALARM",
                    y: [
                      new Date(groupByMC_NO["IC11R"][index].occurred).getTime(),
                      new Date(groupByMC_NO["IC11R"][index].restored).getTime(),
                    ],
                  });
                  break;
                case "HANDLE ENGAGED3":
                  HANDLE_ENGAGED3.push({
                    x: "ALARM",
                    y: [
                      new Date(groupByMC_NO["IC11R"][index].occurred).getTime(),
                      new Date(groupByMC_NO["IC11R"][index].restored).getTime(),
                    ],
                  });
                  break;
                case "NEXT M/C CHUTE FULL":
                  NEXT_MC_CHUTE_FULL.push({
                    x: "ALARM",
                    y: [
                      new Date(groupByMC_NO["IC11R"][index].occurred).getTime(),
                      new Date(groupByMC_NO["IC11R"][index].restored).getTime(),
                    ],
                  });
                  break;
                case "PART DROP P0S 6":
                  PART_DROP_P0S_6.push({
                    x: "ALARM",
                    y: [
                      new Date(groupByMC_NO["IC11R"][index].occurred).getTime(),
                      new Date(groupByMC_NO["IC11R"][index].restored).getTime(),
                    ],
                  });
                  break;
                case "REAR DOOR OPEN":
                  REAR_DOOR_OPEN.push({
                    x: "ALARM",
                    y: [
                      new Date(groupByMC_NO["IC11R"][index].occurred).getTime(),
                      new Date(groupByMC_NO["IC11R"][index].restored).getTime(),
                    ],
                  });
                  break;
                case "SERVO ALARM":
                  SERVO_ALARM.push({
                    x: "ALARM",
                    y: [
                      new Date(groupByMC_NO["IC11R"][index].occurred).getTime(),
                      new Date(groupByMC_NO["IC11R"][index].restored).getTime(),
                    ],
                  });
                  break;
                case "COLLANT LOW":
                  COLLANT_LOW.push({
                    x: "ALARM",
                    y: [
                      new Date(groupByMC_NO["IC11R"][index].occurred).getTime(),
                      new Date(groupByMC_NO["IC11R"][index].restored).getTime(),
                    ],
                  });
                  break;
            
                case "SIDE DRESS FOR ERROR":
                  SIDE_DRESS_FOR_ERROR.push({
                    x: "ALARM",
                    y: [
                      new Date(groupByMC_NO["IC11R"][index].occurred).getTime(),
                      new Date(groupByMC_NO["IC11R"][index].restored).getTime(),
                    ],
                  });
                  break;
                case "SIDE DRESS REV ERROR":
                  SIDE_DRESS_REV_ERROR.push({
                    x: "ALARM",
                    y: [
                      new Date(groupByMC_NO["IC11R"][index].occurred).getTime(),
                      new Date(groupByMC_NO["IC11R"][index].restored).getTime(),
                    ],
                  });
                  break;
                case "WORN WHEEL":
                  WORN_WHEEL.push({
                    x: "ALARM",
                    y: [
                      new Date(groupByMC_NO["IC11R"][index].occurred).getTime(),
                      new Date(groupByMC_NO["IC11R"][index].restored).getTime(),
                    ],
                  });
                  break;
                case "LOADING ERROR":
                  LOADING_ERROR.push({
                    x: "ALARM",
                    y: [
                      new Date(groupByMC_NO["IC11R"][index].occurred).getTime(),
                      new Date(groupByMC_NO["IC11R"][index].restored).getTime(),
                    ],
                  });
                  break;
                case "TRANSFER LOADER ERROR":
                  TRANSFER_LOADER_ERROR.push({
                    x: "ALARM",
                    y: [
                      new Date(groupByMC_NO["IC11R"][index].occurred).getTime(),
                      new Date(groupByMC_NO["IC11R"][index].restored).getTime(),
                    ],
                  });
                  break;
                case "AFTER DRESS STOP":
                  AFTER_DRESS_STOP.push({
                    x: "ALARM",
                    y: [
                      new Date(groupByMC_NO["IC11R"][index].occurred).getTime(),
                      new Date(groupByMC_NO["IC11R"][index].restored).getTime(),
                    ],
                  });
                  break;
                case "SPINOUT":
                  SPINOUT.push({
                    x: "ALARM",
                    y: [
                      new Date(groupByMC_NO["IC11R"][index].occurred).getTime(),
                      new Date(groupByMC_NO["IC11R"][index].restored).getTime(),
                    ],
                  });
                  break;
                case "G.WHEEL MOTOR OVER LOAD":
                  G_WHEEL_MOTOR_OVER_LOAD.push({
                    x: "ALARM",
                    y: [
                      new Date(groupByMC_NO["IC11R"][index].occurred).getTime(),
                      new Date(groupByMC_NO["IC11R"][index].restored).getTime(),
                    ],
                  });
                  break;
                case "RADIAL DRESS ERROR":
                  RADIAL_DRESS_ERROR.push({
                    x: "ALARM",
                    y: [
                      new Date(groupByMC_NO["IC11R"][index].occurred).getTime(),
                      new Date(groupByMC_NO["IC11R"][index].restored).getTime(),
                    ],
                  });
                  break;
                case "LINE UP PUSHER ERROR":
                  LINE_UP_PUSHER_ERROR.push({
                    x: "ALARM",
                    y: [
                      new Date(groupByMC_NO["IC11R"][index].occurred).getTime(),
                      new Date(groupByMC_NO["IC11R"][index].restored).getTime(),
                    ],
                  });
                  break;
                case "TRANSFER LOADER NO WORK":
                  TRANSFER_LOADER_NO_WORK.push({
                    x: "ALARM",
                    y: [
                      new Date(groupByMC_NO["IC11R"][index].occurred).getTime(),
                      new Date(groupByMC_NO["IC11R"][index].restored).getTime(),
                    ],
                  });
                  break;
                case "R/W BIG":
                  RW_BIG.push({
                    x: "ALARM",
                    y: [
                      new Date(groupByMC_NO["IC11R"][index].occurred).getTime(),
                      new Date(groupByMC_NO["IC11R"][index].restored).getTime(),
                    ],
                  });
                  break;
                case "ROTARY DRESSER RUN ERROR":
                  ROTARY_DRESSER_RUN_ERROR.push({
                    x: "ALARM",
                    y: [
                      new Date(groupByMC_NO["IC11R"][index].occurred).getTime(),
                      new Date(groupByMC_NO["IC11R"][index].restored).getTime(),
                    ],
                  });
                  break;
                case "WORN WHEEL":
                  WORN_WHEEL.push({
                    x: "ALARM",
                    y: [
                      new Date(groupByMC_NO["IC11R"][index].occurred).getTime(),
                      new Date(groupByMC_NO["IC11R"][index].restored).getTime(),
                    ],
                  });
                  break;
                case "DRESSER ERROR":
                  DRESSER_ERROR.push({
                    x: "ALARM",
                    y: [
                      new Date(groupByMC_NO["IC11R"][index].occurred).getTime(),
                      new Date(groupByMC_NO["IC11R"][index].restored).getTime(),
                    ],
                  });
                  break;
                case "GRINDER GAUGE ERROR":
                  GRINDER_GAUGE_ERROR.push({
                    x: "ALARM",
                    y: [
                      new Date(groupByMC_NO["IC11R"][index].occurred).getTime(),
                      new Date(groupByMC_NO["IC11R"][index].restored).getTime(),
                    ],
                  });
                  break;
                case "LOADING ERROR":
                  LOADING_ERROR.push({
                    x: "ALARM",
                    y: [
                      new Date(groupByMC_NO["IC11R"][index].occurred).getTime(),
                      new Date(groupByMC_NO["IC11R"][index].restored).getTime(),
                    ],
                  });
                  break;
                case "I.D SMALL":
                  I_D_SMALL.push({
                    x: "ALARM",
                    y: [
                      new Date(groupByMC_NO["IC11R"][index].occurred).getTime(),
                      new Date(groupByMC_NO["IC11R"][index].restored).getTime(),
                    ],
                  });
                  break;
                case "I.D LARGE":
                  I_D_LARGE.push({
                    x: "ALARM",
                    y: [
                      new Date(groupByMC_NO["IC11R"][index].occurred).getTime(),
                      new Date(groupByMC_NO["IC11R"][index].restored).getTime(),
                    ],
                  });
                  break;
                case "GRINDER FULL WORK":
                  GRINDER_FULL_WORK.push({
                    x: "ALARM",
                    y: [
                      new Date(groupByMC_NO["IC11R"][index].occurred).getTime(),
                      new Date(groupByMC_NO["IC11R"][index].restored).getTime(),
                    ],
                  });
                  break;
                case "GRINDER CHUTE EMPTY":
                  GRINDER_CHUTE_EMPTY.push({
                    x: "ALARM",
                    y: [
                      new Date(groupByMC_NO["IC11R"][index].occurred).getTime(),
                      new Date(groupByMC_NO["IC11R"][index].restored).getTime(),
                    ],
                  });
                  break;
                case "A/F ADJ. YIELD STOP":
                  AF_ADJ_YIELD_STOP.push({
                    x: "ALARM",
                    y: [
                      new Date(groupByMC_NO["IC11R"][index].occurred).getTime(),
                      new Date(groupByMC_NO["IC11R"][index].restored).getTime(),
                    ],
                  });
                  break;
                case "SORTING FULL WORK COUNTER":
                  SORTING_FULL_WORK_COUNTER.push({
                    x: "ALARM",
                    y: [
                      new Date(groupByMC_NO["IC11R"][index].occurred).getTime(),
                      new Date(groupByMC_NO["IC11R"][index].restored).getTime(),
                    ],
                  });
                  break;
                case "SORTING NO WORK":
                  SORTING_NO_WORK.push({
                    x: "ALARM",
                    y: [
                      new Date(groupByMC_NO["IC11R"][index].occurred).getTime(),
                      new Date(groupByMC_NO["IC11R"][index].restored).getTime(),
                    ],
                  });
                  break;
                case "REPEAT COUNTER":
                  REPEAT_COUNTER.push({
                    x: "ALARM",
                    y: [
                      new Date(groupByMC_NO["IC11R"][index].occurred).getTime(),
                      new Date(groupByMC_NO["IC11R"][index].restored).getTime(),
                    ],
                  });
                  break;
                case "TRANSFER LOADER ERROR":
                  TRANSFER_LOADER_ERROR.push({
                    x: "ALARM",
                    y: [
                      new Date(groupByMC_NO["IC11R"][index].occurred).getTime(),
                      new Date(groupByMC_NO["IC11R"][index].restored).getTime(),
                    ],
                  });
                  break;
                case "ID SMALL (GE)":
                  ID_SMALL_GE.push({
                    x: "ALARM",
                    y: [
                      new Date(groupByMC_NO["IC11R"][index].occurred).getTime(),
                      new Date(groupByMC_NO["IC11R"][index].restored).getTime(),
                    ],
                  });
                  break;
                case "GE CRUSH":
                  GE_CRUSH.push({
                    x: "ALARM",
                    y: [
                      new Date(groupByMC_NO["IC11R"][index].occurred).getTime(),
                      new Date(groupByMC_NO["IC11R"][index].restored).getTime(),
                    ],
                  });
                  break;
                case "DPM.ERROR":
                  DPM_ERROR.push({
                    x: "ALARM",
                    y: [
                      new Date(groupByMC_NO["IC11R"][index].occurred).getTime(),
                      new Date(groupByMC_NO["IC11R"][index].restored).getTime(),
                    ],
                  });
                  break;
                case "TOTAL TAPER ADJ.LIMIT ERR":
                  TOTAL_TAPER_ADJ_LIMIT_ERR.push({
                    x: "ALARM",
                    y: [
                      new Date(groupByMC_NO["IC11R"][index].occurred).getTime(),
                      new Date(groupByMC_NO["IC11R"][index].restored).getTime(),
                    ],
                  });
                  break;
                case "GAUGE ERROR (NO SIGNAL)":
                  GAUGE_ERROR_NO_SIGNAL.push({
                    x: "ALARM",
                    y: [
                      new Date(groupByMC_NO["IC11R"][index].occurred).getTime(),
                      new Date(groupByMC_NO["IC11R"][index].restored).getTime(),
                    ],
                  });
                  break;
                case "OK1 TRAP SHUTTER ERROR":
                  OK1_TRAP_SHUTTER_ERROR.push({
                    x: "ALARM",
                    y: [
                      new Date(groupByMC_NO["IC11R"][index].occurred).getTime(),
                      new Date(groupByMC_NO["IC11R"][index].restored).getTime(),
                    ],
                  });
                  break;
                case "OK2 TRAP SHUTTER ERROR":
                  OK2_TRAP_SHUTTER_ERROR.push({
                    x: "ALARM",
                    y: [
                      new Date(groupByMC_NO["IC11R"][index].occurred).getTime(),
                      new Date(groupByMC_NO["IC11R"][index].restored).getTime(),
                    ],
                  });
                  break;
                case "-NG TRAP SHUTTER ERROR":
                  M_NG_TRAP_SHUTTER_ERROR.push({
                    x: "ALARM",
                    y: [
                      new Date(groupByMC_NO["IC11R"][index].occurred).getTime(),
                      new Date(groupByMC_NO["IC11R"][index].restored).getTime(),
                    ],
                  });
                  break;
                case "+NG TRAP SHUTTER ERROR":
                  P_NG_TRAP_SHUTTER_ERROR.push({
                    x: "ALARM",
                    y: [
                      new Date(groupByMC_NO["IC11R"][index].occurred).getTime(),
                      new Date(groupByMC_NO["IC11R"][index].restored).getTime(),
                    ],
                  });
                  break;
                case "SORTING NO WORK STOP":
                  SORTING_NO_WORK_STOP.push({
                    x: "ALARM",
                    y: [
                      new Date(groupByMC_NO["IC11R"][index].occurred).getTime(),
                      new Date(groupByMC_NO["IC11R"][index].restored).getTime(),
                    ],
                  });
                  break;
                case "GRINDING CYCLE TIME OVER":
                  GRINDING_CYCLE_TIME_OVER.push({
                    x: "ALARM",
                    y: [
                      new Date(groupByMC_NO["IC11R"][index].occurred).getTime(),
                      new Date(groupByMC_NO["IC11R"][index].restored).getTime(),
                    ],
                  });
                  break;
                case "RESET BY LOADING":
                  RESET_BY_LOADING.push({
                    x: "ALARM",
                    y: [
                      new Date(groupByMC_NO["IC11R"][index].occurred).getTime(),
                      new Date(groupByMC_NO["IC11R"][index].restored).getTime(),
                    ],
                  });
                  break;
                default:
                // code block
              }
              // 
              // switch (groupByMC_NO["IC11R"][index].topic) {
              //   case "CHUTE EMPTY":
              //     // console.log("CHUTECHUTE");
              //     CHUTE_EMPTY.push({
              //       x: "ALARM",
              //       y: [
              //         new Date(groupByMC_NO["IC11R"][index].occurred).getTime(),
              //         new Date(groupByMC_NO["IC11R"][index].restored).getTime(),
              //       ],
              //     });
              //     break;
              //   case "COLLANT LOW":
              //     COLLANT_LOW.push({
              //       x: "ALARM",
              //       y: [
              //         new Date(groupByMC_NO["IC11R"][index].occurred).getTime(),
              //         new Date(groupByMC_NO["IC11R"][index].restored).getTime(),
              //       ],
              //     });
              //     break;
              //   case "DOOR OPEN":
              //     DOOR_OPEN.push({
              //       x: "ALARM",
              //       y: [
              //         new Date(groupByMC_NO["IC11R"][index].occurred).getTime(),
              //         new Date(groupByMC_NO["IC11R"][index].restored).getTime(),
              //       ],
              //     });
              //     break;
              //   case "DOOR OPEN STOP":
              //     DOOR_OPEN_STOP.push({
              //       x: "ALARM",
              //       y: [
              //         new Date(groupByMC_NO["IC11R"][index].occurred).getTime(),
              //         new Date(groupByMC_NO["IC11R"][index].restored).getTime(),
              //       ],
              //     });
              //     break;
              //   case "FULL WORK":
              //     FULL_WORK.push({
              //       x: "ALARM",
              //       y: [
              //         new Date(groupByMC_NO["IC11R"][index].occurred).getTime(),
              //         new Date(groupByMC_NO["IC11R"][index].restored).getTime(),
              //       ],
              //     });
              //     break;
              //   case "GE NOISE CHECK":
              //     GE_NOISE_CHECK.push({
              //       x: "ALARM",
              //       y: [
              //         new Date(groupByMC_NO["IC11R"][index].occurred).getTime(),
              //         new Date(groupByMC_NO["IC11R"][index].restored).getTime(),
              //       ],
              //     });
              //     break;
              //   case "GE NOT ON":
              //     GE_NOT_ON.push({
              //       x: "ALARM",
              //       y: [
              //         new Date(groupByMC_NO["IC11R"][index].occurred).getTime(),
              //         new Date(groupByMC_NO["IC11R"][index].restored).getTime(),
              //       ],
              //     });
              //     break;
              //   case "HANDLE ENGAGED":
              //     HANDLE_ENGAGED.push({
              //       x: "ALARM",
              //       y: [
              //         new Date(groupByMC_NO["IC11R"][index].occurred).getTime(),
              //         new Date(groupByMC_NO["IC11R"][index].restored).getTime(),
              //       ],
              //     });
              //     break;
              //   case "HANDLE ENGAGED3":
              //     HANDLE_ENGAGED3.push({
              //       x: "ALARM",
              //       y: [
              //         new Date(groupByMC_NO["IC11R"][index].occurred).getTime(),
              //         new Date(groupByMC_NO["IC11R"][index].restored).getTime(),
              //       ],
              //     });
              //     break;
              //   case "NEXT M/C CHUTE FULL":
              //     NEXT_MC_CHUTE_FULL.push({
              //       x: "ALARM",
              //       y: [
              //         new Date(groupByMC_NO["IC11R"][index].occurred).getTime(),
              //         new Date(groupByMC_NO["IC11R"][index].restored).getTime(),
              //       ],
              //     });
              //     break;
              //   case "PART DROP P0S 6":
              //     PART_DROP_P0S_6.push({
              //       x: "ALARM",
              //       y: [
              //         new Date(groupByMC_NO["IC11R"][index].occurred).getTime(),
              //         new Date(groupByMC_NO["IC11R"][index].restored).getTime(),
              //       ],
              //     });
              //     break;
              //   case "REAR DOOR OPEN":
              //     REAR_DOOR_OPEN.push({
              //       x: "ALARM",
              //       y: [
              //         new Date(groupByMC_NO["IC11R"][index].occurred).getTime(),
              //         new Date(groupByMC_NO["IC11R"][index].restored).getTime(),
              //       ],
              //     });
              //     break;
              //   case "SERVO ALARM":
              //     SERVO_ALARM.push({
              //       x: "ALARM",
              //       y: [
              //         new Date(groupByMC_NO["IC11R"][index].occurred).getTime(),
              //         new Date(groupByMC_NO["IC11R"][index].restored).getTime(),
              //       ],
              //     });
              //     break;
              //   case "COLLANT LOW":
              //     COLLANT_LOW.push({
              //       x: "ALARM",
              //       y: [
              //         new Date(groupByMC_NO["IC11R"][index].occurred).getTime(),
              //         new Date(groupByMC_NO["IC11R"][index].restored).getTime(),
              //       ],
              //     });
              //     break;
            
              //   case "SIDE DRESS FOR ERROR":
              //     SIDE_DRESS_FOR_ERROR.push({
              //       x: "ALARM",
              //       y: [
              //         new Date(groupByMC_NO["IC11R"][index].occurred).getTime(),
              //         new Date(groupByMC_NO["IC11R"][index].restored).getTime(),
              //       ],
              //     });
              //     break;
              //   case "SIDE DRESS REV ERROR":
              //     SIDE_DRESS_REV_ERROR.push({
              //       x: "ALARM",
              //       y: [
              //         new Date(groupByMC_NO["IC11R"][index].occurred).getTime(),
              //         new Date(groupByMC_NO["IC11R"][index].restored).getTime(),
              //       ],
              //     });
              //     break;
              //   case "WORN WHEEL":
              //     WORN_WHEEL.push({
              //       x: "ALARM",
              //       y: [
              //         new Date(groupByMC_NO["IC11R"][index].occurred).getTime(),
              //         new Date(groupByMC_NO["IC11R"][index].restored).getTime(),
              //       ],
              //     });
              //     break;
              //   case "LOADING ERROR":
              //     LOADING_ERROR.push({
              //       x: "ALARM",
              //       y: [
              //         new Date(groupByMC_NO["IC11R"][index].occurred).getTime(),
              //         new Date(groupByMC_NO["IC11R"][index].restored).getTime(),
              //       ],
              //     });
              //     break;
              //   case "TRANSFER LOADER ERROR":
              //     TRANSFER_LOADER_ERROR.push({
              //       x: "ALARM",
              //       y: [
              //         new Date(groupByMC_NO["IC11R"][index].occurred).getTime(),
              //         new Date(groupByMC_NO["IC11R"][index].restored).getTime(),
              //       ],
              //     });
              //     break;
              //   case "AFTER DRESS STOP":
              //     AFTER_DRESS_STOP.push({
              //       x: "ALARM",
              //       y: [
              //         new Date(groupByMC_NO["IC11R"][index].occurred).getTime(),
              //         new Date(groupByMC_NO["IC11R"][index].restored).getTime(),
              //       ],
              //     });
              //     break;
              //   case "SPINOUT":
              //     SPINOUT.push({
              //       x: "ALARM",
              //       y: [
              //         new Date(groupByMC_NO["IC11R"][index].occurred).getTime(),
              //         new Date(groupByMC_NO["IC11R"][index].restored).getTime(),
              //       ],
              //     });
              //     break;
              //   case "G.WHEEL MOTOR OVER LOAD":
              //     G_WHEEL_MOTOR_OVER_LOAD.push({
              //       x: "ALARM",
              //       y: [
              //         new Date(groupByMC_NO["IC11R"][index].occurred).getTime(),
              //         new Date(groupByMC_NO["IC11R"][index].restored).getTime(),
              //       ],
              //     });
              //     break;
              //   case "RADIAL DRESS ERROR":
              //     RADIAL_DRESS_ERROR.push({
              //       x: "ALARM",
              //       y: [
              //         new Date(groupByMC_NO["IC11R"][index].occurred).getTime(),
              //         new Date(groupByMC_NO["IC11R"][index].restored).getTime(),
              //       ],
              //     });
              //     break;
              //   case "LINE UP PUSHER ERROR":
              //     LINE_UP_PUSHER_ERROR.push({
              //       x: "ALARM",
              //       y: [
              //         new Date(groupByMC_NO["IC11R"][index].occurred).getTime(),
              //         new Date(groupByMC_NO["IC11R"][index].restored).getTime(),
              //       ],
              //     });
              //     break;
              //   case "TRANSFER LOADER NO WORK":
              //     TRANSFER_LOADER_NO_WORK.push({
              //       x: "ALARM",
              //       y: [
              //         new Date(groupByMC_NO["IC11R"][index].occurred).getTime(),
              //         new Date(groupByMC_NO["IC11R"][index].restored).getTime(),
              //       ],
              //     });
              //     break;
              //   case "R/W BIG":
              //     RW_BIG.push({
              //       x: "ALARM",
              //       y: [
              //         new Date(groupByMC_NO["IC11R"][index].occurred).getTime(),
              //         new Date(groupByMC_NO["IC11R"][index].restored).getTime(),
              //       ],
              //     });
              //     break;
              //   case "ROTARY DRESSER RUN ERROR":
              //     ROTARY_DRESSER_RUN_ERROR.push({
              //       x: "ALARM",
              //       y: [
              //         new Date(groupByMC_NO["IC11R"][index].occurred).getTime(),
              //         new Date(groupByMC_NO["IC11R"][index].restored).getTime(),
              //       ],
              //     });
              //     break;
              //   case "WORN WHEEL":
              //     WORN_WHEEL.push({
              //       x: "ALARM",
              //       y: [
              //         new Date(groupByMC_NO["IC11R"][index].occurred).getTime(),
              //         new Date(groupByMC_NO["IC11R"][index].restored).getTime(),
              //       ],
              //     });
              //     break;
              //   case "DRESSER ERROR":
              //     DRESSER_ERROR.push({
              //       x: "ALARM",
              //       y: [
              //         new Date(groupByMC_NO["IC11R"][index].occurred).getTime(),
              //         new Date(groupByMC_NO["IC11R"][index].restored).getTime(),
              //       ],
              //     });
              //     break;
              //   case "GRINDER GAUGE ERROR":
              //     GRINDER_GAUGE_ERROR.push({
              //       x: "ALARM",
              //       y: [
              //         new Date(groupByMC_NO["IC11R"][index].occurred).getTime(),
              //         new Date(groupByMC_NO["IC11R"][index].restored).getTime(),
              //       ],
              //     });
              //     break;
              //   case "LOADING ERROR":
              //     LOADING_ERROR.push({
              //       x: "ALARM",
              //       y: [
              //         new Date(groupByMC_NO["IC11R"][index].occurred).getTime(),
              //         new Date(groupByMC_NO["IC11R"][index].restored).getTime(),
              //       ],
              //     });
              //     break;
              //   case "I.D SMALL":
              //     I_D_SMALL.push({
              //       x: "ALARM",
              //       y: [
              //         new Date(groupByMC_NO["IC11R"][index].occurred).getTime(),
              //         new Date(groupByMC_NO["IC11R"][index].restored).getTime(),
              //       ],
              //     });
              //     break;
              //   case "I.D LARGE":
              //     I_D_LARGE.push({
              //       x: "ALARM",
              //       y: [
              //         new Date(groupByMC_NO["IC11R"][index].occurred).getTime(),
              //         new Date(groupByMC_NO["IC11R"][index].restored).getTime(),
              //       ],
              //     });
              //     break;
              //   case "GRINDER FULL WORK":
              //     GRINDER_FULL_WORK.push({
              //       x: "ALARM",
              //       y: [
              //         new Date(groupByMC_NO["IC11R"][index].occurred).getTime(),
              //         new Date(groupByMC_NO["IC11R"][index].restored).getTime(),
              //       ],
              //     });
              //     break;
              //   case "GRINDER CHUTE EMPTY":
              //     GRINDER_CHUTE_EMPTY.push({
              //       x: "ALARM",
              //       y: [
              //         new Date(groupByMC_NO["IC11R"][index].occurred).getTime(),
              //         new Date(groupByMC_NO["IC11R"][index].restored).getTime(),
              //       ],
              //     });
              //     break;
              //   case "A/F ADJ. YIELD STOP":
              //     AF_ADJ_YIELD_STOP.push({
              //       x: "ALARM",
              //       y: [
              //         new Date(groupByMC_NO["IC11R"][index].occurred).getTime(),
              //         new Date(groupByMC_NO["IC11R"][index].restored).getTime(),
              //       ],
              //     });
              //     break;
              //   case "SORTING FULL WORK COUNTER":
              //     SORTING_FULL_WORK_COUNTER.push({
              //       x: "ALARM",
              //       y: [
              //         new Date(groupByMC_NO["IC11R"][index].occurred).getTime(),
              //         new Date(groupByMC_NO["IC11R"][index].restored).getTime(),
              //       ],
              //     });
              //     break;
              //   case "SORTING NO WORK":
              //     SORTING_NO_WORK.push({
              //       x: "ALARM",
              //       y: [
              //         new Date(groupByMC_NO["IC11R"][index].occurred).getTime(),
              //         new Date(groupByMC_NO["IC11R"][index].restored).getTime(),
              //       ],
              //     });
              //     break;
              //   case "REPEAT COUNTER":
              //     REPEAT_COUNTER.push({
              //       x: "ALARM",
              //       y: [
              //         new Date(groupByMC_NO["IC11R"][index].occurred).getTime(),
              //         new Date(groupByMC_NO["IC11R"][index].restored).getTime(),
              //       ],
              //     });
              //     break;
              //   case "TRANSFER LOADER ERROR":
              //     TRANSFER_LOADER_ERROR.push({
              //       x: "ALARM",
              //       y: [
              //         new Date(groupByMC_NO["IC11R"][index].occurred).getTime(),
              //         new Date(groupByMC_NO["IC11R"][index].restored).getTime(),
              //       ],
              //     });
              //     break;
              //   case "ID SMALL (GE)":
              //     ID_SMALL_GE.push({
              //       x: "ALARM",
              //       y: [
              //         new Date(groupByMC_NO["IC11R"][index].occurred).getTime(),
              //         new Date(groupByMC_NO["IC11R"][index].restored).getTime(),
              //       ],
              //     });
              //     break;
              //   case "GE CRUSH":
              //     GE_CRUSH.push({
              //       x: "ALARM",
              //       y: [
              //         new Date(groupByMC_NO["IC11R"][index].occurred).getTime(),
              //         new Date(groupByMC_NO["IC11R"][index].restored).getTime(),
              //       ],
              //     });
              //     break;
              //   case "DPM.ERROR":
              //     DPM_ERROR.push({
              //       x: "ALARM",
              //       y: [
              //         new Date(groupByMC_NO["IC11R"][index].occurred).getTime(),
              //         new Date(groupByMC_NO["IC11R"][index].restored).getTime(),
              //       ],
              //     });
              //     break;
              //   case "TOTAL TAPER ADJ.LIMIT ERR":
              //     TOTAL_TAPER_ADJ_LIMIT_ERR.push({
              //       x: "ALARM",
              //       y: [
              //         new Date(groupByMC_NO["IC11R"][index].occurred).getTime(),
              //         new Date(groupByMC_NO["IC11R"][index].restored).getTime(),
              //       ],
              //     });
              //     break;
              //   case "GAUGE ERROR (NO SIGNAL)":
              //     GAUGE_ERROR_NO_SIGNAL.push({
              //       x: "ALARM",
              //       y: [
              //         new Date(groupByMC_NO["IC11R"][index].occurred).getTime(),
              //         new Date(groupByMC_NO["IC11R"][index].restored).getTime(),
              //       ],
              //     });
              //     break;
              //   case "OK1 TRAP SHUTTER ERROR":
              //     OK1_TRAP_SHUTTER_ERROR.push({
              //       x: "ALARM",
              //       y: [
              //         new Date(groupByMC_NO["IC11R"][index].occurred).getTime(),
              //         new Date(groupByMC_NO["IC11R"][index].restored).getTime(),
              //       ],
              //     });
              //     break;
              //   case "OK2 TRAP SHUTTER ERROR":
              //     OK2_TRAP_SHUTTER_ERROR.push({
              //       x: "ALARM",
              //       y: [
              //         new Date(groupByMC_NO["IC11R"][index].occurred).getTime(),
              //         new Date(groupByMC_NO["IC11R"][index].restored).getTime(),
              //       ],
              //     });
              //     break;
              //   case "-NG TRAP SHUTTER ERROR":
              //     M_NG_TRAP_SHUTTER_ERROR.push({
              //       x: "ALARM",
              //       y: [
              //         new Date(groupByMC_NO["IC11R"][index].occurred).getTime(),
              //         new Date(groupByMC_NO["IC11R"][index].restored).getTime(),
              //       ],
              //     });
              //     break;
              //   case "+NG TRAP SHUTTER ERROR":
              //     P_NG_TRAP_SHUTTER_ERROR.push({
              //       x: "ALARM",
              //       y: [
              //         new Date(groupByMC_NO["IC11R"][index].occurred).getTime(),
              //         new Date(groupByMC_NO["IC11R"][index].restored).getTime(),
              //       ],
              //     });
              //     break;
              //   case "SORTING NO WORK STOP":
              //     SORTING_NO_WORK_STOP.push({
              //       x: "ALARM",
              //       y: [
              //         new Date(groupByMC_NO["IC11R"][index].occurred).getTime(),
              //         new Date(groupByMC_NO["IC11R"][index].restored).getTime(),
              //       ],
              //     });
              //     break;
              //   case "GRINDING CYCLE TIME OVER":
              //     GRINDING_CYCLE_TIME_OVER.push({
              //       x: "ALARM",
              //       y: [
              //         new Date(groupByMC_NO["IC11R"][index].occurred).getTime(),
              //         new Date(groupByMC_NO["IC11R"][index].restored).getTime(),
              //       ],
              //     });
              //     break;
              //   case "RESET BY LOADING":
              //     RESET_BY_LOADING.push({
              //       x: "ALARM",
              //       y: [
              //         new Date(groupByMC_NO["IC11R"][index].occurred).getTime(),
              //         new Date(groupByMC_NO["IC11R"][index].restored).getTime(),
              //       ],
              //     });
              //     break;
              //   default:
              //   // code block
              // }
            }
        }
          console.log("..................");
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
              "#E2C044",
              "#CD6F97",
              "#0d1dfc",
              "#94bafb",
              "#195529",
              "#c37e41",
              "#a7037e",
              "#CCFF00",
              "#FFFF66",
              "#FFCC66",
              "#CC9999",
              "#CC6666",
              "#FF6666",
              "#9900FF",
              "#66CC00",
              "#66CCCC",
              "#000033",
              "#FF0066",
              "#C70039",
              "#FFC13D",
              "#45B39D",
              "#2962FF",
              "#18FFFF",
              "#7CB342",
              "#EEFF41",
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
            // tooltip: {
            //   x: {
            //     format: "HH:mm:ss",
            //   },
            // },
            // tooltip: {
            //   x: {
            //       show: true,
            //       format: "HH:mm:ss",
            //       formatter: function (value,) {
            //         console.log("LLL", value);
            //         // formatter: function (value,{ series, seriesIndex, dataPointIndex, w }) {
            //               return  moment(value).format("HH:mm:ss")
            //           },
            //       },
            //     },

            tooltip: {
              y: {
                formatter: function(value) {
                  return value
                }
              },
              
              x: {
                format: "HH:mm:ss",
              },
            },

            // dataLabels: {
            //   enabled: true,
            //   formatter: (val, rr) => {
            //     console.log("vvv", val,rr);
            //   }
            // }
            
          },
        });

        console.log("opopopopo",this.state.timeline_series_R);
        // let arrayUniqueByKey = [...new Map(mc_data.data.result.map(item =>
        //   [item[key], item])).values()];

        // let set_mcno = mc_data.data.result
        //   .map((item) => item.mc_no)
        //   .filter((value, index, self) => self.indexOf(value) === index);
        // console.log(set_mcno.length);

        // for (let x = 0; x < set_mcno.length; x++) {
        //   switch (set_mcno[x]) {
        //     case "IC11B":

              // console.log("++++++++++",this.state.timeline_series_R);
              // await this.setState({
              //   timeline_series_R: [
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
              //       name: "WORN WHEEL",
              //       data: WORN_WHEEL,
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
              //       name: "LOADING ERROR",
              //       data: LOADING_ERROR,
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
              //       name: "TRANSFER LOADER ERROR",
              //       data: TRANSFER_LOADER_ERROR,
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
              //   timeline_options_R: {
              //     title: {
              //       text: "NON-OPERATING TIME TOPIC",
              //       align: "center",
              //       style: {
              //         fontSize: "15px",
              //         fontWeight: "bold",
              //       },
              //     },
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
              //       "#E2C044",
              //       "#CD6F97",
              //       "#0d1dfc",
              //       "#94bafb",
              //       "#195529",
              //       "#c37e41",
              //       "#a7037e",
              //       "#CCFF00",
              //       "#FFFF66",
              //       "#FFCC66",
              //       "#CC9999",
              //       "#CC6666",
              //       "#FF6666",
              //       "#9900FF",
              //       "#66CC00",
              //       "#66CCCC",
              //       "#000033",
              //       "#FF0066",
              //       "#C70039",
              //       "#FFC13D",
              //       "#45B39D",
              //       "#2962FF",
              //       "#18FFFF",
              //       "#7CB342",
              //       "#EEFF41",
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
              //       },
              //     },
              //     yaxis: {
              //       show: true,
              //       title: {
              //         style: {
              //           fontSize: "10px",
              //         },
              //       },
              //     },
              //     legend: {
              //       show: true,
              //       showForNullSeries: false,
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
              // });
              // console.log("--------------",this.state.timeline_series_R);

              // console.log("B", set_mcno[x]);

            //   break;
            // case "IC11R":
            //   // console.log("R", set_mcno[x]);
            //   await this.setState({
            //     timeline_series_R: [
            //       {
            //         name: "CHUTE EMPTY",
            //         data: CHUTE_EMPTY,
            //       },
            //       {
            //         name: "COLLANT LOW",
            //         data: COLLANT_LOW,
            //       },
            //       {
            //         name: "DOOR OPEN",
            //         data: DOOR_OPEN,
            //       },
            //       {
            //         name: "DOOR OPEN STOP",
            //         data: DOOR_OPEN_STOP,
            //       },
            //       {
            //         name: "FULL WORK",
            //         data: FULL_WORK,
            //       },
            //       {
            //         name: "GE NOISE CHECK",
            //         data: GE_NOISE_CHECK,
            //       },
            //       {
            //         name: "GE NOT ON",
            //         data: GE_NOT_ON,
            //       },
            //       {
            //         name: "HANDLE ENGAGED",
            //         data: HANDLE_ENGAGED,
            //       },
            //       {
            //         name: "HANDLE ENGAGED3",
            //         data: HANDLE_ENGAGED3,
            //       },
            //       {
            //         name: "NEXT M/C CHUTE FULL",
            //         data: NEXT_MC_CHUTE_FULL,
            //       },
            //       {
            //         name: "PART DROP P0S 6",
            //         data: PART_DROP_P0S_6,
            //       },
            //       {
            //         name: "REAR DOOR OPEN",
            //         data: REAR_DOOR_OPEN,
            //       },
            //       {
            //         name: "SERVO ALARM",
            //         data: SERVO_ALARM,
            //       },
            //       { name: "SIDE DRESS FOR ERROR", data: SIDE_DRESS_FOR_ERROR },
            //       {
            //         name: "SIDE DRESS REV ERROR",
            //         data: SIDE_DRESS_REV_ERROR,
            //       },
            //       {
            //         name: "WORN WHEEL",
            //         data: WORN_WHEEL,
            //       },
            //       {
            //         name: "LOADING ERROR",
            //         data: LOADING_ERROR,
            //       },
            //       {
            //         name: "TRANSFER LOADER ERROR",
            //         data: TRANSFER_LOADER_ERROR,
            //       },
            //       {
            //         name: "AFTERDRESSSTOP",
            //         data: AFTER_DRESS_STOP,
            //       },
            //       {
            //         name: "SPINOUT",
            //         data: SPINOUT,
            //       },
            //       {
            //         name: "G.WHEEL MOTOR OVER LOAD",
            //         data: G_WHEEL_MOTOR_OVER_LOAD,
            //       },
            //       {
            //         name: "RADIAL DRESS ERROR",
            //         data: RADIAL_DRESS_ERROR,
            //       },
            //       {
            //         name: "LINE UP PUSHER ERROR",
            //         data: LINE_UP_PUSHER_ERROR,
            //       },
            //       {
            //         name: "TRANSFER LOADER NO WORK",
            //         data: TRANSFER_LOADER_NO_WORK,
            //       },
            //       {
            //         name: "R/W BIG",
            //         data: RW_BIG,
            //       },
            //       {
            //         name: "ROTARY DRESSER RUN ERROR",
            //         data: ROTARY_DRESSER_RUN_ERROR,
            //       },
            //       {
            //         name: "WORN WHEEL",
            //         data: WORN_WHEEL,
            //       },
            //       {
            //         name: "DRESSER ERROR",
            //         data: DRESSER_ERROR,
            //       },
            //       {
            //         name: "GRINDER GAUGE ERROR",
            //         data: GRINDER_GAUGE_ERROR,
            //       },
            //       {
            //         name: "LOADING ERROR",
            //         data: LOADING_ERROR,
            //       },
            //       {
            //         name: "I.D SMALL",
            //         data: I_D_SMALL,
            //       },
            //       {
            //         name: "I.D LARGE",
            //         data: I_D_LARGE,
            //       },
            //       {
            //         name: "GRINDER FULL WORK",
            //         data: GRINDER_FULL_WORK,
            //       },
            //       {
            //         name: "GRINDER CHUTE EMPTY",
            //         data: GRINDER_CHUTE_EMPTY,
            //       },
            //       {
            //         name: "A/F ADJ. YIELD STOP",
            //         data: AF_ADJ_YIELD_STOP,
            //       },
            //       {
            //         name: "SORTING FULL WORK COUNTER",
            //         data: SORTING_FULL_WORK_COUNTER,
            //       },
            //       {
            //         name: "SORTING NO WORK",
            //         data: SORTING_NO_WORK,
            //       },
            //       {
            //         name: "REPEAT COUNTER",
            //         data: REPEAT_COUNTER,
            //       },
            //       {
            //         name: "TRANSFER LOADER ERROR",
            //         data: TRANSFER_LOADER_ERROR,
            //       },
            //       {
            //         name: "ID SMALL (GE)",
            //         data: ID_SMALL_GE,
            //       },
            //       {
            //         name: "GE CRUSH",
            //         data: GE_CRUSH,
            //       },
            //       {
            //         name: "DPM.ERROR",
            //         data: DPM_ERROR,
            //       },
            //       {
            //         name: "TOTAL TAPER ADJ.LIMIT ERR",
            //         data: TOTAL_TAPER_ADJ_LIMIT_ERR,
            //       },
            //       {
            //         name: "GAUGE ERROR (NO SIGNAL)",
            //         data: GAUGE_ERROR_NO_SIGNAL,
            //       },
            //       {
            //         name: "OK1 TRAP SHUTTER ERROR",
            //         data: OK1_TRAP_SHUTTER_ERROR,
            //       },
            //       {
            //         name: "OK2 TRAP SHUTTER ERROR",
            //         data: OK2_TRAP_SHUTTER_ERROR,
            //       },
            //       {
            //         name: "-NG TRAP SHUTTER ERROR",
            //         data: M_NG_TRAP_SHUTTER_ERROR,
            //       },
            //       {
            //         name: "+NG TRAP SHUTTER ERROR",
            //         data: P_NG_TRAP_SHUTTER_ERROR,
            //       },
            //       {
            //         name: "SORTING NO WORK STOP",
            //         data: SORTING_NO_WORK_STOP,
            //       },
            //       {
            //         name: "GRINDING CYCLE TIME OVER",
            //         data: GRINDING_CYCLE_TIME_OVER,
            //       },
            //       {
            //         name: "RESET BY LOADING",
            //         data: RESET_BY_LOADING,
            //       },
            //     ],
            //     timeline_options_R: {
            //       title: {
            //         text: "NON-OPERATING TIME TOPIC",
            //         align: "center",
            //         style: {
            //           fontSize: "15px",
            //           fontWeight: "bold",
            //         },
            //       },
            //       chart: {
            //         // background: '#EBEDEF',
            //         height: 250,
            //         type: "rangeBar",
            //       },
            //       plotOptions: {
            //         bar: {
            //           horizontal: true,
            //           barHeight: "100%",
            //           rangeBarGroupRows: true,
            //         },
            //       },
            //       colors: [
            //         // "#D7263D",
            //         "#DA39FA",
            //         "#008b02",
            //         "#57aeff",
            //         "#F46036",
            //         "#E2C044",
            //         "#CD6F97",
            //         "#0d1dfc",
            //         "#94bafb",
            //         "#195529",
            //         "#c37e41",
            //         "#a7037e",
            //         "#CCFF00",
            //         "#FFFF66",
            //         "#FFCC66",
            //         "#CC9999",
            //         "#CC6666",
            //         "#FF6666",
            //         "#9900FF",
            //         "#66CC00",
            //         "#66CCCC",
            //         "#000033",
            //         "#FF0066",
            //         "#C70039",
            //         "#FFC13D",
            //         "#45B39D",
            //         "#2962FF",
            //         "#18FFFF",
            //         "#7CB342",
            //         "#EEFF41",
            //         "#FF5722",
            //         "#E91E63",
            //         "#AB47BC",
            //         "#FF96C5",
            //         "#74737A",
            //         "#00C3AF",
            //         "#6C88C4",
            //         "#FFA23A",
            //         "#FDBB9F",
            //         "#FF1744",
            //       ],
            //       fill: {
            //         type: "solid",
            //       },
            //       // labels: Data_time,
            //       xaxis: {
            //         type: "datetime",
            //         labels: {
            //           datetimeUTC: false,
            //         },
            //       },
            //       yaxis: {
            //         show: true,
            //         title: {
            //           style: {
            //             fontSize: "10px",
            //           },
            //         },
            //       },
            //       legend: {
            //         show: true,
            //         showForNullSeries: false,
            //       },
            //       tooltip: {
            //         x: {
            //           format: "HH:mm:ss",
            //         },
            //       },
            //       // dataLabels: {
            //       //   enabled: true,
            //       // }
            //     },
            //   });

            //   break;
            // default:
          // }
        // }
        // console.log(this.state.timeline_series_B);
        // console.log("opopopopo",this.state.timeline_series_R);
      }
    } catch (error) {}
  };
  // alarm_time = async () => {
  //   let alarm = await httpClient.post(server.AlarmTopic_time_TB, {
  //     date: this.state.date_start,
  //     machine: this.state.selected_machine,
  //   });
  //   console.log(alarm.data.result);
  //   await this.setState({
  //     data_table: alarm.data.result,
  //   });
  // };

  // renderTable() {
  //   if (this.state.data_table != null) {
  //     return this.state.data_table.map((item) => (
  //       <tr>
  //         <td>{item.topic}</td>
  //         <td>{item.Alarm}</td>
  //       </tr>
  //     ));
  //   }
  // }

  // stop_time = async () => {
  //   let stop_time = await httpClient.post(server.stop_time_TB, {
  //     date: this.state.date_start,
  //     machine: this.state.selected_machine,
  //   });
  //   console.log(stop_time.data.result);
  //   await this.setState({
  //     data_table1: stop_time.data.result,
  //   });
  // };

  alarm_time2 = async () => {
    let alarm = await httpClient.post(server.AlarmTopic_time_TB2, {
      // date2: this.state.date_start2,
      date2: this.state.date_start,
      dateEnd: this.state.date_end,
      machine: this.state.selected_machine,
    });
    // console.log(alarm);
    console.log("time2", this.state.date_end);
    console.log("time3", this.state.date_start2);
    await this.setState({
      data_table2: alarm.data.result,
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

  renderTable2() {
    if (this.state.data_table2 != null) {
      return this.state.data_table2.map((item) => (
        <tr>
          <td>{item.status}</td>
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
            <div className="card card-primary color-palette-box">
              <div className="card-header">
                <h2 className="card-title">
                  <i className="fas fa-chart-bar" />
                  <b> DAILY RESULT </b>
                </h2>
              </div>
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
                        <h5>&nbsp;</h5>
                        <button
                          type="button"
                          className="btn btn-block btn-danger"
                          onClick={async (e) => {
                            e.preventDefault();
                            this.click_update();
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
                              options={this.state.timeline_options_R}
                              series={this.state.timeline_series_R}
                              type="rangeBar"
                              height={300}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <div className="row">
                  <div className="col-md-12"></div>
                  <div className="card card-warning" style={{ width: "100%" }}>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-12">
                          <div id="chart">
                            <ReactApexChart
                              options={this.state.timeline_options_test}
                              series={this.state.timeline_series_test}
                              type="rangeBar"
                              height={300}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
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
                <div className="col-5">
                  <div
                    className="card"
                    style={{ textAlign: "center", fontSize: "16px" }}
                  >
                    <div
                      className="card-header"
                      style={{ backgroundColor: "#AEFCCC", border: true }}
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
                        MACHINE STATUS
                      </h3>
                    </div>
                    <div className="card-body">
                      <table className="table table-bordered table-hover">
                        <thead>
                          <tr>
                            <th>STATUS</th>
                            <th>TIME (HH:mm:ss)</th>
                          </tr>
                        </thead>
                        <tbody>{this.renderTable2()}</tbody>
                      </table>
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

export default MMS_GD_GROUP;
