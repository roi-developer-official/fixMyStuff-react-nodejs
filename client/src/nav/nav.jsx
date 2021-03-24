import React from "react";
import "./nav.css";
import { withRouter } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import MobileNav from "./mobile/MobileNav";
import DesktopNav from "./desktop/DesktopNav";
class Nav extends React.Component {
  static contextType = AuthContext;

  constructor(props) {
    super();
    this.state = {
      pathname: this.formatPath(props.location.pathname),
    };
    this.navItems = [
      { name: "Find jobs" },
      { name: "My page" },
      { name: "FAQ" },
      { name: "Contact us" },
    ];
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.pathname !== this.props.location.pathname)
      this.setState({
        ...this.state,
        pathname: this.formatPath(this.props.location.pathname),
      });
  }

  formatPath(path) {
    return path.substring(1).replace("-", " ");
  }

  render() {
    const isAuth = this.context.isAuth();
    return (
      <React.Fragment>
        {this.props.location.pathname.toLowerCase() !== "/my-page" && (
          <h2 className="path">{this.state.pathname}</h2>
        )}

        <DesktopNav
          userInfo={this.context.getUserInfo()}
          navItems={this.navItems}
          isAuth={isAuth}
        ></DesktopNav>

        <MobileNav navItems={this.navItems} isAuth={isAuth}></MobileNav>
      </React.Fragment>
    );
  }
}

export default withRouter(Nav);
