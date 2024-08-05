import React, { useEffect, useState } from "react";
import { server } from "../../constance/contance";
import { httpClient } from "../../utils/HttpClient";
import moment from "moment";
import Swal from "sweetalert2";
import ReactApexChart from "react-apexcharts";
import { MutatingDots } from "react-loader-spinner";
import "./status_mbr.css"

const Status_mbr = () => {
  const [dataMC, setMC] = useState("MBRMA01");
  const [data_masterMC, set_masterMC] = useState([]);
  const [dataDate, setDate] = useState(moment().format("YYYY-MM-DD"));
  const [dataOptions, setDataOptions] = useState({});
  const [dataSeries, setDataSeries] = useState([]);
  const [Loading, setLoading] = useState("on");

  useEffect(() => {
    const interval = setInterval(() => {
      timeline_status();
      get_master_MC();
    }, [250000]);

    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, [dataMC, dataDate]);

  useEffect(() => {
    timeline_status();
    get_master_MC();
  }, [dataMC, dataDate]);

  const loadingScreen = () => {
    if (Loading === "on") {
      return (
        <div className="overlay" id="o">
          <MutatingDots
            visible={true}
            height="100"
            width="100"
            color="#4fa94d"
            secondaryColor="#4fa94d"
            radius="12.5"
            ariaLabel="mutating-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      );
    }
  };

  const timeline_status = async () => {
    // console.log(moment().format("HH:mm:ss"), dataMC);
      setLoading("on");
      try {
      let data_status = await httpClient.get(
        `${server.STATUS_MBR_ASSY}/${dataMC}/${dataDate}`
      );
      // console.log("B MC status", data_status.data.result);
      if (data_status.data.result.length === 0) {
        Swal.fire({
          icon: "warning",
          title: `ไม่พบข้อมูล M/C: ${dataMC}!`,
          showConfirmButton: false,
          timer: 1500,
        });
        setLoading("off")
      } else {
        var data_STOP = [];
        var data_RUN = [];
        var data_ALARM = [];
        var data_ERROR = [];
        var data_WAIT_BL = [];
        var data_WAIT_IR = [];
        var data_WAIT_OR = [];
        var data_WAIT_RTN = [];
        for (let index = 0; index < data_status.data.result.length; index++) {
          switch (data_status.data.result[index].mc_status) {
            case "run":
              data_RUN.push({
                x: dataMC,
                y: [
                  new Date(data_status.data.result[index].start_time).getTime(),
                  new Date(data_status.data.result[index].end_time).getTime(),
                  // data_status.data.result[index].min_timediff,
                ],
              });
              break;
            case "stop":
              data_STOP.push({
                x: dataMC,
                y: [
                  new Date(data_status.data.result[index].start_time).getTime(),
                  new Date(data_status.data.result[index].end_time).getTime(),
                ],
              });
              break;
            case "alarm":
              data_ALARM.push({
                x: dataMC,
                y: [
                  new Date(data_status.data.result[index].start_time).getTime(),
                  new Date(data_status.data.result[index].end_time).getTime(),
                ],
              });
              break;
            case "error":
              data_ERROR.push({
                x: dataMC,
                y: [
                  new Date(data_status.data.result[index].start_time).getTime(),
                  new Date(data_status.data.result[index].end_time).getTime(),
                ],
              });
              break;
            case "wait_bl":
              data_WAIT_BL.push({
                x: dataMC,
                y: [
                  new Date(data_status.data.result[index].start_time).getTime(),
                  new Date(data_status.data.result[index].end_time).getTime(),
                ],
              });
              break;
            case "wait_ir":
              data_WAIT_IR.push({
                x: dataMC,
                y: [
                  new Date(data_status.data.result[index].start_time).getTime(),
                  new Date(data_status.data.result[index].end_time).getTime(),
                ],
              });
              break;
            case "wait_or":
              data_WAIT_OR.push({
                x: dataMC,
                y: [
                  new Date(data_status.data.result[index].start_time).getTime(),
                  new Date(data_status.data.result[index].end_time).getTime(),
                ],
              });
              break;
            case "wait_rtn":
              data_WAIT_RTN.push({
                x: dataMC,
                y: [
                  new Date(data_status.data.result[index].start_time).getTime(),
                  new Date(data_status.data.result[index].end_time).getTime(),
                ],
              });
              break;
            default:
            // code block
          }
        }

        await setDataSeries([
          {
            name: "RUN",
            data: data_RUN,
          },
          {
            name: "STOP",
            data: data_STOP,
          },
          {
            name: "ALARM",
            data: data_ALARM,
          },
          {
            name: "ERROR",
            data: data_ERROR,
          },
          {
            name: "Wait BL",
            data: data_WAIT_BL,
          },
          {
            name: "Wait IR",
            data: data_WAIT_IR,
          },
          {
            name: "Wait OR",
            data: data_WAIT_OR,
          },
          {
            name: "Wait RTN",
            data: data_WAIT_RTN,
          },
        ]);
        setDataOptions({
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
            "#ff9d1f",
            "#c11010",
            "#399dfa",
            "#ffe60c",
            "#39f6ff",
            "#ea39ff",
            "#3942ff",
            "#c0ffb4",
          ],
          fill: {
            type: "solid",
          },
          // labels: Data_time,
          xaxis: {
            type: "datetime",
            // labels: {
            //   datetimeUTC: false,
            //   style: {
            //     fontSize: "19px",
            //   },
            // },
          },
          yaxis: {
            show: true,
            labels: {
              // rotate: -45 ,
              style: {
                fontSize: "20px",
                fontWeight: "bold",
              },
            },
          },
          legend: {
            show: true,
            showForNullSeries: false,
            fontSize: "16px",
          },

          tooltip: {
            x: {
              format: "HH:mm:ss",
            },
          },
        });
        setLoading("off");
      }

      // setTimeout(() => {
      //   timeline_status();
      // }, 250000); // 5 min
    } catch (error) {
      console.warn("error status...", error);
      setLoading("off");
    }
  };
  const get_master_MC = async () => {
    // console.log("========= DT =========");
    const array = await httpClient.get(server.master_machine);

    const list_masterMC = array.data.result[0];
    set_masterMC(list_masterMC);
    // console.log("MCMC : ", list_masterMC);
  };

  return (
    <div className="content-wrapper">
      <div className="content">
        
      <h3 className="row justify-content-center">
      MACHINE STATUS MBR PROCESS
        </h3>
        <div
          className="row justify-content-center"
          style={{
            paddingTop: "10px",
            textAlign: "center",
            paddingBottom: "10px",
          }}
        >
          <h6 className="col-auto">Date :</h6>
          <div className="col-2">
            <input
              className="form-control form-control-sm"
              type="date"
              value={dataDate}
              onChange={async (e) => {
                await setDate(moment(e.target.value).format("YYYY-MM-DD"));
              }}
            />
          </div>
          <h6 className="col-auto">Select M/C No. :</h6>
          <div className="col-2">
            <select
              className="custom-select custom-select-sm"
              value={dataMC}
              onChange={async (e) => {
                await setMC(e.target.value);
              }}
            >
              <option disabled value="">
                select mc_no
              </option>
              {data_masterMC.map((item) => (
                <option key={item.machine_no}>{item.machine_no}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="overlay-wrapper" id="ow">
          {loadingScreen()}
          <div id="chart">
            <ReactApexChart
              options={dataOptions}
              series={dataSeries}
              type="rangeBar"
              height={320}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Status_mbr;
