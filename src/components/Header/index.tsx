import React, {FunctionComponent, useState, useEffect} from 'react';
import './header.css'
import clock from '../../Assets/header/CLOCK.svg';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronCircleDown} from "@fortawesome/free-solid-svg-icons";
import {DropDown, selectedType} from "../common/DropDown";
import uk_logo from "../../Assets/login/UK_LOGO.svg";
import profile from '../../Assets/profile.jpg';
import {PlainListDropDown} from "../Inventory/common/PlainListDropDown";
type  headerProps = {
    rotateIcon?: number,
    selected?:{
        id: string,
        name: string,
        key: string,
        logo: any
    },
    date?:Date,
    time?:Date
};

const Header: FunctionComponent<headerProps> =
    ({
         rotateIcon = 0,
         selected= {
             id: "0",
             name: "English",
             key: "location",
             logo: uk_logo
         },
         date =new Date().toDateString(),
         time= new Date().toLocaleTimeString()

     }) => {
        const [rotate, toggleRotate] = useState(rotateIcon);
        const [selectedLanguage, toggleSelect] = useState(selected);
        const [currentTime, updateTime] = useState(time);

        useEffect(() => {
            setInterval(() => {
               const currentTime = new Date().toLocaleTimeString();
               let time = currentTime.match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [currentTime];
                if (time.length > 1) { // If time format correct
                    time = time.slice(1);  // Remove full string match value
                    time[5] = + time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
                    time[0] = String(+time[0] % 12 || 12); // Adjust hours
                }
                updateTime(time.join(''));
            },1000);
        },[]);
        return (
            <div className={'header_parent'}>
                <div className={'header_leftSection'}>
                    <div className={'header_TimeSection'}>
                        <img src={clock} className={'clock_icon'} alt={'clock_icon'}/>
                        <text className={'time_text'}>{currentTime}, {date}</text>
                    </div>
                    <div className={'header_leftEndSection'}>
                    <DropDown selected={selectedLanguage} onSelectItem={(selected:selectedType) => toggleSelect(selected)}/>
                    </div>
                </div>
                <div className={'header_rightSection'} onClick={() => toggleRotate(rotate === 0?180:0)}>
                    <img src={profile} className={'profile_icon'} alt={'profile'}/>
                    <div className={'profile_Name_section'}>
                        <text className={'name_text'}>Alice Jenner</text>
                        <text className={'role_text'}>Admin</text>
                    </div>
                    <FontAwesomeIcon
                        icon={faChevronCircleDown}
                        className="profile_arrow_icon"
                        transform={{rotate: rotate}}
                    />
                </div>
            </div>
        );
    };

export default Header;
