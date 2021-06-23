import React, {FunctionComponent} from 'react';
import close from "../../../Assets/login/CLOSE.svg";
import './alertbox.css'
import success_icon from '../../../Assets/success_alert.jpeg';
import fail_icon from '../../../Assets/fail_alert.jpeg';

type Props = {
    message: string,
    success: boolean,
    title?: string,
    handleClose: () => void;
    show: boolean;

};

export type alertProps = {
    showAlert: boolean,
    message: string,
    title?: string,
    success: boolean,
}

const AlertBox: FunctionComponent<Props> =
    ({
         success,
         message,
         title = success ? 'Action Completed' : 'Action Failed',
         handleClose,
         show
     }) => {

        const showHideClassName = show
            ? "alertBox display-block"
            : "alertBox display-none";

        return <div className={showHideClassName}>
            <div>
                <img
                    src={success ? success_icon : fail_icon}
                    // className={success ? 'green' : 'orange'}
                />
                <text>{title}</text>
                <text>{message}</text>
                <text
                    onClick={() => handleClose()}
                    className={success ? 'Done' : 'Close'}
                >{success ? 'Done' : 'Close'}</text>
            </div>
        </div>;
    };

export default AlertBox;
