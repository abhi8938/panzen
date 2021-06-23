import React, {FunctionComponent, useEffect, useState} from 'react';
import './RIDD.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleDown} from "@fortawesome/free-solid-svg-icons";
import {add_icon, inventoryItems_icon, remove_icon} from "../../../../Assets/Inventory";
import {trash_image} from "../../../../Assets/AllItems";
import InventoryItemServices from "../../InventoryItems/services";
import {CustomTextInput} from "../../../common/CustomTextInput";

let service = new InventoryItemServices();

type selected = {
    id: string,
    name: string,
};

type Props = {
    onAddItem: (selected: selected) => void;
    display?: boolean;
    rotateIcon?: number;
    items: Array<selected>;
    list?: { set: Array<{ id: string, data: any }> }
    onDeleteItem: (selected: selected) => void;
    quantity: boolean

};

const RawItemDropDown: FunctionComponent<Props> =
    ({
         onAddItem,
         display = false,
         rotateIcon = 0,
         items,
         onDeleteItem,
         list = {
             set: [{
                 id: '', data: {name: 'loading'}
             }]
         },
         quantity
     }) => {
        const [displayMenu, toggleDropDown] = useState(display);
        const [rotate, toggleRotate] = useState(rotateIcon);
        const [data, setData] = useState(list);

        const fetchData = async () => {
            const response = await service.getInventoryItems();
            console.log(response);
            if (response.status === 200) {
                return setData({set: response.data});
            }
            return alert(response.data);
        };

        useEffect(() => {
            fetchData()
        }, []);

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

        return <div className="ridd_parent">
            <text>Select item</text>
            <div onClick={displayMenu ? hideDropdownMenu : showDropdownMenu}>
                <img src={inventoryItems_icon} alt={'search'}/>
                <text>Select Items</text>
                <FontAwesomeIcon
                    icon={faAngleDown}
                    transform={{rotate: rotate}}
                    color={'#fff'}
                />
            </div>
            {displayMenu ? (
                <ul>
                    <ul>
                        {data.set.length === 0 ? <li>No Data</li> : data.set.map((element) => (
                            <li onClick={items.includes({
                                id: element.id,
                                name: element.data.name
                            }) ? () => onDeleteItem({
                                id: element.id,
                                name: element.data.name
                            }) : () => onAddItem({
                                id: element.id,
                                name: element.data.name
                            })}
                                key={element.id}>
                                <img src={items.includes({
                                    id: element.id,
                                    name: element.data.name
                                }) ? remove_icon : add_icon} alt={'logo'}/>
                                <text>{element.data.name}</text>
                                {/*{quantity ?*/}
                                {/*    <CustomTextInput value={element.data.quantity}*/}
                                {/*                     onChange={}*/}
                                {/*                     type={'text'}*/}
                                {/*                     onfocus={}*/}
                                {/*                     onblur={}/> : null}*/}
                            </li>
                        ))}
                    </ul>
                    <ul>
                        <li>Added Items</li>
                        {items.length === 0 ?
                            <li>No Items Added</li>
                            : items.map((item, index) => <li>
                                {quantity ? `${item.name} x 1` : item.name}
                                <img src={trash_image} alt={'delete'} onClick={() => {
                                    onDeleteItem(item)
                                }}/>
                            </li>)}
                    </ul>
                </ul>
            ) : null}
        </div>;
    };

export default RawItemDropDown;
