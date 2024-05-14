import React, { Component } from "react";
import "./sidemenu.css"
import {loadTree} from "./loadTree"
class Sidemenu extends Component {
  componentDidMount(){
    loadTree()
  }
  render() {
    return (
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        {/* Brand Logo */}
        <a href="/mms_mbrmd_full" className="brand-link">
          <img
            src="dist/img/icon/ballbearing1.png"
            alt="AdminLTE Logo"
            className="brand-image img-circle elevation-3"
            style={{ opacity: ".8" }}
          />
          <span className="brand-text font-weight-light">NHT BEARING</span>
          {/* <span className="brand-text font-weight-light">NHT BEARING</span> */}
        </a>
        {/* Sidebar */}
        <div className="sidebar">
          {/* Sidebar Menu */}
          <nav className="mt-2">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              <li className="nav-header">Mornitoring</li>
              <li className="nav-item has-treeview">
                <a href="#" className="nav-link">
                  <img
                    src="dist/img/icon/assy.png"
                    alt="AdminLTE Logo"
                    className="brand-image img-circle elevation-3"
                    style={{ opacity: ".8", height: "30px" }}
                  />
                  <p>
                  Assembly
                    <i className="right fas fa-angle-left" />
                  </p>
                </a>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <a href="/mms_mbrmd_full" className="nav-link"  style={{ paddingLeft:"2.5rem" }}>
                      <i className="far fa-square nav-icon" />
                      MBRC Chart
                      <p></p>
                      {/* <i className="right fas fa-angle-left" /> */}
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="/mms_mbrmd_total" className="nav-link" style={{ paddingLeft:"2.5rem" }}>
                      <i className="far fa-square nav-icon" />
                      
                      <p>Production Total</p>
                      {/* <i className="right fas fa-angle-left" /> */}
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="/mms_table_mbr" className="nav-link" style={{ paddingLeft:"2.5rem" }}>
                      <i className="far fa-square nav-icon" />
                      
                      <p>MBRC Table</p>
                      {/* <i className="right fas fa-angle-left" /> */}
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item has-treeview">
                <a href="#" className="nav-link">
                  <img
                    src="dist/img/icon/chartpie.png"
                    alt="AdminLTE Logo"
                    className="brand-image img-circle elevation-3"
                    style={{ opacity: ".8", height: "30px" }}
                  />
                  <p>
                  Grinding
                    <i className="right fas fa-angle-left" />
                  </p>
                </a>
                <ul className="nav nav-treeview">
                 {/*} <li className="nav-item">
                    <a href="/mms_icb" className="nav-link" style={{ paddingLeft:"2.5rem" }}>
                      <i className="far fa-square nav-icon" />
                      IRB
                      <p></p>
                    </a>
                  </li> */}
                  <li className="nav-item">
                    <a href="/Mms_brh_allmc" className="nav-link" style={{ paddingLeft:"2.5rem" }}>
                      <i className="far fa-square nav-icon" />
                      All M/C
                      <p></p>
                    </a>
                  </li>
                </ul>
              </li> 
              {/* vvv */}

              <li className="nav-item has-treeview">
                <a href="#" className="nav-link">
                  <img
                    src="dist/img/icon/assy.png"
                    alt="AdminLTE Logo"
                    className="brand-image img-circle elevation-3"
                    style={{ opacity: ".8", height: "30px" }}
                  />
                  <p>
                    Realtime MBR
                    <i className="right fas fa-angle-left" />
                  </p>
                </a>
                <ul className="nav nav-treeview">
                  {/* <li className="nav-item">
                    <a href="/Realtime_total_MBR_MC" className="nav-link" style={{ paddingLeft:"2.5rem" }}>
                      <i className="far fa-circle nav-icon" />
                      <p>Realtime total MBR</p>
                    </a>
                  </li> */}
                  <li className="nav-item">
                    <a href="/Realtime_total_MBR_day" className="nav-link" style={{ paddingLeft:"2.5rem" }}>
                      <i className="far fa-circle nav-icon" />
                      <p>Ball Usage Total MBR</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="/ballusage_daily" className="nav-link" style={{ paddingLeft:"2.5rem" }}>
                      <i className="far fa-circle nav-icon" />
                      <p>Ball Usage Daily MBR</p>
                      {/* <p>Daily total MBR</p> */}
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="/accum_MBR_7Day_Ago" className="nav-link" style={{ paddingLeft:"2.5rem" }}>
                      <i className="far fa-circle nav-icon" />
                      <p>Ball Usage Accumulate</p>
                    </a>
                  </li>
                  {/* <li className="nav-item">
                    <a href="/OLD_Realtime_total_MBR_MC" className="nav-link" style={{ paddingLeft:"2.5rem" }}>
                      <i className="far fa-circle nav-icon" />
                      <p>NEW SERVER Ball Usage total MBR</p>
                    </a>
                  </li> */}
                  <li className="nav-item">
                    <a href="/mms_onhand" className="nav-link" style={{ paddingLeft:"2.5rem" }}>
                      <i className="far fa-circle nav-icon" />
                      <p>Ball Onhand</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="/mms_turnover" className="nav-link" style={{ paddingLeft:"2.5rem" }}>
                      <i className="far fa-circle nav-icon" />
                      <p>Ball Turnover</p>
                    </a>
                  </li>

                </ul>
              </li>
              {/* Grinding */}
              <li className="nav-item has-treeview">
                <a href="#" className="nav-link">
                  <img
                    src="dist/img/icon/chart.png"
                    alt="AdminLTE Logo"
                    className="brand-image img-circle elevation-3"
                    style={{ opacity: ".8", height: "30px" }}
                  />
                  <p>
                    MMS Alarm
                    <i className="right fas fa-angle-left" />
                  </p>
                </a>
                <ul className="nav nav-treeview">
                <li className="nav-item">
                    <a href="/mms_gd_mc" className="nav-link" style={{ paddingLeft:"2.5rem" }}>
                    {/* <a href="/mms_gd" className="nav-link" style={{ paddingLeft:"2.5rem" }}> */}
                      <i className="far fa-circle nav-icon" />
                      <p>Status Alarm</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="/mms_status_mc_UTL" className="nav-link" style={{ paddingLeft:"2.5rem" }}>
                      <i className="far fa-circle nav-icon" />
                      <p>Machine Status</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="/mms_mc_status" className="nav-link" style={{ paddingLeft:"2.5rem" }}>
                      <i className="far fa-circle nav-icon" />
                      <p>Non-Operating time</p>
                    </a>
                  </li>
                  {/* <li className="nav-item">
                    <a href="/MMS_MC_COMPARE" className="nav-link">
                      <i className="far fa-circle nav-icon" />
                      <p>Status Compare</p>
                    </a>
                  </li> */}

                </ul>
              </li>
          

            </ul>
          </nav>
          {/* /.sidebar-menu */}
        </div>
        {/* /.sidebar */}
      </aside>
    );
  }
}

export default Sidemenu;
