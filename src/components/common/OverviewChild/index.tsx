import React, {FunctionComponent} from 'react';
import './overviewChild.css';
import {total_orders, total_sales} from '../../../Assets/overview';

const randomColors = ['#23b899', '#8978ff', '#d5698a', '#387dff', '#6dd230', '#fe7c4b'];
type Props = {
    id: number,
    totalData: string,
    month: string,
    trend: string,
    previousMonth: string,
    logo: any
};

const OverviewChild: FunctionComponent<Props> =
    ({
         id,
         totalData,
         month,
         trend,
         previousMonth,
         logo

     }) => {
        const colorSelected = randomColors[id];

        return <div className={'overview-child'}
        >
            <div>
                <div>
                    <text>Total Customers</text>
                    <text>
                        {month}
                        <span style={{color: colorSelected}}>{totalData}</span>
                    </text>
                </div>
                <img src={logo}/>
            </div>
            <div>
                <div>
                    <text>Month Trend</text>
                    <text style={{color: '#ff5f58'}}>{trend}</text>
                </div>
                <div>
                    <text>September</text>
                    <text style={{color: '#6dd230'}}>{previousMonth}</text>
                </div>
            </div>
        </div>;
    };

export default OverviewChild;
