import React, { Component } from "react";
import ReactApexCharts from "react-apexcharts";
import { httpClient } from "../../../utils/HttpClient";
import { server } from "../../../constance/contance";
import moment from "moment";
import Swal from "sweetalert2";

class Total_time_status_mc_gd extends Component {
  constructor(props) {
    super(props);
    this.tick = this.tick.bind(this);
    this.state = { seconds: props.seconds };

    this.state = {
      data_all: [],
      DateAll: [],
      list_machine:[],
      mcno: "",
      status: "1",
      time: this.props.time,
      seconds: "1200",
    
    };
  }
  componentDidMount = async () => {
    await this.getDate();
    await this.Get_MC_Master();
    await this.sleep(500);
    this.getOutput_data();
    console.log("TOTAL TIME STATUS");
    this.timer = setInterval(this.tick, 1000);
  };
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
    // console.log("LOL",this.state.status);
    const array = await httpClient.get(
      server.Total_time_status_daily_GD +"/" +this.state.start_date +"/" +this.state.end_date +"/" +this.state.mcno +"/"+ this.state.status
    );
    if (array.data.result.length=== 0) {
        Swal.fire({
          icon: "warning",
          title: "Can not find data!",
          showConfirmButton: false,
          timer: 1500,
        });
        this.setState({data_all:[],DateAll:[] })
    }else{
      let list_data = array.data.result;
      this.setState({ data_all: list_data });
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
    this.setState({ end_date: moment().endOf("month").format("YYYY-MM-DD") });
  };
  click_search = async () => {
    
    this.getOutput_data();
  };
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  Get_MC_Master = async ()=>{
    
    let mc_list_data = await httpClient.post(server.GET_MASTER_MC_GD);
    if (mc_list_data.data.result_basic.length > 0) {
      // console.log("data mc");
      await this.setState({
        list_machine: mc_list_data.data.result_basic,
        mcno: mc_list_data.data.result_basic[0].mc_no,
      });
      await this.sleep(500);
  } else {
    Swal.fire({
      icon: "warning",
      text: "Can not find data master M/C!",
      timer: 1500,
    });
    }
  }
  renderTableRow = () => {
    // console.log("mc",this.state.list_machine);
    try {
      if (this.state.list_machine !== null) {
        const myResult = this.state.list_machine;
        return myResult.map((item) => <option >{item.mc_no}</option>);
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
                {/* chart total time status By M/C */}
                Data time of status alarm 
              </div>
              <div
                className="row justify-content-center"
                style={{ paddingTop: "10px", textAlign: "center" }}
              >
                <div className="col-auto">
                  <h5>Start Date :</h5>
                </div>
                <div className="col-auto">
                  <input
                    className="form-control"
                    type="date"
                    value={this.state.start_date}
                    onChange={async (e) => {
                      await this.setState({
                        start_date: moment(e.target.value).format("YYYY-MM-DD"),
                      });
                    }}
                  />
                </div>

                <div className="col-auto">
                  <h5>End Date :</h5>
                </div>
                <div className="col-auto">
                  <input
                    className="form-control"
                    type="date"
                    value={this.state.end_date}
                    onChange={async (e) => {
                      await this.setState({
                        end_date: moment(e.target.value).format("YYYY-MM-DD"),
                      });
                    }}
                  />
                </div>
                <div className="col-auto">
                  <h5>Machine No. : </h5>
                </div>
                <div className="col-1">
                        <select
                          value={this.state.mcno}
                          className="form-control"
                          onChange={async (e) => {
                            await this.setState({
                              mcno: e.target.value,
                            });
                          }}
                        >
                          {/* <option>---</option> */}
                          {this.renderTableRow()}
                          {/* {this.state.list_machine.map((item) => <option key={item.mc_no}>{item.mc_no}</option>)}; */}
                          
                        </select>
                      </div>
                      <div className="col-auto">
                  <h5>Topic : </h5>
                </div>
                      <div className="col-2">
                        <select
                          value={this.state.status}
                          className="form-control"
                          onChange={(e) => {
                            this.setState({ status: e.target.value });
                          }}
                        >
                          <option value="1">RUN</option>
                          <option value="2">STOP</option>
                          <option value="3">ALARM</option>
                          <option value="4">WAIT PART</option>
                          <option value="5">FULL PART</option>
                          {/* {this.state.list_machine.map((item) => <option key={item.mc_no}>{item.mc_no}</option>)}; */}
                          
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
                  <ReactApexCharts
                    options= {{
                      chart: {
                        height: 350,
                        type: 'bar',
                      },
                      plotOptions: {
                        bar: {
                          borderRadius: 10,
                          dataLabels: {
                            position: 'top', // top, center, bottom
                          },
                        }
                      },
                      dataLabels: {
                        enabled: true,
                        formatter: function (val) {
                          return val ;
                        },
                        offsetY: -20,
                        style: {
                          fontSize: '14px',
                          colors: ["#304758"]
                        }
                      },
                      
                      xaxis: {
                        categories: this.state.DateAll,//["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                        position: 'bottom',
                        axisBorder: {
                          show: false
                        },
                        axisTicks: {
                          show: false
                        },
                        crosshairs: {
                          fill: {
                            type: 'gradient',
                            gradient: {
                              colorFrom: '#D8E3F0',
                              colorTo: '#FFD1E6',
                              stops: [0, 100],
                              opacityFrom: 0.4,
                              opacityTo: 0.5,
                            }
                          }
                        },
                        tooltip: {
                          enabled: true,
                        }
                      },
                      yaxis: {
                        axisBorder: {
                          show: false
                        },
                        axisTicks: {
                          show: false,
                        },
                        labels: {
                          show: false,
                          formatter: function (val) {
                            return val + " min";
                          }
                        }
                      
                      },
                      title: {
                        text: 'Time Status Alarm',
                        floating: true,
                        offsetY: 330,
                        align: 'center',
                        style: {
                          color: '#444'
                        }
                      },
                      colors: ['#00AEFF','#546E7A', '#EDB51F', '#2E93fA', '#E91E63', '#FF9800']
                      // colors: [ this.state.status = '2' ? '#7E36AF': '#D9534F']
                    }
                  }
                  series={this.state.data_all} type="bar" height={350} 
                  />
                </div>
                <span className="input-help">
  <small id="passwordHelpBlock" className="form-text text-muted">* Displays the total time of each day of the Status alarm. </small>
  <small id="passwordHelpBlock" className="form-text text-muted">* แสดงข้อมูลเวลาทั้งหมดของแต่ละวัน ของ Status alarm  </small>
</span>
              </div>
              
              

            </div>
          </div>
    
    );
  }
}


export default Total_time_status_mc_gd;
