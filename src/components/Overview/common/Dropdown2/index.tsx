import React, {
    FunctionComponent,
    useEffect,
    useState,
    SyntheticEvent
} from "react"; // importing FunctionComponent
import './dropdown2.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleDown} from "@fortawesome/free-solid-svg-icons";
import {Months as months,Years as years}from '../../../../constants/data';
export type selectedType = {
    name: string;
    id: number;
};
type DropDownProps = {
    selected: selectedType;
    onSelectItem: (selectedMonth: selectedType) => void;
    display?: boolean;
    rotateIcon?: number;
    size:'small'|'big';
    type:'Year'|'Month'
};

export const Dropdown2: FunctionComponent<DropDownProps> =
    ({
         selected,
         onSelectItem,
         display = false,
         rotateIcon = 0,
         size,
         type
     }) => {
        const [displayMenu, toggleDropDown] = useState(display);
        const [rotate, toggleRotate] = useState(rotateIcon);

        function hideDropdownMenu() {
            toggleDropDown(false);
            toggleRotate(0);
            document.removeEventListener("click", hideDropdownMenu);
        }

        function showDropdownMenu() {
            if (displayMenu === false) {
                toggleDropDown(true);
                toggleRotate(180);
                document.addEventListener("click", hideDropdownMenu);
            }
        }

        // useEffect(() => {
        //   console.log("useEffect under process");
        // });
        function selectedStyle(id:number){
            return  selected.id === id?'dropdown2_list_toggle_div dropdown2_list_toggle_div_selected ':'dropdown2_list_toggle_div';

        }
        const data = type === 'Year'?years:months;
        return (
            <div className="dropdown2">
                <div className="langSelector2" onClick={showDropdownMenu}>
                    <text className={size === 'small'?"lang_text2_small":'lang_text2_big'}>{selected.name}</text>
                    <FontAwesomeIcon
                        icon={faAngleDown}
                        className="icon2"
                        transform={{rotate: rotate}}
                    />
                </div>
                {displayMenu ? (
                    <ul className="lang-list2">
                        <li className={size === 'small'?"lang_item2 lang_text2_small":"lang_item2 lang_text2_big"}>Select Month</li>
                        {data.map((element, index) => (
                            <li className={'lang_item2'} onClick={() => onSelectItem(element)} key={element.id}>
                                <div className="div-row">
                                    <text className={size === 'small'?"lang_text2_small":'lang_text2_big'}>{element.name}</text>
                                </div>
                               <div className={selectedStyle(element.id)}/>
                            </li>
                        ))}
                    </ul>
                ) : null}
            </div>
        );
    };
