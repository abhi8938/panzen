import React, {FunctionComponent, useEffect, useState} from 'react';
import TopTabBar from "../common/TopTabBar";
import {AllItemsTabBars as toplist, itemTypes as types} from "../../constants/data";
import {ItemTypeDropDown} from "../common/ItemTypeDropDown";
import AddNewItem from "../Allitems/AddNewItem";
import {shrimp_logo} from "../../Assets/AllItems";
import CategoryFrame from "../common/frames/CategoryFrame";
import Loader from "../common/ItemComponent/Loader";
import ItemComponent from "../common/ItemComponent";
import {Item} from '../Allitems/index';
import ItemService from "../Allitems/services";
import './favorites.css'
import AlertBox, {alertProps} from "../common/AlertBox";

const service = new ItemService();
type Props = {
    loading: boolean,
    searchInput?: string
    itemTypeSelected?: {
        branchID: string,
        name: string,
        icon: string,
    },
    list: Array<{ category: { name: string, icon: string }, items: Array<{ id: string, data: any }> }>,
    categories: Array<{
        data: any,
        id: string
    }>;
    alertData?: alertProps

};

const Favorites: FunctionComponent<Props> =
    ({
         itemTypeSelected = {
             branchID: '',
             name: 'All',
             icon: shrimp_logo,
         }, searchInput = 'Search Items', loading,
         categories = [{
             data: {name: 'All', branchID: '', icon: shrimp_logo}, id: ''
         }],
         list = [],
         alertData = {
             showAlert: false,
             message: '',
             title: '',
             success: false
         }
     }) => {
        const [itemType, setItemType] = useState(itemTypeSelected);
        const [search, setSearch] = useState(searchInput);
        const [load, toggleLoad] = useState(loading);
        const [items, setItems] = useState(list);
        const [Clist, setCList] = useState(categories);
        const [aler, setaler] = useState(alertData);

        const fetchCList = async () => {
            const response = await service.getCategories();
            if (response.status === 200) {
                let data = response.data;
                data.push({
                    data: {name: 'All', branchID: '', icon: shrimp_logo}, id: ''
                })
                return setCList(data);
            }
            return setaler({
                message: response.data,
                success: false,
                showAlert: !aler.showAlert
            })
        }

        useEffect(() => {
            fetchCList()
        }, []);

        const fetchItems = async () => {
            toggleLoad(true);
            const response = await service.getItems('IEFDIKzIJHVmQJ6yHhuw', 'ACTIVE', itemType.name === 'All' ? undefined : {
                name: itemType.name,
                icon: itemType.icon
            }, true);
            toggleLoad(false);
            if (response.status == 200) {
                setItems(response.data);
            } else {
                return setaler({
                    message: response.data,
                    success: false,
                    showAlert: !aler.showAlert
                })
            }
        };

        const searchItems = async (search: string) => {
            toggleLoad(true);
            const response = await service.search('IEFDIKzIJHVmQJ6yHhuw', search);
            toggleLoad(false);
            if (response.status == 200) {
                setItems(response.data);
            } else {
                return setaler({
                    message: response.data,
                    success: false,
                    showAlert: !aler.showAlert
                })
            }
        };

        const updateItemFav = async (
            itemID: string,
            fav: boolean
        ) => {
            toggleLoad(!load);
            const response = await service.updateItem(itemID, undefined, undefined, undefined, undefined, undefined, fav, undefined, undefined);
            console.log('resp', response);
            if (response.status === 200) {
                setaler({
                    message: 'Item removed from favorite',
                    success: false,
                    showAlert: !aler.showAlert
                })
                fetchItems()
            } else {
                return setaler({
                    message: response.data,
                    success: false,
                    showAlert: !aler.showAlert
                })
            }
        };

        const deleteItem = async (
            itemID: string,
            index: number
        ) => {
            toggleLoad(!load);
            const response = await service.updateItem(itemID, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 'DELETED');
            console.log('delete', response);
            if (response.status === 200) {
                setaler({
                    message: 'Item Deleted Successfully from menu',
                    success: false,
                    showAlert: !aler.showAlert
                })
                fetchItems()
            } else {
                return setaler({
                    message: response.data,
                    success: false,
                    showAlert: !aler.showAlert
                })
            }
        };


        const updateItem = async (data: Item, itemID: string) => {
            toggleLoad(!load);
            const response = await service.updateItem(
                itemID,
                data.name,
                data.description,
                data.ratings,
                data.price,
                data.itemImage,
                undefined,
                undefined,
                undefined
            );
            if (response.status === 200) {
                setaler({
                    message: 'Item Updated Successfully',
                    success: false,
                    showAlert: !aler.showAlert
                })
                return fetchItems()
            } else {
                return setaler({
                    message: response.data,
                    success: false,
                    showAlert: !aler.showAlert
                })
            }
        };


        useEffect(() => {
            fetchItems()
        }, [itemType]);

        function renderItems() {
            return <>
                <CategoryFrame
                    logo={items.length > 0 ? items[0].category.icon : itemType.icon}
                    title={items.length > 0 ? items[0].category.name : itemType.name}
                    search={{
                        searchBlur: () => {
                            setSearch("Search Items");
                            fetchItems();
                            return;
                        },
                        searchFocus: () => setSearch(''),
                        searchChange: (value) => {
                            if (search !== 'Search Items' && search.length > 0) {
                                searchItems(value);
                            }
                            setSearch(value)
                        },
                        searchText: search
                    }}/>
                {items.length === 0 && !load ?
                    <div className={'no_data_div'}>
                        <text>No Items</text>
                    </div> : <>
                        {load ?
                            <div className={'grid_div'}>
                                <Loader/>
                                <Loader/>
                                <Loader/>
                                <Loader/>
                                <Loader/>
                                <Loader/>
                            </div>
                            : items.map((ele, index) => {
                                return (
                                    <>
                                        {index === 0 ? null : <CategoryFrame
                                            logo={ele.category.icon}
                                            title={ele.category.name}
                                        />}
                                        <div className={'grid_div'}>
                                            {ele.items.map(el => <ItemComponent
                                                onUpdate={data => updateItem(data, el.id)}
                                                onDelete={() => deleteItem(el.id, index)}
                                                key={el.id}

                                                toggleFav={() => updateItemFav(el.id, !el.data.favorite)}
                                                src={el.data.itemImage !== undefined ? el.data.itemImage : ''}
                                                loading={load}
                                                Description={el.data.description}
                                                Value={el.data.price}
                                                favorite={el.data.favorite !== undefined ? el.data.favorite : false}
                                                Name={el.data.name}
                                                Rating={el.data.ratings}/>)}
                                        </div>
                                    </>
                                )
                            })
                        }
                    </>}
            </>
        }

        return (
            <div className={'allItems favourites'}>
                <text className={'main_heading'}>Favourites</text>
                <div>
                    <div>
                        <ItemTypeDropDown categories={Clist} selected={itemType} onSelectItem={setItemType}
                                          type={'LIGHT'}/>
                    </div>
                    {renderItems()}
                </div>
                <AlertBox message={aler.message}
                          success={aler.success}
                          handleClose={() => setaler({
                              message: aler.message,
                              success: aler.success,
                              showAlert: !aler.showAlert,
                          })}
                          show={aler.showAlert}/>
            </div>
        );
    };

export default Favorites;
