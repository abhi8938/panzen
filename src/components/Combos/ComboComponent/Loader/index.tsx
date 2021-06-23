import React, {FunctionComponent} from 'react';
import './loader.css';
import Skeleton, {SkeletonTheme} from "react-loading-skeleton";
import {loaderBaseColor, loaderHighlightColor} from "../../../../constants/data";

type Props = {
    loaderStyle?: string
};

const Loaders: FunctionComponent<Props> =
    ({
         loaderStyle = ''
     }) => {

        function singleLoader() {
            return <div>
                <Skeleton duration={3} width={'100%'} height={'100%'}/>
            </div>
        }

        return <SkeletonTheme color={loaderBaseColor} highlightColor={loaderHighlightColor}>
            <div className={loaderStyle}>
                {singleLoader()}
            </div>
        </SkeletonTheme>
    };

export default Loaders;
