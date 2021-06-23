import React, {FunctionComponent, useState} from 'react';
import EntryFieldContainer from "../../common/EntryFieldContainer";
import ListFrame from "../../common/frames/ListFrame";
import {inventoryOrdersListFrame, OrdersDropDownList, OrdersTabBars} from "../../../constants/data";
import Loader from "../../Reservation/ListItem/Loader";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleDown} from "@fortawesome/free-solid-svg-icons";
import Supplier from "../Supplier";
import ListItem from "./ListItem";
import './iOrders.css';
import TopTabBar from "../../common/TopTabBar";
import {DropDown, selectedType} from "../../Dinein/DropDown";
import {comments_icon, inventoryItems_icon, quotation_icon, supplier_icon} from "../../../Assets/Inventory";
import DropDownTextInput from "../../Reservation/DropDownTextInput";
import {PlainListDropDown} from "../common/PlainListDropDown";
import {CustomButton} from "../../Login/CustomButton";
import RawItemDropDown from "../common/RawItemDropDown";

type Props = {
    loading?: boolean,
    tab?: string,
    orders?: Array<{ data: Supplier, id: string }>,
    selected?: selectedType,
    entryList?: {
        set: Array<{
            id: number,
            title: string,
            value: any,
            items?: Array<{ id: string, name: string }>,
            placeholder: string,
            icon: any,
            list?: string
        }>
    }
};

const IOrders: FunctionComponent<Props> =
    ({
         loading = false,
         orders = [],
         tab = OrdersTabBars[0],
         selected = OrdersDropDownList[0],
         entryList = {set: DataFrame}
     }) => {
        const [load, setLoad] = useState(loading);
        const [list, setList] = useState(orders);
        const [selectedTab, toggleTab] = useState(tab);
        const [selectedItem, onSelect] = useState(selected);
        const [entries, setEntries] = useState(entryList);

        const postOrder = async () => {

        };

        return <div className={'orders_parent'}>
            <EntryFieldContainer
                buttonTitle={`Send Invoice & Place Order`}
                onSubmit={postOrder}
                gridStyle={'orders_grid_style'}
                heading={'Place Order'}>
                {entries.set.map((element, index) => {
                    if (index === 0) {
                        return <PlainListDropDown
                            selected={element.value.name}
                            title={element.title}
                            onSelectItem={selected => {
                                let dataX = entries.set;
                                dataX[index] = {
                                    id: element.id,
                                    title: element.title,
                                    icon: element.icon,
                                    value: {id: selected.id, name: selected.data.name},
                                    placeholder: element.placeholder
                                };
                                setEntries({set: dataX});
                            }}
                            logo={element.icon}
                            listType={element.list !== undefined ? element.list : ''}/>
                    }
                    if (index === 1) {
                        return <RawItemDropDown
                            onDeleteItem={selected => {
                                const items = element.items !== undefined ? element.items : [];
                                items.splice(items.indexOf(selected), 1);
                                const dataX = entries.set;
                                dataX[index].items = items;
                                setEntries({set:dataX});
                            }}
                            items={element.items !== undefined ? element.items : []}
                            onAddItem={selected => {
                                const items = element.items !== undefined ? element.items : [];
                                items.push(selected);
                                const dataX = entries.set;
                                dataX[index].items = items;
                                setEntries({set:dataX});
                            }}
                            quantity={true}/>
                    }
                    if (index === 2) {
                        return <DropDownTextInput
                            type={'Text'}
                            dropDown={false}
                            title={element.title}
                            icon={element.icon}
                            onChange={(event) => {
                                let dataX = entries.set;
                                dataX[index] = {
                                    id: element.id,
                                    title: element.title,
                                    icon: element.icon,
                                    value: event.target.value,
                                    placeholder: element.placeholder
                                };
                                setEntries({set: dataX});
                            }}
                            onblur={() => {
                                if (element.value === "" || element.value === " ") {
                                    let dataX = entries.set;
                                    dataX[index] = {
                                        id: element.id,
                                        title: element.title,
                                        icon: element.icon,
                                        value: element.placeholder,
                                        placeholder: element.placeholder
                                    };
                                    setEntries({set: dataX});
                                }
                                return;
                            }}
                            onfocus={() => {
                                if (element.value !== element.placeholder) return;
                                let dataX = entries.set;
                                dataX[index] = {
                                    id: element.id,
                                    title: element.title,
                                    icon: element.icon,
                                    value: '',
                                    placeholder: element.placeholder
                                };
                                setEntries({set: dataX});
                            }}
                            value={element.value}/>
                    }
                })}
                <div>
                    <img src={quotation_icon}/>
                    <CustomButton title={'Invoice'} style={'invoice_button'}
                                  onclick={() => console.log('invoice clicked')}/>
                </div>
            </EntryFieldContainer>
            <div>
                <div>
                    <TopTabBar
                        list={OrdersTabBars}
                        selectedTab={selectedTab}
                        onToggle={(selected: string) => {
                            toggleTab(selected)
                        }}
                        style={'top_tab'}
                    />
                    <div>
                        <text>Sort by</text>
                        <DropDown list={OrdersDropDownList} selected={selectedItem} onSelectItem={onSelect}/>
                    </div>
                </div>
                <div>
                    <ListFrame style={'ordersListFrame'} list={inventoryOrdersListFrame}/>
                    {load ?
                        <div>
                            <Loader logo={true}/>
                            <Loader logo={true}/>
                            <Loader logo={true}/>
                            <Loader logo={true}/>
                        </div> : <ListItem/>}
                </div>
                {list.length >= 10 ? <FontAwesomeIcon
                    icon={faAngleDown}
                    className="reservation_arrow_icon"
                    color={'#fff'}
                    size={'2x'}
                    onClick={() => console.log('More')}
                /> : null}
            </div>
        </div>
    };

export default IOrders;

const DataFrame = [
    {
        id: 0,
        title: 'Select Supplier',
        value: {id: '', name: 'Select'},
        placeholder: 'Select',
        icon: supplier_icon,
        list: 'SUPPLIER'
    },
    {
        id: 1,
        title: 'Select Items',
        value: 'Select',
        placeholder: 'Select',
        items: [],
        list: 'ITEMS',
        icon: inventoryItems_icon
    },
    {
        id: 2,
        title: 'Comments',
        value: 'Add Comments',
        placeholder: 'Add Comments',
        icon: comments_icon
    }
];