import React, {FunctionComponent, useEffect, useState} from 'react';
import './addnewitem.css';
import {CustomTextInput} from '../../common/CustomTextInput'
import {rupee_image, shrimp_logo} from "../../../Assets/AllItems";
import {veg_nonVeg as veg_list, itemType} from '../../../constants/data';
import {ItemTypeDropDown} from "../../common/ItemTypeDropDown";
import {product_rating_1, product_rating_5} from "../../../Assets/overview";
import {RatingDropdown} from "../../common/RatingDropdown";
import Switch from "react-switch";
import UploadComponent from "../../common/UploadComponent";
import {CustomButton} from "../../Login/CustomButton";
import {rupee_logo_w} from "../../../Assets/OnlineOrder";
import ItemService from "../services";
import {IconSetDrop, selectedType} from "../IconSetDrop";
import {beer_1_icon} from "../../../Assets/AllItems/IconSet";
import {Item} from "../index";
import Nanobar from "../../common/Nanobar";
import AlertBox, {alertProps} from "../../common/AlertBox";
import {PlainListDropDown} from "../../Inventory/common/PlainListDropDown";
import Selections, {Toggle2} from "../Selections";

let service = new ItemService();
type toggleProps = {
    selected?: string,
    label: string,
    onToggle: (label: string) => void
};
const Toggle: FunctionComponent<toggleProps> =
    ({
         selected,
         label,
         onToggle
     }) => {
        const selectedStyle = selected === label ? 'order_details_toggleButton_switch order_details_toggleButton_switch_on' : 'order_details_toggleButton_switch';
        return (
            <div className={'order_details_toggleButton_parent'} onClick={() => onToggle(label)}>
                <div className={'Toggle_switch_2  ' + selectedStyle}/>
            </div>
        )
    };
type Props = {
    itemName?: string,
    itemDescription?: string
    category?: {
        branchID: string,
        name: string,
        icon: string
    },
    itemPrice?: string,
    itemRating?: {
        id: number,
        name: string,
        logo: any
    },
    favorite?: boolean,
    itemImage?: any,
    categoryName?: string,
    categorySelected?: string,
    inModal: boolean,
    style: string,
    ratingStyle: string,
    newIcon?: selectedType,
    onPost?: (data: Item) => void,
    categories?: Array<{
        data: any,
        id: string
    }>,
    loading?: boolean,
    alertData?: alertProps,
    foodType?: string,
    veg_nonVeg?: string,
    serves_default?: string,
    drink?: boolean,
    selections?: boolean
};

const AddNewItem: FunctionComponent<Props> =
    ({
         category = {
             branchID: '',
             name: 'Select',
             icon: shrimp_logo
         },
         itemDescription = 'Enter Description',
         itemName = 'Enter Name',
         favorite = false,
         itemPrice = '0',
         itemRating = {
             id: 0,
             logo: product_rating_1,
             name: '1'
         },
         itemImage,
         categoryName = 'Enter Name',
         categorySelected,
         style,
         inModal,
         ratingStyle,
         newIcon = {
             id: 0,
             logo: beer_1_icon
         },
         onPost,
         categories = [],
         loading = false,
         alertData = {
             showAlert: false,
             message: '',
             title: '',
             success: false
         },
         foodType = itemType[0].data.name,
         veg_nonVeg = veg_list[0].data.name,
         serves_default = '1',
         drink = false,
         selections = false
     }) => {
        const [name, setName] = useState(itemName);
        const [description, setDescription] = useState(itemDescription);
        const [type, setType] = useState(category);
        const [fav, setFav] = useState(favorite);
        const [rating, setRating] = useState(itemRating);
        const [price, setPrice] = useState(itemPrice);
        const [image, setImage] = useState(itemImage);
        const [cName, setCName] = useState(categoryName);
        const [toggle, handleToggle] = useState(categorySelected);
        const [icon, setIcon] = useState(newIcon);
        const [Clist, setCList] = useState(categories);
        const [actionLoader, setActionLoader] = useState(loading)
        const [aler, setaler] = useState(alertData);
        const [typeFood, setTypeFood] = useState(foodType);
        const [veg, setVeg] = useState(veg_nonVeg);
        const [serve, setServe] = useState(serves_default);
        const [isDrink, toggleDrink] = useState(drink);
        const [isSelections, toggleSelection] = useState(selections);


        const fetchCList = async () => {
            const response = await service.getCategories();
            if (response.status === 200) {
                return setCList(response.data);
            }
            return setaler({
                message: response.data,
                success: false,
                showAlert: !aler.showAlert
            })
        }

        useEffect(() => {
            fetchCList()
        }, []);

        const createItem = async () => {
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
            if (image === undefined) {
                return alert('Image Reguired')
            }
            let category = toggle === 'CHOOSE' ? {
                name: type.name,
                icon: type.icon
            } : {
                name: cName,
                icon: icon.logo
            };

            setActionLoader(!actionLoader);
            const response = await service.createItem(
                'IEFDIKzIJHVmQJ6yHhuw',
                name,
                category,
                parseInt(rating.name),
                true,
                parseInt(price),
                description,
                fav,
                image);
            setActionLoader(!actionLoader);
            console.log('response_CreateItem', response);

            if (response.status === 200) {
                return setaler({
                    message: 'Item Created Successfully',
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

        const createCategory = async () => {
            if (cName === '' || cName === 'Enter Name') {
                return alert('Empty Name')
            }
            setActionLoader(!actionLoader);
            const response = await service.createMenuCategory(
                cName,
                icon.logo);
            await fetchCList()
            setActionLoader(!actionLoader);

            if (response.status === 200) {
                return setaler({
                    message: 'Category Created Successfully',
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
            setActionLoader(!actionLoader);
            if (onPost !== undefined) {
                onPost({
                    name,
                    description,
                    price: parseInt(price),
                    itemImage: image,
                    ratings: parseInt(rating.name)
                })
            }
            setActionLoader(!actionLoader);
            return
        };

        return (<div className={style}>
                <Nanobar loading={actionLoader}/>
                {/*Create row of two columns other containing two dropdown of type and veg/nonveg dropdown selector - (DONE)*/}
                <div>
                    <CustomTextInput title={'Item Name'}
                                     value={name}
                                     onChange={(event) => setName(event.target.value)}
                                     type={'text'}
                                     onblur={() => {
                                         if (name.length === 0) {
                                             setName('Enter Name')
                                         }
                                         return;
                                     }}
                                     onfocus={() => {
                                         if (name !== 'Enter Name') return;
                                         setName('')
                                     }}
                                     style={'item_input'}
                                     inputStyle={'item_name_input'}
                    />
                    {!inModal ? <div>
                        <PlainListDropDown style={'dropdownType_veg'} selected={typeFood}
                                           onSelectItem={(selected => setTypeFood(selected.data.name))}
                                           listType={'ITEM_TYPE'}
                                           title={'Type'}/>
                        <PlainListDropDown style={'dropdownType_veg'} selected={veg}
                                           onSelectItem={(selected => setVeg(selected.data.name))}
                                           listType={'VEG_NONVEG'}
                                           title={'Veg / Non - Veg'}/>
                    </div> : null}
                </div>
                <CustomTextInput title={'Item Description'}
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
                                     if (description !== 'Enter Description') return
                                     setDescription('')
                                 }}
                                 style={'item_input'}
                                 inputStyle={'item_description_input'}
                />
                {inModal ? null : <div className={"Category_Parent"}>
                    <text>Category</text>
                    <div>
                        <div>
                            <text onClick={() => handleToggle('CHOOSE')}>Select Category</text>
                            <div onClick={() => handleToggle('CHOOSE')}>
                                <Toggle selected={toggle} label={'CHOOSE'} onToggle={(label => handleToggle(label))}/>
                                <img src={type.icon}/>
                                <ItemTypeDropDown categories={Clist} selected={type} onSelectItem={setType}
                                                  type={'DARK'}
                                                  disable={toggle !== 'CHOOSE'}/>
                            </div>
                        </div>
                        <div>
                            <text onClick={() => handleToggle('CREATE')}>Create New Category</text>
                            <div onClick={() => handleToggle('CREATE')}>
                                <Toggle selected={toggle} label={'CREATE'} onToggle={(label => handleToggle(label))}/>
                                <IconSetDrop selected={icon} onSelectItem={setIcon} disable={toggle !== 'CREATE'}/>
                                <CustomTextInput
                                    value={cName}
                                    onChange={(event) => setCName(event.target.value)}
                                    type={'text'}
                                    onblur={() => {
                                        if (cName === "" || cName === " ") {
                                            setCName('Enter Name')
                                        }
                                        return;
                                    }}
                                    onfocus={() => {
                                        if (cName !== 'Enter Name') return;
                                        setCName('')
                                    }}
                                    style={'item_category_new_name'}
                                    inputStyle={'item_category_new_name_input'}
                                    disable={toggle !== 'CREATE'}
                                />
                                <CustomButton
                                    disable={toggle !== 'CREATE'}
                                    title={'Create'}
                                    style={'categoryButton'}
                                    onclick={() => createCategory()}/>
                            </div>
                        </div>
                    </div>
                </div>}
                {/*Create
                    - Toggle for selections - Toggle + 'Add Selections' Label
                    - Select total selections
                          - Dropdown of numbers - 'Selections' label on top
                          - Three dropdown with label in a single row consisting same rows as the selected selections
                    - Toggle for 'Drink serve type' - change serve to ML
                */}
                <Selections drink={isDrink} selected={isSelections} toggle={() => toggleSelection(!isSelections)}/>
                {!isSelections ? <div className={'row_spaced row_spaced_1'}>
                    <CustomTextInput title={'Item Price'}
                                     value={price}
                                     onChange={(event) => setPrice(event.target.value)}
                                     type={'text'}
                                     onblur={() => {
                                         if (price.length === 0) {
                                             setPrice('0')
                                         }
                                         return;
                                     }}
                                     onfocus={() => {
                                         if (price !== '0') return;
                                         setPrice('')
                                     }}
                                     style={'item_input item_input_small'}
                                     inputStyle={inModal ? 'item_price_input_modal' : 'item_price_input'}
                                     logo={inModal ? rupee_image : rupee_logo_w}
                    />
                    {/*Create - Dropdown to add single serve price for item */}
                    <PlainListDropDown style={'dropdownType_serve'} selected={serve}
                                       onSelectItem={(selected => setServe(selected.data.name))}
                                       listType={'DIGIT_DROP'}
                                       title={'Serve'}/>
                </div> : null}
                <div className={'row_spaced row_spaced_2'}>
                    <div className={inModal ? 'rating_div' : ''}>
                        <text>Item Rating</text>
                        <RatingDropdown inputStyle={ratingStyle} selected={rating}
                                        onSelectItem={selected => setRating(selected)} type={'V1'}/>
                    </div>
                    {inModal ? null : <div>
                        <text>Add To Favourites</text>
                        <div>
                            <text>Add</text>
                            <Switch
                                onChange={() => setFav(!fav)}
                                checked={fav}
                                handleDiameter={19}
                                uncheckedIcon={false}
                                checkedIcon={false}
                                height={20}
                                width={35}
                                onColor="#ffd600"
                            />
                        </div>
                    </div>}
                    {!inModal && isSelections ? <div className={'drink_serve_selection'}>
                        <Toggle2 label={isDrink} onToggle={() => toggleDrink(!isDrink)}/>
                        <text>Drink Serve Type</text>
                    </div> : null}
                </div>
                <UploadComponent image={itemImage} onSelectImage={image => setImage(image)} inModal={inModal}/>
                <CustomButton title={inModal ? 'Update' : 'Create'} style={'update'}
                              onclick={() => onPost !== undefined ? onUpdate() : createItem()}/>
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

export default AddNewItem;
