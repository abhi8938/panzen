import React, {FunctionComponent, useEffect, useState} from 'react';
import './comboComponent.css';
import ItemComponent from "../../common/ItemComponent";
import {graph_image, three_dots_image, trash_image} from "../../../Assets/AllItems";
import {rupee_logo_w} from "../../../Assets/OnlineOrder";
import Loaders from "./Loader";
import ComboService from "../services";
import EditModal from "../../common/EditModalFrame";
import AddNewItem from "../../Allitems/AddNewItem";
import {rating_v_2} from "../../../constants/data";
import {combo} from "../index";
import {Item} from "../../Allitems";
import AddNewCombo from "../AddNewCombo";

const service = new ComboService();
type Props = {
    loading: boolean,
    items: Array<{ name: string, id: string }>,
    name: string,
    description: string,
    rating: number,
    price: number,
    list?: Array<{ data: any, id: string }>,
    loadingItem?: boolean,
    onDelete: () => void,
    showModal?: boolean,
    onUpdate?: (data: combo) => void,
    comboImage?: string
};

const ComboComponent: FunctionComponent<Props> =
    ({
         loading,
         items,
         rating,
         price,
         description,
         name,
         list = [{
             data: {
                 branchID: '',
                 itemImage: '',
                 availablity: false,
                 price: 0,
                 time: '',
                 name: '',
                 description: 'string',
                 ratings: 0,
                 type: 'string',
                 cuisine: 'string'
             }, id: ''
         }, {
             data: {
                 branchID: '',
                 itemImage: '',
                 availablity: false,
                 price: 0,
                 time: '',
                 name: '',
                 description: 'string',
                 ratings: 0,
                 type: 'string',
                 cuisine: 'string'
             }, id: ''
         }, {
             data: {
                 branchID: '',
                 itemImage: '',
                 availablity: false,
                 price: 0,
                 time: '',
                 name: '',
                 description: 'string',
                 ratings: 0,
                 type: 'string',
                 cuisine: 'string'
             }, id: ''
         }],
         loadingItem = true,
         onDelete,
         showModal = false,
         onUpdate,
         comboImage
     }) => {
        const [load, setLoad] = useState(loadingItem);
        const [dishes, setDishes] = useState(list);
        const [show, setShow] = useState(showModal);

        const fetchItems = async () => {
            setLoad(true);
            let data = items.map(async el => {
                const response = await service.getSingleItem(el.id);
                return response.data
            });
            let dishesList = await Promise.all(data);
            setDishes(dishesList);
            setLoad(false);
        };
        useEffect(() => {
            fetchItems()
        }, [items]);


        return <div className={'comboComponent'}>
            <div>
                <div>
                    {dishes.map(el => <ItemComponent loading={load}
                                                     favorite={el.data.favorite !== undefined ? el.data.favorite : false}
                                                     combo={true}
                                                     Name={el.data.name}
                                                     src={el.data.itemImage}
                                                     Description={el.data.description}
                                                     Rating={el.data.ratings}
                                                     Value={el.data.price}/>
                    )}
                </div>
                <img src={three_dots_image} onClick={() => setShow(!show)}/>
            </div>
            <div>
                <div>
                    <text>Combo Name</text>
                    {loading == true ? <Loaders loaderStyle={'mg-text-loader'}/> : <text>{name}</text>}
                </div>
                <div>
                    <text>Combo Description</text>
                    {loading == true ? <Loaders loaderStyle={'long-text-loader'}/>
                        : <text>{description}</text>}
                </div>
                <div>
                    <text>Combo Rating</text>
                    {loading == true ? <Loaders loaderStyle={'mg-text-loader'}/> : <text>{rating}</text>}
                </div>
                <div>
                    <text>Combo Price</text>
                    {loading == true ? <Loaders loaderStyle={'small-text-loader'}/> :
                        <text><img src={rupee_logo_w}/>{price}</text>}
                </div>
            </div>
            <div>
                {comboImage !== undefined ? <text>Combo Image</text> : null}
                {comboImage !== undefined ? <img
                    className={'comboImage'}
                    alt={''}
                    src={comboImage}/> : null}
            </div>
            <div>
                <text>Remove from menu</text>
                <div>
                    <img src={trash_image} onClick={() => onDelete()}/>
                </div>
            </div>
            <EditModal toggleShow={() => setShow(!show)} show={show}>
                <AddNewCombo
                    buttonTitle={'Update'}
                    onPost={data => {
                        setShow(!show);
                        return onUpdate !== undefined ? onUpdate(data) : console.log(data)
                    }}
                    comboDescription={description}
                    comboName={name}
                    comboItems={{data: items}}
                    comboPrice={price.toString()}
                    comboRating={rating_v_2[rating - 1]}
                    inModal={true}/>
            </EditModal>
        </div>
    };

export default ComboComponent;
