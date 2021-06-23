import React, {FunctionComponent, useState} from 'react';
import './menuItems.css';
import {
    InventoryItemsDropDownList,
    menuItemListFrame,
    storageListFrame,
    TableDropDownList
} from "../../../constants/data";
import ListFrame from "../../common/frames/ListFrame";
import Loader from "../../Reservation/ListItem/Loader";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleDown} from "@fortawesome/free-solid-svg-icons";
import ListItem from "./ListItem";
import SearchBar from "../../common/SearchBar";
import {DropDown} from "../../Dinein/DropDown";

type item = {}
type Props = {
    sortData?: {
        id: number,
        title: string,
        logo: any
    },
    items?: Array<{ data: item, id: string }>,
    loading?: boolean,
    searchText?: string,
};

const MenuItems: FunctionComponent<Props> =
    ({
         sortData = TableDropDownList[0],
         items = [],
         loading = true,
         searchText = 'Search Items',

     }) => {
        const [list, setList] = useState(items);
        const [load, setLoad] = useState(loading);
        const [search, setSearch] = useState(searchText);
      const [sort ,setSort] = useState(sortData)

      return <div className={'menu_item_parent'}>
            <text>Menu Items</text>
            <div>
                <div className={'headerClass'}>
                        <SearchBar
                            width={'26vmin'}
                            value={search}
                            onChange={(value) => setSearch(value)}
                            onblur={() => {
                                if (search === "" || search === " ") {
                                    setSearch('Search Items');
                                }
                                return;
                            }}
                            onfocus={() => setSearch('')}/>
                    <div>
                        <text>Sort by</text>
                        <DropDown SizeProp={'xs'} style={'menuItems_dropDown'} selected={sort}
                                  onSelectItem={setSort} list={InventoryItemsDropDownList}/>
                    </div>
                </div>
                <div>
                    <ListFrame style={'menuItemListFrame'} list={menuItemListFrame}/>
                    {load ?
                        <div>
                            <Loader logo={true}/>
                            <Loader logo={true}/>
                            <Loader logo={true}/>
                            <Loader logo={true}/>
                            <Loader logo={true}/>
                        </div> : <ListItem/>}
                    {/*: list.map(supplier => {*/}
                    {/*    return (<ListItem/>)*/}
                    {/*})}*/}
                </div>
                {list.length >= 10 ? <FontAwesomeIcon
                    icon={faAngleDown}
                    className="reservation_arrow_icon"
                    color={'#fff'}
                    size={'2x'}
                    onClick={() => console.log('More')}
                /> : null}
            </div>
        </div>;
    };

export default MenuItems;
