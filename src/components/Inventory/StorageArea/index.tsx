import React, {FunctionComponent, useEffect, useState} from 'react';
import './storageArea.css'
import EntryFieldContainer from "../../common/EntryFieldContainer";
import DropDownTextInput from "../../Reservation/DropDownTextInput";
import {calender_icon, female_icon} from "../../../Assets/reservation";
import Loader from "../../Reservation/ListItem/Loader";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleDown} from "@fortawesome/free-solid-svg-icons";
import {fridge_icon, inventoryItems_icon, mop_icon} from "../../../Assets/Inventory";
import ListFrame from "../../common/frames/ListFrame";
import {storageListFrame, supplierlistFrame} from "../../../constants/data";
import ListItem from "./ListItem";
import {PlainListDropDown} from "../common/PlainListDropDown";
import StorageService from "./services";

let service = new StorageService();
type Storage = {
    name: string,
    cleaningSchedule: string,
    LCD: Date | null
    EIC: {
        id: string,
        name: string
    },
}
type Props = {
    storages?: Array<{ data: Storage, id: string }>,
    loading?: boolean,
    postStorageData?: {
        name: string,
        cleaningSchedule: string,
        LCD: Date | null,
        EIC: {
            id: string,
            name: string
        }
    },
    assignStorageData?: {
        item: {
            id: string,
            name: string
        },
        storage: {
            id: string,
            name: string
        }
    },
    date?: Date | null,
};

const Storage: FunctionComponent<Props> =
    ({
         storages = [],
         loading = true,
         postStorageData = {
             name: 'Enter Name',
             cleaningSchedule: 'Days',
             LCD: new Date(),
             EIC: {
                 id: '',
                 name: 'Select Employee'
             }
         },
         assignStorageData = {
             item: {
                 id: '',
                 name: 'Select Item'
             },
             storage:
                 {
                     id: '',
                     name: 'Select Storage'
                 }
         },
         date = new Date()
     }) => {
        const [list, setList] = useState(storages);
        const [load, toggleLoad] = useState(loading);
        const [data, setData] = useState(postStorageData);
        const [data2, setData2] = useState(assignStorageData);
        const [cleanDate, setCleanDate] = useState(date);

        // const fetchStorage = async () => {
        //   toggleLoad(true);
        //   const response = await service.getSuppliers('14aHVVBC53PWPtzxGpfs');
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

        const postStorage = async () => {
            if (data.name === 'Enter Name' || data.name === '') {
                return alert('Storage Name Required')
            }
            if (data.cleaningSchedule === 'Days' || data.cleaningSchedule === '') {
                return alert('Cleaning Schedule Required')
            }
            if (data.EIC.name === 'Select Employee') {
                return alert('Employee In Charge Required')
            }
            const response = await service.createStorage('IEFDIKzIJHVmQJ6yHhuw',
                data.name,
                data.cleaningSchedule,
                data.LCD !== null ? data.LCD : new Date(),
                data.EIC);
            return alert(response.data);
        };

        const assignStorage = async () => {
            //TODO: Assign Storage
            if (data2.storage.name === 'Select Storage') {
                return alert('Storage Required')
            }
            if (data2.item.name === 'Select Item') {
                return alert('Select Item')
            }
            console.log(JSON.stringify(data2));
        };

        return <div className={'storageArea_parent'}>
            <EntryFieldContainer
                style={'storageArea_entry_style'}
                onSubmit={postStorage}
                gridStyle={'storageArea_entry_grid_style'}
                heading={'Add Storage'}
                buttonTitle={'Add Storage'}
            >
                <DropDownTextInput
                    type={'Text'}
                    dropDown={false}
                    title={'Storage Name'}
                    icon={inventoryItems_icon}
                    onChange={(event) =>
                        setData({
                            name: event.target.value,
                            cleaningSchedule: data.cleaningSchedule,
                            LCD: data.LCD,
                            EIC: data.EIC
                        })}
                    onblur={() => {
                        if (data.name === "" || data.name === " ") {
                            setData({
                                name: "Enter Name",
                                cleaningSchedule: data.cleaningSchedule,
                                LCD: data.LCD,
                                EIC: data.EIC
                            });
                        }
                        return;
                    }}
                    onfocus={() => {
                        if (data.name !== "Enter Name") return;
                        setData({
                            name: '',
                            cleaningSchedule: data.cleaningSchedule,
                            LCD: data.LCD,
                            EIC: data.EIC
                        })
                    }}
                    value={data.name}/>
                <DropDownTextInput
                    type={'Text'}
                    dropDown={false}
                    title={'Cleaning Schedule'}
                    icon={mop_icon}
                    onChange={(event) =>
                        setData({
                            name: data.name,
                            cleaningSchedule: event.target.value,
                            LCD: data.LCD,
                            EIC: data.EIC
                        })}
                    onblur={() => {
                        if (data.cleaningSchedule === "" || data.cleaningSchedule === " ") {
                            setData({
                                cleaningSchedule: "Days",
                                name: data.name,
                                LCD: data.LCD,
                                EIC: data.EIC
                            });
                        }
                        return;
                    }}
                    onfocus={() => {
                        if (data.cleaningSchedule !== "Days") return;
                        setData({
                            cleaningSchedule: '',
                            LCD: data.LCD,
                            name: data.name,
                            EIC: data.EIC
                        })
                    }}
                    value={data.cleaningSchedule}/>
                <DropDownTextInput
                    arrowColor={'#fff'}
                    dropDown={true}
                    type={'Date'}
                    title={'Last Cleaned Date'}
                    calendarstyle={'storage_date_style'}
                    icon={calender_icon}
                    style={'storage_calendar_style'}
                    date={cleanDate} setDate={(date) => setCleanDate(date)}
                />
                <PlainListDropDown
                    selected={data.EIC.name}
                    title={'Employee In Charge'}
                    onSelectItem={selected => {
                        setData({
                                LCD: data.LCD,
                                name: data.name,
                                cleaningSchedule: data.cleaningSchedule,
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
                onSubmit={assignStorage}
                style={'storageArea_entry_style'}
                gridStyle={'storageArea_entry_grid_style_2'}
                heading={'Assign Storage'}
                buttonTitle={'Assign Storage'}
            >
                <PlainListDropDown
                    selected={data2.item.name}
                    title={'Select Unassigned Item'}
                    onSelectItem={selected => {
                        setData2({
                                item: {
                                    id: selected.id,
                                    name: selected.data.name
                                },
                                storage: data2.storage
                            }
                        )
                    }}
                    logo={inventoryItems_icon}
                    listType={'ITEMS'}/>
                <PlainListDropDown
                    selected={data2.storage.name}
                    title={'Select Storage'}
                    onSelectItem={selected => {
                        setData2({
                            item: data2.item,
                            storage: {
                                id: selected.id,
                                name: selected.data.name
                            },
                        })
                    }}
                    logo={inventoryItems_icon}
                    listType={'STORAGE'}/>
            </EntryFieldContainer>
            <div>
                <div>
                    <ListFrame style={'storageListFrame'} list={storageListFrame}/>
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

export default Storage;
