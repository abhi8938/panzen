import React, {FunctionComponent, useState} from 'react';
import './listItem.css'
import {CustomButton} from "../../Login/CustomButton";
import {
    male_icon,
    female_icon,
    group_icon,
    phone_icon,
    reschedule_icon,
    cancel_icon,
    clock_icon
} from '../../../Assets/reservation';
import DropDownTextInput from "../DropDownTextInput";

type Props = {
    name: string,
    contact: string,
    time: Date | string | number,
    guests: number,
    reschedule?: Date | null,
    changeReschedule: (date: Date | null) => void,
    cancel:(status:string) => void
};
const BorderColors = ['#4b6cfb', '#e04bfb', '#fbf94b', '#fb4b59', '#4bfbb6', '#894bfb', '#e04bfb', '#4b6cfb'];

const ListItem: FunctionComponent<Props> =
    ({
         name,
         contact,
         time,
         guests,
         reschedule = new Date(),
         changeReschedule,
cancel
     }) => {
        const [bookingTime, setTime] = useState(reschedule);

        return (
            <div className={'reservation_listitem_parent'}>
                <div className={'reservation_listitem_child'} style={{width: '16%'}}>
                    <img src={male_icon} className={'reservation_listitem_icon'}/>
                    <text className={'reservation_listitem_text'}>{name}</text>
                </div>
                <div className={'reservation_listitem_child'} style={{width: '17%'}}>
                    <img src={phone_icon} className={'reservation_listitem_icon'}/>
                    <text className={'reservation_listitem_text'}>{contact}</text>
                </div>
                <div className={'reservation_listitem_child'} style={{width: '13%'}}>
                    <img src={clock_icon} className={'reservation_listitem_icon'}/>
                    <text className={'reservation_listitem_text'}>{time}</text>
                </div>
                <div className={'reservation_listitem_child'} style={{width: '10%'}}>
                    <img src={group_icon} className={'reservation_listitem_icon'}/>
                    <text className={'reservation_listitem_text'}>{guests}</text>
                </div>
                <div className={'reservation_listitem_child'} style={{width: '17%'}}>
                    <img src={reschedule_icon} className={'reservation_listitem_icon'}/>
                    <DropDownTextInput dropDown={true} type={'Time'} arrowColor={'#000'}
                                       calendarstyle={'reservation_listitem_reschedule_time'}
                                       style={'reservation_listitem_reschedule'}
                                       time={bookingTime} setTime={(date) => {
                        changeReschedule(date);
                        setTime(date)
                    }}
                    />
                </div>
                <div className={'reservation_listitem_child'} style={{width: '15%'}}>
                    <img src={cancel_icon} className={'reservation_listitem_icon'}/>
                    <CustomButton
                        title={'Cancel'}
                        style={'reservation_listitem_cancel_button'}
                        onclick={() => cancel('CANCELLED')}/>
                </div>
            </div>
        );
    };

export default ListItem;
