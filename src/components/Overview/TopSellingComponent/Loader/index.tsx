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
                <div className={'top_selling_second_child_loader'}>
                    <div className={'top_selling_second_child_loader_child'}>
                        <Skeleton duration={3} width={'100%'} height={'40%'}/>
                    </div>
                    <div className={'top_selling_second_child_loader_child'}>
                        <Skeleton duration={3} width={'85%'} height={'40%'}/>
                    </div>
                    <div className={'top_selling_second_child_loader_child'}>
                        <Skeleton duration={3} width={'50%'} height={'40%'}/>
                    </div>
                </div>
            );
        }
        return (
            <SkeletonTheme color={loaderBaseColor} highlightColor={loaderHighlightColor}>
                <div className={'top_selling_second_child_loader_parent'}>
                    {loaderHolder}
                </div>
            </SkeletonTheme>
        );
    };

export default Loader;
