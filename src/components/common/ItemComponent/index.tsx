import React, {FunctionComponent, useState} from 'react';
import './itemComponent.css';
import {itemSample_logo, three_dots_image, graph_image, trash_image, rupee_image} from '../../../Assets/AllItems';
import {faHeart} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Loaders from "../../Combos/ComboComponent/Loader";
import EditModal from "../EditModalFrame";
import AddNewItem from "../../Allitems/AddNewItem";
import {rating_v_2} from "../../../constants/data";
import {Item} from "../../Allitems";

type Props = {
    Name: string,
    Description: string,
    Rating: number,
    Value: number,
    Image?: string,
    graphData?: any,
    combo?: boolean,
    loading: boolean,
    src?: string,
    showModal?: boolean,
    favorite: boolean,
    toggleFav?: () => void,
    onDelete?: () => void,
    onUpdate?: (data: Item) => void,
};

const ItemComponent: FunctionComponent<Props> =
    ({
         Description,
         Rating,
         Value,
         Name,
         combo = false,
         loading,
         src,
         showModal = false,
         favorite,
         toggleFav,
         onDelete,
         onUpdate
     }) => {
        const comboStyle = combo == true ? 'comboItem' : '';
        const [show, setShow] = useState(showModal);
        const [fav,setFav] = useState(favorite);

        return <div className={'dishComponent ' + comboStyle}>
            <div>
                <img
                    className={loading ? 'itemImage':''}
                    alt={''}
                    src={src}/>
                {combo == false ? <img alt={'nav'} onClick={() => setShow(!show)} src={three_dots_image}/> : <div/>}
            </div>
            {loading ? <Loaders loaderStyle={'loaders'}/> : <div>
                <text>{Name}</text>
                <FontAwesomeIcon
                    icon={faHeart}
                    className="dishComponent_favourite"
                    color={fav ? '#f44336' : '#cbcbcb'}
                    size={'2x'}
                    onClick={() => {
                        setFav(true)
                        return toggleFav !== undefined ?
                        toggleFav() : null}}
                />
            </div>}
            {loading ? <Loaders loaderStyle={'lg-text-loader'}/> : <text>{Description}</text>}
            <div>
                {loading ? <Loaders loaderStyle={'sm-text-loader'}/> : <div>
                    <img/>
                    <text>({Rating}.0)</text>
                </div>}
                {loading ? <Loaders loaderStyle={'sm-text-loader sm-text-margin'}/> : <div>
                    <img src={rupee_image}/>
                    <text>{Value}</text>
                </div>}
            </div>
            {combo != true ? <div>
                <text>Remove from menu</text>
                <div>
                    <img alt={'graph'} src={graph_image}/>
                    <img alt={'trash'} src={trash_image} onClick={event => onDelete !== undefined ? onDelete() : null}/>
                </div>
            </div> : <div/>}
            <EditModal toggleShow={() => setShow(!show)} show={show}>
                <AddNewItem
                    itemImage={src}
                    onPost={data => onUpdate !== undefined ? onUpdate(data) : console.log(data)}
                    ratingStyle={'rating_dropdown_darker'}
                    inModal={true}
                    style={'edit_item_modal'}
                    itemDescription={Description} itemName={Name} itemPrice={Value.toString()}
                    itemRating={rating_v_2[Rating - 1]}/>
            </EditModal>
        </div>
    };

export default ItemComponent;
