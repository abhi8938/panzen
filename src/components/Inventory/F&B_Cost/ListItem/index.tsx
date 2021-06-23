import React, {FunctionComponent, useState} from 'react';
import ItemFrame from "../../../common/frames/ItemFrame";
import LogoComponent from "../../../common/LogoComponent";
import './fbListItem.css';
import {calender_icon, female_icon, male_icon, phone_icon} from "../../../../Assets/reservation";
import {
    add_icon,
    fridge_icon, inventoryItems_icon,
    mop_icon,
} from "../../../../Assets/Inventory";
import './fbListItem.css'
import {euro_icon} from "../../../../Assets/Currency";

type Props = {};

const ListItem: FunctionComponent<Props> =
    ({}) => {

        return <div className={'CogsListItem '}>
            <ItemFrame color={'#4b6cfb'} height={'100%'} width={'2%'}>
                <div>
                    <LogoComponent
                        type={'CURRENCY'}
                        logo={fridge_icon}
                        size={'SMALL'}
                        height={'100%'}
                        single={'Spice It Up'}/>
                    <LogoComponent
                        type={'CURRENCY'}
                        logo={inventoryItems_icon}
                        size={'SMALL'}
                        height={'100%'}
                        single={'Appetizers'}/>
                        <LogoComponent
                            type={'CURRENCY'}
                            logo={calender_icon}
                            size={'SMALL'}
                            height={'100%'}
                            single={'24/11/2019'}/>
                    <LogoComponent
                        type={'CURRENCY'}
                        logo={euro_icon}
                        size={'SMALL'}
                        height={'100%'}
                        single={'-'}/>
                    <LogoComponent
                        type={'CURRENCY'}
                        logo={euro_icon}
                        size={'SMALL'}
                        height={'100%'}
                        single={'200.00'}/>
                    <LogoComponent
                        type={'CURRENCY'}
                        logo={euro_icon}
                        size={'SMALL'}
                        height={'100%'}
                        single={'-'}/>
                </div>
            </ItemFrame>
        </div>
    };

export default ListItem;