import React, {FunctionComponent} from "react";
import {
    employee_rating_1,
    employee_rating_2,
    employee_rating_3,
    employee_rating_4,
    employee_rating_5, product_rating_1, product_rating_2,
    product_rating_3,
    product_rating_4,
    product_rating_5,
    top_rank_badge
} from "../../../../Assets/overview";
import './ratingItem.css'
type itemProps = {
    title: string,
    rating: number,
    icon: any,
    product:boolean
}
const Item: FunctionComponent<itemProps> =
    ({
         title,
         rating,
         icon,
         product
     }) => {
        let ratingIcon = null;
        if(rating === 5) ratingIcon = product ? product_rating_5:employee_rating_5 ;
        else if(rating === 4) ratingIcon = product? product_rating_4:employee_rating_4;
        else if(rating === 3) ratingIcon = product? product_rating_3:employee_rating_3;
        else if(rating === 2) ratingIcon = product? product_rating_2:employee_rating_2;
        else ratingIcon = product? product_rating_1: employee_rating_1;

        const firstChildContainer = rating === 5? 'rating_item_first_child_icons rating_item_first_child_icons_5':'rating_item_first_child_icons'
        return (
            <div className={'rating_item_parent'}>
                <div className={'rating_item_first_child'}>
                    <div className={firstChildContainer}>
                        {rating === 5?<img src={top_rank_badge} className={'rating_item_first_child_top'} alt={'icon'}/>:null}
                        <img src={icon} className={'rating_item_first_child_icon'} alt={'icon'}/>
                    </div>
                    <text className={'rating_item_first_child_title'}>{title}</text>
                </div>
                <div className={'rating_item_second_child'}>
                    <img src={ratingIcon} className={'rating_item_rating_icon'} alt={'ratingIcon'}/>
                </div>
            </div>
        )
    };
export default Item;