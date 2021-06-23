import React, {FunctionComponent} from 'react';
import './logoComponent.css'

type Item = { quantity: number, name: string,id:string };
type Props = {
    type: 'CURRENCY' | 'DETAILS' | 'LISTOFINFO' | 'LISTOFITEMS',
    logo: any,
    list?: any,
    single?: string,
    size: 'BIG' | 'SMALL',
    height:string
};

const LogoComponent: FunctionComponent<Props> =
    ({
         children,
         list,
         logo,
         type,
         single,
         size,
     }) => {
        const styleImage = size == 'BIG' ? 'logo_component_big' : 'logo_component_small';
        return (
            <div>
                <div className={'logo_component'} >
                    <img src={logo} className={styleImage}/>
                    {type == "LISTOFINFO" ? <div>{list.map((el: Item) => <text>{el}</text>)}</div> : null}
                    {type == "DETAILS" ? <div>{list.map((el: Item) => <text>{el}</text>)}</div> : null}
                    {type == "CURRENCY" ? <text>{single}</text> : null}
                    {type == 'LISTOFITEMS' ?
                        <div>{list.map((el: Item) => <div>
                            <text>{el.name}</text>
                            <text>x {el.quantity}</text>
                        </div>)}</div>
                        : null}
                </div>
                {children}
            </div>
        );

    };

export default LogoComponent;
