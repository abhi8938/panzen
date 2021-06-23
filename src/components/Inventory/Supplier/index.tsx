import React, {FunctionComponent, useEffect, useState} from 'react';
import './supplier.css'
import EntryFieldContainer from "../../common/EntryFieldContainer";
import DropDownTextInput from "../../Reservation/DropDownTextInput";
import {calender_icon, female_icon} from "../../../Assets/reservation";
import SearchBar from "../../common/SearchBar";
import Loader from "../../Reservation/ListItem/Loader";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleDown} from "@fortawesome/free-solid-svg-icons";
import {contact_icon, mail_icon} from "../../../Assets/Inventory";
import RawItemDropDown from "../common/RawItemDropDown";
import ACDetails, {DetailsType} from "./ACDetails";
import ListFrame from "../../common/frames/ListFrame";
import {supplierlistFrame} from "../../../constants/data";
import ListItem from "./ListItem";
import SupplierService from "./services";

let service = new SupplierService();
type Supplier = {
    bookingTime: Date,
    supplierName: string,
    supplierContact: string,
    supplierMail: string
    Items: Array<string>,
    method: 'CASH' | 'BANKING',
}
type Props = {
    searchText?: string,
    date?: Date | null,
    suppliers?: Array<{ data: Supplier, id: string }>,
    loading?: boolean,
    postData?: {
        [key: string]: string | Array<{id:string,name:string}>,
        name: string,
        contact: string,
        mail: string,
        items: Array<{id:string,name:string}>
    }
    AccountData?: {
        method: 'CASH' | 'BANKING',
        details?: DetailsType
    }

};

const Supplier: FunctionComponent<Props> =
    ({
         searchText = 'Search Supplier',
         date = new Date(),
         suppliers = [],
         loading = true,
         postData = {
             name: 'Enter Name',
             contact: 'Enter Contact',
             mail: 'Mail@mail.com',
             items: []
         },
         AccountData = {
             method: 'CASH',
         }
     }) => {
        const [list, setList] = useState(suppliers);
        const [search, changeSearch] = useState(searchText);
        const [load, toggleLoad] = useState(loading);
        const [data, setData] = useState(postData);
        const [ACData, setACData] = useState(AccountData);

        const fetchSuppliers = async () => {
            toggleLoad(true);
            const response = await service.getSuppliers();
            toggleLoad(false);
            if (response.status == 200) {
                setList(response.data);
            } else {
                alert(response.data);
            }
        };

        useEffect(() => {
            fetchSuppliers()
        }, []);

        useEffect(() => {
            console.log('details ', ACData);
        }, [ACData]);

        const postSupplier = async () => {
            if (data.name === '' || data.name === 'Enter Name') {
                return alert('Empty Name')
            }
            if (data.contact === '' || data.contact === 'Enter Contact') {
                return alert('Empty Contact')
            }
            if (data.mail === '' || data.mail === 'Mail@mail.com') {
                return alert('Empty Email')
            }
            if (data.items.length === 0) {
                return alert('Items Reguired')
            }

            const response = await service.createSupplier(
                'IEFDIKzIJHVmQJ6yHhuw',
                data.name,
                data.contact,
                data.mail,
                data.items,
                ACData.method,
                ACData.details !== undefined ? ACData.details : undefined
            );
            console.log('createS', response);
            return alert(response.data);
        };

        const deleteSupplier = async (
            supplierID: string,
            index: number
        ) => {
            toggleLoad(!load);
            const response = await service.updateSuppliers(supplierID, undefined, undefined, undefined, undefined, undefined, undefined, "DELETED");
            console.log('delete', response);
            if (response.status === 200) {
                fetchSuppliers()
            } else {
                return alert(response.data);
            }
        };

        const searchSuppliers = async (search: string) => {
            toggleLoad(true);
            const response = await service.search('IEFDIKzIJHVmQJ6yHhuw', search);
            toggleLoad(false);
            if (response.status == 200) {
                setList(response.data);
            } else {
                alert(JSON.stringify(response.data));
            }
        };

        return <div className={'supplier_parent'}>
            <EntryFieldContainer
                buttonTitle={'Create Supplier'}
                onSubmit={postSupplier}
                gridStyle={'supplier_entry_style'}
                heading={'Create Supplier'}>
                <DropDownTextInput
                    type={'Text'}
                    dropDown={false}
                    title={'Name'}
                    icon={female_icon}
                    onChange={(event) =>
                        setData({name: event.target.value, contact: data.contact, mail: data.mail, items: data.items})}
                    onblur={() => {
                        if (data.name === "" || data.name === " ") {
                            setData({name: "Enter Name", contact: data.contact, mail: data.mail, items: data.items});
                        }
                        return;
                    }}
                    onfocus={() => {
                        if (data.name !== "Enter Name") return;
                        setData({name: '', contact: data.contact, mail: data.mail, items: data.items})
                    }}
                    value={data.name}/>
                <DropDownTextInput
                    type={'Text'}
                    dropDown={false}
                    title={'Contact Number'}
                    icon={contact_icon}
                    onChange={(event) =>
                        setData({name: data.name, contact: event.target.value, mail: data.mail, items: data.items})}
                    onblur={() => {
                        if (data.contact === "" || data.contact === " ") {
                            setData({contact: "Enter Contact", name: data.name, mail: data.mail, items: data.items});
                        }
                        return;
                    }}
                    onfocus={() => {
                        if (data.contact !== "Enter Contact") return;
                        setData({contact: '', mail: data.mail, name: data.name, items: data.items})
                    }}
                    value={data.contact}/>
                <DropDownTextInput
                    type={'Text'}
                    dropDown={false}
                    title={'Mail Id'}
                    icon={mail_icon}
                    onChange={(event) =>
                        setData({mail: event.target.value, name: data.name, contact: data.contact, items: data.items})}
                    onblur={() => {
                        if (data.mail === "" || data.mail === " ") {
                            setData({mail: "Mail@mail.com", name: data.name, contact: data.contact, items: data.items});
                        }
                        return;
                    }}
                    onfocus={() => {
                        if (data.mail !== "Mail@mail.com") return;
                        setData({mail: '', name: data.name, contact: data.contact, items: data.items})
                    }}
                    value={data.mail}/>
                <RawItemDropDown
                    onDeleteItem={selected => {
                        const items = data.items;
                        items.splice(items.indexOf(selected), 1);
                        setData({mail: data.mail, name: data.name, contact: data.contact, items: items})
                    }}
                    items={data.items}
                    onAddItem={selected => {
                        const items = data.items;
                        items.push(selected);
                        setData({mail: data.mail, name: data.name, contact: data.contact, items: items})
                    }}
                    quantity={false}

                />
                <ACDetails
                    addDetails={details => setACData(details)}
                />
            </EntryFieldContainer>
            <div>
                <div>
                    <SearchBar
                        value={search}
                        onChange={(value) => changeSearch(value)}
                        onblur={() => {
                            if (search === "" || search === " ") {
                                changeSearch("Search Supplier");
                            }
                            return;
                        }}
                        width={'20%'}
                        onfocus={() => {
                            if (search !== "Search Supplier") return;
                            changeSearch('')
                        }
                        }/>
                </div>
                <div>
                    <ListFrame style={'supplierListFrame'} list={supplierlistFrame}/>
                    {load ?
                        <div>
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

export default Supplier;
