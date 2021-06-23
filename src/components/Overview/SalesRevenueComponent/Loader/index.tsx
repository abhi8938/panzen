import React, {FunctionComponent} from 'react';
import Skeleton, {SkeletonTheme} from "react-loading-skeleton";
import {loaderBaseColor, loaderHighlightColor} from "../../../../constants/data";
import './loader.css';

type Props = {
    howManyColumns: number,
    howManyRows?:number
};

const Loader: FunctionComponent<Props> =
    ({
         howManyColumns,
         howManyRows
     }) => {
        const loaderHolder = [];
        for (let i = 0; i < howManyColumns; i++) {
            loaderHolder.push(
                <div className={'sales_revenue_first_child_loader_left'}>
                    <div className={'sales_revenue_first_child_loader_child_circle'}>
                        <Skeleton duration={3} width={'100%'} height={'26%'} circle={true}/>
                    </div>
                    <div className={'sales_revenue_first_child_loader_child_second'}>
                        <Skeleton duration={3} width={'80%'} height={'40%'}/>
                    </div>
                    <div className={'sales_revenue_first_child_loader_child'}>
                        <Skeleton duration={3} width={'50%'} height={'40%'}/>
                    </div>
                </div>
            );
        }
        return (
            <SkeletonTheme color={loaderBaseColor} highlightColor={loaderHighlightColor}>
                <div className={'sales_revenue_second_child_loader_parent'}>
                    <div className={'sales_revenue_loader_first_child'}>
                    {loaderHolder}
                    </div>
                    <div className={'sales_revenue_loader_second_child'}>
                        <div className={'sales_revenue_loader_second_child_circle'}>
                            <Skeleton duration={3} width={'90%'} height={'90%'} circle={true}/>
                        </div>
                    </div>
                </div>
            </SkeletonTheme>
        );
    };

export default Loader;
