import React, {FunctionComponent, useState} from 'react';
import {ORDER_DETAILS,} from '../../../../Assets/DineIn';
import './orderDetails.css'

type Props = {
    display?: boolean;
    rotateIcon?: number;
    orders?: Array<{ orderID: string, itemName: string, quantity: number, value: number }>
};

const OrderDetailsComponent: FunctionComponent<Props> =
    ({
         display = false,
         rotateIcon = false,
         orders
     }) => {
        const [displayOrders, toggleDropDown] = useState(display);
        const [rotate, toggleRotate] = useState(rotateIcon);

        function hideDropdownMenu() {
            toggleDropDown(false);
            toggleRotate(0);
            document.removeEventListener("click", hideDropdownMenu);
        }

        function showDropdownMenu() {
            if (displayOrders === false) {
                toggleDropDown(true);
                toggleRotate(180);
                document.addEventListener("click", hideDropdownMenu);
            }
        }

        const parentStyle = displayOrders?'orderDetailsComponent_parent orderDetailsComponent_parent_expand':'orderDetailsComponent_parent';
        return (
            <div className={parentStyle}>
                <div>
                    <text>Order Details</text>
                    <img onClick={showDropdownMenu} src={ORDER_DETAILS} alt={'show expantion or contraction'}/>
                </div>
                {displayOrders ? (
                    <ul>
                        <li>BATCH 1</li>
                    </ul>
                ) : null}
            </div>
        );
    };

export default OrderDetailsComponent;
