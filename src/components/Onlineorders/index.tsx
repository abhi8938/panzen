import React, {FunctionComponent, useEffect, useState} from 'react';
import TopTabBar from "../common/TopTabBar";
import './onlineOrder.css';
import {OnlineOrdersTabBars as toplist, onlineOrderlistFrame as listframeList} from '../../constants/data';
import OnlineOrderListItem from "./OnlineOrderListItem";
import ListFrame from "../common/frames/ListFrame";
import DropDownTextInput from "../Reservation/DropDownTextInput";
import {calender_icon} from "../../Assets/reservation";
import OnlineOrderService from './services';
import Loader from "../Reservation/ListItem/Loader";

const service = new OnlineOrderService();
type onlineorder = {
    branchID: string,
    customer: {
        contactNumber: string,
        name: string
    },
    status: 'ACTIVE' | 'CANCELLED' | 'CLOSED',
    value: number,
    time: Date,
    items: Array<{ id: string, name: string, quantity: number }>
}
type Props = {
    tab: string,
    date: Date | null,
    loading: boolean,
    list: Array<{ data: onlineorder, id: string }>
};


const OnlineOrders: FunctionComponent<Props> =
    ({
         tab = 'Active',
         date = new Date(),
         list = [],
         loading = false
     }) => {
        const [selectedTab, toggleTab] = useState(tab);
        const [filterDate, setFilterDate] = useState(date);
        const [load, toggleLoad] = useState(loading);
        const [orders, setOrders] = useState(list);

        const fetchOrders = async () => {
            toggleLoad(true);
            const response = await service.getOnlineOrders('IEFDIKzIJHVmQJ6yHhuw', filterDate !== null ? filterDate : new Date(), selectedTab.toUpperCase());
            toggleLoad(false);
            if (response.status == 200) {
                setOrders(response.data);
            } else {
                alert(response.data);
            }
        };
        const cancel = async (
            onlineOrderID: string,
            status: string,
        ) => {
            const response = await service.cancel(onlineOrderID, status);
            if (response.status === 200) {
                fetchOrders()
            } else {
                return alert(response.data);
            }
        };

        useEffect(() => {
            fetchOrders()
        }, [filterDate, selectedTab]);

        return (
            <div className={'online_orders'}>
                <text className={'main_heading'}>Online Orders</text>
                <div>
                    <div>
                        <TopTabBar
                            list={toplist}
                            selectedTab={selectedTab}
                            onToggle={(selected: string) => {
                                toggleTab(selected)
                            }}/>
                        <DropDownTextInput
                            arrowColor={'#000'}
                            dropDown={true} type={'Date'}
                            calendarstyle={'reservation_calendar_date_style '} icon={calender_icon}
                            style={'reservation_calendar_style online_order_style'}
                            date={filterDate} setDate={(date) => setFilterDate(date)}
                        />
                    </div>
                    <ListFrame style={'onlineOrderListFrame'} list={listframeList}/>
                    {load ?
                        <div>
                            <Loader logo={true}/>
                            <Loader logo={true}/>
                            <Loader logo={true}/>
                            <Loader logo={true}/>
                            <Loader logo={true}/>

                        </div>
                        : orders.length === 0 ?
                            <div className={'no_data_div'}>
                                <text>No Online Orders</text>
                            </div> : orders.map(el => {
                                return (
                                    <OnlineOrderListItem
                                        details={el.data.customer}
                                        time={el.data.time}
                                        value={el.data.value}
                                        items={el.data.items}
                                        status={`${el.data.status} Orders`}
                                        cancel={() => cancel(el.id,'CANCELLED')}
                                    />)
                            })}

                </div>
            </div>
        );
    };

export default OnlineOrders;
