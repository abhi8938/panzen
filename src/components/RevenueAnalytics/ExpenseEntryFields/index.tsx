import React, {FunctionComponent, useState} from 'react';
import {PlainListDropDown} from "../../Inventory/common/PlainListDropDown";
import {CustomTextInput} from "../../common/CustomTextInput";
import {CustomButton} from "../../Login/CustomButton";
import {trash_image} from "../../../Assets/AllItems";
import {add_icon} from "../../../Assets/Inventory";
import RevenueAnalyticsService from "../services";

let service = new RevenueAnalyticsService();
type Props = {
    style?: string,
    data?: {
        set: Array<{
            id: number,
            title?: string,
            value?: any,
            placeholder?: string,
            list?: string,
            data?: Array<{
                id: number,
                title: string,
                value: string,
                placeholder: string,
                list: string
            }>,
            items?: Array<{
                id: number,
                data: Array<{
                    id: number,
                    title: string,
                    value: string,
                    placeholder: string,
                }>
            }>
        }>
    },
    buttonText?: string,
    sendData: (data: any) => void;
};

const ExpenseEntryFields: FunctionComponent<Props> =
    ({
         style,
         data = {set: []},
         buttonText = 'Create',
         sendData
     }) => {
        const [list, setList] = useState(data);
        const createCategory = async () => {
            if (list.set[7].value === list.set[7].placeholder || list.set[7].value === '') {
                return alert('Category Name Required')
            }
            const response = await service.createExpenseCategory(list.set[7].value);
            return alert(response.data);
        };
        const validateData = () => {
            let alertMessage = 'Required: ';

            list.set.map((element, index) => {
                if (index === 0 || index === 1 || index === 2 || index === 3 || index === 5 || index === 7) {
                    return;
                }
                if (element.value === element.placeholder || element.value === '') {
                    alertMessage += `\n${element.title}`
                }
            });
            if (alertMessage !== 'Required: ') {
                return alert(alertMessage);
            }
            let details: any = {};
            let items: any = [];
            if (list.set[5].items !== undefined) {
                list.set[5].items.map(element => {
                        if (element.data[0].value !== element.data[0].placeholder) {
                            items.push({
                                name: element.data[0].value,
                                quantity: element.data[1].value,
                                price: parseInt(element.data[2].value)
                            })
                        }
                    }
                );
            }
            details.items = items;
            details.paymentStatus = list.set[3].value;
            details.employeeIncharge = list.set[2].value;
            details.comments = list.set[6].value;
            details.billAmount = parseInt(list.set[4].value);
            details.category = list.set[0].value;
            if (list.set[1].data !== undefined) {
                details.period = list.set[1].data[0].value;
                details.type = list.set[1].data[1].value;
            }
            sendData(details);
        };

        return <div className={style}>
            <div>
                <div>
                    {list.set.map((element, index) => {
                        if (index === 5 || index === 6 || index === 7) {
                            return
                        }
                        if (index === 0 || index === 3) {
                            return <PlainListDropDown
                                style='expense_entryDropDown'
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
                        if (index === 1) {
                            return <div className={'second_container'}>
                                {element.data !== undefined ? element.data.map((elem, i) => <PlainListDropDown
                                    style='expense_entryDropDown_small'
                                    selected={elem.value !== undefined ? elem.value : ''}
                                    onSelectItem={selected => {
                                        let dataX: any = list.set;
                                        dataX[index].data[i] = {
                                            id: elem.id,
                                            title: elem.title,
                                            value: selected.data.name,
                                            placeholder: elem.placeholder
                                        };
                                        setList({set: dataX});

                                    }}
                                    listType={elem.list !== undefined ? elem.list : ''}
                                    title={elem.title !== undefined ? elem.title : ''}/>) : null}
                            </div>
                        }
                        if (index === 2) {
                            return <PlainListDropDown
                                style='expense_entryDropDown'
                                selected={element.value.name !== undefined ? element.value.name : ''}
                                onSelectItem={selected => {
                                    let dataX = list.set;
                                    dataX[index] = {
                                        id: element.id,
                                        title: element.title,
                                        value: {
                                            id: selected.id,
                                            name: selected.data.name
                                        },
                                        placeholder: element.placeholder,
                                        list: element.list
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
                <div>
                    <CustomTextInput title={list.set[7].title}
                                     value={list.set[7].value}
                                     onChange={(event) => {
                                         let dataX = list.set;
                                         dataX[7] = {
                                             id: list.set[7].id,
                                             title: list.set[7].title,
                                             value: event.target.value,
                                             placeholder: list.set[7].placeholder
                                         };
                                         setList({set: dataX});
                                     }}
                                     type={'text'}
                                     onblur={() => {
                                         if (list.set[7].value === "" || list.set[7].value === " ") {
                                             let dataX = list.set;
                                             dataX[7] = {
                                                 id: list.set[7].id,
                                                 title: list.set[7].title,
                                                 value: list.set[7].placeholder,
                                                 placeholder: list.set[7].placeholder
                                             };
                                             setList({set: dataX});
                                         }
                                         return;
                                     }}
                                     onfocus={() => {
                                         if (list.set[7].value !== list.set[7].placeholder) return;
                                         let dataX = list.set;
                                         dataX[7] = {
                                             id: list.set[7].id,
                                             title: list.set[7].title,
                                             value: '',
                                             placeholder: list.set[7].placeholder
                                         };
                                         setList({set: dataX});
                                     }}
                                     style={'entryField'}
                                     inputStyle={'entryField_input'}
                    />
                    <CustomButton title={'Create'} style={'button'}
                                  onclick={() => createCategory()}/>
                </div>
            </div>
            <div>
                {list.set.map((element, index) => {
                    if (index === 5 || index === 6) {
                        if (index === 5) {
                            return element.items !== undefined ? element.items.map((item, ind) => {
                                return <div className={'add_items'}>
                                    {item.data.map((child, i) => {
                                        return <CustomTextInput
                                            title={i === 0 ? `Item-${ind + 1} ${child.title}` : child.title}
                                            value={child.value}
                                            onChange={(event) => {
                                                let dataX: any = list.set;
                                                dataX[index].items[ind].data[i] = {
                                                    id: child.id,
                                                    title: child.title,
                                                    value: event.target.value,
                                                    placeholder: child.placeholder
                                                };
                                                setList({set: dataX});
                                            }}
                                            type={'text'}
                                            onblur={() => {
                                                if (child.value === "" || child.value === " ") {
                                                    let dataX: any = list.set;
                                                    dataX[index].items[ind].data[i] = {
                                                        id: child.id,
                                                        title: child.title,
                                                        value: child.placeholder,
                                                        placeholder: child.placeholder
                                                    };
                                                    setList({set: dataX});
                                                }
                                                return;
                                            }}
                                            onfocus={() => {
                                                if (child.value !== child.placeholder) return;
                                                let dataX: any = list.set;
                                                dataX[index].items[ind].data[i] = {
                                                    id: child.id,
                                                    title: child.title,
                                                    value: '',
                                                    placeholder: child.placeholder
                                                };
                                                setList({set: dataX});
                                            }}
                                            style={'entryField_Item'}
                                            inputStyle={'entryField_input_item'}
                                        />
                                    })}
                                    {ind === 0 ? null : <img
                                        src={trash_image}
                                        alt={'tash'}
                                        onClick={() => {
                                            let dataX: any = list.set;
                                            let newItem = {
                                                id: ind + 1,
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
                                            }
                                            dataX[index].items.splice(ind, 1);
                                            console.log('data', dataX[index].items);
                                            setList({set: dataX});

                                        }}/>}
                                    <img
                                        src={add_icon}
                                        alt={'add'}
                                        onClick={() => {
                                            let dataX: any = list.set;
                                            let newItem = {
                                                id: ind + 1,
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
                                            }
                                            dataX[index].items.push(newItem);
                                            console.log('data', dataX[index].items);
                                            setList({set: dataX});

                                        }}
                                    />
                                </div>

                            }) : null
                        }
                        if (index === 6) {
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
                                                    inputStyle={'entryField_input_comment'}
                            />
                        }
                    }
                    return
                })}
            </div>
            <CustomButton title={buttonText} style={'button'}
                          onclick={() => validateData()}/>
        </div>;
    }
;

export default ExpenseEntryFields;
