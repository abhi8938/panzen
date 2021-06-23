import React, {FunctionComponent} from 'react';
import './onlineOrderListItem.css';
import ItemFrame from "../../common/frames/ItemFrame";
import LogoComponent from "../../common/LogoComponent";
import {uber_sample, ITEM_LOGO, euro_logo, truck_logo} from '../../../Assets/OnlineOrder';
import {clock_icon} from '../../../Assets/reservation';
import {CustomButton} from "../../Login/CustomButton";

type Props = {
    details: {
        contactNumber: string,
        name: string,
    },
    status: string,
    value: number,
    time: Date,
    items: Array<{ id: string, name: string, quantity: number }>,
    cancel: () => void
};

const OnlineOrderListItem: FunctionComponent<Props> = ({
                                                           details, items, time, value, status, cancel
                                                       }) => {

    const timeNew = new Date(time).toLocaleTimeString();
    return (
        <div className={'onlineOrderListItem'}>
            <ItemFrame width={'2%'} color={'#4b6cfb'} height={`100%`}>
                <div>
                    <LogoComponent
                        height={`100%`}
                        size={'BIG'}
                        type={'DETAILS'}
                        list={[details.name, '1791325683', 'Bad Hersfeld']}
                        logo={uber_sample}>{}
                    </LogoComponent>
                    <LogoComponent
                        height={`100%`}
                        type={'CURRENCY'}
                        logo={clock_icon}
                        single={timeNew}
                        size={'SMALL'}>{}
                    </LogoComponent>
                    <LogoComponent
                        height={`100%`}
                        type={'LISTOFITEMS'}
                        logo={ITEM_LOGO}
                        size={'SMALL'}
                        list={items}>{}
                    </LogoComponent>
                    <LogoComponent
                        height={`100%`}
                        type={'CURRENCY'}
                        logo={euro_logo}
                        size={'SMALL'}
                        single={value.toString()}>{}
                    </LogoComponent>
                    <LogoComponent
                        height={`100%`}
                        type={'CURRENCY'}
                        logo={truck_logo}
                        size={'SMALL'}
                        single={'Order ' + status.toLocaleLowerCase()}>{}
                    </LogoComponent>
                    {status == 'ACTIVE' ? <CustomButton
                        title={'Cancel'}
                        style={'button-cancel'}
                        onclick={() => cancel()}/> : <text>{status}</text>}
                </div>
            </ItemFrame>
        </div>
    );
};

export default OnlineOrderListItem;
