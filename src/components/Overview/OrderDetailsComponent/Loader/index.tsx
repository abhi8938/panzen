import React, {FunctionComponent} from 'react';
import Skeleton, {SkeletonTheme} from "react-loading-skeleton";
import {loaderBaseColor, loaderHighlightColor} from "../../../../constants/data";
import './loader.css';

type Props = {
    howManyColumns: number,
    howManyRows?: number
};

const Loader: FunctionComponent<Props> =
    ({
         howManyColumns,
         howManyRows
     }) => {
        const AxisYLoader = [];
        const AxisXLoader = [];
        const DataLoader = [];
        for (let i = 0; i < howManyColumns; i++) {
            AxisYLoader.push(
                <div className={'order_details_L_f_c_left_el'}>
                    <Skeleton duration={3} width={'100%'} height={'30%'}/>
                </div>
            );
        }
        for (let i = 0; i < 12; i++) {
            let height = Math.floor(Math.random() * 100) + 10;
            DataLoader.push(
                <div className={'order_details_L_f_c_right_el'}>
                    <Skeleton duration={3} width={'100%'} height={`${height.toString()}%`}/>
                </div>
            );
        }
        for (let i = 0; i < 12; i++) {
            AxisXLoader.push(
                <div className={'order_details_L_s_c_el'}>
                    <Skeleton duration={3} width={'100%'} height={`100%`}/>
                </div>
            );
        }

        return (
            <SkeletonTheme color={loaderBaseColor} highlightColor={loaderHighlightColor}>
                <div className={'order_details_L_parent'}>
                    <div className={'order_details_L_f_c'}>
                        <div className={'order_details_L_f_c_left'}>
                            {AxisYLoader}
                        </div>
                        <div className={'order_details_L_f_c_right'}>
                            {DataLoader}
                        </div>
                    </div>
                    <div className={'order_details_L_s_c'}>
                        {AxisXLoader}
                    </div>
                </div>
            </SkeletonTheme>
        );
    };

export default Loader;
