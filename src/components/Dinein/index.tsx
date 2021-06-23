import React, {FunctionComponent, useEffect, useState} from 'react';
import './dineIn.css'
import TableComponent from "./TableComponent";
import {DropDown, selectedType} from "./DropDown";
import {TABLE} from "../../Assets/DineIn";
import app from "firebase";
import Loader from "./TableComponent/Loader";
import Nanobar from "../common/Nanobar";
import DineInService from "./services";

let service = new DineInService();
type table = {
    branchID: string,
    number: number,
    status: 'ACTIVE' | 'INACTIVE' | 'RESERVED',
    captainAssigned: string,
    onGoingReservation: string,
    orders: string,
    onGoingOrders: string,
    createdAt: Date,
    Add?: () => void
}

type Props = {
    selected?: selectedType,
    loading?: boolean,
    tables?: Array<{ id: string, data: table }>,
    actionLoader?: boolean
};
let unsubscribe: any;

const DineIn: FunctionComponent<Props> =
    ({
         selected = {
             id: 0, title: 'Table No', logo: TABLE
         },
         loading = true,
         tables = [],
         actionLoader = false
     }) => {
        const [selectedItem, onSelect] = useState(selected);
        const [load, toggleLoad] = useState(loading);
        const [list, setList] = useState(tables);
        const [action, setAction] = useState(actionLoader);

        const postTable = async (number: number, capacity: number) => {
            console.log('create', number);
            setAction(!action);
            const response = await service.createTable(number, capacity);
            setAction(!action);
            return alert(response.data);
        };

        useEffect(() => {
            toggleLoad(true);
            unsubscribe = app.firestore()
                .collection(`tables-IEFDIKzIJHVmQJ6yHhuw`)
                .onSnapshot(querySnapshot => {
                    const tables: Array<{ id: string, data: any }> = [];
                    querySnapshot.docs.map(el => {
                        tables.push({id: el.id, data: el.data()})
                    });
                    tables.push({
                        id: 'NEW_TABLE',
                        data: {
                            number: tables.length + 1,
                            status: 'NEW',
                            Add: () => postTable(tables.length, 4)
                        }
                    });
                    setList(tables);
                    toggleLoad(false);
                }, err => {
                    console.log(`Encountered error: ${err}`);
                });

        }, []);

        return (
            <div className={'dinein_parent'}>
                <Nanobar loading={action}/>
                <text className={'main_heading'}>DineIn</text>
                <div>
                    <text>Sort by</text>
                    <DropDown selected={selectedItem} onSelectItem={onSelect}/>
                </div>
                <div>
                    {load == true ?
                        <>
                            <Loader/>
                            <Loader/>
                            <Loader/>
                            <Loader/>
                            <Loader/>
                            <Loader/>
                        </>
                        : list.map(el => <TableComponent
                            AddTable={el.data.Add !== undefined ? el.data.Add : undefined}
                            number={el.data.number}
                            currentState={el.data.status}/>)}
                </div>
            </div>
        );
    };

export default DineIn;
