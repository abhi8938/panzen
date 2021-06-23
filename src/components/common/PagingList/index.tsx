import React, {FunctionComponent, useState} from 'react';
import './paginglist.css'
import {Orders, OrderColumns, rating_v_2} from '../../../constants/data';
import {product_rating_5} from "../../../Assets/overview";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleDown} from "@fortawesome/free-solid-svg-icons";
import {add_icon} from "../../../Assets/Inventory";
import EditModal from "../EditModalFrame";
import EmployeeEntryFields from "../../EmployeeAnalytics/EmployeeEntryFields";
import ExpenseEntryFields from "../../RevenueAnalytics/ExpenseEntryFields";


type Props = {
    rotateIcon?: 0 | 180,
    expanded?: number,
    list?: Array<any>
    headerList?: Array<string>,
    style?: string,
    bottom?: {
        icon?: any,
        text: string
    },
    showModal?: boolean,
    postData?: (data: any) => void,
    type?: 'EXPENSE' | 'EMPLOYEE' | 'ORDER'
};
const PagingList: FunctionComponent<Props> = (
    {
        rotateIcon = 0,
        expanded,
        list = [],
        headerList = OrderColumns,
        style,
        bottom = {
            icon: add_icon,
            text: 'Add Employee'
        },
        showModal = false,
        postData,
        type
    }
) => {
    const [rotate, toggleRotate] = useState(rotateIcon);
    const [expand, setExpand] = useState(expanded);
    const [show, setShow] = useState(showModal);

    return <div className={'pagingList ' + style}>
        <div>
            {headerList.map(el => <text>{el}</text>)}
        </div>
        <ul>
            {list.length === 0 ? <div className={'no_data_div'}>
                <text>No Data</text>
            </div> : list.map((element, index) =>
                <div onClick={() => {
                    setExpand(index);
                    toggleRotate(rotate === 0 ? 180 : 0)
                }}>
                    <div>
                        <li>{index + 1}</li>
                        <li>{element.date}</li>
                        <li>{element.time}</li>
                        <li>{element.guests}</li>
                        <li>{element.dineDuration}</li>
                        <li><img src={product_rating_5}/></li>
                        <li>
                            <text>$ {element.value}</text>
                            <FontAwesomeIcon
                                icon={faAngleDown}
                                transform={expand === index ? {rotate: rotate} : {rotate: 0}}
                                color={'#fff'}
                                size={'1x'}
                            />
                        </li>
                    </div>
                    {rotate === 180 && expand === index ? <div>
                        <text>{element.status}</text>
                    </div> : null}
                </div>
            )}
        </ul>
        <div>
            {bottom !== undefined ? <div onClick={() => setShow(!show)}>
                {bottom.icon !== undefined ? <img src={bottom.icon}/> : null}
                <text>{bottom.text}</text>
            </div> : null}
            <div>
                pagination
            </div>
        </div>
        <EditModal toggleShow={() => setShow(!show)} show={show}>
            {type !== undefined && type === 'EXPENSE' ?
                <ExpenseEntryFields
                    style={'expense_entry_fields'}
                    data={{set: ExpenseDataFrame}}
                    sendData={data => postData !== undefined ? postData(data) : null}/>
                :
                <EmployeeEntryFields data={{set: EmployeedataFrame}}
                                     sendData={data => postData !== undefined ? postData(data) : null}/>
            }
        </EditModal>
    </div>
};

export default PagingList;

const EmployeedataFrame = [
    {
        id: 0,
        title: 'Employee Name',
        value: 'Enter Name',
        placeholder: 'Enter Name'
    },
    {
        id: 1,
        title: 'Panzen Account Type',
        value: 'Select Account Type',
        placeholder: 'Select Account Type',
        list: 'ACCOUNT_TYPE'
    },
    {
        id: 2,
        title: 'Contact No',
        value: 'xxxx-xxxxxx',
        placeholder: 'xxxx-xxxxxx',
    },
    {
        id: 3,
        title: 'Admin Access panel',
        value: 'Select Allowed Access Panels',
        placeholder: 'Select Allowed Access Panels',
        list: 'ACCESS_PANEL'
    },
    {
        id: 4,
        title: 'Address',
        value: 'Enter Address',
        placeholder: 'Enter Address',
    },
    {
        id: 5,
        title: 'Select Gender',
        value: 'M',
        placeholder: 'M',
        list: 'GENDER'
    },
    {
        id: 6,
        title: 'Designation Name',
        value: 'Enter Name',
        placeholder: 'Enter Name',
    },
    {
        id: 7,
        title: 'Panzen Login Id',
        value: 'mail@mail.com',
        placeholder: 'mail@mail.com',
    },
    {
        id: 8,
        title: 'Employment Type',
        value: 'Enter Type',
        placeholder: 'Enter Type',
    },
    {
        id: 9,
        title: 'Panzen Account Password',
        value: 'Create password through sent Link',
        placeholder: 'Create password through sent Link',
    },
    {
        id: 10,
        title: 'Pay Scale',
        value: 'Enter Pay Scale',
        placeholder: 'Enter Pay Scale'
    },
    {
        id: 11,
        title: '',
        value: 'Hour',
        placeholder: 'Hour',
        list: 'PAY_SCALE'
    }
];

const ExpenseDataFrame = [
    {
        id: 0,
        title: 'Select Expense Category',
        value: 'Select Category',
        placeholder: 'Select Category',
        list: 'EXPENSE_CATEGORY'
    },
    {
        id: 1,
        title: '',
        data: [
            {
                id: 0,
                title: 'Select Expense Type',
                value: 'Select Type',
                placeholder: 'Select Type',
                list: 'EXPENSE_TYPE'
            },
            {
                id: 1,
                title: 'Select Period',
                value: '/mn',
                placeholder: '/mn',
                list: 'PERIOD_TYPE'
            },
        ]
    },
    {
        id: 2,
        title: 'Select Employee Incharge',
        value:
            {
                id: '',
                name: 'Select Employee'
            },
        placeholder: 'Select Employee',
        list: 'EMPLOYEE'
    },

    {
        id: 3,
        title: 'Select Payment Status',
        value: 'Select Status',
        placeholder: 'Select Status',
        list: 'PAYMENT_STATUS'
    },
    {
        id: 4,
        title: 'Enter Bill Amount',
        value: 'Enter Amount',
        placeholder: 'Enter Amount',
    },
    {
        id: 5,
        title: '',
        items: [{
            id: 0,
            data: [
                {
                    id: 0,
                    title: 'Name',
                    value: 'Enter Name',
                    placeholder: 'Enter Name',
                },
                {
                    id: 1,
                    title: 'Quantity',
                    value: 'Quantity',
                    placeholder: 'Quantity',
                },
                {
                    id: 2,
                    title: 'Bill Amount',
                    value: 'Amount',
                    placeholder: 'Amount',
                }
            ]
        }]

    },
    {
        id: 6,
        title: 'Comments',
        value: 'Enter Comment',
        placeholder: 'Enter Comment',
    },
    {
        id: 7,
        title: 'Create New Expense Category',
        value: 'Enter Name',
        placeholder: 'Enter Name'
    }
];