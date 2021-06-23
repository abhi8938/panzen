import React, {
    FunctionComponent,
    useEffect,
    useState,
    SyntheticEvent
} from "react"; // importing FunctionComponent
import "./dropdown.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleDown, faCheck} from "@fortawesome/free-solid-svg-icons";
import {language as list} from "../../../constants/data";

export type selectedType = {
    name: string;
    id: string;
    key: string;
    logo: any;
};
type DropDownProps = {
    selected: selectedType;
    onSelectItem: (selected: selectedType) => void;
    display?: boolean;
    rotateIcon?: number;
};

export const DropDown: FunctionComponent<DropDownProps> =
    ({
         selected,
         onSelectItem,
         display = false,
         rotateIcon = 0
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

        return (
            <div className="dropdown">
                <div className="langSelector" onClick={showDropdownMenu}>
                    <img src={selected.logo} className="country-logo-Selected"/>
                    <text className="lang_text">{selected.name}</text>
                    <FontAwesomeIcon
                        icon={faAngleDown}
                        className="icon"
                        transform={{rotate: rotate}}
                    />
                </div>
                {displayMenu ? (
                    <ul className="lang-list">
                        <li className="lang_item lang_text">Select Language</li>
                        {list.map((element, index) => (
                            <li className={'lang_item'} onClick={() => onSelectItem(element)} key={element.id}>
                                <div className="div-row">
                                    <img src={element.logo} className="country-logo-Selected"/>
                                    <text className="lang_text">{element.name}</text>
                                </div>
                                {selected.id === element.id ? (
                                    <FontAwesomeIcon icon={faCheck} className="icon"/>
                                ) : null}
                            </li>
                        ))}
                    </ul>
                ) : null}
            </div>
        );
    };
