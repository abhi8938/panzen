import React, {FunctionComponent} from 'react';
import './tableComponent.css';
import OrderDetailsComponent from "./OrderDetailsComponent";
import {
    employee_rating_5,
    employee_rating_4,
    employee_rating_3,
    employee_rating_2,
    employee_rating_1
} from '../../../Assets/overview';
import {top_rank_badge} from '../../../Assets/overview';
import profilePic from '../../../Assets/profile.jpg';
import {INACTIVE, OCCUPANT, ORDER_DETAILS, PAYMENT, RESERVED} from '../../../Assets/DineIn';
import {female_icon, phone_icon} from '../../../Assets/reservation';
import {add_icon} from "../../../Assets/Inventory";
import {SortDropdown} from "../../common/SortDropdown";

type reservation = {
    bookingTime: Date,
    customerName: string,
    customerContact: string,
    guests: number,
    table: { id: string, number: number }

}
type order = {
    items: Array<{ id: string, price: number, name: string, quantity: number }>,
    createdAt: Date,
    status: 'CLOSED' | 'OPEN',
    closedAt: Date
}
type Props = {
    number: number,
    currentState: 'ACTIVE' | 'INACTIVE' | 'RESERVED' | 'NEW',
    activeState?: {
        captainAssigned: { id: string, name: string, rating: number, logo: string },
        onGoingReservation: Array<{ data: reservation, id: string }>,
        onGoingOrders: Array<{ data: order, id: string }> | 'NO-ONGOING-ORDERS',
        guests: number,
        paymentStatus: 'PENDING' | 'PAID';
    },
    reservedState?: reservation,
    AddTable?: () => void
};
const TableComponent: FunctionComponent<Props> =
    ({
         number,
         currentState,
         activeState,
         reservedState,
         AddTable
     }) => {

        return (
            <div className={'tableComponent_parent'}>
                <div>
                    <text>TABLE NO - {number}</text>
                    <SortDropdown type={'DINEIN'} onSelectItem={(data) => console.log('tabdam')}/>
                </div>
                {currentState == "ACTIVE" && activeState !== undefined ?
                    <div className={'tableComponent_active'}>
                        <div>
                            <text>11.02 AM</text>
                            <div>
                                <img src={profilePic} alt={'employee pic'}/>
                                <text>Martha Stew</text>
                                <img src={employee_rating_5} alt={'employee rating'}/>
                            </div>
                            <div>
                                <img src={OCCUPANT} alt={'occupants logo'}/>
                                <text>Occupants</text>
                                <div>
                                    <text>4</text>
                                </div>
                            </div>
                            <div>
                                <img src={PAYMENT} alt={'payment logo'}/>
                                <text>Payment</text>
                                <div>
                                    <text>Pending</text>
                                </div>
                            </div>
                        </div>
                        <OrderDetailsComponent/>
                    </div>
                    : null}

                {currentState == "INACTIVE" ?
                    <div className={'tableComponent_inactive'}>
                        <div>
                            <img src={INACTIVE} alt={'Inactive'}/>
                            <text>Table Capacity - 4</text>
                        </div>
                        <div>
                            <text>Inactive</text>
                        </div>
                    </div>
                    : null}

                {currentState == "RESERVED" && reservedState !== undefined ?
                    <div className={'tableComponent_reserved'}>
                        <text>12.30 PM</text>
                        <img src={RESERVED} alt={'Reserved'}/>
                        <div>
                            <div>zx
                                <img src={female_icon} alt={'female'}/>
                                <text>Rebecca John</text>
                            </div>
                            <div>
                                <img src={phone_icon} alt={'phone'}/>
                                <text>+91-8527576449</text>
                            </div>
                        </div>
                        <div>
                            <text>Reserved</text>
                        </div>
                    </div>
                    : null}
                {currentState === 'NEW' ? <div className={'tableComponent_new'}>
                    <div>
                        <img src={add_icon} alt={'Add'}/>
                        <text>Table Capacity - 4</text>
                    </div>
                    <div onClick={() => AddTable !== undefined ? AddTable() : null}>
                        <text>Add Table</text>
                    </div>
                </div> : null}

            </div>
        );
    };

export default TableComponent;
