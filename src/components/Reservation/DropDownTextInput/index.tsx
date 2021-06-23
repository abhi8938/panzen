import React, {FunctionComponent, useState, useEffect, Fragment} from 'react';
import './dropDownTextInput.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleDown} from "@fortawesome/free-solid-svg-icons";
import DatePicker from 'react-datepicker';
import {selectedType} from "../../Overview/common/Dropdown2";

const GuestData = [1, 2, 3, 4, 5, 6];
type Props = {
    //basic props
    title?: string,
    icon?: any,
    selectedGuest?: string,
    setGuest?: (guest: number) => void
    list?: any,
    calendarstyle?: string;
    dropDown: boolean,
    type: 'Time' | 'Date' | 'Guests' | 'Text',
    style?: string,
    arrowColor?: string

    //textInput Props
    onChange?: (event: any) => void;
    inputStyle?: string;
    onfocus?: () => void;
    onblur?: () => void
    inputType?: string
    value?: string,

    //state
    rotateIcon?: number,
    date?: Date | null,
    setDate?: (date: Date | null) => void,
    time?: Date | null,
    setTime?: (date: Date | null) => void,
    displayGuests?: boolean
};

const DropDownTextInput: FunctionComponent<Props> =
    ({
         title,
         icon,
         selectedGuest,
         setGuest,
         calendarstyle,
         dropDown,
         type,
         style,
         arrowColor,

         onblur,
         onfocus,
         inputStyle,
         onChange,
         value,
         inputType,

         rotateIcon = 0,
         date,
         setDate,
         time,
         setTime,
         displayGuests = false,

     }) => {
        const [rotate, toggleRotate] = useState(rotateIcon);
        const [displayGuestMenu, toggleGuest] = useState(displayGuests);

        const CustomDateInput = ({value, onClick}: { value?: any, onClick?: any }) => (
            <button className={calendarstyle ? calendarstyle : " dropDownTextInput_date_input"} onClick={onClick}>
                {value}
            </button>
        );
        const CustomTimeInput = ({value, onClick}: { value?: any, onClick?: any }) => (
            <button className={calendarstyle ? calendarstyle : " dropDownTextInput_date_input"} onClick={onClick}>
                {value ? value : 'Select Time'}
            </button>
        );
        function hideDropdownMenu() {
            toggleGuest(false);
            toggleRotate(0);
            document.removeEventListener("click", hideDropdownMenu);
        }

        function showDropdownMenu() {
            if (displayGuestMenu === false) {
                toggleGuest(true);
                toggleRotate(180);
                document.addEventListener("click", hideDropdownMenu);
            }
        }
        return (
            <div className={'dropDownTextInput_parent'} onClick={showDropdownMenu}>
                {title ? <text className={'dropDownTextInput_title'}>{title}</text> : null}
                <div className={style ? style : 'dropDownTextInput_first_child'}>
                    <div className={'dropDownTextInput_first_first'}>
                        {icon ? <img src={icon} className={'dropDownTextInput_icon'} alt={'icon'}/> : null}
                        {dropDown ? <FontAwesomeIcon
                            icon={faAngleDown}
                            className="dropDownTextInput_arrow_icon"
                            transform={{rotate: rotate}}
                            color={arrowColor}
                        /> : null}
                    </div>
                    {type === 'Date' && setDate !== undefined ?
                        <DatePicker
                            dateFormat=" d MMM yyyy"
                            selected={date}
                            onChange={date => setDate(date)}
                            customInput={<CustomDateInput/>}
                            onCalendarOpen={() => toggleRotate(180)}
                            onCalendarClose={() => toggleRotate(0)}
                        /> : null}

                    {type === 'Time' && setTime !== undefined ?
                        <DatePicker
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={60}
                            timeCaption="Time"
                            dateFormat="h:mm aa"
                            selected={time}
                            onChange={date => setTime(date)}
                            onCalendarOpen={() => toggleRotate(180)}
                            onCalendarClose={() => toggleRotate(0)}
                            customInput={<CustomTimeInput/>}
                        /> : null}

                    {type === 'Text' ?
                        <input
                            onBlur={onblur}
                            className={`${inputStyle} dropDownTextInput_input`}
                            type={inputType}
                            value={value}
                            onChange={onChange}
                            onFocus={onfocus}/> : null}
                    {type === 'Guests' ?
                        <div className={'dropDownTextInput_guest_input'}>
                            <text>{selectedGuest}</text>
                            {displayGuestMenu ? (
                                <ul>
                                    <li>Select Guests</li>
                                    {GuestData.map((element) => (
                                        <li key={element}
                                            onClick={() => setGuest !== undefined ? setGuest(element) : null}>
                                            <text>{element}</text>
                                        </li>
                                    ))}
                                </ul>
                            ) : null}
                        </div>
                        : null}
                </div>
            </div>
        );
    };

export default DropDownTextInput;
