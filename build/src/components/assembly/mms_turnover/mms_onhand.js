import React, { Component } from "react";
import Chart_Ball_Onhand from "../../mms_mbr/chart_Ball/Chart_Ball_Onhand";
import Chart_Ball_Onhand_by_size from "../../mms_mbr/chart_Ball/Chart_Ball_Onhand_by_size";
import Chart_Ball_Onhand_size from "../../mms_mbr/chart_Ball/Chart_Ball_Onhand_size";
// import Cost_Ball_Turnover from "../../mms_mbr/chart_Ball/Cost_Ball_Turnover";

class Mms_onhand extends Component {
  render() {
    return (
      <div className="content-wrapper">
        <div className="content">
          {/* <Chart_Ball_Onhand_size /> */}
          <Chart_Ball_Onhand_by_size />
          {/* <Chart_Ball_Onhand /> */}
          {/* <Cost_Ball_Turnover/> */}
        </div>
      </div>
    );
  }
}

export default Mms_onhand;
