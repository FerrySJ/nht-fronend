
  import React, { Component } from "react";
import { useEffect, useState } from "react";
import moment from "moment";
import ReactApexChart from "react-apexcharts";
import { httpClient } from "../../utils/HttpClient";
import { server } from "../../constance/contance";

const Mms_autonoise = () => {
  const [datas, setDatas] = useState({});
  const [data, setDatasMaster] = useState({});
  const [dataBox, setDataBox] = useState({});
  const [dataAVG_utl, setdataAVG_utl] = useState("");
  const [dataMax, setDataMax] = useState({});
  const [dataMC, setMC] = useState("WANTMD01");
  const [dataDate, setDate] = useState(moment().format("YYYY-MM-DD"));
  const [dataOK, setDataOK] = useState("");
  const [dataPD, setdataPD] = useState([]);
  const [ChartData, setChartData] = useState([]);
  const [dataDT, setdataDT] = useState([]);
  const [data_masterMC, set_masterMC] = useState([]);
  const [dataDT_series, setdataDT_series] = useState([]);

  
  const getOutPut_PROD_AN = async () => {
    const array = await httpClient.post(
      server.realtime_chartPD_AN_URL +
        "/" +
        dataMC +
        "/" +
        // moment().format("YYYY-MM-DD")
        dataDate
    );

    // console.log("ChartPD ==>", array.data);
    const listOutput_MBR_MD = array.data.resultOutput_MBR;

    if (listOutput_MBR_MD.length > 0) {
      
    setdataPD(listOutput_MBR_MD);
    const categories = array.data.result[0].map((data) => data.at_time);
    setChartData(categories)

    const data_model = array.data.result[0][0];
    const data_boxrealtime = array.data.result_box[0][0];
    const data_ok = array.data.result_ok;
    const max_prod = array.data.max_prod;
    const avg_utl = array.data.result_AVG_utl[0][0]
    let removed = data_ok.pop();
    let finalObj = [];
    let finalBox = [];
    let finalAVG_utl = "";
    finalObj = data_model;
    finalBox = data_boxrealtime;
    finalAVG_utl = avg_utl;
    setDatasMaster(finalObj);
    setDataOK(removed);
    setDataBox(finalBox);
    setdataAVG_utl(finalAVG_utl)
    setDataMax(max_prod);
    return array;
  }else{
    // console.log("0 0 0 0 0 ");
    setdataPD([]);
    setChartData([])

    setDatasMaster([]);
    setDataOK([]);
    setDataBox([]);
    setdataAVG_utl(0)
    setDataMax([]);
  }
};
  const getOutput_DT_AN = async () => {
    // console.log("========= DT =========");
    // console.log("dataMC chart DT : ", dataMC, dataDate);
    const array = await httpClient.get(
      server.realtime_chartDT_AN_URL +
        "/" +
        dataMC +
        "/" +
        dataDate
        // moment().format("YYYY-MM-DD")
    );

    const listOutput_DT_MBR_MD = array.data.resultDT_AN;
    const SeriesName = array.data.resultSeriesName;
    setdataDT(listOutput_DT_MBR_MD);
    // console.log("DT", listOutput_DT_MBR_MD);
    setdataDT_series(SeriesName);
    // console.log("SeriesName", SeriesName);
    return array;
  };

  const get_master_MC = async () => {
    // console.log("========= DT =========");
    const array = await httpClient.get(server.MASTER_MC_AN);

    const list_masterMC = array.data.result[0];
    set_masterMC(list_masterMC);
    // console.log("MCMC : ", list_masterMC);
  };

  const MINUTE_MS = 5000;
  // const HOUR_MS = 300000; //5 min
  // const HOUR_MS = 3300000; //55 min
  const HOUR_MS = 900000; //15 min
  // const HOUR_MS = 1800000; //30 min

  useEffect(() => {
    // getPosts(); //
    const interval = setInterval(() => {
      console.log("Logs every 15 minute");
      // getPosts();
      getOutPut_PROD_AN();
      getOutput_DT_AN();
    }, [HOUR_MS]);

    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, [dataMC,dataDate]);

  useEffect(() => {
    // getPosts();
    getOutPut_PROD_AN();
    getOutput_DT_AN();
    get_master_MC();
  }, [dataMC,dataDate]);

  ////////////////////////////////
  return (
    <div className="content-wrapper">
      <div className="content">
        {/* <div className="row" style={{ paddingTop: "15px" }}> */}
        {/* <div className="col-lg-12"> */}
        <h5 className="row justify-content-end">
          Date: {moment().format("YYYY-MM-DD")} {moment().format("HH:mm:ss")}
        </h5>

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
              value={dataDate}
              onChange={async (e) => {
                await setDate(moment(e.target.value).format("YYYY-MM-DD"));
              }}
            />
          </div>
          <h6 className="col-auto">Select M/C No. :</h6>
          <div className="col-2">
            {/* <input
              className="form-control"
              type="text"
              value="MBRC_24"
              onChange={async (e) => {
                await setMC(e.target.value)
                
              }}
            /> */}
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
          {/* <div className="col-1">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={submitValue}
            >
              submit
            </button>
          </div> */}
        </div>
        <div className="row justify-content-center">
          <h3>
            {dataMC} : {data.model == "" ? "Part?" : data.model}
            {/* {datas.mc_no} : {data.model} */}
          </h3>
        </div>
        <div
          className="row justify-content-center"
          style={{ paddingTop: "15px" }}
        >
          <div className="col-auto">
            <div
              className="card"
              style={{
                borderRadius: "10px",
                background: "#D1F5CD",
              }}
            >
              <h4
                className="card-header"
                style={{
                  background: "#9EE197",
                  borderRadius: "10px",
                }}
              >
                Production
              </h4>
              <div className="card-body">
                <h4>{dataBox.dairy_ok}</h4>
                {/* <h4>{dataOK}</h4>  */}
                {/* Product OK */}
              </div>
            </div>
          </div>
          <div className="col-auto">
            <div
              className="card"
              style={{
                borderRadius: "10px",
                background: "#D1F5CD",
              }}
            >
              <h4
                className="card-header"
                style={{
                  background: "#9EE197",
                  borderRadius: "10px",
                }}
              >
                Cycle Time
              </h4>
              <div className="card-body">
                <h4>{dataBox.cycle_time / 100} sec</h4>

                {/* <h4>{datas.Cycle_Time / 100} sec</h4> */}
              </div>
            </div>
          </div>
          <div className="col-auto">
            <div
              className="card"
              style={{
                borderRadius: "10px",
                background: "#D1F5CD",
              }}
            >
              <h4
                className="card-header"
                style={{
                  background: "#9EE197",
                  borderRadius: "10px",
                }}
              >
                Yield
              </h4>
              <div className="card-body">
                {/* <h4>99.23%</h4> */}
                <h4>
                  {(dataBox.yield = "" ? 0 : dataBox.yield)} %
                  {/* {((datas.Daily_OK / datas.Daily_Total) * 100).toFixed(2)}% */}
                </h4>
              </div>
            </div>
          </div>
          <div className="col-auto">
            <div
              className="card"
              style={{
                borderRadius: "10px",
                background: "#D1F5CD",
              }}
            >
              <h4
                className="card-header"
                style={{
                  background: "#9EE197",
                  borderRadius: "10px",
                }}
              >
                Utillization
              </h4>
              <div className="card-body">
                {/* <h4>{((dataOK*(dataBox.cycle_time/100 )/ 3600) * 100).toFixed(2)} %</h4> */}
                <h4>{((dataOK / dataBox.UTL_target) * 100).toFixed(2)} %</h4> 
                {/* <h4>{((dataOK / dataAVG_utl.UTL_target) * 100).toFixed(2)} %</h4> ค่าจาก Qry ใหม่ รอ target_utl ตรงก่อน (2023-11-10)*/}
              </div>
            </div>
          </div>
          <div className="col-auto">
            <div
              className="card"
              style={{
                borderRadius: "10px",
                background: "#D1F5CD",
              }}
            >
              <h4
                className="card-header"
                style={{
                  background: "#9EE197",
                  borderRadius: "10px",
                  // fontSize:"25px",
                }}
              >
                Down Time
              </h4>
              <div className="card-body">
                <h4>
                  {dataBox.DT}{" "}
                  {/* {parseInt(datas.Adjust_Time) +
                    parseInt(datas.Alarm_Time) +
                    parseInt(datas.stop_time) +
                    parseInt(datas.Error_Time) +
                    parseInt(datas.Full_Part_Time) +
                    parseInt(datas.Plan_Stop_Time) +
                    parseInt(datas.Set_Up_Time) +
                    parseInt(datas.Wait_Part_Time)} */}
                  min
                </h4>

                {/* <h4>{datas.D6102}</h4> */}
              </div>
            </div>
          </div>
        </div>
        {/* </div> */}
        {/* </div> */}
        <div
          className="row justify-content-center"
          style={{ paddingTop: "15px" }}
        >
          <div className="col-lg-8">
            <div className="card">
              <h5 className="card-header">Production/ Yield</h5>
              <div className="card-body">
                <div id="chart">
                  <ReactApexChart
                    options={{
                      chart: {
                        height: 550,
                        type: "line",
                        stacked: false,
                      },
                      colors: [
                        "#9EE197",
                        "#FF3B3B",
                        "rgb(0, 143, 251)",
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
                          rotate: -45
                        },
                        categories: ChartData
                        // [
                        //   "08:00",
                        //   "09:00",
                        //   "10:00",
                        //   "11:00",
                        //   "12:00",
                        //   "13:00",
                        //   "14:00",
                        //   "15:00",
                        //   "16:00",
                        //   "17:00",
                        //   "18:00",
                        //   "19:00",
                        //   "20:00",
                        //   "21:00",
                        //   "22:00",
                        //   "23:00",
                        //   "00:00",
                        //   "01:00",
                        //   "02:00",
                        //   "03:00",
                        //   "04:00",
                        //   "05:00",
                        //   "06:00",
                        //   "07:00",
                        // ],
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
                          min: dataBox.scal_min,
                          max: dataMax, //dataBox.scal_max,
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
                          // title: {
                          //   show:true,
                          //   text: "",
                          //   style: {
                          //   color: "#FF3B3B",
                          //     fontSize: "18px",
                          //     fontWeight: 500,
                          //   },
                          // },
                          // tooltip: {
                          //   enabled: true,
                          // },
                          min: dataBox.scal_min,
                          max: dataMax, //dataBox.scal_max,
                        },
                        {
                          seriesName: "Yield rate",
                          opposite: true,
                          min: dataBox.scal_min_YR,
                          max: dataBox.scal_max_YR,
                          axisTicks: {
                            show: true,
                          },
                          axisBorder: {
                            show: true,
                            color: "#14D91A",
                          },
                          labels: {
                            style: {
                              colors: "#14D91A",
                            },
                          },
                          title: {
                            text: "Yield Rate (%)",
                            style: {
                              show: true,
                              color: "#14D91A",
                              fontSize: "18px",
                              fontWeight: 500,
                            },
                          },
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
                    series={dataPD}
                    type="line"
                    height={350}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="card">
              <h5 className="card-header">Down Time</h5>
              <div className="card-body">
                <div id="chart">
                  <ReactApexChart
                    options={{
                      chart: {
                        type: "pie",
                      },
                      
                      legend: {
                        position: "bottom",
                      },
                      labels: dataDT_series,
                      responsive: [
                        {
                          breakpoint: 480,
                          options: {
                            chart: {
                              width: 400,
                            },
                            legend: {
                              position: "bottom",
                            },
                          },
                        },
                      ],
                      colors: [
                        "#E3B3EB",
                        "#54E352",
                        "#F1F76B",
                        "#FC9B57",
                        "#FF3B3B",
                        "#6BA1DE",
                        "#FF8ED6",
                        "#936BDE",
                      ],
                      tooltip: {
                        y: {
                          formatter: function (val) {
                            return val + " min";
                          },
                        },
                      },
                    }}
                    series={dataDT}
                    height={400}
                    type="pie"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mms_autonoise;
