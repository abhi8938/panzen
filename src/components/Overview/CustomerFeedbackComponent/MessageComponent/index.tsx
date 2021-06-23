import React, {FunctionComponent, useEffect, useState} from 'react';
import './messageComponent.css'
import {
    customer_feedback_1,
    customer_feedback_2,
    customer_feedback_3,
    customer_feedback_4,
    customer_feedback_5,
    customer_feedback_6,
    customer_feedback_7,
    customer_feedback_8,
    customer_feedback_9,
    customer_feedback_10,
    customer_feedback_11,
    customer_feedback_12,
    customer_feedback_13,
    customer_feedback_14,
    customer_feedback_15,
    customer_feedback_16,
    customer_feedback_17,
    customer_feedback_18,
    customer_feedback_19,
    customer_feedback_20,
    customer_feedback_21,
    customer_feedback_22,
    customer_feedback_23,
    customer_feedback_24,
    customer_feedback_25
} from '../../../../Assets/overview'

const BGcolors = ['#482e87', '#2e877f', '#227fbb', '#ff9500', '#2ab5ca'];
const IconArray = [customer_feedback_1, customer_feedback_2, customer_feedback_6, customer_feedback_7, customer_feedback_8, customer_feedback_9, customer_feedback_10, customer_feedback_11, customer_feedback_12, customer_feedback_13, customer_feedback_14, customer_feedback_15, customer_feedback_16, customer_feedback_17, customer_feedback_18, customer_feedback_19, customer_feedback_20, customer_feedback_21, customer_feedback_22, customer_feedback_23, customer_feedback_24, customer_feedback_25];
type messageProps = {
    message: string,
    time: string,
    saved: boolean,
    id: number,
    reverse:boolean,
    toggleFavorite:(id:number) => void
};

const Message: FunctionComponent<messageProps> =
    ({
         message,
         time,
         saved,
         id,
        reverse,
        toggleFavorite
     }) => {
        const randomIcon = IconArray[Math.floor(Math.random() * 21) + 1];
        const messageBackground = BGcolors[Math.floor(Math.random() * 4) + 1];
        const savedIcon = saved ? customer_feedback_5 : customer_feedback_3;
        return (
            <div className={'message_component_parent'}>
                <img src={randomIcon} className={'message_component_random_icon'} alt={'randomIcon'}/>
                <div className={'message_component_second_child'} style={{backgroundColor: messageBackground}}>
                    <text className={'message_component_message_text'}>{message}</text>
                    <div className={'message_component_second_child_bottom'}>
                        <div className={'message_component_second_child_bottom_left'}>
                            <img src={savedIcon} className={'message_component_saved_icon'} alt={'saved'} onClick={() => toggleFavorite(id)}/>
                            <img src={customer_feedback_4} className={'message_component_second_icon'} alt={'second'}/>
                        </div>
                        <text className={'message_component_time'}>{time}</text>
                    </div>
                </div>
            </div>
        );
    };

export default Message;
