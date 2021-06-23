import React, {FunctionComponent, useState} from 'react';
import EntryFieldContainer from "../../common/EntryFieldContainer";
import DropDownTextInput from "../../Reservation/DropDownTextInput";
import './inventoryItems.css'
import {
    category_icon,
    fridge_icon,
    inventoryItems_icon,
    measurement_icon,
    price_icon,
    shelfLife_icon,
    units_icon
} from "../../../Assets/Inventory";
import {InventoryItemsDropDownList} from "../../../constants/data";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleDown} from "@fortawesome/free-solid-svg-icons";
import {trash_image} from "../../../Assets/AllItems";
import SearchBar from "../../common/SearchBar";
import {DropDown} from "../../Dinein/DropDown";
import PagingList from "../../common/PagingList";
import InventoryItemServices from "./services";
import {PlainListDropDown} from "../common/PlainListDropDown";

let service = new InventoryItemServices();

type InventoryItem = {
    item: string,
    units: string,
    cost: string,
    status?: 'Good' | 'Bad' | 'Ok'
}

type NewInventoryItem = {
    name: string,
    life: string,
    category: {
        id: string,
        name: string
    },
    pricePerUnit: string,
    UOM: {
        id: string,
        name: string
    },
    storage: {
        id: string,
        name: string
    },
    UIH: string,
}

type Props = {
    inventoryItems?: Array<{ data: InventoryItem, id: string }>,
    loading?: boolean,
    searchText?: string,
    sortData?: {
        id: number,
        title: string,
        logo: any
    },
};

const InventoryItems: FunctionComponent<Props> =
    ({
         inventoryItems = [],
         loading = true,
         searchText = 'Search Name',
         sortData = InventoryItemsDropDownList[0]
     }) => {
        const [list, setList] = useState(inventoryItems);
        const [load, toggleLoad] = useState(loading);
        const [search, setSearch] = useState(searchText);
        const [sort, setSort] = useState(sortData);

        // const fetchInventoryItems = async () => {
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

        const fetchCategories_units = async (type: 'Categories' | 'Units') => {
            const response = await service.getCategories_unit('IEFDIKzIJHVmQJ6yHhuw', type);
            console.log('getC-U', response);
            return alert(response.data);
        };
        const postCategory_unit = async (data: { input: string, default: boolean }, type: 'Categories' | 'Unit') => {
            const response = await service.createCategory_unit('IEFDIKzIJHVmQJ6yHhuw', data.input, data.default, type);
            return alert(response.data);
        };
        const postAddItem = () => {

        };
        const postItem = async (data: NewInventoryItem) => {
            console.log('createInventoryItemdata', data);

            if (data.category.name === '' || data.category.name === 'Select Category') {
                return alert('Category Required');
            }
            if (data.name === '' || data.name === 'Enter Name') {
                return alert('Name Required');
            }
            if (data.life === '' || data.name === 'Enter Shelf Life') {
                return alert('Shelf Life Required');
            }
            if (data.pricePerUnit === '' || data.name === 'Enter Price') {
                return alert('Price Per Unit Required');
            }
            if (data.UIH === '' || data.name === 'Enter Units') {
                return alert('Unit in Hands Required');
            }
            if (data.UOM.name === '' || data.UOM.name === 'Select') {
                return alert('UOM Required');
            }
            if (data.storage.name === '' || data.storage.name === 'Select Storage') {
                return alert('Storage Required');
            }
            const response = await service.createInventoryItem('IEFDIKzIJHVmQJ6yHhuw',
                data.name,
                parseInt(data.life),
                data.category,
                parseInt(data.pricePerUnit),
                data.UOM,
                data.storage,
                parseInt(data.UIH));
            console.log('createInventoryItem', response);
            return alert(response.data);

        };

        return <div className={'InventoryItem_parent'}>
            <InventoryCommon
                MainHeading={'Category'}
                MainLogo={category_icon}
                Input={{
                    MainHeading: 'Create Category',
                    InputHeading: 'Category Name',
                    InputLogo: category_icon,
                    buttonTitle: 'Create Category',
                    onClick: (data) => postCategory_unit(data, "Categories"),
                    value: 'Enter Name',
                }}
                List={{
                    MainHeading: 'Listed Category',
                    subHeading: 'Category Names',
                    data: [{name: 'Vegetable', id: 'dsadasda', default: false}],
                    onDelete: (item) => {
                        console.log(item)
                    }
                }}/>
            <InventoryCommon
                MainHeading={'Category'}
                MainLogo={measurement_icon}
                Input={{
                    MainHeading: 'Create Unit',
                    InputHeading: 'Unit Name',
                    InputLogo: measurement_icon,
                    buttonTitle: 'Create Unit',
                    onClick: (data) => postCategory_unit(data, "Unit"),
                    value: 'Enter Name',
                }}
                List={{
                    MainHeading: 'Listed Units',
                    subHeading: 'Unit Names',
                    data: [{name: 'Vegetable', id: 'dsadasda', default: false}],
                    onDelete: (item) => {
                        console.log(item)
                    }
                }}/>
            <div>
                <img src={inventoryItems_icon}/>
                <text>{'Inventory Items'}</text>
            </div>
            <AddItemEntry onSubmit={data => console.log(data)}/>
            <CreateNewItem onSubmit={data => postItem(data)}/>
            <div className={'headerClass'}>
                <div>
                    <text>Inventory Items</text>
                    <SearchBar
                        width={'25vmin'}
                        value={search}
                        onChange={(value) => setSearch(value)}
                        onblur={() => {
                            if (search === "" || search === " ") {
                                setSearch("Search Name");
                            }
                            return;
                        }}
                        onfocus={() => setSearch('')}/>
                </div>
                <div>
                    <text>Sort by</text>
                    <DropDown SizeProp={'xs'} style={'Inventory_item_dropdown'} selected={sort}
                              onSelectItem={setSort} list={InventoryItemsDropDownList}/>
                </div>
            </div>
            <PagingList/>
        </div>;
    };

export default InventoryItems;


const CreateNewItem: FunctionComponent<{
    data?: {
        set: Array<{
            id: number,
            title: string,
            value: any,
            placeholder: string,
            icon: any,
            list?: string
        }>
    },
    onSubmit: (data: NewInventoryItem) => void
}> =
    ({
         data = {set: initialDataNewItem},
         onSubmit
     }) => {
        const [list, setList] = useState(data);
        return <EntryFieldContainer
            style={'createItem_style'}
            onSubmit={() => {
                let postData: any = {};
                postData.name = list.set[0].value;
                postData.category = list.set[1].value;
                postData.UOM = list.set[2].value;
                postData.pricePerUnit = list.set[3].value;
                postData.storage = list.set[4].value;
                postData.UIH = list.set[5].value;
                postData.life = list.set[6].value;
                onSubmit(postData)
            }}
            gridStyle={'createItem_grid_style'}
            heading={'Create New Item'}
            buttonTitle={'Create Item'}
        >
            {list.set.map((item, index) => {
                if (item.id === 1 || item.id === 2 || item.id === 4) {
                    return <PlainListDropDown
                        selected={item.value.name}
                        title={item.title}
                        onSelectItem={selected => {
                            let dataX = list.set;
                            dataX[index] = {
                                id: item.id,
                                title: item.title,
                                icon: item.icon,
                                value: {
                                    id: selected.id,
                                    name: selected.data.name
                                },
                                placeholder: item.placeholder
                            };
                            setList({set: dataX});
                        }}
                        logo={item.icon}
                        listType={item.list !== undefined ? item.list : ''}/>
                }
                return <DropDownTextInput
                    type={'Text'}
                    dropDown={false}
                    title={item.title}
                    icon={item.icon}
                    onChange={(event) => {
                        let dataX = list.set;
                        dataX[index] = {
                            id: item.id,
                            title: item.title,
                            icon: item.icon,
                            value: event.target.value,
                            placeholder: item.placeholder
                        };
                        setList({set: dataX});
                    }}
                    onblur={() => {
                        if (item.value === "" || item.value === " ") {
                            let dataX = list.set;
                            dataX[index] = {
                                id: item.id,
                                title: item.title,
                                icon: item.icon,
                                value: item.placeholder,
                                placeholder: item.placeholder
                            };
                            setList({set: dataX});
                        }
                        return;
                    }}
                    onfocus={() => {
                        if (item.value !== item.placeholder) return;
                        let dataX = list.set;
                        dataX[index] = {
                            id: item.id,
                            title: item.title,
                            icon: item.icon,
                            value: '',
                            placeholder: item.placeholder
                        };
                        setList({set: dataX});
                    }}
                    value={item.value}/>
            })}
        </EntryFieldContainer>
    };


const AddItemEntry: FunctionComponent<{
    data?: {
        set: Array<{
            id: number,
            title: string,
            value: string,
            placeholder: string,
            icon: any,
            list?: string
        }>
    },
    onSubmit: (data: InventoryItem) => void
}> =
    ({
         data = {
             set: initialDataAddItem
         },
         onSubmit
     }) => {
        const [list, setList] = useState(data);
        return <EntryFieldContainer
            style={'AddItemEntry_style'}
            onSubmit={() => {
                let postData: any = {};
                postData.item = list.set[0].value;
                postData.units = list.set[1].value;
                postData.cost = list.set[2].value;
                onSubmit(postData)
            }}
            gridStyle={'AddItemEntry_grid_style'}
            heading={'Add Item To Inventory'}
            buttonTitle={'Add Item'}
        >
            {list.set.map((item, index) => {
                if (item.id === 0) {
                    return <PlainListDropDown
                        black={true}
                        selected={item.value}
                        title={item.title}
                        onSelectItem={selected => {
                            let dataX = list.set;
                            dataX[index] = {
                                id: item.id,
                                title: item.title,
                                icon: item.icon,
                                value: selected.data.name,
                                placeholder: item.placeholder
                            };
                            setList({set: dataX});
                        }}
                        logo={item.icon}
                        listType={item.list !== undefined ? item.list : ''}/>
                }
                return <DropDownTextInput
                    type={'Text'}
                    dropDown={false}
                    title={item.title}
                    icon={item.icon}
                    onChange={(event) => {
                        let dataX = list.set
                        dataX[index] = {
                            id: item.id,
                            title: item.title,
                            icon: item.icon,
                            value: event.target.value,
                            placeholder: item.placeholder
                        };
                        setList({set: dataX});
                    }}
                    onblur={() => {
                        if (item.value === "" || item.value === " ") {
                            let dataX = list.set;
                            dataX[index] = {
                                id: item.id,
                                title: item.title,
                                icon: item.icon,
                                value: item.placeholder,
                                placeholder: item.placeholder
                            };
                            setList({set: dataX});
                        }
                        return;
                    }}
                    onfocus={() => {
                        if (item.value !== item.placeholder) return;
                        let dataX = list.set;
                        dataX[index] = {
                            id: item.id,
                            title: item.title,
                            icon: item.icon,
                            value: '',
                            placeholder: item.placeholder
                        };
                        setList({set: dataX});
                    }}
                    value={item.value}/>
            })}


        </EntryFieldContainer>
    };


type InventoryCommonProps = {
    MainHeading: string,
    MainLogo: any,
    Input: {
        MainHeading: string,
        InputHeading: string,
        InputLogo: any,
        value?: string,
        default?: 'Yes' | 'No',
        buttonTitle: string,
        onClick: (data: { input: string, default: boolean }) => void
    },
    List: {
        MainHeading: string,
        subHeading: string,
        data: Array<{ name: string, id: string, default: boolean }>
        onDelete: (item: { name: string, id: string }) => void
    },

}

const InventoryCommon: FunctionComponent<InventoryCommonProps> =
    ({
         MainHeading,
         MainLogo,
         Input,
         List
     }) => {
        const [input, setInput] = useState(Input.value);
        const [def, setDef] = useState(Input.default);

        const handleInputClick = () => {
            if (input === '' || input === 'Enter Name' || input === undefined) {
                return alert('Empty name')
            }
            Input.onClick({input, default: def === 'Yes'})
        };
        return <div className={'InventoryCommon_parent'}>
            <div>
                <img src={MainLogo}/>
                <text>{MainHeading}</text>
            </div>
            <div>
                <EntryFieldContainer
                    heading={Input.MainHeading}
                    style={'InventoryCommon_entry_style'}
                    onSubmit={() => handleInputClick()}
                    gridStyle={'InventoryCommon_entry_grid_style'}
                    buttonTitle={Input.buttonTitle}
                >
                    <DropDownTextInput
                        type={'Text'}
                        dropDown={false}
                        title={Input.InputHeading}
                        icon={category_icon}
                        onChange=
                            {(event) => setInput(event.target.value)}
                        onblur={() => {
                            if (input === "" || input === " ") {
                                setInput(Input.value)
                            }
                            return;
                        }}
                        onfocus={() => {
                            if (input !== Input.value) return;
                            setInput('');
                        }}
                        value={input}/>
                    <div>
                        <text>{'Make Default'}</text>
                        <div>
                            <Toggle
                                selected={def}
                                label={'Yes'}
                                onToggle={selected => setDef(selected)}/>
                            <Toggle
                                selected={def}
                                label={'No'}
                                onToggle={selected => setDef(selected)}/>
                        </div>
                    </div>
                </EntryFieldContainer>
                <div>
                    <text>{List.MainHeading}</text>
                    <div>
                        <div>
                            <text>{List.subHeading}</text>
                            <text>Default</text>
                            <text>Delete</text>
                        </div>
                        <div className={'list_Item'}>
                            <text>Vegetable</text>
                            <text>No</text>
                            <img src={trash_image}/>
                        </div>
                        {List.data.length >= 10 ? <FontAwesomeIcon
                            icon={faAngleDown}
                            className="reservation_arrow_icon"
                            color={'#fff'}
                            size={'1x'}
                            onClick={() => console.log('More')}
                        /> : null}
                    </div>
                </div>
            </div>
        </div>;
    };

type toggleProps = {
    selected: string | undefined,
    label: 'Yes' | 'No',
    onToggle: (selected: 'Yes' | 'No') => void
};


const Toggle: FunctionComponent<toggleProps> =
    ({
         selected = 'No',
         label,
         onToggle
     }) => {
        const selectedStyle = selected == label ? 'toggle toggle_On' : 'toggle';
        return (
            <div className={'order_details_toggleButton_parent'} onClick={() => onToggle(label)}>
                <div className={selectedStyle}/>
                <text className={'order_details_toggleButton_label'}>{label}</text>
            </div>
        )
    };

const initialDataNewItem = [
    {
        id: 0,
        title: 'Item Name',
        value: 'Enter Name',
        placeholder: 'Enter Name',
        icon: inventoryItems_icon
    },
    {
        id: 1,
        title: 'Select Category',
        value: {
            id: '',
            name: 'Select Category',
        },
        placeholder: 'Select Category',
        icon: category_icon,
        list: 'Categories'
    },
    {
        id: 2,
        title: 'Select UOM',
        value: {
            id: '',
            name: 'Select'
        },
        placeholder: 'Select',
        icon: measurement_icon,
        list: 'Units'
    },
    {
        id: 3,
        title: 'Average Price Per Unit',
        value: 'Enter Price',
        placeholder: 'Enter Price',
        icon: price_icon
    },
    {
        id: 4,
        title: 'Select Storage',
        value: {
            id: '',
            name: 'Select Storage'
        },
        placeholder: 'Select Storage',
        icon: fridge_icon,
        list: 'STORAGE'
    },
    {
        id: 5,
        title: 'Enter Units',
        value: 'Enter Units',
        placeholder: 'Enter Units',
        icon: units_icon
    },
    {
        id: 6,
        title: 'Shelf Life',
        value: 'Enter Shelf Life',
        placeholder: 'Enter Shelf Life',
        icon: shelfLife_icon
    },
];

const initialDataAddItem = [
    {
        id: 0,
        title: 'Select Item',
        value: 'Select',
        placeholder: 'Select',
        icon: inventoryItems_icon,
        list: 'ITEMS'
    },
    {
        id: 1,
        title: 'Enter Units',
        value: 'Enter Units',
        placeholder: 'Enter Units',
        icon: units_icon
    },
    {
        id: 2,
        title: 'Total Cost',
        value: 'Enter Cost',
        placeholder: 'Enter Cost',
        icon: price_icon
    },
];