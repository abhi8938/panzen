import React, {FunctionComponent, useEffect} from 'react';
import './tab.css'
type tabProps = {
    selected: string,
    label: string,
    handleChange:(label:string) => void
};

const Tab: FunctionComponent<tabProps> =
    ({
         selected,
         label,
        handleChange
     }) => {
        const tabStyle = label === selected?'customer_feedback_tab_parent customer_feedback_tab_selected':'customer_feedback_tab_parent';
        return (
            <div className={tabStyle} onClick={() => handleChange(label)}>
                 <text className={'customer_feedback_tab_text'}>{label}</text>
            </div>
        );
    };

export default Tab;
