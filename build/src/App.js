import React, { Component } from "react";
import {
  BrowserRouter ,
  Route,
  Routes,
} from "react-router-dom";
import * as moment from "moment";
import { key, NO, YES } from "./constance/contance.js";
import Swal from "sweetalert2";
import Header from "./components/header/header.js";
import Sidemenu from "./components/sidemenu/sidemenu.js";
import Footer from "./components/footer/footer.js";
import MMS_GD from "./components/mms_alarmlist/grinding/mms_gd.js";
import Home from "./components/home/home.js";
import Icb from "./components/mms_grinding/icb/icb.js";
import Realtime_total_MBR_MC from "./components/assembly/realtime/realtime_mbr/realtime_total_MBR_MC.js";
import MMS_MCstatus from "./components/mms_mcstatus/MMS_MCstatus.js";
import Mms_turnover from "./components/assembly/mms_turnover/mms_turnover.js";
import Mms_onhand from "./components/assembly/mms_turnover/mms_onhand.js";
import MMS_MBRMD_full from "./components/mms_mbr/MMS_MBRMD/MMS_MBRMD_full.js";
import Display_tb_mbr from "./components/assembly/realtime/realtime_mbr/display_tb_mbr.js";
import MMS_GD_HOUR from "./components/mms_alarmlist/grinding/mms_gd_hour.js";
import Compare_alarmlist_topic from "./components/mms_mcstatus/chart/compare_alarmlist_topic.js";
import MMS_GD_BY_MC from "./components/mms_alarmlist/grinding/mms_gd_by_mc.js";
import MMS_status_mc_UTL from "./components/mms_mcstatus/MMS_status_mc_utl.js";
import Realtime_sizeball_MBR_daily from "./components/assembly/realtime/realtime_mbr/realtime_sizeball_MBR_daily.js";
import Chart_ball_usage_day from "./components/assembly/realtime/realtime_mbr/chart_ball_usage_day.js";
import Realtime_total_MBR_day from "./components/assembly/realtime/realtime_mbr/realtime_total_MBR_day.js";
import Realtime_sizeball_MBR_Monthly from "./components/assembly/realtime/realtime_mbr/realtime_sizeball_MBR_Monthly.js";
import Testcode from "./components/testcode/testcode.js";
import LineMessaging from "./components/testcode/test_line.js";
import OLD_Realtime_total_MBR_day from "./components/assembly/realtime/realtime_mbr/old_realtime_total_MBR_day.js";
import Mms_brh_allmc from "./components/mms_grinding/mms_brh_allmc/mms_brh_allmc.js";
import MMS_MBRMD_PROD_TOTAL from "./components/mms_mbr/MMS_MBRMD/MMS_MBRMD_prod_total.js";
import MMS_MBRMD_ACCUM_PROD_TOTAL from "./components/mms_mbr/MMS_MBRMD/MMS_MBRMD_accum_prod_total.js";
import Upload_excel_stock from "./components/assembly/mms_turnover/upload_excel_stock.js";
import Realtime_Sizeball_MBR_7Day_Ago from "./components/assembly/realtime/realtime_mbr/realtime_sizeball_MBR_5day_ago.js";
import BarChart from "./components/testcode/test_chart2.js";
import RangeBarChart from "./components/testcode/test_rangchart.js";
import Mms_alarm_b from "./components/mms_alarmlist/grinding/chart/mms_alarm_b.js";
import Mms_autonoise from "./components/mms_autonoise/mms_autonoise.js";
import MMS_AN_PROD_TOTAL from "./components/mms_autonoise/mms_autonoise_prod_total.js";
import MMS_table_an from "./components/mms_autonoise/mms_table_autonoise.js";


// const express= require('express');
// const bodyParser= require('body-parser');
// const app= express();
// app.use(bodyParser.json())


export default class App extends Component {
  redirectToLogin = () => {
    //ถ้า return error ให้ไปที่ login
    // return <Redirect to="/login" />;
  };

  render() {
    return (
      <BrowserRouter>
        <div>
          { <Header />}
          { <Sidemenu/>}
          {/* {IsLogin() && <SideMenu />} */}

          <Routes>
            {/* <SecuredRoute path="/home" component={Home} /> */}
            <Route path="/mms_gd" element={<MMS_GD />} />
            <Route path="/mms_gd_hour" element={<MMS_GD_HOUR />} />
            <Route path="/mms_gd_mc" element={<MMS_GD_BY_MC />} />
            <Route path="/home" element={<Home />} />
            <Route path="/mms_icb" element={<Icb />} />
            <Route path="/Realtime_total_MBR_MC" element={<Realtime_total_MBR_MC />} />
            <Route path="/OLD_Realtime_total_MBR_MC" element={<OLD_Realtime_total_MBR_day />} />
            <Route path="/mms_turnover" element={<Mms_turnover />} />
            <Route path="/mms_onhand" element={<Mms_onhand />} />
            <Route path="/mms_mbrmd_full" element={<MMS_MBRMD_full />} />
            <Route path="/mms_table_mbr" element={<Display_tb_mbr />} />
            <Route path="/mms_mc_status" element={<MMS_MCstatus />} />
            <Route path="/Compare_alarmlist_topic" element={<Compare_alarmlist_topic />} />
            <Route path="/mms_status_mc_UTL" element={<MMS_status_mc_UTL />} />
            <Route path="/ballusage_daily" element={<Realtime_sizeball_MBR_daily />} />
            <Route path="/ballusage_monthly" element={<Realtime_sizeball_MBR_Monthly />} />
            <Route path="/Realtime_total_MBR_day" element={<Realtime_total_MBR_day />} />
            <Route path="/Chart_ball_usage_day" element={<Chart_ball_usage_day />} />
            <Route path="/testpfern" element={<Testcode />} />
            <Route path="/test_line" element={<LineMessaging />} />
            <Route path="/Mms_brh_allmc" element={<Mms_brh_allmc />} />
            <Route path="/mms_mbrmd_total" element={<MMS_MBRMD_PROD_TOTAL />} />
            <Route path="/mms_mbrmd_accum" element={<MMS_MBRMD_ACCUM_PROD_TOTAL />} />
            <Route path="/accum_MBR_7Day_Ago" element={<Realtime_Sizeball_MBR_7Day_Ago />} />
            <Route path="/test_upload" element={<Upload_excel_stock />} />
            <Route path="/test_BarChart" element={<BarChart />} />
            <Route path="/test_RangeBarChart" element={<RangeBarChart />} />
            <Route path="/chart_alarm_b" element={<Mms_alarm_b />} />
            <Route path="/mms_an" element={<Mms_autonoise />} /> 
            <Route path="/mms_an_total" element={<MMS_AN_PROD_TOTAL />} /> 
            <Route path="/mms_an_table" element={<MMS_table_an />} /> 
            

            
          
 
            {/* ถ้า return error ให้ไปที่ login */}
            <Route exact={true} path="/" element={<MMS_MBRMD_full />} />
            <Route exact={true} path="*" element={<MMS_MBRMD_full />} />
          </Routes>
          {<Footer />}
        </div>
      </BrowserRouter>
    );
  }
}
