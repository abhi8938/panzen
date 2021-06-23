import React, {FunctionComponent, useEffect, useState} from 'react';
import './orderDetails.css'
import {VictoryAxis, VictoryChart, VictoryBar} from "victory";
import {Dropdown2} from "../common/Dropdown2";
import Loader from "./Loader";

type Props = {
    selected?: string,
    selectedYear?: {
        id: number,
        name: string
    },
    loading?: boolean
};
type toggleProps = {
    selected: string,
    label: string,
    onToggle: (label: string) => void
};

const dataChart = [
    {orders: 1000, month: 'January'},
    {orders: 700, month: 'February'},
    {orders: 850, month: 'March'},
    {orders: 920, month: 'April'},
    {orders: 930, month: 'May'},
    {orders: 800, month: 'June'},
    {orders: 1199, month: 'July'},
    {orders: 114, month: 'August'},
    {orders: 723, month: 'September'},
    {orders: 843, month: 'October'},
    {orders: 456, month: 'November'},
    {orders: 1156, month: 'December'}

];
const Toggle: FunctionComponent<toggleProps> =
    ({
         selected,
         label,
         onToggle
     }) => {
        const selectedStyle = selected === label ? 'order_details_toggleButton_switch order_details_toggleButton_switch_on' : 'order_details_toggleButton_switch';
        return (
            <div className={'order_details_toggleButton_parent'} onClick={() => onToggle(label)}>
                <div className={selectedStyle}/>
                <text className={'order_details_toggleButton_label'}>{label}</text>
            </div>
        )
    };
const OrderDetailsComponent: FunctionComponent<Props> =
    ({
         selected = 'All',
         selectedYear = {
             id: 5,
             name: '2020'
         },
         loading = true
     }) => {
        const [toggle, handleToggle] = useState(selected);
        const [year, handleYear] = useState(selectedYear);
        const [loader, setLoading] = useState(loading);
        useEffect(() => {
            setTimeout(() => {
                setLoading(false)
            }, 5000)
        },[]);
return (
    <div className={'order_details_parent'}>
        <div className={'order_details_first_child'}>
            <text className={'section_heading'}>Order Details</text>
        </div>
        {loader ?<div className={'order_details_loader'}> <Loader howManyColumns={7}/></div> :
            <VictoryChart
                domainPadding={50}
                width={1100}
                height={400}
            >
                <VictoryAxis
                    tickValues={['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']}
                    tickFormat={["Jan", "Feb", "Mar", "Apr", 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']}
                    style={styles.axisStyley}
                />
                <VictoryAxis
                    dependentAxis
                    tickFormat={['0', '200', '400', '600', '800', '1000', '1200']}
                    tickValues={[0, 200, 400, 600, 800, 1000, 1200]}
                    style={styles.axisStylex}
                />
                <VictoryBar
                    style={{data: {fill: "#f16548", width: 18}}}
                    data={dataChart}
                    x={'month'}
                    y={'orders'}
                />
            </VictoryChart>}
        <div className={'order_details_third_child'}>
            <Toggle selected={toggle} label={'All'} onToggle={(label => handleToggle(label))}/>
            <Toggle selected={toggle} label={'Dine In'} onToggle={(label => handleToggle(label))}/>
            <Toggle selected={toggle} label={'Online'} onToggle={(label => handleToggle(label))}/>
        </div>
    </div>
);
};

export default OrderDetailsComponent;

const styles = {
    axisStylex: {
        axis: {stroke: "transparent"},
        tickLabels: {
            fontSize: 13,
            padding: 20,
            fill: 'white',
            fontFamily: 'CircularStd',
            fontWeight: 500,
            lineHeight: 0.75
        }
    },
    axisStyley: {
        axis: {stroke: "transparent"},
        tickLabels: {
            fontSize: 13,
            padding: 22,
            fill: 'white',
            fontFamily: 'CircularStd',
            fontWeight: 500,
            lineHeight: 0.75
        }
    }
};