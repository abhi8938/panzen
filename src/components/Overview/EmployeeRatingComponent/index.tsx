import React, {FunctionComponent, useEffect, useState} from 'react';
import './employeeRating.css'
import Item from "../common/RatingItem";
import pic from '../../../Assets/profile.jpg';
import Loader from "../ProductRatingComponent/Loader";

const sampleRating = [
    {
        id: 0,
        rating: 5,
        employee: 'John Eggie'
    },
    {
        id: 1,
        rating: 5,
        employee: 'Martha Stew'
    },
    {
        id: 2,
        rating: 4,
        employee: 'Brewdie'
    },
    {
        id: 3,
        rating: 3,
        employee: 'Brain Quinn'
    }
];
type Props = {
    loading?: boolean
};

const EmployeeRatingComponent: FunctionComponent<Props> =
    ({
         loading = true
     }) => {
        const [loader, setLoading] = useState(loading);
        useEffect(() =>{
          setTimeout(() => {
              setLoading(false);
          },5000)
        },[])
        return (
            <div className={'employee_rating_parent'}>
                <div className={'employee_rating_first_child'}>
                    <text className={'section_heading'}>Employee Rating</text>
                </div>
                {loader ?
                    <div className={'employee_rating_loader'}>
                        <Loader howManyColumns={4}/>
                    </div>
                    :
                    <div className={'employee_rating_second_child'}>
                        {sampleRating.map(data => <Item title={data.employee} rating={data.rating} icon={pic}
                                                        product={false}/>)}
                    </div>}
            </div>
        );
    };

export default EmployeeRatingComponent;
