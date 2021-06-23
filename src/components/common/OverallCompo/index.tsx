import React, {FunctionComponent} from 'react';
import './overallcompo.css'
import ListFrame from "../frames/ListFrame";
import Loader from "../../Reservation/ListItem/Loader";
import ListItem from "../../Inventory/F&B_Cost/ListItem";
import LogoComponent from "../LogoComponent";
import {fridge_icon, units_icon} from "../../../Assets/Inventory";
import {euro_icon} from "../../../Assets/Currency";


export type OverallDataProp = {
    [key: string]: number
    TUS: number,//Total Units Sold
    COGS: number,//Cost of goods sold
    SP: number,//Selling Price
    TW: number, //Total Wastage,
    Profit: number
}
type Props = {
    Heading: string,
    HeaderRowList: Array<string>
    loading: boolean,
    Data?: OverallDataProp,
    theme?: string,
    SideItem?:boolean
};

const OverallCompo: FunctionComponent<Props> =
    ({
         Heading,
         HeaderRowList,
         loading,
         Data = {
             TUS: 250,
             COGS: 42000,
             SP: 150000,
             TW: 1200,
             Profit: 106800
         },
         theme,SideItem
     }) => {

        return <div className={'Over_all_Compo ' + theme}>
            <text>{Heading}</text>
            <div>
                <ListFrame style={'OverAll_frame_list'} list={HeaderRowList}/>
                {loading ?
                    <div>
                        <Loader logo={true}/>
                    </div> :
                    <div className={'item'}>
                        {Object.keys(Data).map(function (key, index) {
                            const icon = key === 'TUS' ? units_icon : euro_icon
                            return <LogoComponent
                                type={'CURRENCY'}
                                logo={icon}
                                size={'SMALL'}
                                height={'100%'}
                                single={`${Data[key]}`}/>
                        })}
                    </div>
                }
            </div>
            <div>
                <text> {Heading + ' Percentage'}</text>
                <div className={'overallChart_Graph'}>
                    <div>
                        <div className={'overallChart_sideItem'}>
                            <text>{`${Data['SP']}`}</text>
                            <text style={{backgroundColor: '#feca57'}}>Selling Price</text>
                        </div>
                        <div>
                            <div>
                                <text>28.23%</text>
                            </div>
                        </div>
                        <div className={'overallChart_sideItem'}>
                            <text>{`${Data['COGS']}`}</text>
                            <text style={{backgroundColor: '#e1558c'}}>COGS</text>
                        </div>
                    </div>
                    {SideItem !== undefined?null:<div className={'overallChart_sideItem'}>
                        <text>{`${Data['TW']}`}</text>
                        <text style={{backgroundColor: '#256fee'}}>Wastage</text>
                    </div>}
                </div>
            </div>
        </div>
    };

export default OverallCompo;