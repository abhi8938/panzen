import React, {FunctionComponent, useEffect, useState} from 'react';
import TopTabBar from "../common/TopTabBar";
import {AllItemsTabBars as toplist, itemTypes as types} from "../../constants/data";
import ItemComponent from "../common/ItemComponent";
import Loader from "../common/ItemComponent/Loader";

import './allItems.css'
import {ItemTypeDropDown} from "../common/ItemTypeDropDown";
import {shrimp_logo} from "../../Assets/AllItems";
import CategoryFrame from "../common/frames/CategoryFrame";
import ItemService from "./services";
import AddNewItem from "./AddNewItem";
import AlertBox, {alertProps} from "../common/AlertBox";
import arrayMove from "array-move";

const service = new ItemService();
export type Item = {
    branchID?: string,
    itemImage: string,
    availablity?: boolean,
    price: number,
    name: string,
    description: string,
    ratings: number,
    category?: string,
    favorite?: boolean,
    status?: string,
    createdAt?: Date
}
type Props = {
    tab: string,
    loading: boolean,
    list: Array<{ category: { name: string, icon: string }, items: Array<{ id: string, data: any }> }>,
    itemTypeSelected?: {
        branchID: string,
        name: string,
        icon: string,
    },
    searchInput?: string,
    categories: Array<{
        data: any,
        id: string
    }>;
    alertData: alertProps
};

const AllItems: FunctionComponent<Props> =
    ({
         tab = toplist[0],
         list = [],
         loading = false,
         itemTypeSelected = {
             branchID: '',
             name: 'All',
             icon: shrimp_logo
         },
         searchInput = 'Search Items',
         categories = [{
             data: {name: 'All', branchID: '', icon: shrimp_logo}, id: ''
         }],
         alertData = {
             showAlert: false,
             message: '',
             title: '',
             success: false
         }
     }) => {
        const [selectedTab, toggleTab] = useState(tab);
        const [load, toggleLoad] = useState(loading);
        const [items, setItems] = useState(list);
        const [itemType, setItemType] = useState(itemTypeSelected);
        const [search, setSearch] = useState(searchInput);
        const [Clist, setCList] = useState(categories);
        const [aler, setaler] = useState(alertData);


        const fetchItems = async (loadO: boolean) => {
            toggleLoad(loadO);
            const response = await service.getItems(
                'IEFDIKzIJHVmQJ6yHhuw',
                selectedTab === 'Active Items' ? 'ACTIVE' : 'DELETED',
                itemType.name === 'All' ? undefined : {name: itemType.name, icon: itemType.icon},
                undefined);
            toggleLoad(false);
            if (response.status == 200) {
                let orderedlist: Array<any> = response.data;
                orderedlist.sort((a, b) => {
                    if (a.category.name > b.category.name) return 1;
                    if (a.category.name < b.category.name) return -1;
                    return 0;
                });
                return setItems(orderedlist);

            } else {
                return setaler({
                    message: response.data,
                    success: false,
                    showAlert: !aler.showAlert
                })
            }
        };

        const fetchCList = async () => {
            const response = await service.getCategories();
            if (response.status === 200) {
                let data: [{ data: { name: string, branchID: string, icon: string }, id: string }] = response.data;
                data.push({
                    data: {name: 'All', branchID: '', icon: shrimp_logo}, id: ''
                })
                data.reverse()
                return setCList(data);
            }
        }

        useEffect(() => {
            fetchCList()
            fetchItems(true)
        }, [selectedTab]);

        useEffect(() => {
            if (itemType.name === 'All') {
                fetchItems(true)
            }
            let selectedIndex;
            let reorderedList: Array<any> = items;

            reorderedList.sort((a, b) => {
                if (a.category.name > b.category.name) return 1;
                if (a.category.name < b.category.name) return -1;
                return 0;
            });

            reorderedList.map((item, index) => {
                if (item.category.name === itemType.name) {
                    selectedIndex = index
                }
                return
            })

            if (selectedIndex) {
                console.log('index', arrayMove(items, selectedIndex, 0));
                setItems(arrayMove(items, selectedIndex, 0))
            }

        }, [itemType]);

        const updateItemFav = async (
            itemID: string,
            fav: boolean
        ) => {
            const response = await service.updateItem(itemID, undefined, undefined, undefined, undefined, undefined, fav, undefined, undefined);
            if (response.status === 200) {
                setaler({
                    message: 'Item has been added to favorite',
                    success: true,
                    showAlert: !aler.showAlert
                })
                fetchItems(false)
            } else {
                return setaler({
                    message: response.data,
                    success: false,
                    showAlert: !aler.showAlert,
                });
            }
        };

        const deleteItem = async (
            itemID: string,
            index: number
        ) => {
            toggleLoad(!load);
            const response = await service.updateItem(itemID, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 'DELETED');
            if (response.status === 200) {
                setaler({
                    message: 'Item has been removed from the menu successfully',
                    success: true,
                    showAlert: !aler.showAlert
                })
                fetchItems(true)
            } else {
                return setaler({
                    message: response.data,
                    success: false,
                    showAlert: !aler.showAlert,
                });
            }
        };

        const searchItems = async (search: string) => {
            toggleLoad(true);
            const response = await service.search('IEFDIKzIJHVmQJ6yHhuw', search);
            toggleLoad(false);
            if (response.status == 200) {
                setItems(response.data);
            } else {
                setaler({
                    message: JSON.stringify(response.data),
                    success: false,
                    showAlert: !aler.showAlert,
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
                    message: 'Item has been Updated Successfully',
                    success: true,
                    showAlert: !aler.showAlert
                })
                return fetchItems(true)
            } else {
                return setaler({
                    message: response.data,
                    success: false,
                    showAlert: !aler.showAlert
                })
            }
        };

        function renderItems() {
            return <>
                <CategoryFrame
                    logo={items.length > 0 ? items[0].category.icon : itemType.icon}
                    title={items.length > 0 ? items[0].category.name : itemType.name}
                    search={{
                        searchBlur: () => {
                            // if (search.length === 0) {
                            setSearch("Search Items");
                            fetchItems(true);
                            // }
                            return;
                        },
                        searchFocus: () => {
                            setSearch('')
                        },
                        searchChange: (value) => {
                            if (search !== 'Search Items' && search.length !== 0) {
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
            <div className={'allItems'}>
                <text className={'main_heading'}>All items</text>
                <div>
                    <div>
                        <TopTabBar
                            list={toplist}
                            selectedTab={selectedTab}
                            onToggle={(selected: string) => {
                                toggleTab(selected)
                            }}/>
                        {selectedTab === 'Add New Items' ? null :
                            <ItemTypeDropDown
                                selected={itemType}
                                onSelectItem={setItemType}
                                categories={Clist}
                                type={'LIGHT'}/>}
                    </div>
                    {selectedTab === 'Active Items' || selectedTab === 'Deleted Items' ? renderItems() : null}
                    {selectedTab === 'Add New Items' ?
                        <AddNewItem
                            ratingStyle={'add_item_rating'}
                            inModal={false}
                            style={'add_new_item'}/> : null}
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

export default AllItems;
