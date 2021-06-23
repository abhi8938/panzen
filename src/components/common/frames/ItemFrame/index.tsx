import React, {FunctionComponent} from 'react';
import './itemFrame.css';

type Props = {
    color: string,
    height: string,
    width:string
}

const ItemFrame: FunctionComponent<Props> =
    ({
         children, color, height,width
     }) => {
        return (
            <div className={'itemFrame'}>
                <div style={{backgroundColor: color, height: height, width:width}}/>
                    {children}
            </div>
        );
    };

export default ItemFrame;
