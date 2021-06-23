import React, {FunctionComponent} from 'react';
import './entryFieldContainer.css'
import {CustomButton} from "../../Login/CustomButton";

type Props = {
    gridStyle: string,
    heading?: string,
    style?: string,
    onSubmit: () => void,
    buttonTitle: string
};

const EntryFieldContainer: FunctionComponent<Props> =
    ({
         children,
         gridStyle,
         heading,
         style,
         onSubmit,
         buttonTitle
     }) => {

        return <div className={'entryFieldContainerParent ' + style}>
            <text>{heading}</text>
            <div>
                <div className={gridStyle}>{children}</div>
                <CustomButton title={buttonTitle} style={'button'}
                              onclick={() => onSubmit()}/>
            </div>
        </div>;
    };

export default EntryFieldContainer;
