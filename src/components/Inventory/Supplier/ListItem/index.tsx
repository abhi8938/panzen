import React, {FunctionComponent, useState} from 'react';
import ItemFrame from "../../../common/frames/ItemFrame";
import LogoComponent from "../../../common/LogoComponent";
import {male_icon, phone_icon} from "../../../../Assets/reservation";
import {accounts_icon, edit_icon, inventoryItems_icon, mail_icon, quotation_icon} from "../../../../Assets/Inventory";
import './supplierListItem.css'
import {faAngleDown} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

type Props = {
    rotateIcon?: number;
};

const ListItem: FunctionComponent<Props> =
    ({
         rotateIcon = 0,
     }) => {
        const [rotate, toggleRotate] = useState(rotateIcon);
        const style = rotate == 180 ? 'supplierListItem_expanded' : '';

        return <div className={'supplierListItem ' + style}>
            <ItemFrame color={'#4b6cfb'} height={'100%'} width={'1.2%'}>
                <div>
                    <div>
                        <LogoComponent
                            type={'CURRENCY'}
                            logo={male_icon}
                            size={'SMALL'}
                            height={'40%'}
                            single={'Nicholas Brooks'}/>
                        <LogoComponent
                            type={'CURRENCY'}
                            logo={phone_icon}
                            size={'SMALL'}
                            height={'40%'}
                            single={'01632 960721'}/>
                        <LogoComponent
                            type={'CURRENCY'}
                            logo={mail_icon}
                            size={'SMALL'}
                            height={'40%'}
                            single={'Nicholasb56@gmail.com'}/>
                        <LogoComponent
                            type={'CURRENCY'}
                            logo={inventoryItems_icon}
                            size={'SMALL'}
                            height={'40%'}
                            single={'Items'}/>
                        <LogoComponent
                            type={'CURRENCY'}
                            logo={accounts_icon}
                            size={'SMALL'}
                            height={'40%'}
                            single={'Method: Banking'}/>
                        <FontAwesomeIcon
                            onClick={() => toggleRotate(rotate === 0 ? 180 : 0)}
                            className={'toggle'}
                            icon={faAngleDown}
                            transform={{rotate: rotate}}
                            color={'#202a38'}
                            size={'2x'}
                        />
                    </div>
                    {rotate === 0 ? <div/>
                        : <div className={'expand_details'}>
                            <div>
                                <img src={edit_icon}/>
                            </div>
                            <div>
                                <text>Bintang</text>
                                <text>Corona extra</text>
                                <text>Ginger Beer</text>
                                <text>Jack daniels</text>
                                <text>Alpaca</text>
                            </div>
                            <div>
                                <text>Name : Ltd Beverages pvt ltd</text>
                                <text>Bank Name : Relo Indus Bank</text>
                                <text>Acc No : 011401533</text>
                                <text>IFSC No : RIB0011513</text>
                                <text>GST No : 07AAECR2971C1Z</text>
                            </div>
                        </div>}
                </div>
            </ItemFrame>
        </div>
    };

export default ListItem;
