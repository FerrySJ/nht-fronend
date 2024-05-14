//display All By useEffect???

// ------------
import React, { Component } from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import moment from "moment";
import { httpClient } from "../../../utils/HttpClient";
import { server } from "../../../constance/contance";
import ReactApexChart from "react-apexcharts";
import Swal from "sweetalert2";

const Mms_chart_test_useeffect = () => {
  const [dataMA08, setDataMA08] = useState([]);
  const [datas, setDatas] = useState([]);
  const [data, setDatasMaster] = useState({});
  const [dataBox, setDataBox] = useState({});
  const [dataMax, setDataMax] = useState({});
  const [dataMC, setMC] = useState("MBR_MA03");
  const [dataDate, setDate] = useState(moment().format("YYYY-MM-DD"));
  const [dataOK, setDataOK] = useState("");
  const [dataPD, setdataPD] = useState([]);
  const [dataDT, setdataDT] = useState([]);
  const [data_masterMC, set_masterMC] = useState([]);
  const [dataDT_series, setdataDT_series] = useState([]);

  const getPosts = async () => {
  };
  const getOutput_MBR_MD = async () => {
    // console.log("========= PD =========");
    console.log("dataMC chart PD : ", data_masterMC);

    const array = await httpClient.post(
      server.realtime_chartPD_MBR_MD_URL +
        "/" +
        dataMC +
        "/" +
        // moment().format("YYYY-MM-DD")
        dataDate
    );

    // console.log("ChartPD ==>", array.data.resultOutput_MBR);
    const listOutput_MBR_MD = array.data.resultOutput_MBR;
    setdataPD(listOutput_MBR_MD);
    const data_model = array.data.result[0][0];
    const data_boxrealtime = array.data.result_box[0][0];
    const data_ok = array.data.result_ok;
    const max_prod = array.data.max_prod;
    let removed = data_ok.pop();
    let finalObj = [];
    let finalBox = [];
    finalObj = data_model;
    finalBox = data_boxrealtime;

    setDatasMaster(finalObj);
    setDataOK(removed);
    setDataBox(finalBox);
    
    setDataMax(max_prod);
    return array;
  };
  
  const getOutput_data = async () => {
    console.log("LOL");
    // let set_mbr = [];
    for (let index = 0; index < 1; index++) {
      const arr_name = await httpClient.post(
        server.realtime_chartPD_MBR_MD_URL +"/"+ data_masterMC[3] +"/2023-09-13"
      );
setDataMA08.push(arr_name.data.resultOutput_MBR)
    // console.log(arr_name.data.resultOutput_MBR);
    return
  }
  console.log("===>",dataMA08);
}

  const get_master_MC = async () => {
    // console.log("========= DT =========");
    const array = await httpClient.get(server.master_machine);

    const list_masterMC = array.data.result[0];
    const  arr_mcno_length= array.data.result[0].length;
      set_masterMC(list_masterMC);
    //  var mcno = [];
    // //  list_masterMC.push((data) => (data))
    //  list_masterMC.forEach((ele, i) => {
    //   mcno[ele] = list_masterMC[i];
    // });
    //   console.log("MCMC : ", list_masterMC)
      // console.log(result.data.result[0]);
    // let arr_mc = [];
    // for (let index = 0; index < array.data.result[0].length; index++) {
    //   // console.log(result.data.result[0][index].machine_no);
    //   this.state.aa.push(array.data.result[0][index].machine_no);
    //   arr_mc.push(array.data.result[0][index].machine_no);
    // }
  };

  const MINUTE_MS = 5000;
  // const HOUR_MS = 300000; //5 min
  // const HOUR_MS = 3300000; //55 min
  const HOUR_MS = 900000; //15 min
  // const HOUR_MS = 1800000; //30 min

  const submitValue = () => {
    localStorage.setItem("dataMC", dataMC);
    getPosts();
    // getOutput_MBR_MD().then((array) => {
    //   const listOutput_DT_MBR_MD = array.data.resultDT_MBR;
    //   const SeriesName = array.data.resultSeriesName;
    //   setdataDT(listOutput_DT_MBR_MD);
    //   setdataDT_series(SeriesName);
    // });
    console.log("dataMC", dataMC);
  };

  useEffect(() => {
    // getPosts(); //
    const interval = setInterval(() => {
      console.log("Logs every 15 minute");
      // getPosts();
      getOutput_MBR_MD();
      getOutput_data();
    }, [HOUR_MS]);

    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, [dataMC,dataDate]);

  useEffect(() => {
    // getPosts();
    getOutput_MBR_MD();
    get_master_MC();
    getOutput_data();
  }, [dataMC,dataDate]);
//   useEffect(() => {
//     let newState = data_masterMC.map((e) => e); // map your state here
//     setDatas(newState); // and then update the state
//     console.log(newState);
//  },[]);
// },[datas]);
  ////////////////////////////////
  return (
    <div className="content-wrapper">
      test</div>
  );
};


export default Mms_chart_test_useeffect;
