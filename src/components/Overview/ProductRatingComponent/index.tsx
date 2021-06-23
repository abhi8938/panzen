import React, {FunctionComponent, useEffect, useState} from 'react';
import './productRating.css';
import Item from '../common/RatingItem';
import sampleDish from '../../../Assets/sampleDish.jpg';
import Loader from "./Loader";

const sampleRating = [
    {
        id: 0,
        product: 'Just a Bite Apple',
        rating: 5
    },
    {
        id: 1,
        product: 'Magilton',
        rating: 4
    },
    {
        id: 2,
        product: 'Bramble',
        rating: 4
    },
    {
        id: 3,
        product: 'On a Diet',
        rating: 3
    },
    {
        id: 4,
        product: 'On a Diet',
        rating: 3
    }
];
type Props = {
    loading?: boolean,
    darkTheme?:string,
    columns?:number
};
const ProductRatingComponent: FunctionComponent<Props> =
    ({
         loading = true,
        darkTheme,columns

     }) => {
        const [loader,setLoader] = useState(loading);
        useEffect(()=>{
            setTimeout(() =>{
                setLoader(false)
            },1000)
        },[]);
        return (
            <div className={`product_rating_parent ${darkTheme}`}>
                {darkTheme !== 'darkTheme'?<div className={'product_rating_first_child'}>
                    <text className={'section_heading'}>Product Rating</text>
                </div>:null}
                {loader?<div className={'product_rating_loader'}>
                    <Loader howManyColumns={columns !== undefined? columns : 4}/>
                    </div>
                    :
                    <div className={'product_rating_second_child'}>
                    {sampleRating.map(data => <Item title={data.product} rating={data.rating} icon={sampleDish}
                                                    product={true}/>)}
                </div>}
            </div>
        );
    };

export default ProductRatingComponent;
