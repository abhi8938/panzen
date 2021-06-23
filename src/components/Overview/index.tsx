import React, {Component} from 'react';
import './overview.css';
import TotalComponent from "./TotalComponent";
import SalesComponent from "./SalesComponent";
import TopSellingComponent from "./TopSellingComponent";
import SalesRevenueComponent from "./SalesRevenueComponent";
import OrderDetailsComponent from "./OrderDetailsComponent";
import ProductRatingComponent from "./ProductRatingComponent";
import EmployeeRatingComponent from "./EmployeeRatingComponent";
import CustomerRatingComponent from "./CustomerFeedbackComponent";
import { total_orders,total_sales, online_orders, diner} from '../../Assets/overview';
import {Dropdown2, selectedType} from "./common/Dropdown2";
import {SortDropdown} from "../common/SortDropdown";

class OverView extends Component {
    render() {
        return (
            <div className={'overview_parent'}>
                <div className={'overview_first_child'}>
                <text className={'main_heading'}>Smart Overview</text>
                <SortDropdown type={'ANALYTICS'} onSelectItem={(data) => console.log('tabdam')}/>
                </div>
                <div className={'overview_second_child'}>
                <TotalComponent title={'Total Orders'} data={'2,689'} icon={total_orders}/>
                <TotalComponent title={'Total Sales'} data={'$ 135,660'} icon={total_sales}/>
                <TotalComponent title={'Online Orders'} data={'1250'} icon={online_orders}/>
                <TotalComponent title={'Diners'} data={'2,530'} icon={diner}/>
                </div>
                <SalesComponent/>
                <div className={'overview_fourth_child'}>
                    <TopSellingComponent/>
                    <SalesRevenueComponent/>
                </div>
                <OrderDetailsComponent/>
                <div className={'overview_sixth_child'}>
                    <ProductRatingComponent/>
                    <EmployeeRatingComponent/>
                </div>
                <CustomerRatingComponent/>
            </div>
        );
    }
}

export default OverView;