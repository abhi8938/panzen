import React, {FunctionComponent, useState} from 'react';
import ItemFrame from "../../../common/frames/ItemFrame";
import LogoComponent from "../../../common/LogoComponent";
import {calender_icon, female_icon, male_icon, phone_icon} from "../../../../Assets/reservation";
import {
    add_icon,
    fridge_icon, inventoryItems_icon,
    mop_icon,
} from "../../../../Assets/Inventory";
import './menuItemsListItem.css'
import {euro_icon} from "../../../../Assets/Currency";

type Props = {};

const ListItem: FunctionComponent<Props> =
    ({}) => {

        return <div className={'menuItemListItem '}>
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
                    <div>
                        <text>Ingredients are not added</text>
                        <LogoComponent
                            type={'CURRENCY'}
                            logo={add_icon}
                            size={'SMALL'}
                            height={'100%'}
                            single={'Add / Remove Ingredients'}/>
                    </div>
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