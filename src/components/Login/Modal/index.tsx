import React, {Component} from "react";
import close from "../../../Assets/login/CLOSE.svg";
import approved from "../../../Assets/login/APPROVAL_ICON.svg";
import "./Modal.css";
import {CustomTextInput} from "../../common/CustomTextInput";
import {CustomButton} from "../CustomButton";
import {customerSupportData as customerData} from '../../../constants/data';
import LoginService from '../services';

const service = new LoginService();
type CustomModalProps = {
    type: string;
    show: boolean;
    handleClose: () => void;
    showSupport: () => void;
};

const description =
    "Enter your registered email address and you will \n receive the alloted user id and password sent.";

type ListItemProps = {
    icon: any;
    title: string;
    data: string;
};

const ListItem = ({icon, title, data}: ListItemProps) => {
    return (
        <div className="CustomerListItem">
            <img src={icon} className="customer-icons"/>
            <div className="listItem-section">
                <text className="support-title">{title}</text>
                <text className="support-data">{data}</text>
            </div>
        </div>
    );
};


class CustomModal extends Component<CustomModalProps> {
    state = {
        email: "John@panzen.me",
        error: false,
        Sent: false,
        support: false
    };
    onChange = (name: string) => (event: any) => {
        this.setState({[name]: event.target.value});
    };

    sendReset = async () => {
        if (this.state.email === 'John@panzen.me' || this.state.email === '') {
            return alert('Email Empty');
        }
        const response = await service.resetPassword(this.state.email);
        if (response.status === 200) {
            this.setState({Sent: !this.state.Sent})
        } else {
            this.setState({error: !this.state.error});
            return alert(response.data);
        }
    };

    renderSent() {
        if (this.state.Sent) {
            return (
                <div className="approve-container">
                    <img src={approved} className="approve-icon"/>
                </div>
            );
        } else {
            return (
                <div className="forgot-section-1">
                    <text className="forgot-title">Forgot Password?</text>
                    <text className="description">{description}</text>
                    <span className="forgot-span"/>
                    <CustomTextInput
                        onblur={() => {
                            if (this.state.email === "" || this.state.email === " ") {
                                this.setState({email: "John@panzen.me"});
                            }
                            return;
                        }}
                        onfocus={() => this.setState({email: ""})}
                        spanStyle="input-span"
                        style="input-forgot"
                        titleStyle="title-forgot"
                        inputStyle="forgot-input"
                        type="email"
                        title="EMAIL"
                        value={this.state.email}
                        onChange={this.onChange("email")}
                    />
                </div>
            );
        }
    }

    renderForgot() {
        let buttonStyle = this.state.error
            ? "button-style button-error"
            : "button-style";
        let buttonText = this.state.error
            ? "Email not registered with panzen"
            : "Send Password";
        let buttonTextOriginal = this.state.Sent
            ? "Password sent successfully"
            : buttonText;
        let customerText = this.state.error ? (
            <text className="customer-contact" onClick={this.props.showSupport}>
                Contact customer care?
            </text>
        ) : null;
        if (this.props.type === "FORGOT_PASSWORD") {
            return (
                <div className="forgot-section">
                    {this.renderSent()}
                    <CustomButton
                        title={buttonTextOriginal}
                        style={buttonStyle}
                        onclick={() => this.sendReset()}
                    />
                    {customerText}
                </div>
            );
        }
    }

    renderCustomerSupport() {
        if (this.props.type === "CUSTOMER_SUPPORT") {
            return (
                <div className="list-container">
                    {customerData.map(item => (
                        <ListItem key={item.id} title={item.title} icon={item.icon} data={item.data}/>
                    ))}
                </div>
            );
        }
    }

    render() {
        const showHideClassName = this.props.show
            ? "modal display-block"
            : "modal display-none";

        return (
            <div className={showHideClassName}>
                <section className="modal-main">
                    <img
                        onClick={this.props.handleClose}
                        src={close}
                        className="close-icon"
                    />
                    {this.renderForgot()}
                    {this.renderCustomerSupport()}
                </section>
            </div>
        );
    }
}

export default CustomModal;
