import React, {FunctionComponent, useState} from 'react';
import './addnewcombo.css';
import {CustomTextInput} from '../../common/CustomTextInput'
import {product_rating_1, product_rating_5} from "../../../Assets/overview";
import {RatingDropdown} from "../../common/RatingDropdown";
import {CustomButton} from "../../Login/CustomButton";
import {rupee_logo_w} from "../../../Assets/OnlineOrder";
import comboService from '../services';
import itemService from '../../Allitems/services';
import {combo} from "../index";
import SearchBar from "../../common/SearchBar";
import SearchItems from "./SearchItems";
import AlertBox, {alertProps} from "../../common/AlertBox";
import UploadComponent from "../../common/UploadComponent";

let service = new comboService();

type Props = {
    comboName?: string,
    comboDescription?: string
    comboPrice?: string,
    comboRating?: {
        id: number,
        name: string,
        logo: any
    },
    onPost?: (data: combo) => void,
    comboItems?: { data: Array<{ name: string, id: string }> }
    searchInput?: string
    inModal: boolean,
    buttonTitle: string,
    alertData?: alertProps,
    comboImage?:any,
};

const AddNewCombo: FunctionComponent<Props> =
    ({
         comboDescription = 'Enter Description',
         comboName = 'Enter Name',
         comboPrice = '0',
         comboRating = {
             id: 0,
             name: '1',
             logo: product_rating_1
         },
         onPost,
         comboItems = {data: []},
         searchInput = 'Search Items',
         inModal,
         buttonTitle,
         alertData = {
             showAlert: false,
             message: '',
             title: '',
             success: false
         },
        comboImage
     }) => {
        const [name, setName] = useState(comboName);
        const [description, setDescription] = useState(comboDescription);
        const [rating, setRating] = useState(comboRating);
        const [price, setPrice] = useState(comboPrice);
        const [search, setSearch] = useState(searchInput);
        const [items, setItems] = useState(comboItems);
        const [aler, setaler] = useState(alertData);
        const [image, setImage] = useState(comboImage);


        const createCombo = async () => {
            if (name === '' || name === 'Enter Name') {
                return alert('Empty Name')
            }
            if (description === '' || description === 'Enter Description') {
                return alert('Empty Description')
            }
            if (description === '' || description === 'Enter Description') {
                return alert('Empty Description')
            }
            if (price === '' || price === '0') {
                return alert('Price Required')
            }
            if (items.data.length < 2) {
                return alert('Select More Items')
            }

            const response = await service.createCombo(
                'IEFDIKzIJHVmQJ6yHhuw',
                name,
                items.data,
                description,
                parseInt(rating.name),
                parseInt(price),
                image
            );
            console.log('combo,', response.data);
            if (response.status === 200) {
                return setaler({
                    message: 'Combo Created Successfully',
                    success: true,
                    showAlert: !aler.showAlert
                })
            }
            return setaler({
                message: response.data,
                success: false,
                showAlert: !aler.showAlert
            })
        };
        const onUpdate = () => {
            if (name === '' || name === 'Enter Name') {
                return alert('Empty Name')
            }
            if (description === '' || description === 'Enter Description') {
                return alert('Empty Description')
            }
            if (description === '' || description === 'Enter Description') {
                return alert('Empty Description')
            }
            if (price === '' || price === '0') {
                return alert('Price Required')
            }
            if (items.data.length < 2) {
                return alert('Select More Items')
            }
            return onPost !== undefined ? onPost({
                name,
                description,
                price: parseInt(price),
                rating: parseInt(rating.name),
                items: items.data
            }) : null
        };
        const style = inModal ? 'updateCombo' : '';
        const inputStyle = inModal ? 'updateComboInput' : '';
        return (<div className={'add_new_combo ' + style}>
                <CustomTextInput title={'Combo Name'}
                                 value={name}
                                 onChange={(event) => setName(event.target.value)}
                                 type={'text'}
                                 onblur={() => {
                                     if (name === "" || name === " ") {
                                         setName('Enter Name')
                                     }
                                     return;
                                 }}
                                 onfocus={() => {
                                     if (name !== 'Enter Name') return;
                                     setName('')
                                 }}
                                 style={'combo_input ' + inputStyle}
                                 inputStyle={'combo_name_input'}
                />
                <CustomTextInput title={'Combo Description'}
                                 value={description}
                                 onChange={(event) => setDescription(event.target.value)}
                                 type={'text'}
                                 onblur={() => {
                                     if (description === "" || description === " ") {
                                         setDescription('Enter Description')
                                     }
                                     return;
                                 }}
                                 onfocus={() => {
                                     if (description !== 'Enter Description') return;
                                     setDescription('')
                                 }}
                                 style={'combo_input ' + inputStyle}
                                 inputStyle={'combo_description_input'}
                />
                <CustomTextInput title={'Combo Price'}
                                 value={price}
                                 onChange={(event) => setPrice(event.target.value)}
                                 type={'text'}
                                 onblur={() => {
                                     if (price === "" || price === " ") {
                                         setPrice('0')
                                     }
                                     return;
                                 }}
                                 onfocus={() => {
                                     if (price !== '0') return;
                                     setPrice('')
                                 }}
                                 style={'combo_input ' + inputStyle}
                                 inputStyle={'combo_price_input'}
                                 logo={rupee_logo_w}
                />
                <div>
                    <text>Combo Rating</text>
                    <RatingDropdown inputStyle={'combo_extra'} selected={rating} onSelectItem={setRating} type={'V2'}/>
                </div>
                <div>
                    <text>Add Items</text>
                    <SearchItems
                        comboItems={items.data}
                        onDeleteItem={item => {
                            const data = items.data;
                            data.splice(items.data.indexOf({name: item.name, id: item.id}), 1);
                            setItems({data: data});
                        }}
                        addItems={item => {
                            const data = items.data;
                            data.push({name: item.data.name, id: item.id});
                            setItems({data: data});
                        }}
                    />
                </div>
                <UploadComponent image={image} onSelectImage={image => setImage(image)} inModal={inModal}/>
                <CustomButton title={buttonTitle} style={'update'}
                              onclick={() => onPost !== undefined ? onUpdate() : createCombo()}/>
                <AlertBox message={aler.message}
                          success={aler.success}
                          handleClose={() => setaler({
                              message: aler.message,
                              success: aler.success,
                              showAlert: !aler.showAlert,
                          })}
                          show={aler.showAlert}/>
            </div>


        );
    };

export default AddNewCombo;
