import React, { Component } from "react";
import { key, server } from "../../constance/contance";

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      UserDisplay: "block",
      AdminDisplay: "block",
    };
  }

  async componentDidMount() {
    let myCase = localStorage.getItem(key.USER_LV);

    if (myCase == "Admin") {
      this.setState({ UserDisplay: "block" });
      this.setState({ AdminDisplay: "block" });
      this.setState({ GuestDisplay: "block" });
    } else if (myCase == "User") {
      this.setState({ UserDisplay: "block" });
      this.setState({ AdminDisplay: "none" });
      this.setState({ GuestDisplay: "block" });
    } else if (myCase == "Guest") {
      this.setState({ UserDisplay: "none" });
      this.setState({ AdminDisplay: "none" });
      this.setState({ GuestDisplay: "block" });
    }
  }
  render() {
    const mystyle = {
      displal: "none",
    };
    return (
      <nav className="main-header navbar navbar-expand navbar-white navbar-light" style={{padding:5}}>
        
        <ul className="navbar-nav" >
        <li className="nav-item">
            <a
              className="nav-link"
              data-widget="pushmenu"
              href="#"
              role="button"
            >
              <i className="fas fa-bars" />
            </a>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <a href="/mms_mbrmd_full" className="nav-link">
              <h6><b>NHT Machine Monitoring</b></h6>
            </a>
          </li>
          {/* <li
            className="nav-item dropdown"
            style={{ display: this.state.GuestDisplay }}
          >
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Account
            </a>

            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <a className="dropdown-item" href="/changepassword">
                Change Password
              </a>
              <div className="dropdown-divider"></div>
              <a className="dropdown-item" href="/register">
                Registration
              </a>
            </div>
          </li>
          <li
            className="nav-item dropdown"
            style={{ display: this.state.UserDisplay }}
          >
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Locker
            </a>

            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <a className="dropdown-item" href="/registlocker">
                Locker Registeration
              </a>
              <div className="dropdown-divider"></div>
              <a className="dropdown-item" href="/lockerdisable">
                Locker Disable
              </a>
            </div>
          </li>

          <li className="nav-item d-none d-sm-inline-block">
            <a href="/alertlocker" className="nav-link">
              Alert
            </a>
          </li>
          <li
            className="nav-item dropdown"
            style={{ display: this.state.AdminDisplay }}
          >
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Administrator Tools
            </a>

            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <li className="dropdown-submenu dropdown-hover">
                <a
                  id="dropdownSubMenu2"
                  href="#"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  className="dropdown-item dropdown-toggle"
                >
                  User Management
                </a>
                <ul
                  aria-labelledby="dropdownSubMenu2"
                  className="dropdown-menu border-0 shadow"
                >
                  <li>
                    <a tabIndex={-1} href="/listuser" className="dropdown-item">
                      List User
                    </a>
                  </li>
        
                </ul>
              </li>
            </div>
          </li> */}
        </ul>

        {/* <div className="input-group-append"></div>
        <ul className="navbar-nav ml-auto">
          Hello {localStorage.getItem(key.USER_EMP)} &nbsp;
        </ul>
        <div className="float-right d-none d-sm-inline-block">
          <button
            className="btn btn-block btn-danger btn-sm"
            type="button"
            onClick={(e) => {
              e.preventDefault();
              localStorage.removeItem(key.LOGIN_PASSED);
              localStorage.removeItem(key.USER_LV);
              localStorage.removeItem(key.USER_NAME);
              localStorage.removeItem(key.USER_EMP);
              localStorage.removeItem(key.TIME_LOGIN);

              window.location.replace("../login");
            }}
          >
            Log Out
          </button>
        </div> */}
      </nav>
    );
  }
}

export default Header;
