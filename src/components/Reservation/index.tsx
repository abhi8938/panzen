import React, {FunctionComponent, useState, useEffect} from 'react';
import './reservation.css';
import BookTableComponent from "./BookTableComponent";
import {SampleReservations as sampleList} from '../../constants/data';
import ListItem from "./ListItem";
import DropDownTextInput from "./DropDownTextInput";
import {calender_icon} from "../../Assets/reservation";
import SearchBar from "../common/SearchBar";
import {faAngleDown} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import ReservationService from './services';
import Loader from './ListItem/Loader';
/*TODO:
* 1. Add action loader
* 2. Create SearchQuery Working
* */


type reservation = {
    reservationTime: Date,
    customerName: string,
    customerContact: string,
    totalGuests: number,
}
const service = new ReservationService();
type reservationProps = {
    searchText?: string,
    date?: Date | null,
    reservations?: Array<{ data: reservation, id: string }>,
    loading?: boolean
};

const Reservation: FunctionComponent<reservationProps> =
    ({
         searchText = 'Search Reservations',
         date = new Date(),
         reservations = [],
         loading = true
     }) => {
        const [load, toggleLoad] = useState(loading);
        const [list, setList] = useState(reservations);
        const [search, changeSearch] = useState(searchText);
        const [filterDate, setFilterDate] = useState(date);

        const fetchReservations = async () => {
            toggleLoad(true);
            const response = await service.getReservations('IEFDIKzIJHVmQJ6yHhuw', filterDate !== null ? filterDate : new Date());
            toggleLoad(false);
            if (response.status == 200) {
                setList(response.data);
            } else {
                alert(JSON.stringify(response.data));
            }
        };

        const searchReservations = async (search: string) => {
            toggleLoad(true);
            const response = await service.search('IEFDIKzIJHVmQJ6yHhuw', search);
            console.log('search', response);
            toggleLoad(false);
            if (response.status == 200) {
                setList(response.data);
            } else {
                alert(JSON.stringify(response.data));
            }
        };

        const createReservation = async (
            branchID: string,
            customerName: string,
            customerContact: string,
            reservationDate: Date | null,
            reservationTime: Date | null,
            totalGuests: string
        ) => {
            const response = await service.createReservation(branchID, customerName, customerContact, reservationDate !== null ? reservationDate : new Date(), reservationTime, totalGuests);
            if (response.status === 200) {
                fetchReservations()
            } else {
                return alert(response.data);
            }
        };

        const updateReservation = async (
            reservationId: string,
            newTime ?: Date | null,
            status ?: string,
            ) => {
                const response = await service.updateReservation(reservationId,
                    newTime !== undefined ? newTime : undefined,
                    status !== undefined ? status : undefined);
                if (response.status === 200) {
                    fetchReservations()
                } else {
                    return alert(response.data);
                }
            }
        ;

        useEffect(() => {
            fetchReservations()
        }, [filterDate]);


        return (
            <div className={'reservation_parent'}>
                <text className={'main_heading'} style={{marginLeft: '2%', marginBottom: '7%'}}>Reservations</text>
                <BookTableComponent postReservation={((
                    branchID,
                    customerName,
                    customerContact,
                    reservationDate,
                    reservationTime,
                    totalGuests) =>
                    createReservation(
                        branchID,
                        customerName,
                        customerContact,
                        reservationDate,
                        reservationTime,
                        totalGuests
                    ))}/>
                <div className="reservation_third_child">
                    <div className={'reservation_third_first'}>
                        <SearchBar
                            value={search}
                            onChange={(value) => {
                                if (search !== 'Search Reservations' && search !== '') {
                                    searchReservations(value);
                                }
                                changeSearch(value);
                            }}
                            onblur={() => {
                                if (search === "" || search === " ") {
                                    changeSearch("Search Reservations");
                                    fetchReservations();
                                }
                                return;
                            }}
                            onfocus={() => {
                                if (search !== 'Search Reservations') return;
                                changeSearch('')
                            }}/>
                        <DropDownTextInput
                            arrowColor={'#000'}
                            dropDown={true}
                            type={'Date'}
                            calendarstyle={'reservation_calendar_date_style'}
                            icon={calender_icon}
                            style={'reservation_calendar_style'}
                            date={filterDate} setDate={(date) => setFilterDate(date)}
                        />
                    </div>
                    <div className={'reservation_third_second'}>
                        <div className={'reservation_third_title_container'}>
                            <text className={'reservation_titles'} style={{width: '16%'}}>Name</text>
                            <text className={'reservation_titles'} style={{width: '15%'}}>Contact Number</text>
                            <text className={'reservation_titles'} style={{width: '13%'}}>Reservation Time</text>
                            <text className={'reservation_titles'} style={{width: '10%'}}>Guests</text>
                            <text className={'reservation_titles'} style={{width: '20%'}}>Reschedule</text>
                            <text className={'reservation_titles'} style={{width: '15%'}}>Cancel Booking</text>
                        </div>
                        {load ?
                            <div>
                                <Loader logo={true}/>
                                <Loader logo={true}/>
                                <Loader logo={true}/>
                                <Loader logo={true}/>
                                <Loader logo={true}/>
                            </div>
                            : list.length === 0 ?
                                <div className={'no_data_div'}>
                                    <text>No Reservations</text>
                                </div> : list.map(reservation => {
                                    const time = new Date(reservation.data.reservationTime);
                                    return (
                                        <ListItem
                                            cancel={status => {
                                                updateReservation(reservation.id, undefined, status);
                                            }}
                                            time={time.toLocaleTimeString()}
                                            name={reservation.data.customerName}
                                            guests={reservation.data.totalGuests}
                                            contact={reservation.data.customerContact}
                                            key={reservation.id}
                                            changeReschedule={date => {
                                                updateReservation(reservation.id, date)
                                            }}
                                        />)
                                })}
                    </div>
                    {list.length >= 10 ? <FontAwesomeIcon
                        icon={faAngleDown}
                        className="reservation_arrow_icon"
                        color={'#fff'}
                        size={'2x'}
                        onClick={() => console.log('More')}
                    /> : null}
                </div>
            </div>
        );
    };

export default Reservation;

