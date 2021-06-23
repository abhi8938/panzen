import React, {FunctionComponent, useState, useEffect} from 'react';
import './searchItems.css';
import SearchBar from "../../../common/SearchBar";
import itemService from "../../../Allitems/services";
import {Item} from "../../../Allitems";
import {trash_image} from "../../../../Assets/AllItems";
let service = new itemService();

type Props = {
    searchInput?: string,
    searchList?: Array<{ data: Item, id: string }>,
    comboItems?: Array<{ name: string, id: string }>,
    addItems: (item: { data: Item, id: string }) => void
    display?: boolean,
    onDeleteItem: (selected: { name: string, id: string }) => void;
};

const SearchItems: FunctionComponent<Props> =
    ({
         searchInput = 'Search Items',
         searchList = [],
         display = false,
         comboItems = [],
         addItems,
         onDeleteItem
     }) => {
        const [search, setSearch] = useState(searchInput);
        const [items, setItems] = useState(searchList);
        const [displayMenu, toggleDropDown] = useState(display);

        function hideDropdownMenu() {
            toggleDropDown(false);
            document.removeEventListener("click", hideDropdownMenu);
        }

        function showDropdownMenu() {
            if (displayMenu === false) {
                toggleDropDown(true);
                document.addEventListener("click", hideDropdownMenu);
            }
        }

        const searchItems = async (search: string) => {
            showDropdownMenu();
            const response = await service.search('IEFDIKzIJHVmQJ6yHhuw', search);
            if (response.status == 200) {
                console.log('res',response.data)
                setItems(response.data);
            } else {
                alert(JSON.stringify(response.data));
            }
        };
        return <div className={'searchItems_parent'}>
            <SearchBar
                width={'50%'}
                value={search}
                onfocus={() => {
                    if (search !== 'Search Items') return;
                    setSearch('');
                }}
                onblur={() => {
                    if (search === "" || search === " ") {
                        setSearch("Search Items");
                    }
                    return;
                }}
                onChange={(value) => {
                    if (search !== 'Search Items' && search !== '') {
                        searchItems(value);
                    }
                    setSearch(value)
                }}/>
            {displayMenu ? (
                <ul>
                    {items.map((element, index) => (
                        <li onClick={() => {
                            setSearch('Search Items');
                            addItems(element);
                        }} key={element.id}>
                            <text>{element.data.name}</text>
                        </li>
                    ))}
                </ul>
            ) : null}
            {comboItems.map((el, index) => <div className={'selectedItems_class'}>
                <div>
                    <text>{`Item ${index + 1}`}</text>
                    <text>{el.name}</text>
                </div>
                <img src={trash_image} alt={'delete'} onClick={() => {
                    onDeleteItem(el);
                }}/>
            </div>)}
        </div>
    };

export default SearchItems;
