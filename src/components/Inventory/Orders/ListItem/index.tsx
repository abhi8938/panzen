import React, {FunctionComponent, useState} from 'react';
import ItemFrame from "../../../common/frames/ItemFrame";
import LogoComponent from "../../../common/LogoComponent";
import {calender_icon, clock_icon, male_icon, phone_icon} from "../../../../Assets/reservation";
import {
    accounts_icon,
    inventoryItems_icon,
    mail_icon,
    quotation_icon,
    supplier_icon,
} from "../../../../Assets/Inventory";
import './listItem.css'
import {ITEM_LOGO, truck_logo} from "../../../../Assets/OnlineOrder";
import {euro_icon} from "../../../../Assets/Currency";
import {CustomButton} from "../../../Login/CustomButton";

type Props = {};

const ListItem: FunctionComponent<Props> =
    ({}) => {

        return <div className={'orderListItem'}>
            <ItemFrame color={'#4b6cfb'} height={'100%'} width={'2%'}>
                <div>
                    <LogoComponent
                        type={'CURRENCY'}
                        logo={supplier_icon}
                        size={'BIG'}
                        height={'40%'}
                        single={`Nicholas Brooks 8527576449`}/>
                    <div>
                        <LogoComponent
                            type={'CURRENCY'}
                            logo={calender_icon}
                            size={'SMALL'}
                            height={'100%'}
                            single={'12/02/2020'}/>
                        <LogoComponent
                            type={'CURRENCY'}
                            logo={clock_icon}
                            size={'SMALL'}
                            height={'100%'}
                            single={'10:00 PM'}/>
                    </div>
                    <LogoComponent
                        height={`100%`}
                        type={'LISTOFITEMS'}
                        logo={inventoryItems_icon}
                        size={'SMALL'}
                        list={[{id: '', name: 'tomato', quantity: '4'}, {id: '', name: 'corn', quantity: '5'}]}>{}
                    </LogoComponent>
                    <LogoComponent
                        type={'CURRENCY'}
                        logo={euro_icon}
                        size={'SMALL'}
                        height={'40%'}
                        single={'1340.00'}/>
                    <LogoComponent
                        type={'CURRENCY'}
                        logo={truck_logo}
                        size={'SMALL'}
                        height={'40%'}
                        single={'Order Delivered'}/>
                    <div>
                        <CustomButton title={'Done'} style={'done_button'} onclick={() => console.log('clicked')}/>
                        <div>
                            <img src={quotation_icon}/>
                            <text>Invoice</text>
                        </div>
                    </div>
                </div>
            </ItemFrame>
        </div>
    };

export default ListItem;
