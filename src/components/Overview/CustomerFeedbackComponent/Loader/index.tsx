import React, {FunctionComponent} from 'react';
import Skeleton, {SkeletonTheme} from "react-loading-skeleton";
import {loaderBaseColor, loaderHighlightColor} from "../../../../constants/data";
import './loader.css';

type Props = {
    howManyColumns: number,
};

const Loader: FunctionComponent<Props> =
    ({
         howManyColumns,
     }) => {
        return (
            <SkeletonTheme color={loaderBaseColor} highlightColor={loaderHighlightColor}>
                <div className={'customer_feedback_L_parent'}>
                    <div className={'customer_feedback_L_parent_item'}>
                        <div className={'customer_feedback_L_parent_left_icon'}>
                            <Skeleton duration={3} width={'50%'} height={'60%'} circle={true}/>
                        </div>
                        <div className={'customer_feedback_L_parent_message'}>
                            <div className={'customer_feedback_L_parent_message_Text'}>
                                <Skeleton duration={3} width={'100%'} height={'70%'} count={2} />
                            </div>
                            <div className={'customer_feedback_L_parent_message_Time'}>
                                <Skeleton duration={3} width={'30%'} height={'100%'}  />
                            </div>
                        </div>
                    </div>
                    <div className={'customer_feedback_L_parent_item_inverse'}>
                        <div className={'customer_feedback_L_parent_left_icon'}>
                            <Skeleton duration={3} width={'50%'} height={'60%'} circle={true}/>
                        </div>
                        <div className={'customer_feedback_L_parent_message'}>
                            <div className={'customer_feedback_L_parent_message_Text'}>
                                <Skeleton duration={3} width={'100%'} height={'70%'} count={2} />
                            </div>
                            <div className={'customer_feedback_L_parent_message_Time'}>
                                <Skeleton duration={3} width={'30%'} height={'100%'}  />
                            </div>
                        </div>
                    </div>
                    {howManyColumns ===3 ?   <div className={'customer_feedback_L_parent_item'}>
                        <div className={'customer_feedback_L_parent_left_icon'}>
                            <Skeleton duration={3} width={'50%'} height={'60%'} circle={true}/>
                        </div>
                        <div className={'customer_feedback_L_parent_message'}>
                            <div className={'customer_feedback_L_parent_message_Text'}>
                                <Skeleton duration={3} width={'100%'} height={'70%'} count={2} />
                            </div>
                            <div className={'customer_feedback_L_parent_message_Time'}>
                                <Skeleton duration={3} width={'30%'} height={'100%'}  />
                            </div>
                        </div>
                    </div>:null}
                </div>
            </SkeletonTheme>
        );
    };

export default Loader;
