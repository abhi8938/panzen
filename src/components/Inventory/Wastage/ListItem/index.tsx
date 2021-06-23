import React, {FunctionComponent, useState} from 'react';
import ItemFrame from "../../../common/frames/ItemFrame";
import LogoComponent from "../../../common/LogoComponent";
import {calender_icon, clock_icon, female_icon, male_icon, phone_icon} from "../../../../Assets/reservation";
import {
    fridge_icon, inventoryItems_icon, measurement_icon,
    mop_icon, price_icon, shelfLife_icon,
} from "../../../../Assets/Inventory";
import './wastageListItem.css'
import {rupee_logo_w} from "../../../../Assets/OnlineOrder";
import {rupee_image} from "../../../../Assets/AllItems";
import {britishPound_icon} from "../../../../Assets/Currency";

type Props = {};

const ListItem: FunctionComponent<Props> =
    ({}) => {

        return <div className={'wastageListItem'}>
            <ItemFrame color={'#4b6cfb'} height={'100%'} width={'2%'}>
                <div>
                    <LogoComponent
                        type={'CURRENCY'}
                        logo={inventoryItems_icon}
                        size={'SMALL'}
                        height={'100%'}
                        single={'Chicken'}/>
                    <LogoComponent
                        type={'CURRENCY'}
                        logo={measurement_icon}
                        size={'SMALL'}
                        height={'100%'}
                        single={'30 days'}/>
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
                        type={'CURRENCY'}
                        logo={shelfLife_icon}
                        size={'SMALL'}
                        height={'100%'}
                        single={'Shelf Life'}/>
                    <LogoComponent
                        type={'CURRENCY'}
                        logo={female_icon}
                        size={'SMALL'}
                        height={'100%'}
                        single={'Ms. Maria Alex'}/>
                    <LogoComponent
                        type={'CURRENCY'}
                        logo={britishPound_icon}
                        size={'SMALL'}
                        height={'100%'}
                        single={'120'}/>
                </div>
            </ItemFrame>
        </div>
    };

export default ListItem;