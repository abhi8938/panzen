import React, { Component } from 'react';
import nav from "../../Assets/login/HANDBURGER.svg";
import illustration from "../../Assets/login/ILLUSTRATION.svg";

type RightSectionProps ={
  handleModalShow:() => void;
}
class RightSection extends Component<RightSectionProps> {

  render() {
    return (
      <div className="right-section">
        <div className="nav-container">
          <img onClick={this.props.handleModalShow} src={nav} className="nav-icon" />
        </div>
          <img src={illustration} className="illustration" />
      </div>
    );
  }

}

export default RightSection;
