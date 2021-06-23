import React, {FunctionComponent, useState, useEffect} from 'react';
import './topSellingComponent.css'

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSortDown, faSortUp} from "@fortawesome/free-solid-svg-icons";
import {Dropdown2} from "../common/Dropdown2";
import Loader from "./Loader";

const sampleData = [
    {product: 'Corona Extra', category: 'Beer', sale: 690},
    {product: 'Jack Daniels', category: 'Whiskey', sale: 383},
    {product: 'Egg Island', category: 'Salad', sale: 221},
    {product: 'Magilton', category: 'Entrees', sale: 219},
    {product: 'Virgin Mary', category: 'Mocktail', sale: 187},
    {product: 'Alpaca', category: 'Wine', sale: 120},
    {product: 'Just A Bite brownie', category: 'Dessert', sale: 120},
    {product: 'Classic Crispy Fries', category: 'Side Items', sale: 111}
]

type Props = {
    selectedMonth?: {
        id: number,
        name: string
    }
    loading?: boolean
};
type itemProps = {
    product?: string,
    category?: string,
    sale: number
};

const Item: FunctionComponent<itemProps> =
    ({
         product,
         category,
         sale
     }) => {
        let saleStyle = sale > 115 ? 'top_selling_item_sale' : 'top_selling_item_sale top_selling_item_sale_loss'
        let arrowComponent = sale > 115 ? <FontAwesomeIcon
            icon={faSortUp}
            className={'top_selling_item_sale_icon_up'}
            color={'#00bb5d'}
        /> : <FontAwesomeIcon
            icon={faSortDown}
            className={'top_selling_item_sale_icon_down'}
            color={'#fe1b36'}
        />;
        return (
            <div className={'top_selling_item_parent'}>
                <div className={'top_selling_item_first_child'}>
                    <text className={'top_selling_item_product'}>{product}</text>
                    <text className={'top_selling_item_category'}>{category}</text>
                </div>
                <div className={'top_selling_item_second_child'}>
                    <text className={saleStyle}>{sale}</text>
                    {arrowComponent}
                </div>
            </div>
        )
    }

const TopSellingComponent: FunctionComponent<Props> =
    ({
         selectedMonth = {
             id: 0,
             name: 'January',
         },
         loading = true
     }) => {
        const [selected, toggleSelected] = useState(selectedMonth);
        const [loader, setLoading] = useState(loading);

        useEffect(() => {
            setTimeout(() => {
                setLoading(false)
            }, 5000);
        }, []);

        return (
            <div className={'top_selling_parent'}>
                <div className={'top_selling_first_child'}>
                    <text className={'section_heading'}>Top Selling Product</text>
                </div>
                {loader ?<Loader howManyColumns={7}/>
                    : <div className={'top_selling_second_child'}>
                        {sampleData.map((data) => <Item product={data.product} category={data.category}
                                                        sale={data.sale}/>)}
                    </div>}
            </div>
        );
    };

export default TopSellingComponent;
