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
        const loaderHolder = [];
        for (let i = 0; i < howManyColumns; i++) {
            loaderHolder.push(
                <div className={'rating_L_parent_child'}>
                    <div className={'rating_L_parent_left_child'}>
                        <div className={'rating_L_parent_left_icon'}>
                            <Skeleton duration={3} width={'100%'} height={'100%'} circle={true}/>
                        </div>
                        <div className={'rating_L_parent_left_text'}>
                            <Skeleton duration={3} width={'100%'} height={'50%'}/>
                        </div>
                    </div>
                    <div className={'rating_L_parent_right_child'}>
                        <Skeleton duration={3} width={'100%'} height={'100%'} count={1}/>
                    </div>
                </div>
            );
        }
        return (
            <SkeletonTheme color={loaderBaseColor} highlightColor={loaderHighlightColor}>
                <div className={'rating_L_parent'}>
                    {loaderHolder}
                </div>
            </SkeletonTheme>
        );
    };

export default Loader;
