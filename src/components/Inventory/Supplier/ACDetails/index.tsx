import React, {FunctionComponent, useState} from 'react';
import './acdetails.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleDown} from "@fortawesome/free-solid-svg-icons";
import {accounts_icon} from "../../../../Assets/Inventory";
import {CustomButton} from "../../../Login/CustomButton";
import {CustomTextInput} from "../../../common/CustomTextInput";
export type DetailsType = {
    [key: string]: string,
    name: string,
    bankName: string,
    number: string,
    ifsc: string,
    gst: string
}

type Props = {
    display?: boolean;
    rotateIcon?: number;
    addDetails: (Details: { method: 'CASH' | 'BANKING', details?: DetailsType }) => void;
    Details?: {
        set: Array<{
            id: number,
            title: string,
            value: string,
        }>
    },
    method?: 'CASH' | 'BANKING',
};

const ACDetails: FunctionComponent<Props> =
    ({
         display = false,
         rotateIcon = 0,
         addDetails,
         method = 'CASH',
         Details = {set: initialData},
     }) => {
        const [displayMenu, toggleDropDown] = useState(display);
        const [rotate, toggleRotate] = useState(rotateIcon);
        const [toggle, handleToggle] = useState(method);
        const [data, setData] = useState(Details);

        function hideDropdownMenu() {
            toggleDropDown(false);
            toggleRotate(0);
        }

        function showDropdownMenu() {
            if (displayMenu === false) {
                toggleDropDown(true);
                toggleRotate(180);
            }
        }

        return <div className="acDetails_parent">
            <text>Account Details</text>
            <div onClick={displayMenu ? hideDropdownMenu : showDropdownMenu}>
                <img src={accounts_icon} alt={'acc'}/>
                <text>Cash</text>
                <FontAwesomeIcon
                    icon={faAngleDown}
                    transform={{rotate: rotate}}
                    color={'#fff'}
                />
            </div>
            {displayMenu ? (
                <ul>
                    <div>
                        <text>Payment Method</text>
                        <div>
                            <Toggle selected={toggle} label={'CASH'} onToggle={(label => handleToggle(label))}/>
                            <Toggle selected={toggle} label={'BANKING'} onToggle={(label => handleToggle(label))}/>
                        </div>
                    </div>
                    {toggle === 'CASH' ? null : <div>
                        <text>Account Details</text>
                        {data.set.map((elem, index) => {
                            return (<CustomTextInput title={elem.title}
                                                     value={elem.value}
                                                     onChange={(event) => {
                                                         let dataC = data.set;
                                                         dataC[index] = {
                                                             id: elem.id,
                                                             title: elem.title,
                                                             value: event.target.value,
                                                         };
                                                         setData({set: dataC});
                                                     }}
                                                     type={'text'}
                                                     onblur={() => {
                                                         if (elem.value === "" || elem.value === " ") {
                                                             let dataC = data.set;
                                                             dataC[index] = {
                                                                 id: elem.id,
                                                                 title: elem.title,
                                                                 value: 'Enter Data',
                                                             };
                                                             setData({set: dataC});
                                                         }
                                                         return;
                                                     }}
                                                     onfocus={() => {
                                                         if (elem.value !== 'Enter Data') return;
                                                         let dataC = data.set;
                                                         dataC[index] = {
                                                             id: elem.id,
                                                             title: elem.title,
                                                             value: '',
                                                         };
                                                         setData({set: dataC});
                                                     }}
                                                     style={'entryField'}
                                                     inputStyle={'entryField_input'}
                            />)
                        })}
                        <CustomButton title={'Add Method'} style={'button'}
                                      onclick={() => {
                                          let details: any = {};
                                          details.name = data.set[0].value;
                                          details.bankName = data.set[1].value;
                                          details.number = data.set[2].value;
                                          details.ifsc = data.set[3].value;
                                          details.gst = data.set[4].value;
                                          addDetails({method:toggle, details})
                                      }}/>
                    </div>}
                </ul>
            ) : null}
        </div>;
    };

export default ACDetails;


type toggleProps = {
    selected?: string,
    label: 'CASH' | 'BANKING',
    onToggle: (label: 'CASH' | 'BANKING') => void
};
const Toggle: FunctionComponent<toggleProps> =
    ({
         selected,
         label,
         onToggle
     }) => {
        const selectedStyle = selected === label ? 'toggle toggle_On' : 'toggle';
        return (
            <div onClick={() => onToggle(label)}>
                <div className={selectedStyle}/>
                <text>{label === 'CASH' ? 'Cash' : 'Bank Transactions'}</text>
            </div>
        )
    };


const initialData = [
    {
        id: 0,
        title: 'Account Name',
        value: 'Enter Data',
    },
    {
        id: 1,
        title: 'Bank Name',
        value: 'Enter Data',
    },
    {
        id: 2,
        title: 'Account Number',
        value: 'Enter Data',
    },
    {
        id: 3,
        title: 'IFSC',
        value: 'Enter Data',
    },
    {
        id: 4,
        title: 'GST',
        value: 'Enter Data',
    }
]