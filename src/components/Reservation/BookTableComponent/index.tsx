import React, {FunctionComponent, useState} from 'react';
import './bookTable.css'
import {CustomButton} from "../../Login/CustomButton";
import DropDownTextInput from "../DropDownTextInput";
import {
    calender_icon,
    female_icon,
    clock_icon,
    group_icon,
    male_icon,
    phone_icon,
} from '../../../Assets/reservation';
import SearchBar from "../../common/SearchBar";
type Props = {
    date?: Date | null,
    time?: Date | null,
    contact?: string,
    name?: string,
    guests?: string,
    postReservation:(
        branchID: string,
        customerName: string,
        customerContact: string,
        reservationDate: Date | null,
        reservationTime: Date | null,
        totalGuests: string
    ) => void
}
const BookTableComponent: FunctionComponent<Props> =
    ({
         date = new Date(),
         time = new Date(),
         contact = 'Enter Contact',
         name = 'Enter Name',
         guests= '1',postReservation

     }) => {
        const [bookingDate, setDate] = useState(date);
        const [bookingTime, setTime] = useState(time);
        const [mobile, setMobile] = useState(contact);
        const [customer, setCustomer] = useState(name);
        const [guestNumber, setGuestNumber] = useState(guests);

        const post = async() => {
         if(customer === 'Enter Name' || customer === ''){
             return alert('Empty Name');
         }
         if(mobile === 'Enter Contact' || mobile === ''){
             return alert('Empty Contact')
         }
         postReservation('IEFDIKzIJHVmQJ6yHhuw', customer, mobile,bookingDate,bookingTime,guestNumber);

        };

        return (
            <div className={'booktable_parent'}>
                <text className={'booktable_heading'}>Book Table</text>
                <div className={'booktable_first_child'}>
                    <div className={'booktable_first_first'}>
                        <DropDownTextInput
                            type={'Text'}
                            dropDown={false}
                            title={'Name'}
                            icon={female_icon}
                            value={customer}
                            onChange={(event: any) => setCustomer(event.target.value)}
                            onblur={() => {
                                if (customer === "" || customer === " ") {
                                    setCustomer("Enter Name");
                                }
                                return;
                            }}
                            onfocus={() => {
                                if (customer !== 'Enter Name') return;
                                setCustomer('');
                            }}
                        />
                        <DropDownTextInput
                            type={'Text'}
                            dropDown={false}
                            title={'Contact'}
                            icon={phone_icon}
                            value={mobile}
                            onChange={(event: any) => setMobile(event.target.value)}
                            onblur={() => {
                                if (mobile === "" || mobile === " ") {
                                    setMobile("Enter Contact");
                                }
                                return;
                            }}
                            onfocus={() => {
                                if (mobile !== 'Enter Contact') return;
                                setMobile('');
                            }}
                        />
                        <DropDownTextInput
                            date={bookingDate}
                            setDate={(date) => setDate(date)} type={'Date'}
                            dropDown={true}
                            title={'Date'}
                            icon={calender_icon}
                            value={'24 Oct 2019'}/>
                        <DropDownTextInput
                            time={bookingTime}
                            setTime={(time) => setTime(time)}
                            type={'Time'}
                            dropDown={true}
                            title={'Time'}
                            icon={clock_icon}
                            value={'Select Time'}/>
                        <DropDownTextInput
                            type={'Guests'}
                            dropDown={true}
                            title={'Guests'}
                            icon={group_icon}
                            selectedGuest={guestNumber}
                            setGuest={(guest) => setGuestNumber(`${guest}`)}
                        />
                    </div>
                    <CustomButton
                        title={'Book Table'}
                        style={'booktable_button'}
                        onclick={() => post()}/>
                </div>
            </div>
        )
            ;
    };

export default BookTableComponent;
