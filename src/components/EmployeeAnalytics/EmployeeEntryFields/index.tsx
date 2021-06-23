import React, {FunctionComponent, useState} from 'react';
import './employeeEntryFields.css'
import {CustomButton} from "../../Login/CustomButton";
import {CustomTextInput} from "../../common/CustomTextInput";
import {PlainListDropDown} from "../../Inventory/common/PlainListDropDown";

type Props = {
    data?: {
        set: Array<{
            id: number,
            title?: string,
            value?: string,
            placeholder?: string,
            list?: string,
            data?: Array<{
                id: number,
                title: string,
                value: string,
                placeholder: string
            }>
        }>
    },
    details?: {
        set: Array<{
            id: number,
            title: string,
            value: string,
            placeholder: string
        }>
    },
    buttonText?: string,
    sendData: (data: any) => void;
};

const EmployeeEntryFields: FunctionComponent<Props> =
    ({
         data = {set: []},
         buttonText = 'Create',
         details = {set: accountData},
         sendData
     }) => {
        const [list, setList] = useState(data);
        const [accountList, setAccountList] = useState(details);

        const validateData = () => {
            //TODO:Validate and forward data for posting
            let alertMessage = 'Required: ';
            accountList.set.map((element, index) => {
                if (element.value === element.placeholder || element.value === '') {
                    alertMessage += `\n${element.title}`
                }
            });

            list.set.map((element, index) => {
                if(index === 1 || index === 3 || index === 11 || index === 5){
                    return
                }
                if (element.value === element.placeholder || element.value === '') {
                    alertMessage += `\n${element.title}`
                }
            });
            if (alertMessage !== 'Required: ') {
                return alert(alertMessage);
            }
            let accountDetails: any = {};
            accountDetails.name = accountList.set[0].value;
            accountDetails.bankName = accountList.set[1].value;
            accountDetails.number = accountList.set[2].value;
            accountDetails.ifsc = accountList.set[3].value;
            accountDetails.gst = accountList.set[4].value;

            let payScale: any = {};
            payScale.price = list.set[10].value;
            payScale.scale = list.set[11].value;

            let details: any = {};
            details.fullName = list.set[0].value;
            details.contactNumber = list.set[2].value;
            details.address = list.set[4].value;
            details.designation = list.set[6].value;
            details.email = list.set[7].value;
            details.password = list.set[9].value;
            details.accountDetails = accountDetails;
            details.payScale = payScale;
            details.employementType = list.set[8].value;
            details.workingHours = 60;
            details.profilePic = 'profilePic';
            details.gender = list.set[5].value;

            sendData(details);
        };
        return <div className="employee_entry_fields">
            <div>
                {list.set.map((element, index) => {
                    if (index === 10 || index === 11) {
                        return
                    }
                    if (index === 1 || index === 3) {
                        return <PlainListDropDown
                            style='employee_entryDropDown'
                            selected={element.value !== undefined ? element.value : ''}
                            onSelectItem={selected => {
                                let dataX = list.set;
                                dataX[index] = {
                                    id: element.id,
                                    title: element.title,
                                    value: selected.data.name,
                                    placeholder: element.placeholder
                                };
                                setList({set: dataX});

                            }}
                            listType={element.list !== undefined ? element.list : ''}
                            title={element.title !== undefined ? element.title : ''}/>
                    }
                    if (index === 4) {
                        return <CustomTextInput title={element.title}
                                                value={element.value}
                                                onChange={(event) => {
                                                    let dataX = list.set;
                                                    dataX[index] = {
                                                        id: element.id,
                                                        title: element.title,
                                                        value: event.target.value,
                                                        placeholder: element.placeholder
                                                    };
                                                    setList({set: dataX});
                                                }}
                                                type={'text'}
                                                onblur={() => {
                                                    if (element.value === "" || element.value === " ") {
                                                        let dataX = list.set;
                                                        dataX[index] = {
                                                            id: element.id,
                                                            title: element.title,
                                                            value: element.placeholder,
                                                            placeholder: element.placeholder
                                                        };
                                                        setList({set: dataX});
                                                    }
                                                    return;
                                                }}
                                                onfocus={() => {
                                                    if (element.value !== element.placeholder) return;
                                                    let dataX = list.set;
                                                    dataX[index] = {
                                                        id: element.id,
                                                        title: element.title,
                                                        value: '',
                                                        placeholder: element.placeholder
                                                    };
                                                    setList({set: dataX});
                                                }}
                                                style={'entryField'}
                                                inputStyle={'entryField_input_address'}
                        />
                    }
                    if (index === 5) {
                        return <PlainListDropDown
                            style='employee_entryDropDown'
                            selected={element.value !== undefined ? element.value : ''}
                            onSelectItem={selected => {
                                let dataX = list.set;
                                dataX[index] = {
                                    id: element.id,
                                    title: element.title,
                                    value: selected.data.name,
                                    placeholder: element.placeholder
                                };
                                setList({set: dataX});
                            }}
                            listType={element.list !== undefined ? element.list : ''}
                            title={element.title !== undefined ? element.title : ''}/>
                    }
                    return <CustomTextInput title={element.title}
                                            value={element.value}
                                            onChange={(event) => {
                                                let dataX = list.set;
                                                dataX[index] = {
                                                    id: element.id,
                                                    title: element.title,
                                                    value: event.target.value,
                                                    placeholder: element.placeholder
                                                };
                                                setList({set: dataX});
                                            }}
                                            type={'text'}
                                            onblur={() => {
                                                if (element.value === "" || element.value === " ") {
                                                    let dataX = list.set;
                                                    dataX[index] = {
                                                        id: element.id,
                                                        title: element.title,
                                                        value: element.placeholder,
                                                        placeholder: element.placeholder
                                                    };
                                                    setList({set: dataX});
                                                }
                                                return;
                                            }}
                                            onfocus={() => {
                                                if (element.value !== element.placeholder) return;
                                                let dataX = list.set;
                                                dataX[index] = {
                                                    id: element.id,
                                                    title: element.title,
                                                    value: '',
                                                    placeholder: element.placeholder
                                                };
                                                setList({set: dataX});
                                            }}
                                            style={'entryField'}
                                            inputStyle={'entryField_input'}
                    />
                })}
            </div>
            <div className={'employeeEntry_accountDetails'}>
                <div>
                    <text>Account Details</text>
                    {accountList !== undefined ? accountList.set.map((element, index) => <CustomTextInput
                        title={element.title}
                        value={element.value}
                        onChange={(event) => {
                            let dataX = accountList.set;
                            dataX[index] = {
                                id: element.id,
                                title: element.title,
                                value: event.target.value,
                                placeholder: element.placeholder
                            };
                            setAccountList({set: dataX});
                        }}
                        type={'text'}
                        onblur={() => {
                            if (element.value === "" || element.value === " ") {
                                let dataX = accountList.set;
                                dataX[index] = {
                                    id: element.id,
                                    title: element.title,
                                    value: element.placeholder,
                                    placeholder: element.placeholder
                                };
                                setAccountList({set: dataX});
                            }
                            return;
                        }}
                        onfocus={() => {
                            if (element.value !== element.placeholder) return;
                            let dataX = accountList.set;
                            dataX[index] = {
                                id: element.id,
                                title: element.title,
                                value: '',
                                placeholder: element.placeholder
                            };
                            setAccountList({set: dataX});
                        }}
                        style={'entryField_accounts'}
                        inputStyle={'entryField_accounts_input'}
                    />) : null}
                </div>
                <div>
                    {list.set.map((element, index) => {
                        if (index !== 10 && index !== 11) {
                            return
                        }
                        if (index === 10) {
                            return <CustomTextInput title={element.title}
                                                    value={element.value}
                                                    onChange={(event) => {
                                                        let dataX = list.set;
                                                        dataX[index] = {
                                                            id: element.id,
                                                            title: element.title,
                                                            value: event.target.value,
                                                            placeholder: element.placeholder
                                                        };
                                                        setList({set: dataX});
                                                    }}
                                                    type={'text'}
                                                    onblur={() => {
                                                        if (element.value === "" || element.value === " ") {
                                                            let dataX = list.set;
                                                            dataX[index] = {
                                                                id: element.id,
                                                                title: element.title,
                                                                value: element.placeholder,
                                                                placeholder: element.placeholder
                                                            };
                                                            setList({set: dataX});
                                                        }
                                                        return;
                                                    }}
                                                    onfocus={() => {
                                                        if (element.value !== element.placeholder) return;
                                                        let dataX = list.set;
                                                        dataX[index] = {
                                                            id: element.id,
                                                            title: element.title,
                                                            value: '',
                                                            placeholder: element.placeholder
                                                        };
                                                        setList({set: dataX});
                                                    }}
                                                    style={'entryField'}
                                                    inputStyle={'entryField_payScale_input'}
                            />
                        }
                        if (index === 11) {
                            return <PlainListDropDown
                                style='employee_entryDropDown_payscale'
                                selected={element.value !== undefined ? element.value : ''}
                                onSelectItem={selected => {
                                    let dataX = list.set;
                                    dataX[index] = {
                                        id: element.id,
                                        title: element.title,
                                        value: selected.data.name,
                                        placeholder: element.placeholder
                                    };
                                    setList({set: dataX});

                                }}
                                listType={element.list !== undefined ? element.list : ''}
                                title={element.title !== undefined ? element.title : ''}/>
                        }
                    })}
                </div>
            </div>
            <CustomButton title={buttonText} style={'button'}
                          onclick={() => validateData()}/>
        </div>;
    };

export default EmployeeEntryFields;


const accountData = [
    {
        id: 0,
        title: 'Account Name',
        value: 'Enter Name',
        placeholder: 'Enter Name'
    },
    {
        id: 1,
        title: 'Bank Name',
        value: 'Enter Name',
        placeholder: 'Enter Name'
    },
    {
        id: 2,
        title: 'Account Number',
        value: 'Enter Number',
        placeholder: 'Enter Number'
    },
    {
        id: 3,
        title: 'IFSC',
        value: 'Enter IFSC',
        placeholder: 'Enter IFSC'
    },
    {
        id: 4,
        title: 'GST',
        value: 'Enter GST',
        placeholder: 'Enter GST'
    }
];
