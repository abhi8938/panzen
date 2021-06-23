import React, {Component, SyntheticEvent} from "react";
import logo from "../../Assets/login/LOGO.png";
import uk_logo from "../../Assets/login/UK_LOGO.svg";
import twitter from "../../Assets/login/TWITTER.svg";
import insta from "../../Assets/login/Instagram.svg";
import facebook from "../../Assets/login/facebook.svg";
import Switch from "react-switch";
import "./login.css";
import {CustomTextInput} from "../common/CustomTextInput";
import {CustomButton} from "./CustomButton";
import {DropDown, selectedType} from "../common/DropDown";
import * as ROUTES from '../../constants/routes';
import LoginService from "./services";
import Nanobar from "../common/Nanobar";

const service = new LoginService();

type SwitchProps = {
    checked: boolean;
    handleChange: () => void;
};

const RememberMe = ({checked, handleChange}: SwitchProps) => {
    return (
        <div className="remember-container">
            <text className="remember-text">Remember me</text>
            <Switch
                onChange={handleChange}
                checked={checked}
                handleDiameter={20}
                uncheckedIcon={false}
                checkedIcon={false}
                height={30}
                width={50}
                onColor="#000"
            />
        </div>
    );
};

type LeftSectionProps = {
    handleModalShow: () => void;
    navigation?: any,
};

class LeftSection extends Component<LeftSectionProps> {
    state = {
        email: "john@panzen.me",
        password: "********",
        remember: false,
        loginError: false,
        selected: {
            id: "0",
            name: "English",
            key: "location",
            logo: uk_logo
        },
        loading:false
    };

    componentDidMount(): void {
        if (localStorage.getItem('REMEMBER') !== null) {
            return this.props.navigation.history.replace(ROUTES.OVERVIEW);
        }
        return
    }

    handleChange = (name: string) => (event: any) => {
        this.setState({loginError: false});
        this.setState({[name]: event.target.value});
    };

    toggleSelect = (selected: selectedType) => {
        this.setState({selected: selected});
    };

    loginUser = async () => {
        if (this.state.email === 'john@panzen.me' || this.state.email === '') {
            alert('email is empty');
            this.setState({loginError: true});
            return
        }
        if (this.state.password === "********" || this.state.password === '') {
            alert('password is empty');
            this.setState({loginError: true});
            return
        }
        this.setState({loading:!this.state.loading});
        const result = await service.loginUser(this.state.email, this.state.password);
        this.setState({loading:!this.state.loading});
        if (result.status === 200) {
            if (this.state.remember) {
                localStorage.setItem('TOKEN', result.data);
                localStorage.setItem('REMEMBER', 'true');
                console.log('result-login:', result, localStorage.getItem('TOKEN'));
            } else {
                localStorage.setItem('TOKEN', result.data);
                console.log('result-login_temp:', result, localStorage.getItem('TOKEN'));
            }
            this.props.navigation.history.replace(ROUTES.OVERVIEW);
        } else {
            alert(result.data);
        }

    };

    render() {
        let buttonStyle = this.state.loginError
            ? "login-button login-error"
            : "login-button";
        return (
            <div className="left-section">
                <Nanobar loading={this.state.loading}/>
                <div className="section-1">
                    <img src={logo} className="App-logo"/>
                    <DropDown
                        selected={this.state.selected}
                        onSelectItem={this.toggleSelect}
                    />
                </div>
                <div className="section-2">
                    <CustomTextInput
                        onblur={() => {
                            if (this.state.email === "" || this.state.email === " ") {
                                this.setState({email: "john@panzen.me"});
                            }
                            return;
                        }}
                        onfocus={() => this.setState({email: ""})}
                        spanStyle="text-span"
                        style="text-container"
                        titleStyle="text-title"
                        inputStyle="text-input"
                        type="email"
                        title="ADMIN"
                        value={this.state.email}
                        onChange={this.handleChange("email")}
                    />
                    <CustomTextInput
                        onfocus={() => this.setState({password: ""})}
                        onblur={() => {
                            if (this.state.password === "" || this.state.password === " ") {
                                this.setState({password: "********"});
                            }
                            return;
                        }}
                        spanStyle="text-span"
                        style="text-container"
                        titleStyle="text-title"
                        inputStyle="text-input"
                        type="password"
                        title="PASSWORD"
                        value={this.state.password}
                        onChange={this.handleChange("password")}
                    />
                    <RememberMe
                        checked={this.state.remember}
                        handleChange={() =>
                            this.setState({remember: !this.state.remember})
                        }
                    />
                    <CustomButton
                        style={buttonStyle}
                        title="Login"
                        onclick={() => this.loginUser()}
                    />
                    <div className="forgot-container">
                        <text onClick={this.props.handleModalShow} className="forgot-text">
                            Forgot Password?
                        </text>
                    </div>
                </div>
                <div className="section-3">
                    <img src={facebook} className="social-icon" alt={'facebook'}
                         onClick={() => console.log('facebook navigate')}/>
                    <img src={insta} className="social-icon" alt={'insta'}
                         onClick={() => console.log('Instagram navigate')}/>
                    <img src={twitter} className="social-icon" alt={'twitter'}
                         onClick={() => console.log('twitter navigate')}/>
                </div>
            </div>
        );
    }
}

export default LeftSection;
