import React, {FunctionComponent} from 'react';
import './listFrame.css';

type Props = {
    list: Array<string>;
    style: string
}

const ListFrame: FunctionComponent<Props> =
    ({
         list,
         style
     }) => {
        return (
            <div className={'listFrame ' + style}>
                {list.map(el => {
                    return (<text>{el}</text>)
                })}
            </div>
        );
    };

export default ListFrame;
