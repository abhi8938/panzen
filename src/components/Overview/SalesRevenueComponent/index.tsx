import React, {FunctionComponent, useState, useEffect} from 'react';
import './salesRevenue.css'
import {VictoryPie} from "victory";
import {Dropdown2} from "../common/Dropdown2";
import Loader from "./Loader";

type Props = {
    selectedMonth?: {
        id: number,
        name: string
    },
    loading?: boolean
};
type itemProps = {
    color: string,
    name: string,
    sale: number
}
const dataChart = [
    {category: 'Beer', revenue: 58, radius: 170, color: '#5073b8'},
    {category: 'Appetizers', revenue: 22, radius: 160, color: '#0ab39c'},
    {category: 'Whiskey', revenue: 18, radius: 140, color: '#f1963a'},
    {category: 'Entrees', revenue: 12, radius: 120, color: '#f16548'}

];

const Item: FunctionComponent<itemProps> =
    ({
         color, name, sale
     }) => {
        const bgColor = {backgroundColor: `${color}`};
        return (
            <div className={'sales_revenue_item_parent'}>
                <div className={'sales_revenue_item_first_child'}>
                    <div className={'sales_revenue_item_first_first_child'} style={bgColor}/>
                    <text className={'sales_revenue_item_first_second_child'}>{name}</text>
                </div>
                <text className={'sales_revenue_item_second_child'}>{sale}%</text>
            </div>
        )
    };

const SalesRevenueComponent: FunctionComponent<Props> =
    ({
         selectedMonth = {
             id: 0,
             name: 'January',
         },
         loading = true
     }) => {
        const [selected, toggleSelected] = useState(selectedMonth);
        const [loader, setLoading] = useState(loading);
        useEffect(() => {
            setTimeout(() => {
                setLoading(false);
            }, 5000)
        }, []);

        return (
            <div className={'sales_revenue_parent'}>
                <div className={'sales_revenue_first_child'}>
                    <text className={'section_heading'}>Sales Revenue Details</text>
                </div>
                {loader?<Loader howManyColumns={4}/>
                    :
                    <div className={'sales_revenue_second_child'}>
                    <div className={'sales_revenue_items_list'}>
                        {dataChart.map(data => <Item color={data.color} name={data.category} sale={data.revenue}/>)}
                    </div>
                    <VictoryPie
                        data={dataChart}
                        colorScale={["#5073b8", '#0ab39c', "orange", '#f16548']}
                        x={'category'}
                        y={'revenue'}
                        innerRadius={80}
                        labels={['']}
                        radius={(data) => data.radius}
                        style={{
                            parent: {width: '48%'}
                        }}
                    />
                </div>}
            </div>
        );
    };

export default SalesRevenueComponent;
