import React, { Component } from "react";
import { APP_TITLE } from "../../constance/contance";
class Footer extends Component {
  render() {
    return (
      <footer className="main-footer">
        {APP_TITLE}<b> NHT BEARING</b> 


        <div className="float-right d-none d-sm-inline-block">
          <b>Version</b> 3.0.1
{/* Update V3 for ip ranet 
          */}
        </div>
      </footer>
    );
  }
}
export default Footer;
