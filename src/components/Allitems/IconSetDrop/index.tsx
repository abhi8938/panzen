import React, {
    FunctionComponent,
    useEffect,
    useState,
    SyntheticEvent
} from "react"; // importing FunctionComponent
import './iconSetDrop.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleDown, faCheck} from "@fortawesome/free-solid-svg-icons";
import {IconSetList as list} from "../../../constants/data";

export type selectedType = {
    id: number;
    logo: any;
};
type DropDownProps = {
    selected: selectedType;
    onSelectItem: (selected: selectedType) => void;
    display?: boolean;
    rotateIcon?: number;
    disable?: boolean
};

export const IconSetDrop: FunctionComponent<DropDownProps> =
    ({
         selected,
         onSelectItem,
         display = false,
         rotateIcon = 0,
         disable
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

        return (
            <div className="iconSetDrop">
                <div onClick={disable ? () => {
                } : showDropdownMenu}>
                    <img src={selected.logo} alt={'logo'}/>
                    <FontAwesomeIcon
                        icon={faAngleDown}
                        transform={{rotate: rotate}}
                        color={'#fff'}
                    />
                </div>
                {displayMenu ? (
                    <ul>
                        <li>Icons Set</li>
                        <div>
                        {list.map((element, index) => (
                            <li onClick={() => onSelectItem(element)} key={element.id}>
                                <img src={element.logo} alt={'logo'}/>
                            </li>
                        ))}
                        </div>
                    </ul>
                ) : null}
            </div>
        );
    };
