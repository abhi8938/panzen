import React, {FunctionComponent} from 'react';
import './editModalComponent.css';
import {close_logo} from "../../../Assets/AllItems";

type Props = {
    show: boolean,
    toggleShow: () => void
};

const EditModal: FunctionComponent<Props> =
    ({
         children,
         show,
         toggleShow
     }) => {

        const showHideClassName = 'editModal';
        return show ? (
            <div className={showHideClassName}>
                <div>
                    <div>
                        <img onClick={toggleShow} src={close_logo} alt={'close'}/>
                        {children}
                    </div>
                </div>
            </div>
        ) : null;
    };

export default EditModal;
