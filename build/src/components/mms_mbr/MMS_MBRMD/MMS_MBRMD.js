import React, { Component } from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import moment from "moment";
import { httpClient } from "../../../utils/HttpClient";
import { api_Influx, server } from "../../../constance/contance";
import Chart_DT_MD_24 from "../Chart_DT_MD/Chart_DT_MD_24";
import Chart_PD_MD from "../Chart_PD_MD/Chart_PD_MD";

const MMS_MBRMD = () => {
  const [datas, setDatas] = useState({});
  const [data, setDatasMaster] = useState({});
  const [dataMC, setMC] = useState("MBR_MD24");
  const [dataOK, setDataOK] = useState({});

  const getPosts = async () => {
    console.log("influx", dataMC);
    try {
      const res = await axios.get(
        api_Influx +
          // "/query?pretty=true&db=influx&q=select%20*%20from%20machine_data%20where%20mc_no=%27MBR_MD24%27%20order%20by%20time%20desc%20limit%201"
          "/query?pretty=true&db=influx&q=select%20*%20from%20machine_data%20where%20mc_no=%27"+ dataMC +"%27%20order%20by%20time%20desc%20limit%201"
          );
      console.log(res);
      const keys = res.data.results[0].series[0].columns;
      const values = res.data.results[0].series[0].values[0];

      var obj = [];

      //for each loop
      keys.forEach((ele, i) => {
        obj[ele] = values[i];
      });

      setDatas(obj);
      //print the obj
      console.log(obj);
    } catch (err) {
      console.log(`ERROR: ${err}`);
    }
  };
  const get_data_chartPD = async () => {
    console.log("::::::", dataMC);
    try {
      const array = await httpClient.get(
        server.realtime_chartPD_MBR_MD_URL +
          "/" + dataMC+"/" +
          moment().format("YYYY-MM-DD")
      );
      // console.log(array.data.result_ok);
      const data_model = array.data.result[0][0];
      const data_ok = array.data.result_ok;
      let removed = data_ok.pop();
      let finalObj = [];
      finalObj = data_model

      setDatasMaster(finalObj);
      setDataOK(removed)
      // console.log(removed);
    } catch (err) {
      console.log(`ERROR: ${err}`);
    }
  };
  const MINUTE_MS = 5000;

  const submitValue =  () => {
     localStorage.setItem('dataMC', dataMC)
    console.log("dataMC",dataMC);
  };

  useEffect(() => {
    getPosts();
    const interval = setInterval(() => {
      console.log("Logs every minute");
      getPosts();
      get_data_chartPD();
    }, [MINUTE_MS]);

    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, [localStorage.setItem('dataMC',dataMC)]);


  useEffect(() => {
    getPosts();
    get_data_chartPD();
    }, [dataMC])

  ////////////////////////////////
  return (
    <div className="content-wrapper">
      <div className="content">
        {/* <div className="row" style={{ paddingTop: "15px" }}> */}
        {/* <div className="col-lg-12"> */}
        <div className="row justify-content-end">
          <h4>
            Date: {moment().format("YYYY-MM-DD")} {moment().format("HH:mm:ss")}
          </h4>
        </div>
        <div
          className="row justify-content-center"
          style={{
            paddingTop: "10px",
            textAlign: "center",
            paddingBottom: "10px",
          }}
        >
          <div className="col-auto">
            <h5>Select M/C No. :</h5>
          </div>
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
              className="custom-select"
              value={dataMC}
              onChange={async (e) => {
                await setMC(e.target.value);
              }}
            >
              <option disabled selected value="">select mc_no</option>
              <option value="MBR_MD24">MBR_MD24</option>
              <option value="MBR_MD25">MBR_MD25</option>
              <option value="MBR_MD26">MBR_MD26</option>
              <option value="MBR_MD27">MBR_MD27</option>
              <option value="MBR_MD28">MBR_MD28</option>
              <option value="MBR_MD29">MBR_MD29</option>
              <option value="MBR_MD30">MBR_MD30</option>
              <option value="MBR_MD31">MBR_MD31</option>
              <option value="MBR_MD32">MBR_MD32</option>
              <option value="MBR_MD33">MBR_MD33</option>
              <option value="MBR_MD34">MBR_MD34</option>
              <option value="MBR_MD35">MBR_MD35</option>
              <option value="MBR_MD38">MBR_MD38</option>
            </select>
          </div>

          <div className="col-1">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={submitValue}
            >
              submit
            </button>
          </div>
        </div>
        <div className="row justify-content-center">
          <h2>
            {/* {dataMC} : {data.model} */}
            {datas.mc_no} : {data.model}{" "}
          </h2>
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
                background: "#E5EAF9",
              }}
            >
              <h1
                className="card-header"
                style={{
                  background: "#9DACD6",
                  borderRadius: "10px",
                }}
              >
                Production
              </h1>
              <div className="card-body">
                {/* <h1>15,123</h1> */}
                <h1>{datas.Daily_OK}</h1>
                {/* Product OK */}
              </div>
            </div>
          </div>
          <div className="col-auto">
            <div
              className="card"
              style={{
                borderRadius: "10px",
                background: "#E5EAF9",
              }}
            >
              <h1
                className="card-header"
                style={{
                  background: "#9DACD6",
                  borderRadius: "10px",
                }}
              >
                Cycle Time
              </h1>
              <div className="card-body">
                {/* <h1>1.7 sec</h1> */}
                <h1>{datas.Cycle_Time / 100} sec</h1>
              </div>
            </div>
          </div>
          <div className="col-auto">
            <div
              className="card"
              style={{
                borderRadius: "10px",
                background: "#E5EAF9",
              }}
            >
              <h1
                className="card-header"
                style={{
                  background: "#9DACD6",
                  borderRadius: "10px",
                }}
              >
                Yield
              </h1>
              <div className="card-body">
                {/* <h1>99.23%</h1> */}
                <h1>
                  {((datas.Daily_OK / datas.Daily_Total) * 100).toFixed(2)}%
                </h1>
              </div>
            </div>
          </div>
          <div className="col-auto">
            <div
              className="card"
              style={{
                borderRadius: "10px",
                background: "#E5EAF9",
              }}
            >
              <h1
                className="card-header"
                style={{
                  background: "#9DACD6",
                  borderRadius: "10px",
                }}
              >
                Utillization
              </h1>
              <div className="card-body">
                <h1>
                  {((dataOK / data.target_utl) * 100).toFixed(2)} %
                </h1>
              </div>
            </div>
          </div>
          <div className="col-auto">
            <div
              className="card"
              style={{
                borderRadius: "10px",
                background: "#E5EAF9",
              }}
            >
              <h1
                className="card-header"
                style={{
                  background: "#9DACD6",
                  borderRadius: "10px",
                  // fontSize:"25px",
                }}
              >
                Down Time
              </h1>
              <div className="card-body">
              <h1>{parseInt(datas.Stop_Time) +parseInt(datas.Adjust_Time) + parseInt(datas.Alarm_Time) + parseInt(datas.Error_Time) + parseInt(datas.Full_Part_Time) + parseInt(datas.Plan_Stop_Time) + parseInt(datas.Set_Up_Time) + parseInt(datas.Wait_Part_Time)} min</h1>
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
            <Chart_PD_MD dataMC={dataMC} />
          </div>
          <div className="col-lg-4">
            <Chart_DT_MD_24 />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MMS_MBRMD;
