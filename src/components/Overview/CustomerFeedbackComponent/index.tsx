import React, {FunctionComponent, useEffect, useState} from 'react';
import './customerRating.css'
import Tab from "./Tab";
import Message from "./MessageComponent";
import Loader from "./Loader";

type Props = {
    selectedTab?: string,
    reverse?: boolean,
    messageArray?: Array<{
        id: number,
        message: string,
        time: string,
        saved: boolean
    }>,
    loading?:boolean,
    darkTheme?:string,
    columns?:number
};

let sampleMessages = [
    {
        id: 0,
        message: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.',
        time: '6.30 pm, 23 Oct 2019',
        saved: false
    },
    {
        id: 1,
        message: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.',
        time: '4.30 pm, 23 Oct 2019',
        saved: true
    },
    {
        id: 2,
        message: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.',
        time: '5.30 pm, 22 Oct 2019',
        saved: false
    },
    {
        id: 3,
        message: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.',
        time: '6.30 pm, 22 Oct 2019',
        saved: true
    },
    {
        id: 4,
        message: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.',
        time: '3:30 pm, 21 Oct 2019',
        saved: false
    }
];

const CustomerRatingComponent: FunctionComponent<Props> =
    ({
         selectedTab = 'All Messages',
         reverse = false,
         messageArray = sampleMessages,
         loading=true, darkTheme,columns
     }) => {
        const [selected, toggleSelected] = useState(selectedTab);
        const [reverseStyle, toggleReverse] = useState(reverse);
        const [messages, togglefavorite] = useState(messageArray);
        const [loader,setLoading] = useState(loading);
        useEffect(() => {
            setTimeout(() => {
                setLoading(false)
            },2000);
        }, []);

        return (
            <div className={`customer_feedback_parent ${darkTheme}`}>
                {darkTheme === undefined ? <text className={'section_heading'}>Customer Feedback</text>:null}
                <div className={'customer_feedback_first_child'}>
                    {darkTheme === undefined? <div className={'customer_feedback_first_child_tab'}>
                        <Tab label={'All Messages'} selected={selected}
                             handleChange={(label: string) => toggleSelected(label)}/>
                        <Tab label={'Saved'} selected={selected}
                             handleChange={(label: string) => toggleSelected(label)}/>
                    </div>:null}
                    {loader?
                        <div>
                            <Loader howManyColumns={columns !== undefined? columns: 2}/>
                        </div>
                        :
                        <div style={{height:darkTheme === undefined ? '40vh':'55vh'}} className={'customer_feedback_first_child_message'}>
                        {messages.map((message, index) => {
                            if (selected === 'Saved' && !message.saved) {
                                return
                            }
                            return (<Message
                                toggleFavorite={(id: number) => {
                                    const data = messages;
                                    data.splice(id, 1, {
                                        id: id,
                                        message: message.message,
                                        time: message.time,
                                        saved: !message.saved
                                    });
                                    togglefavorite(data);
                                }}
                                reverse={reverseStyle}
                                message={message.message}
                                time={message.time}
                                saved={message.saved} id={index}/>)
                        })
                        }
                    </div>}
                </div>
            </div>
        );
    };

export default CustomerRatingComponent;
