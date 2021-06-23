import React, {FunctionComponent, useState} from 'react';
import EntryFieldContainer from "../../common/EntryFieldContainer";
import DropDownTextInput from "../../Reservation/DropDownTextInput";
import './wastage.css'
import {
    comments_icon,
    inventoryItems_icon, measurement_icon,
    menuItems_icon,
    units_icon
} from "../../../Assets/Inventory";
import {female_icon} from "../../../Assets/reservation";
import ListFrame from "../../common/frames/ListFrame";
import {wastageListFrame} from "../../../constants/data";
import Loader from "../../Reservation/ListItem/Loader";
import ListItem from "./ListItem";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleDown} from "@fortawesome/free-solid-svg-icons";
import {PlainListDropDown} from "../common/PlainListDropDown";
import WastageService from "./service";
import Nanobar from "../../common/Nanobar";

const service = new WastageService();
type Wastage = {
    name: string,
    quantity: string,
    reason: string,
    EIC: {
        id: string,
        name: string
    },
    type: 'ITEM' | 'INGREDIENTS',
    cost: string
}
type Props = {
    wastages?: Array<{ data: Wastage, id: string }>,
    loading?: boolean,
    actionLoading?: boolean,
    WItems?: {
        item: {
            id: string,
            name: string
        },
        units: string,
        reason: string,
        EIC: {
            id: string,
            name: string
        }
    },
    WIngredients?: {
        item: {
            id: string,
            name: string
        },
        units: string,
        reason: string,
        UOM: {
            id: string,
            name: string
        }
        EIC: {
            id: string,
            name: string
        }
    }
};

const Wastage: FunctionComponent<Props> =
    ({
         wastages = [],
         loading = true,
         WItems = {
             item: {
                 id: '',
                 name: 'Select Menu Item'
             },
             units: 'Units',
             reason: 'Add Comment',
             EIC: {
                 id: '',
                 name: 'Select Employee'
             }
         },
         WIngredients = {
             item: {
                 id: '',
                 name: 'Select Item'
             },
             UOM: {
                 id: '',
                 name: 'Units'
             },
             units: 'Units',
             reason: 'Add Comment',
             EIC: {
                 id: '',
                 name: 'Select Employee'
             }
         },
         actionLoading = false
     }) => {
        const [list, setList] = useState(wastages);
        const [load, toggleLoad] = useState(loading);
        const [data, setData] = useState(WItems);
        const [data2, setData2] = useState(WIngredients);
        const [action, setAction] = useState(actionLoading);

        // const fetchWastage = async () => {
        //   toggleLoad(true);
        //   const response = await service.getSuppliers('IEFDIKzIJHVmQJ6yHhuw');
        //   toggleLoad(false);
        //   if (response.status == 200) {
        //     setList(response.data);
        //   } else {
        //     alert(response.data);
        //   }
        // };
        //
        // useEffect(() => {
        //   fetchStorage()
        // }, []);

        const postWItems = async () => {
            if (data.item.name === 'Select Menu Item') {
                return alert('Item Required')
            }
            if (data.units === 'Units') {
                return alert('Unit Required')
            }
            if (data.reason === 'Add Comment') {
                return alert('Reason Required')
            }
            if (data.EIC.name === 'Select Employee') {
                return alert('Employee Required')
            }
            setAction(!action);
            const response = await service.createWastage(
                'IEFDIKzIJHVmQJ6yHhuw',
                {id:'unit',name:'UNIT'},
                data.item,
                data.reason,
                data.EIC,
                parseInt(data.units),
                'ITEM');
            setAction(!action);
            console.log('createWastageItem', response);
            return alert(response.data);
        };

        const postWIngredients = async () => {
            if (data2.item.name === 'Select Item') {
                return alert('Item Required')
            }
            if (data2.UOM.name === 'Units') {
                return alert('Unit of measurement Required')
            }
            if (data2.units === '' || data2.units === 'Units') {
                return alert('Units Required')
            }
            if (data2.reason === '' || data2.reason === 'Add Comment') {
                return alert('Reason Required')
            }
            if (data2.EIC.name === 'Select Employee') {
                return alert('Employee Required')
            }
            setAction(!action);
            const response = await service.createWastage(
                'IEFDIKzIJHVmQJ6yHhuw',
                data2.UOM,
                data2.item,
                data2.reason,
                data2.EIC,
                parseInt(data2.units),
                'INGREDIENT');
            setAction(!action);
            console.log('createWastageIngredient', response);
            return alert(response.data);
        };

        return <div className={'wastage_parent'}>
            <Nanobar loading={action}/>
            <EntryFieldContainer
                style={'wastage_entry_style'}
                onSubmit={postWItems}
                gridStyle={'wastage_entry_grid_style'}
                heading={'Report Wastage - Menu Items'}
                buttonTitle={'Report Wastage'}
            >
                <PlainListDropDown
                    selected={data.item.name}
                    title={'Item'}
                    onSelectItem={selected => {
                        setData({
                            item: {
                                id: selected.id,
                                name: selected.data.name
                            },
                            units: data.units,
                            reason: data.reason,
                            EIC: data.EIC,
                        })
                    }}
                    logo={menuItems_icon}
                    listType={'ITEMS_MENU'}/>
                <DropDownTextInput
                    type={'Text'}
                    dropDown={false}
                    title={'Enter Units'}
                    icon={units_icon}
                    onChange={(event) => setData({
                        item: data.item,
                        units: event.target.value,
                        reason: data.reason,
                        EIC: data.EIC
                    })}
                    onblur={() => {
                        if (data.units === "" || data.units === " ") {
                            setData({
                                units: "Units",
                                item: data.item,
                                reason: data.reason,
                                EIC: data.EIC
                            });
                        }
                        return;
                    }}
                    onfocus={() => {
                        if (data.units !== "Units") return;
                        setData({
                            units: '',
                            reason: data.reason,
                            item: data.item,
                            EIC: data.EIC
                        })
                    }}
                    value={data.units}/>
                <DropDownTextInput
                    type={'Text'}
                    dropDown={false}
                    title={'Reason for wastage'}
                    icon={comments_icon}
                    onChange={(event) => setData({
                        reason: event.target.value,
                        item: data.item,
                        units: data.units,
                        EIC: data.EIC
                    })}
                    onblur={() => {
                        if (data.reason === "" || data.reason === " ") {
                            setData({
                                reason: "Add Comment",
                                item: data.item,
                                units: data.units,
                                EIC: data.EIC
                            });
                        }
                        return;
                    }}
                    onfocus={() => {
                        if (data.reason !== "Add Comment") return;
                        setData({
                            reason: '',
                            item: data.item,
                            units: data.units,
                            EIC: data.EIC
                        })
                    }}
                    value={data.reason}/>
                <PlainListDropDown
                    selected={data.EIC.name}
                    title={'Employee In Charge'}
                    onSelectItem={selected => {
                        setData({
                                reason: data.reason,
                                item: data.item,
                                units: data.units,
                                EIC: {
                                    id: selected.id,
                                    name: selected.data.name,
                                }
                            }
                        )
                    }}
                    logo={female_icon}
                    listType={'EMPLOYEE'}/>
            </EntryFieldContainer>
            <EntryFieldContainer
                onSubmit={postWIngredients}
                style={'wastage_entry_style'}
                gridStyle={'wastage_entry_grid_style_2'}
                heading={'Report Wastage - Ingredients'}
                buttonTitle={'Report Wastage'}
            >
                <PlainListDropDown
                    selected={data2.item.name}
                    title={'Item'}
                    onSelectItem={selected => {
                        setData2({
                            item: {
                                id: selected.id,
                                name: selected.data.name
                            },
                            UOM: data2.UOM,
                            units: data2.units,
                            reason: data2.reason,
                            EIC: data2.EIC,
                        })
                    }}
                    logo={inventoryItems_icon}
                    listType={'ITEMS'}/>
                <PlainListDropDown
                    selected={data2.UOM.name}
                    title={'Select UOM'}
                    onSelectItem={selected => {
                        setData2({
                            item: data2.item,
                            UOM: {
                                id: selected.id,
                                name: selected.data.name
                            },
                            units: data2.units,
                            reason: data2.reason,
                            EIC: data2.EIC,
                        })
                    }}
                    logo={units_icon}
                    listType={'Units'}/>
                <DropDownTextInput
                    type={'Text'}
                    dropDown={false}
                    title={'Enter Units'}
                    icon={units_icon}
                    onChange={(event) => setData2({
                        item: data2.item,
                        units: event.target.value,
                        reason: data2.reason,
                        UOM: data2.UOM,
                        EIC: data2.EIC,
                    })}
                    onblur={() => {
                        if (data2.units === "" || data2.units === " ") {
                            setData2({
                                item: data2.item,
                                units: 'Units',
                                reason: data2.reason,
                                EIC: data2.EIC,
                                UOM: data2.UOM
                            });
                        }
                        return;
                    }}
                    onfocus={() => {
                        if (data2.units !== "Units") return;
                        setData2({
                            item: data2.item,
                            units: '',
                            reason: data2.reason,
                            EIC: data2.EIC,
                            UOM: data2.UOM
                        });
                    }}
                    value={data2.units}/>
                <DropDownTextInput
                    type={'Text'}
                    dropDown={false}
                    title={'Reasons for wastage'}
                    icon={comments_icon}
                    onChange={(event) => setData2({
                        item: data2.item,
                        units: data2.units,
                        reason: event.target.value,
                        EIC: data2.EIC,
                        UOM: data2.UOM
                    })}
                    onblur={() => {
                        if (data2.reason === "" || data2.reason === " ") {
                            setData2({
                                item: data2.item,
                                units: data2.units,
                                reason: 'Add Comment',
                                EIC: data2.EIC,
                                UOM: data2.UOM
                            });
                        }
                        return;
                    }}
                    onfocus={() => {
                        if (data2.reason !== "Add Comment") return;
                        setData2({
                            item: data2.item,
                            units: data2.units,
                            reason: '',
                            EIC: data2.EIC,
                            UOM: data2.UOM
                        });
                    }}
                    value={data2.reason}/>
                <PlainListDropDown
                    selected={data2.EIC.name}
                    title={'Employee In Charge'}
                    onSelectItem={selected => {
                        setData2({
                                item: data2.item,
                                units: data2.units,
                                reason: data2.reason,
                                EIC: {
                                    id: selected.id,
                                    name: selected.data.name,
                                },
                                UOM: data2.UOM
                            }
                        )
                    }}
                    logo={female_icon}
                    listType={'EMPLOYEE'}/>
            </EntryFieldContainer>
            <div>
                <div>
                    <ListFrame style={'wastageListFrame'} list={wastageListFrame}/>
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

export default Wastage;
