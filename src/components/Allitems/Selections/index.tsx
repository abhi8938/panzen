import React, {FunctionComponent, useEffect, useState} from 'react';
import './selections.css';
import {PlainListDropDown} from "../../Inventory/common/PlainListDropDown";
import {CustomTextInput} from "../../common/CustomTextInput";
import {rupee_logo_w} from "../../../Assets/OnlineOrder";

type toggleProps = {
    label: boolean,
    onToggle: () => void,
};
export const Toggle2: FunctionComponent<toggleProps> =
    ({
         label,
         onToggle
     }) => {
        const selectedStyle = label ? 'order_details_toggleButton_switch order_details_toggleButton_switch_on' : 'order_details_toggleButton_switch';
        return (
            <div className={'order_details_toggleButton_parent'} onClick={() => onToggle()}>
                <div className={' Toggle_switch_2 ' + selectedStyle}/>
            </div>
        )
    };

type Props = {
    drink?: boolean,
    selected: boolean,
    toggle: () => void,
    totalSelections?: string,
    data?: { set: Array<any> }
};


const Selections: FunctionComponent<Props> = ({
                                                  toggle,
                                                  drink,
                                                  selected,
                                                  totalSelections = '1',
                                                  data = {
                                                      set: [{
                                                          size: 'Small',
                                                          serves: drink ? '30' : '1',
                                                          price: '100'
                                                      }]
                                                  }
                                              }) => {
    const [total, setTotal] = useState(totalSelections);
    const [list, setList] = useState(data);
    const handleSelections = () => {
        let newData = [];
        for (let i = 1; i <= parseInt(total); i++) {
            newData.push({size: 'Small', serves: '1', price: '100'})
        }
        setList({set: newData});
    }
    const handleChange = (index: number, key: string, value: string) => {
        let prevList = list.set;
        prevList[index][key] = value;
        setList({set: prevList});
    }
    useEffect(() => {
        handleSelections()
        return () => {
        }
    }, [total])
    return (<div className={'selections_parent'}>
        {!selected ? <div className={'first_child_selections'}>
            <Toggle2 label={selected} onToggle={() => toggle()}/>
            <text>Add Selections</text>
        </div> : null}
        {selected ? <div className={'second_child_selections'}>
            <div>
                <div>
                    <Toggle2 label={selected} onToggle={() => toggle()}/>
                    <text>Add Selections</text>
                </div>
                <PlainListDropDown style={'dropdownType_digit'} selected={total}
                                   onSelectItem={(selected => setTotal(selected.data.name))}
                                   listType={'DIGIT_DROP'}
                                   title={'Selections'}/>
            </div>
            <div>
                <div>
                    <text>Size</text>
                    <text>Serves</text>
                    <text>Price</text>
                </div>
                {list.set.map((el, index) => <div className={'list_serves'}>
                    <CustomTextInput value={el.size}
                                     onChange={(event) => handleChange(index, 'size', event.target.value)}
                                     type={'text'}
                                     onblur={() => {
                                         if (el.size.length === 0) {
                                             handleChange(index, 'size', 'small')
                                         }
                                         return;
                                     }}
                                     onfocus={() => {
                                         if (el.size !== 'Small') return;
                                         handleChange(index, 'size', '')
                                     }}
                                     style={'size_input'}
                                     inputStyle={'size_text_input'}
                    />
                    {drink ? <CustomTextInput value={el.serves}
                                              onChange={(event) => handleChange(index, 'serves', event.target.value)}
                                              type={'text'}
                                              onblur={() => {
                                                  if (el.serves.length === 0) {
                                                      handleChange(index, 'serves', '30')
                                                  }
                                                  return;
                                              }}
                                              onfocus={() => {
                                                  if (el.serves !== '30') return;
                                                  handleChange(index, 'serves', '')
                                              }}
                                              style={'serves_input'}
                                              inputStyle={'serves_text_input'}
                    /> : <PlainListDropDown style={'pldd_serves'}
                                            selected={el.serves}
                                            onSelectItem={(selected => handleChange(index, 'serves', selected.data.name.toString()))}
                                            listType={'DIGIT_DROP'}/>
                    }
                    <div>
                        <img src={rupee_logo_w}/>
                        <CustomTextInput value={el.price}
                                         onChange={(event) => handleChange(index, 'price', event.target.value)}
                                         type={'text'}
                                         onblur={() => {
                                             if (el.price.length === 0) {
                                                 handleChange(index, 'price', '100')
                                             }
                                             return;
                                         }}
                                         onfocus={() => {
                                             if (el.price !== '100') return;
                                             handleChange(index, 'price', '')
                                         }}
                                         style={'size_input'}
                                         inputStyle={'price_text_input'}
                        />
                    </div>
                </div>)}
            </div>
        </div> : null}
    </div>);
};

export default Selections;

