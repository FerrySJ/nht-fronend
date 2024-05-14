import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";
import { httpClient } from "../../../utils/HttpClient";
import { server } from "../../../constance/contance";
import moment from "moment";

class Chart_DT_MD_24 extends React.Component {
  constructor(props) {
    super(props);
    this.tick = this.tick.bind(this);
    this.state = { seconds: props.seconds };
    this.state = {
      Output_MBR_MD: [],
      SeriesName: [],
      time: this.props.time,
      seconds: "1200",

      series: [44, 55, 41, 17, 15],
      options: {
        chart: {
          type: "donut",
        },
        labels: this.state.SeriesName,
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],


      },
    };
  }
  componentDidMount = async () => {
    await this.dateChange();
    await this.getOutput_MBR_MD();
    this.timer = setInterval(this.tick, 1000);
  };

  dateChange = () => {
    if (6 >= parseInt(moment().format("H"))) {
      this.setState({
        start_date: moment().add(-1, "days").format("YYYY-MM-DD"),
      });
    } else {
      this.setState({ start_date: moment().format("YYYY-MM-DD") });
    }
  };

  tick() {
    if (this.state.seconds > 0) {
      this.setState({ seconds: this.state.seconds - 1 });
    } else {
      clearInterval(this.timer);
      window.location.reload();
    }
  }

  getOutput_MBR_MD = async () => {
    const array = await httpClient.get(
      server.realtime_chartDT_MBR_MD24_URL + "/" + this.state.start_date
    );

    console.log("resultDT_MBR", array.data.resultDT_MBR);
    console.log("resultSeriesName", array.data.resultSeriesName);
    let listOutput_MBR_MD = array.data.resultDT_MBR;
    this.setState({ Output_MBR_MD: listOutput_MBR_MD, SeriesName: array.data.resultSeriesName });
  };
  render() {
    return (
      <div className="row-12">
        <div className="card">
          <h3 className="card-header">
            Down Time
          </h3>
          <div className="card-body">
            <div id="chart">
              <ReactApexChart
               options={{
                chart: {
                  type: "pie",
                },
                labels: this.state.SeriesName,
                responsive: [
                  {
                    breakpoint: 480,
                    options: {
                      chart: {
                        width: 200,
                      },
                      legend: {
                        position: "bottom",
                      },
                    },
                  },
                ],
                colors:['#E3B3EB', '#54E352', '#F1F76B','#FC9B57','#FF3B3B','#6BA1DE','#FF8ED6','#936BDE','#A73970'],
                tooltip: {
                  y: {
                    formatter: function (val) {
                      return val + " min";
                    },
                  },
                },

              }}
              series={this.state.Output_MBR_MD}
              height={400}
              type="donut"
            />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Chart_DT_MD_24;
