import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { server } from "../../constance/contance";
import { httpClient } from "../../utils/HttpClient";
import moment from "moment";

const Status_mbr = () => {
  const [data, setData] = useState([]);
  const [dataMC, setMC] = useState("MBRMA01");
  const [data_masterMC, set_masterMC] = useState([]);
  const [dataDate, setDate] = useState(moment().format("YYYY-MM-DD"));

  const get_StatusMBR = async () => {
    const array = await httpClient.get(`${server.STATUS_MBR_ASSY}/${dataMC}/${dataDate}`);
    // console.log(array.data.result);
    setData(array.data.result);

    setTimeout(() => {
      get_StatusMBR();
    }, 250000); // 5 min
  };

  useEffect(() => {
    get_StatusMBR();
    get_master_MC();
  }, [dataMC, dataDate]);

  const formattedData = (data) => {
    console.log(data);
    return data.map((item) => ({
    // const formattedData = data.map((item) => ({
    x: item.mc_no,
    y: [
      new Date(item.start_time).getTime(),
      new Date(item.end_time).getTime(),
    ],
    fillColor:
      item.mc_status === "run"
        ? "#1efb2f"
        : item.mc_status === "stop"
        ? "#ff0000"
        : item.mc_status === "alarm"
        ? "#ff9d1f"
        : item.mc_status === "error"
        ? "#ff5721"
        : item.mc_status === "wait_bl"
        ? "#f6ff39"
        : item.mc_status === "wait_ir"
        ? "#39f6ff"
        : item.mc_status === "wait_or"
        ? "#ea39ff"
        : item.mc_status === "wait_rtn"
        ? "#3942ff"
        : item.mc_status === "status10"
        ? "#ff86c8"
        : "#c0ffb4",
    // fillColor: item.mc_status === "run" ? "#00E396" : (item.mc_status === "stop" ? "#FF4560" : "#FEB019")
    mc_status: item.mc_status,
    process: item.process
  }));
};

  const get_master_MC = async () => {
    // console.log("========= DT =========");
    const array = await httpClient.get(server.master_machine);

    const list_masterMC = array.data.result[0];
    set_masterMC(list_masterMC);
    // console.log("MCMC : ", list_masterMC);
  };
  const options = {
    chart: {
      height: 120,
      width: 500,
      type: "rangeBar",
    },
    plotOptions: {
      bar: {
        horizontal: true,
        // barHeight: '80%',
        // colors: {
        //   ranges: data.map(entry => ({
        //     from: entry.y[0],
        //     to: entry.y[1],
        //     color: statusColors[entry.mc_status]
        //   }))
        // }
      },
    },
    xaxis: {
      type: "datetime",
    },
    
    fill: {
      type: "solid",
    },
    
    // tooltip: {
    //   x: {
    //     format: "HH:mm:ss",
    //   },
    // },
    tooltip: {
      custom: function({ series, seriesIndex, dataPointIndex, w }) {
        const data = w.globals.initialSeries[seriesIndex].data[dataPointIndex];
        return `<div class="tooltip">
          <span>Status: ${data.mc_status}</span><br />
          <span>Start: ${new Date(data.y[0]).toLocaleString()}</span><br />
          <span>End: ${new Date(data.y[1]).toLocaleString()}</span>
        </div>`;
      }
    },
    colors: ['#1efb2f', '#ff0000', '#ff9d1f', '#f6ff39', '#39f6ff', '#ea39ff', '#c0ffb4'], // กำหนดสีของสถานะ
    legend: {
      show: true,
      position: 'top',
      horizontalAlign: 'center',
      labels: {
        useSeriesColors: true,
        formatter: function(seriesName, opts) {
          const statusMap = {
            '#1efb2f': 'RUN',
            '#ff0000': 'STOP',
            '#ff9d1f': 'ALARM',
            '#f6ff39': 'ERROR',
            '#39f6ff': 'WAIT IR',
            '#ea39ff': 'WAIT OR',
            '#c0ffb4': 'OTHER',
          };
          return statusMap[opts.w.globals.colors[opts.seriesIndex]];
        }
      }
    }
  };

  
  // const series = [
  //   {
  //     name: 'RUN',
  //     data: formattedData(data).filter(item => item.mc_status === 'run')
  //   },
  //   {
  //     name: 'STOP',
  //     data: formattedData(data).filter(item => item.mc_status === 'stop')
  //   },
  //   {
  //     name: 'ALARM',
  //     data: formattedData(data).filter(item => item.mc_status === 'alarm')
  //   },
  //   {
  //     name: 'ERROR',
  //     data: formattedData(data).filter(item => item.mc_status === 'error')
  //   },
  //   {
  //     name: 'WAIT IR',
  //     data: formattedData(data).filter(item => item.mc_status === 'wait_ir')
  //   },
  //   {
  //     name: 'WAIT OR',
  //     data: formattedData(data).filter(item => item.mc_status === 'wait_or')
  //   }
  // ];

  
  const series = [
    {
      name: "Machine Status",
      data: formattedData(data)
    },
  ];

  
  return (
    <div className="content-wrapper">
      <div className="content">
        
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
        <div id="chart">
          <Chart
            options={options}
            series={series}
            type="rangeBar"
            height={350}
          />
        </div>
      </div>
    </div>
  );
};

export default Status_mbr;
