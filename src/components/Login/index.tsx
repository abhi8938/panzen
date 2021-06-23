import React from "react";
import "./login.css";
import LeftSection from './LeftSection';
import RightSection from './RightSection';
import Modal from './Modal';
class Login extends React.Component {
  state={
    showModal:false,
    type:'',
    confirmation:false,
  };
  handleClose(type:string){
    console.log(type);
    this.setState({ type:type, showModal:!this.state.showModal})
  }


  render() {
    return (
      <div className="login">
        <LeftSection navigation={this.props} handleModalShow={() => this.handleClose('FORGOT_PASSWORD')} />
        <RightSection handleModalShow={() => this.handleClose('CUSTOMER_SUPPORT')}/>
        <Modal showSupport={() => this.setState({type:'CUSTOMER_SUPPORT'})} type={this.state.type} show={this.state.showModal} handleClose={() => this.handleClose('CLOSE')} />
      </div>
    );
  }
}

export default Login;
