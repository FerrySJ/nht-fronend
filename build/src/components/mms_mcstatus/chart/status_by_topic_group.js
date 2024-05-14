import React, { Component } from "react";
import ReactApexCharts from "react-apexcharts";
import { httpClient } from "../../../utils/HttpClient";
import { server } from "../../../constance/contance";
import moment from "moment";
import Swal from "sweetalert2";

class Status_by_topic_group extends React.Component {
  constructor(props) {
    super(props);
    this.tick = this.tick.bind(this);
    this.state = { seconds: props.seconds };

    this.state = {
      
      //   start_date: moment().subtract(1, "days").format("YYYY-MM-DD"),
      // end_date: moment().endOf("month").format("YYYY-MM-DD"),
      data_all: [],
      DateAll:[],
      mcno:"ic11r",
      time: this.props.time,
    //   start_date: localStorage.getItem("start_date"),
    //   end_date: localStorage.getItem("end_date"),
      seconds: "1200",
      data_test:[
        {
            "name": "0",
            "data": [
                "19,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0"
            ]
        },
        {
            "name": "1",
            "data": [
                "56,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0"
            ]
        },
        {
            "name": "2",
            "data": [
                "0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0"
            ]
        }
    ],
      // [
      //   { name: 'Non - Operating time', data: [ 86291, 36659, 16858 ] },
      //   { name: 'Operating time', data: [ 86176, 36923, 16904 ] }
      // ],
      series_test:[ '2023-08-22','2023-08-23' ,'2023-08-24','2023-08-22','2023-08-23' ,'2023-08-24','2023-08-22','2023-08-23' ,'2023-08-24','2023-08-22','2023-08-23' ,'2023-08-24','2023-08-22','2023-08-23' ,'2023-08-24','2023-08-22','2023-08-23' ,'2023-08-24','2023-08-22','2023-08-23' ,'2023-08-24','2023-08-22','2023-08-23' ,'2023-08-24','2023-08-22','2023-08-23' ,'2023-08-24','2023-08-22','2023-08-23' ,'2023-08-24' ,'2023-08-24' ],
      series: [
        {
          name: 'Q1 Budget',
          group: 'budget',
          data: [44000, 55000, 41000, 67000, 22000, 43000]
        },
        {
          name: 'Q1 Actual',
          group: 'actual',
          data: [48000, 50000, 40000, 65000, 25000, 40000]
        },
        {
          name: 'Q1 Actual',
          group: 'actual',
          data: [48000, 50000, 40000, 65000, 25000, 40000]
        },
        
      ],
      options: {
        chart: {
          type: 'bar',
          height: 350,
          stacked: true,
        },
        stroke: {
          width: 1,
          colors: ['#fff']
        },
        dataLabels: {
          formatter: (val) => {
            return val / 1000 + 'K'
          }
        },
        plotOptions: {
          bar: {
            horizontal: false
          }
        },
        xaxis: {
          categories: [
            'Online advertising',
            'Sales Training',
            'Print advertising',
            'Catalogs',
            'Meetings',
            'Public relations'
          ]
        },
        fill: {
          opacity: 1
        },
        colors: ['#80c7fd', '#008FFB', '#80f1cb', '#00E396'],
        yaxis: {
          labels: {
            formatter: (val) => {
              return val / 1000 + 'K'
            }
          }
        },
        legend: {
          position: 'top',
          horizontalAlign: 'left'
        }
      },
    
    };

  }
  componentDidMount = async()=> {
    await this.getDate();
    await this.Get_MC_Master();
    // console.log(moment().subtract(1, "month").format("YYYY-MM-DD"));
    //   console.log(moment().endOf("month").subtract(1, "month").format("YYYY-MM-DD"));
   
    this.getOutput_data();
    this.timer = setInterval(this.tick, 1000);
  }
  tick() {
    if (this.state.seconds > 0) {
      this.setState({ seconds: this.state.seconds - 1 });
    } else {
      clearInterval(this.timer);
      window.location.reload();
    }
  }
  //chart ball daily
  getOutput_data = async () => {
    // console.log("LOL");
    const array = await httpClient.post(
      server.MC_by_status_GD + "/" + this.state.start_date  + "/" + this.state.end_date + "/" + this.state.mcno
    );
    console.log("by status");
    if (array.data.resultdata[0].length === 0) {
      Swal.fire({
        icon: "warning",
        text: "Can not find data!",
        timer: 1500,
      })
     await this.setState({data_all:[],DateAll:[]})
    }else{
      let list_oper_all = array.data.result;
        this.setState({ data_all: list_oper_all });
        let listDate = array.data.resultDate;
        this.setState({ DateAll: listDate });
    }

    setTimeout(
      function () {
        //Start the timer
        this.getOutput_data();
      }.bind(this),
      600000 //10 min
    );
  };
  getDate = () => {
    this.setState({
      start_date: moment().startOf("month").format("YYYY-MM-DD"),
    });
    this.setState({ end_date: moment().endOf("month").format("YYYY-MM-DD")
 });    console.log("diddd",this.state.start_date  + "/" + this.state.end_date + "/" + this.state.mcno);

  };
  click_search = async () => {
   this.getOutput_data();
    }
    Get_MC_Master = async ()=>{
      let mc_list_data = await httpClient.post(server.GET_MASTER_MC_GD);
      await this.setState({
        list_machine: mc_list_data.data.result_basic,
        mcno: mc_list_data.data.result_basic[0].mc_no,
      });
    }
    renderTableRow = () => {
      // console.log("mc",this.state.list_machine);
      try {
        if (this.state.list_machine !== null) {
          const myResult = this.state.list_machine;
          return myResult.map((item) => <option>{item.mc_no}</option>);
        }
      } catch (error) {}
    };
  render() {
    return (
          <div className="row-12">
            <div className="card">
              <div
                className="card-header"
                style={{
                  marginBottom: "0",
                  fontWeight: 500,
                  fontSize: "1.5rem",
                }}
              >
                M/C by Status 
              </div>
              <div
                className="row justify-content-center"
                style={{ paddingTop: "10px", textAlign: "center" }}
              >
                <div className="col-1">
                  <h5>Start Date</h5>
                </div>
                <div className="col-2">
                  <input
                    className="form-control"
                    type="date"
                    value={this.state.start_date}
                    onChange={async (e) => {
                      await this.setState({
                        start_date: moment(e.target.value).format(
                          "YYYY-MM-DD"
                        ),
                      });
                    }}
                  />
                </div>

                <div className="col-1">
                  <h5>End Date</h5>
                </div>
                <div className="col-2">
                  <input
                    className="form-control"
                    type="date"
                    value={this.state.end_date}
                    onChange={async (e) => {
                      await this.setState({
                        end_date: moment(e.target.value).format(
                          "YYYY-MM-DD"
                        ),
                      });
                    }}
                  />
                </div>
                <div className="col-1">
                  <b>MACHINE : </b>
                </div>
                <div className="col-2">
                        <select
                          value={this.state.mcno}
                          className="form-control"
                          onChange={(e) => {
                            this.setState({ mcno: e.target.value });
                          }}
                        >
                          {/* <option>---</option> */}
                          {this.renderTableRow()}
                        </select>
                      </div>
                <div className="col-1">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={async (e) => {
                      e.preventDefault();
                      await this.click_search();
                    }}
                  >
                    submit
                  </button>
                </div>
              </div>
              <div className="page-content">
              <div id="chart">
  <ReactApexCharts options={this.state.options} series={this.state.series} type="bar" height={350} />
</div>
                <div id="chart">
                  <ReactApexCharts
                    options={{
                      chart: {
                        type: "bar",
                        height: 350,
                        stacked: true,
                        stackType: "100%",
                      },
                      plotOptions: {
                        bar: {
                          // horizontal: true,
                          horizontal: false,
                        },
                      },
                      stroke: {
                        width: 1,
                        colors: ["#fff"],
                      },
                      // title: {
                      //   text: "Data for date : " + this.state.datetoday,
                      //   style: {
                      //     fontSize: '30px',
                      //     // fontWeight: 900
                      //   }
                      // },
                      xaxis: {
                        type: "date",
                        labels: {
                          show: true,
                          rotate: -45,
                          // rotateAlways: false,
                          // hideOverlappingLabels: true,
                          // showDuplicates: false,
                          // trim: false,
                          // minHeight: undefined,
                          // maxHeight: 120,
                          // style: {
                          //   colors: [],
                          //   fontSize: "25px",
                          //   fontFamily: "Helvetica, Arial, sans-serif",
                          //   fontWeight: 400,
                          //   cssClass: "apexcharts-xaxis-label",
                          // },
                        },
                        categories: this.state.DateAll,
          // categories: this.state.series_test,
                      },
                      yaxis: [
                        {
                          labels: {
                            style: {
                              colors: "black",
                              fontSize: "20px",
                              fontWeight: "bold",
                            },
                          },
                        },
                      ],
                      dataLabels: {
                        enabled: true,
                        position: "center",
                        style: {
                          fontSize: "20px",
                          fontWeight: "bold",
                        },
                      },
                      tooltip: {
                        y: {
                          formatter: function (val) {
                            return val + "min";
                          },
                        },
                      },
                      fill: {
                        opacity: 1,
                      },
                      colors: [
                        "#46E816",
                        "#E81616",
                        "#FF9700",
                        "#FFFB00",
                        "#003EFF",
                      ],
                      legend: {
                        horizontalAlign: "center",
                        floating: false,
                        fontSize: "20px",
                        fontFamily: "Helvetica, Arial",
                        position: "right",
                        offsetX: -20,
                        offsetY: 10,
                        formatter: function (seriesName) {
                          return seriesName;
                          // if (seriesName === "MBR_MD24") {
                          //   return ["BALL SIZE -5.0"];
                          // }
                          // if (seriesName === "MBR_MD25") {
                          //   return ["BALL SIZE -2.5"];
                          // }
                          // if (seriesName === "MBR_MD26") {
                          //   return ["BALL SIZE 0.0"];
                          // }
                          // if (seriesName === "MBR_MD27") {
                          //   return ["BALL SIZE +2.5"];
                          // }
                          // if (seriesName === "MBR_MD28") {
                          //   return ["BALL SIZE +5.0"];
                          // }
                        },
                      },
                    }}
                    // series={this.state.data_test}
                    series={this.state.data_all}
                    // series={[
                    //   { name: '2023-08-22', data: [ 698, 8, null, 108, 0 ] },
                    //   { name: '2023-08-23', data: [ 1578, 17, 1, 53, 3 ] },
                    //   { name: '2023-08-24', data: [ 1106, 1, 124, 32, 1 ] },
                    //   { name: '2023-08-25', data: [ 405, 3649, 2, 124, 0 ] },
                    //   { name: '2023-08-28', data: [ 165, 260, 10, 1352, 11 ] },
                    //   { name: '2023-08-29', data: [ 689, 5, 24, 269, 17 ] },
                    //   { name: '2023-08-30', data: [ 1026, 2, 37, 364, 10 ] },
                    //   { name: '2023-08-27', data: [ 20, 3, 0, 151, null ] },
                    //   { name: '2023-08-31', data: [ 84, 2, 98, 9, null ] }
                    // ]}
                    type="bar"
                    height={500}
                  />
                </div>
              </div>
            </div>
          </div>
    );
  }
}

export default Status_by_topic_group;
