import React, {FunctionComponent, useEffect, useState} from 'react';
import './totalComponent.css'
import Skeleton, {SkeletonTheme} from "react-loading-skeleton";
import {loaderBaseColor,loaderHighlightColor} from '../../../constants/data';

type Props = {
    title?: string,
    data?: string,
    icon: any,
    loading?:boolean
};

const TotalComponent: FunctionComponent<Props> =
    ({
         title,
         data,
         icon,
         loading = true
     }) => {
        const [loader, setLoading] = useState(loading);
        useEffect(() => {
            setTimeout(() => {
                setLoading(false)
            }, 5000);
        }, []);
        return (
            <div className={'total_container_parent'}>
                <img src={icon} className={"total_component_icon"} alt={'icon'}/>
                <div className={'total_second_child'}>
                    <SkeletonTheme color={loaderBaseColor} highlightColor={loaderHighlightColor}>
                        <text className={'total_component_title'}>{ !loader? title : <Skeleton duration={3}/>}</text>
                    </SkeletonTheme>
                    <SkeletonTheme color={loaderBaseColor} highlightColor={loaderHighlightColor}>
                        <text className={'total_component_data'}>{!loader ? data : <Skeleton duration={3}/>}</text>
                    </SkeletonTheme>
                </div>

            </div>

        );
    };

export default TotalComponent;
