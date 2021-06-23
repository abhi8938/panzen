import React, {FunctionComponent, useState} from 'react';
import ItemFrame from "../../../common/frames/ItemFrame";
import LogoComponent from "../../../common/LogoComponent";
import {calender_icon, female_icon, male_icon, phone_icon} from "../../../../Assets/reservation";
import {
    accounts_icon,
    fridge_icon,
    inventoryItems_icon,
    mail_icon,
    mop_icon,
    quotation_icon
} from "../../../../Assets/Inventory";
import './storageAreaListItem.css'
import {faAngleDown} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {CustomButton} from "../../../Login/CustomButton";
import {trash_image} from "../../../../Assets/AllItems";
import DropDownTextInput from "../../../Reservation/DropDownTextInput";
import EntryFieldContainer from "../../../common/EntryFieldContainer";

type Props = {
    rotateIcon?: number;
    employeeIncharge?: string;
    cleaned?: boolean
};

const ListItem: FunctionComponent<Props> =
    ({
         rotateIcon = 0,
         employeeIncharge = 'Employee in charge', cleaned = false
     }) => {
        const [rotate, toggleRotate] = useState(rotateIcon);
        const [employee, setEmployee] = useState(employeeIncharge);
        const [toggle, setToggle] = useState(cleaned);
        const style = rotate == 180 ? 'storageAreaListItem_expanded' : '';

        return <div className={'storageAreaListItem ' + style}>
            <ItemFrame color={'#4b6cfb'} height={'100%'} width={'2%'}>
                <div>
                    <div>
                        <LogoComponent
                            type={'CURRENCY'}
                            logo={fridge_icon}
                            size={'SMALL'}
                            height={'100%'}
                            single={'Back Refrigerator'}/>
                        <LogoComponent
                            type={'CURRENCY'}
                            logo={mop_icon}
                            size={'SMALL'}
                            height={'100%'}
                            single={'30 days'}/>
                        <LogoComponent
                            type={'CURRENCY'}
                            logo={calender_icon}
                            size={'SMALL'}
                            height={'100%'}
                            single={'12/02/2020'}/>
                        <LogoComponent
                            type={'CURRENCY'}
                            logo={female_icon}
                            size={'SMALL'}
                            height={'100%'}
                            single={'Ms. Maria Alex'}/>
                        <div>
                            <CustomButton title={'Shining'} style={'button'} onclick={() => console.log('clicked')}/>
                            <text>2 days</text>
                        </div>
                        <FontAwesomeIcon
                            onClick={() => toggleRotate(rotate === 0 ? 180 : 0)}
                            className={'toggle'}
                            icon={faAngleDown}
                            transform={{rotate: rotate}}
                            color={'#202a38'}
                            size={'1x'}
                        />
                    </div>
                    {rotate === 0 ? <div/>
                        : <div className={'expand_details_storage'}>
                            <div>
                                <div>
                                    <DropDownTextInput
                                        type={'Text'}
                                        dropDown={false}
                                        icon={female_icon}
                                        value={employee}
                                        onChange={(event => setEmployee(event.target.value))}
                                        style={'employee_style'}
                                        inputStyle={'employee_input_style'}
                                    />
                                    <div>
                                        <Toggle toggle={toggle} label={'Cleaned'}
                                                onToggle={(toggle => setToggle(toggle))}/>
                                    </div>
                                </div>
                                <CustomButton title={'Update'} style={'button_update'}
                                              onclick={() => console.log('clicked')}/>
                            </div>
                            <div>
                                <img src={trash_image} alt={'delete'}/>
                                <CustomButton title={'Delete Storage'} style={'button_delete'}
                                              onclick={() => console.log('clicked')}/>
                            </div>
                        </div>}
                </div>
            </ItemFrame>
        </div>
    };

export default ListItem;

type toggleProps = {
    toggle: boolean,
    label: string,
    onToggle: (toggle: boolean) => void
};
const Toggle: FunctionComponent<toggleProps> =
    ({
         toggle,
         label,
         onToggle
     }) => {
        const selectedStyle = toggle ? 'toggle toggle_On' : 'toggle';
        return (
            <div onClick={() => onToggle(!toggle)}>
                <div className={selectedStyle}/>
                <text>{label}</text>
            </div>
        )
    };
