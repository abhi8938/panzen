import React, {FunctionComponent} from 'react';
import Skeleton, {SkeletonTheme} from "react-loading-skeleton";
import {loaderBaseColor, loaderHighlightColor} from "../../../../constants/data";
import './loader.css';

type Props = {};

const Loader: FunctionComponent<Props> =
    ({}) => {
        return (
            <SkeletonTheme color={loaderBaseColor} highlightColor={loaderHighlightColor}>
                <div className={'DineIn_Loader'}>
                    <div>
                        <Skeleton duration={3} width={'100%'} height={'100%'}/>
                    </div>
                    <div>
                        <Skeleton duration={3} width={'100%'} height={'100%'}/>
                    </div>
                    <div>
                        <Skeleton duration={3} width={'100%'} height={'100%'}/>
                    </div>
                </div>
            </SkeletonTheme>
        );
    };

export default Loader;
