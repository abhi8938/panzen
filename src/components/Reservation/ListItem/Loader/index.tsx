import React, {FunctionComponent} from 'react';
import Skeleton, {SkeletonTheme} from "react-loading-skeleton";
import {loaderBaseColor, loaderHighlightColor} from "../../../../constants/data";
import './loader.css';

type Props = {
    logo: any
};

const Loader: FunctionComponent<Props> =  ({
         logo
     }) => {
        const loaderHolder: any = [];

        loaderHolder.push(
            <div>
                {logo ? <div>
                    <Skeleton duration={3} width={'100%'} height={'100%'}/>
                </div> : null}
                <div>
                    <div>
                        <Skeleton duration={3} width={'100%'} height={'90%'}/>
                    </div>
                    <div>
                        <Skeleton duration={3} width={'100%'} height={'90%'}/>
                    </div>
                </div>
            </div>
        )

;
return (
    <SkeletonTheme color={loaderBaseColor} highlightColor={loaderHighlightColor}>
        <div className={'reservation_loader'}>
            {loaderHolder}
        </div>
    </SkeletonTheme>
);
}
;

export default Loader;
