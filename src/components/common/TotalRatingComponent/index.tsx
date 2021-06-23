import React, {FunctionComponent, useEffect, useState} from 'react';
import './totalRating.css';
import sampleDish from '../../../Assets/sampleDish.jpg';
import Loaders from "../../Combos/ComboComponent/Loader";

const sampleRating = [
    {
        id: 0,
        total: 201,
        rating: 1
    },
    {
        id: 1,
        total: 602,
        rating: 2
    },
    {
        id: 2,
        total: 1200,
        rating: 3
    },
    {
        id: 3,
        total: 980,
        rating: 4
    },
    {
        id: 4,
        total: 1890,
        rating: 5
    }
];
type Props = {
    loading?: boolean,
    darkTheme?: string,
    ratingsTotal: number,
};
const background = ['#1cd1a1', '#fe5578', '#59bcfb', '#feca57', '#e04bfb']
const TotalRatingsComponent: FunctionComponent<Props> =
    ({
         loading = true,
         darkTheme, ratingsTotal,

     }) => {
        const [loader, setLoader] = useState(loading);
        function getBarHeight(totals:number){
             let height =  (totals/ratingsTotal) * 100;
             console.log(height,totals);
             if(height < 10) height = height + 5;
             if(height > 19 && height < 30) height = height - 6;
             if(height > 29 && height < 40) height = height - 5;
             if(height > 39 && height < 50) height = height + 8;
             return height
        }
        useEffect(() => {
            setTimeout(() => {
                setLoader(false)
            }, 1000)
        }, []);

        return (
            <div className={`total_rating_component ${darkTheme}`}>
                <text>Total Ratings: {ratingsTotal} </text>
                <div>
                    {sampleRating.map((data, index) =>
                        <div>
                            <div>
                                <text>{data.total}</text>
                                <div style={{height: `${getBarHeight(data.total)}vmin`, backgroundColor: `${background[index]}`}}/>
                            </div>
                            <div>
                                <div style={{backgroundColor: `${background[index]}`}}/>
                                <text>{data.rating} Star</text>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    };

export default TotalRatingsComponent;
