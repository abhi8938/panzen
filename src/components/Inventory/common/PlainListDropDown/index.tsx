import React, {
    FunctionComponent,
    useEffect,
    useState,
} from "react"; // importing FunctionComponent
import './PLDD.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleDown, faCheck} from "@fortawesome/free-solid-svg-icons";
import InventoryItemServices from '../../InventoryItems/services';
import EmployeeAnalyticsServices from "../../../EmployeeAnalytics/services";
import StorageService from "../../StorageArea/services";
import ItemService from "../../../Allitems/services";
import RevenueAnalyticsService from "../../../RevenueAnalytics/services";
import SupplierService from "../../Supplier/services";
import {itemType, veg_nonVeg} from "../../../../constants/data";

let service = new InventoryItemServices();
let service1 = new EmployeeAnalyticsServices();
let service2 = new StorageService();
let service3 = new ItemService();
let service4 = new RevenueAnalyticsService();
let service5 = new SupplierService();
export type selectedType = {
    data: any;
    id: string;
};
type DropDownProps = {
    selected: string;
    onSelectItem: (selected: selectedType) => void;
    display?: boolean;
    rotateIcon?: number;
    logo?: any,
    listType: string,
    list?: Array<{ data: any, id: string }>
    title?: string,
    black?: boolean,
    style?: string
};

export const PlainListDropDown: FunctionComponent<DropDownProps> =
    ({
         selected,
         onSelectItem,
         title,
         display = false,
         rotateIcon = 0,
         logo,
         listType,
         list = [],
         black,
         style
     }) => {
        const [displayMenu, toggleDropDown] = useState(display);
        const [rotate, toggleRotate] = useState(rotateIcon);
        const [data, setData] = useState(list);

        const fetchData = async () => {
            if (listType === 'Categories' || listType === 'Units') {
                const response = await service.getCategories_unit('IEFDIKzIJHVmQJ6yHhuw', listType);
                console.log('getC-U', response);
                if (response.status === 200) {
                    return setData(response.data);
                }
            }
            if (listType === 'ITEMS') {
                const response = await service.getInventoryItems();
                console.log('getRawItems', response);
                if (response.status === 200) {
                    return setData(response.data);
                }
            }
            if (listType === 'EMPLOYEE') {
                const response = await service1.getEmployees('IEFDIKzIJHVmQJ6yHhuw');
                console.log('getEmployee', response);
                if (response.status === 200) {
                    return setData(response.data);
                }
            }
            if (listType === 'STORAGE') {
                const response = await service2.getStorages('IEFDIKzIJHVmQJ6yHhuw');
                console.log('storages', response);
                if (response.status === 200) {
                    return setData(response.data);
                }
            }
            if (listType === 'ITEMS_MENU') {
                const response = await service3.getItems('IEFDIKzIJHVmQJ6yHhuw', 'ACTIVE', undefined, undefined);
                console.log('Menu Items', response);
                if (response.status === 200) {
                    return setData(response.data);
                }
            }
            if (listType === 'EXPENSE_CATEGORY') {
                const response = await service4.getExpenseCategory();
                console.log('Expense Categories', response);
                if (response.status === 200) {
                    return setData(response.data);
                }
            }
            if (listType === 'PAYMENT_STATUS') {
                const data = [{
                    id: '0',
                    data: {
                        name: 'COMPLETED'
                    }
                }, {
                    id: '1',
                    data: {
                        name: 'PENDING'
                    }
                }];
                return setData(data);
            }
            if (listType === 'PERIOD_TYPE') {
                const data = [{
                    id: '0',
                    data: {
                        name: '/mn'
                    }
                }, {
                    id: '1',
                    data: {
                        name: '/week'
                    }
                }, {
                    id: '2',
                    data: {
                        name: '/10 days'
                    }
                }];
                return setData(data);
            }
            if (listType === 'EXPENSE_TYPE') {
                const data = [{
                    id: '0',
                    data: {
                        name: 'Recurring'
                    }
                }, {
                    id: '1',
                    data: {
                        name: 'once'
                    }
                }];
                return setData(data);
            }
            if (listType === 'SUPPLIER') {
                const response = await service5.getSuppliers();
                console.log('getSupplier', response);
                if (response.status === 200) {
                    return setData(response.data);
                }
            }
            if (listType === 'ITEM_TYPE') {
                const data = itemType
                return setData(data);
            }
            if (listType === 'VEG_NONVEG') {
                const data = veg_nonVeg
                return setData(data);
            }
            if (listType === 'DIGIT_DROP') {
                let data: any = [];
                for (let i = 1; i <= 4; i++) {
                    data.push({
                        id: i - 1,
                        data: {
                            name: i
                        }
                    })
                }
                return setData(data);
            }

        };
        useEffect(() => {
            fetchData()
        }, []);

        function hideDropdownMenu() {
            toggleDropDown(false);
            toggleRotate(0);
            document.removeEventListener("click", hideDropdownMenu);
        }

        function showDropdownMenu() {
            if (displayMenu === false) {
                toggleDropDown(true);
                toggleRotate(180);
                document.addEventListener("click", hideDropdownMenu);
            }
        }

        return (
            <div className={"plainListDropDown " + style}>
                {title ? <text>{title}</text> : null}
                <div className={'pldd_first'} onClick={showDropdownMenu}>
                    {logo !== undefined ? <img src={logo}/> : null}
                    <text style={{borderLeftColor: black !== undefined ? "black" : '#fdfdfd'}}>{selected}</text>
                    <FontAwesomeIcon
                        icon={faAngleDown}
                        transform={{rotate: rotate}}
                        color={black !== undefined ? '#000' : '#fff'}
                    />
                </div>
                {displayMenu ? (
                    <ul>
                        {data.length === 0 ? <li>No Data</li> : data.map((element, index) => (
                            <li onClick={() => onSelectItem(element)} key={element.id}>
                                {element.data.name}
                            </li>
                        ))}
                    </ul>
                ) : null}
            </div>
        );
    };
