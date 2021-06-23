import React, {
    FunctionComponent,
    useEffect,
    useState,
    SyntheticEvent
} from "react"; // importing FunctionComponent
import './ratingDropDown.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleDown, faCheck} from "@fortawesome/free-solid-svg-icons";
import { rating_v_1 as ratingV1, rating_v_2 as ratingV2} from "../../../constants/data";

export type selectedType = {
    name: string;
    id: number;
    logo: any;
};
type DropDownProps = {
    selected: selectedType;
    onSelectItem: (selected: selectedType) => void;
    type: 'V1'|'V2',
    display?: boolean;
    rotateIcon?: number;
    inputStyle?:string;
};

export const RatingDropdown : FunctionComponent<DropDownProps> =
    ({
         selected,
         onSelectItem,
         display = false,
         rotateIcon = 0,
         type,
         inputStyle

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
       const list = type === 'V1'?ratingV1: ratingV2 ;
        return (
            <div className="rating_dropdown">
                <div onClick={showDropdownMenu} className={'rating_dropdown_dark '+inputStyle}>
                    <img src={selected.logo}/>
                        <FontAwesomeIcon
                            icon={faAngleDown}
                            transform={{rotate: rotate}}
                            color={'#fff'}
                        />
                    </div>
                {displayMenu ? (
                    <ul>
                        {list.map((element, index) => (
                            <li onClick={() => onSelectItem(element)} key={element.id}>
                                <div>
                                    <img src={element.logo} alt={'logo'}/>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : null}
            </div>
        );
    };
