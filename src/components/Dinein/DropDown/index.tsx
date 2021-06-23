import React, {
    FunctionComponent,
    useEffect,
    useState,
    SyntheticEvent
} from "react"; // importing FunctionComponent
import "./dropdown-table.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleDown, faCheck} from "@fortawesome/free-solid-svg-icons";
import {TableDropDownList} from "../../../constants/data";

export type selectedType = {
    title: string;
    id: number;
    logo: any;
};
type DropDownProps = {
    selected?: selectedType;
    multipleSelect?: { previous: { id: number, name: string }, current: { id: number, name: string } },
    onSelectItem?: (selected: selectedType) => void,
    onSelectMultiple?: (selectedMultiple: { previous: { id: number, name: string }, current: { id: number, name: string } }) => void,
    display?: boolean;
    rotateIcon?: number;
    list?: Array<selectedType>;
    multipleList?: Array<{ id: number, name: string }>,
    style?: string,
    SizeProp?: "xs"
        | "lg"
        | "sm"
        | "1x"
        | "2x"
        | "3x"
        | "4x"
        | "5x"
        | "6x"
        | "7x"
        | "8x"
        | "9x"
        | "10x",
    elementId?: 1 | 0
};

export const DropDown: FunctionComponent<DropDownProps> =
    ({
         selected,
         onSelectItem,
         display = false,
         rotateIcon = 0,
         list = TableDropDownList,
         style = 'tableSort_dropdown',
         SizeProp,
         multipleSelect,
         onSelectMultiple,
         multipleList,
         elementId = 0
     }) => {
        const [displayMenu, toggleDropDown] = useState(display);
        const [rotate, toggleRotate] = useState(rotateIcon);
        const [Id, setId] = useState(elementId);


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

        const selectedType = selected !== undefined ? selected.title : multipleSelect !== undefined ? multipleSelect[Id == 0 ? 'previous' : 'current'].name : null;
        return (
            <div className={style}>
                <div onClick={showDropdownMenu}>
                    <text>{selectedType}</text>
                    <FontAwesomeIcon
                        icon={faAngleDown}
                        transform={{rotate: rotate}}
                        color={'#202a38'}
                        size={SizeProp}
                    />
                </div>
                {displayMenu ? selected !== undefined && onSelectItem !== undefined ? <ul>
                        <li>Sort by</li>
                        {list.map((element, index) => (
                            <li onClick={() => onSelectItem(element)} key={element.id}>
                                <div>
                                    <img src={element.logo} alt={'logo'}/>
                                    <text>{element.title}</text>
                                </div>
                            </li>
                        ))}
                    </ul>
                    :
                    multipleList !== undefined && onSelectMultiple !== undefined ? <ul>
                            <li>Sort by</li>
                            {multipleList.map((element, index) => {
                                let selectedColor = '#646764';
                                if (multipleSelect !== undefined && (multipleSelect.previous.id == element.id || multipleSelect.current.id == element.id)) {
                                    selectedColor = '#4caf50'
                                }
                                return (
                                    <li onClick={() => {
                                        const data: any = multipleSelect;
                                        const isPresent = data['previous'].name === element.name ? true : data['current'].name === element.name;
                                        if (isPresent) {
                                            alert('Select Different month');
                                            return
                                        }
                                        data[Id ? 'previous' : 'current'] = element;
                                        setId(Id == 0 ? 1 : 0);
                                        onSelectMultiple(data);
                                    }} key={element.id}>
                                        <div>
                                            <div>
                                                <div style={{backgroundColor: `${selectedColor}`}}>
                                                    <FontAwesomeIcon
                                                        className={'FontAwesomeIcon'}
                                                        icon={faCheck}
                                                        color={'#fff'}
                                                        size={'sm'}
                                                    />
                                                </div>
                                                <div style={{borderTopColor: `${selectedColor}`}}/>
                                            </div>
                                            <text>{element.name}</text>
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>
                        : null
                    : null}
            </div>
        );
    };
