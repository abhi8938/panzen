import React, {
    FunctionComponent,
    useEffect,
    useState,
    SyntheticEvent
} from "react"; // importing FunctionComponent
import './sortDropdown.css'
import {handBurger_icon} from "../../../Assets/Inventory";
import {sortDurationData} from "../../../constants/data";
import {CustomButton} from "../../Login/CustomButton";

type DropDownProps = {
    onSelectItem: (selectedMonth: any) => void;
    display?: boolean;
    rotateIcon?: number;
    selectedDuration?: string,
    type: 'DINEIN' | 'ANALYTICS'
};

export const SortDropdown: FunctionComponent<DropDownProps> =
    ({
         onSelectItem,
         display = false,
         rotateIcon = 0,
         selectedDuration = sortDurationData[0].label,
         type
     }) => {
        const [displayMenu, toggleDropDown] = useState(display);
        const [rotate, toggleRotate] = useState(rotateIcon);
        const [selected, setSelected] = useState(selectedDuration);

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

        const style = type === 'ANALYTICS' ? 'sortDropdown' : 'dinein_Menu';

        return (
            <div className={style}>
                <img src={handBurger_icon} alt={'menu'} onClick={displayMenu ? hideDropdownMenu : showDropdownMenu}/>
                {displayMenu ?
                    type === 'ANALYTICS' ? <ul>
                            {sortDurationData.map((el) => <SortItem label={el.label} selected={selected}
                                                                    onToggle={(label => setSelected(label))}/>)}
                            <CustomButton title={'Assign Changes'} style={'button'} onclick={() => hideDropdownMenu()}/>
                        </ul> :
                        <ul>
                            data
                        </ul>
                    : null}
            </div>
        );
    };


type itemProps = {
    label: string,
    selected: string,
    onToggle: (label: string) => void
}

const SortItem: FunctionComponent<itemProps> =
    ({
         label, selected, onToggle
     }) => {
        return <li className="sortDropDown_item">
            <Toggle label={label} onToggle={onToggle} selected={selected}/>
        </li>
    };


type toggleProps = {
    selected?: string,
    label: string,
    onToggle: (label: string) => void
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
                <text>{label}</text>
            </div>
        )
    };