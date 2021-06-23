import React, {
    FunctionComponent,
    useEffect,
    useState,
    SyntheticEvent
} from "react"; // importing FunctionComponent
import './itemdropdown.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleDown, faCheck} from "@fortawesome/free-solid-svg-icons";
import ItemService from "../../Allitems/services";
import {shrimp_logo} from "../../../Assets/AllItems";

const service = new ItemService();

export type selectedType = {
    name: string;
    branchID: string;
    icon: string;
};
type DropDownProps = {
    selected: selectedType;
    onSelectItem: (selected: selectedType) => void;
    type: 'DARK' | 'LIGHT'
    display?: boolean;
    rotateIcon?: number;
    disable?: boolean;
    categories: Array<{
        data: any,
        id: string
    }>;
};

export const ItemTypeDropDown: FunctionComponent<DropDownProps> =
    ({
         selected,
         onSelectItem,
         display = false,
         rotateIcon = 0,
         type,
         disable,
         categories = type === 'DARK' ? [] : [{
             data: {name: 'All', branchID: '', icon: shrimp_logo}, id: ''
         }]
     }) => {
        const [displayMenu, toggleDropDown] = useState(display);
        const [rotate, toggleRotate] = useState(rotateIcon);
        const bg = type == 'DARK' ? '#222c3c' : '#fafafb';

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

        const textstyle = type == 'DARK' ? 'white' : 'black';
        return (
            <div className="itemType_dropdown">
                {type == 'DARK' ? <div onClick={disable ? () => {
                    } : showDropdownMenu} className={'itemType_dropdown_dark'}>
                        <text>{selected.name}</text>
                        <FontAwesomeIcon
                            icon={faAngleDown}
                            transform={{rotate: rotate}}
                            color={'#fff'}
                        />
                    </div> :
                    <div onClick={showDropdownMenu} className={'itemType_dropdown_light'}>
                        <img src={selected.icon} alt={'search'}/>
                        <text>{selected.name}</text>
                        <FontAwesomeIcon
                            icon={faAngleDown}
                            transform={{rotate: rotate}}
                            color={'#202a38'}
                        />
                    </div>}
                {displayMenu ? (
                    <ul style={{backgroundColor: bg}}>
                        {categories.length === 0 ? <li>No Categories</li> : categories.map((element, index) => (
                            <li onClick={() => onSelectItem({
                                name: element.data.name,
                                branchID: element.data.branchID,
                                icon: element.data.icon
                            })} key={element.id}>
                                <div>
                                    <img src={element.data.icon} alt={'logo'}/>
                                    <text className={textstyle}>{element.data.name}</text>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : null}
            </div>
        );
    };
