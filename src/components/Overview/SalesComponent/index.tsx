import React, {FunctionComponent, useEffect, useState} from 'react';
import './salesComponent.css';
import {VictoryLine, VictoryChart, VictoryTheme, VictoryAxis, VictoryContainer} from 'victory';
import {Dropdown2} from "../common/Dropdown2";
import Loader from './Loader';
import {dataChart}from '../../../constants/data';
type Props = {
    selectedMonth?: {
        id: number,
        name: string
    },
    loading?: boolean
};



const SalesComponent: FunctionComponent<Props> =
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
            setTimeout(() => setLoading(false),5000);
        }, []);
        return (
            <div className={'sales_container_parent'}>
                <div className={'sales_first_child'}>
                    <text className={'section_heading'}>Sales</text>
                    <div style={{marginRight: 30}}>
                    </div>
                </div>
                {loader ?
                    <Loader howManyColumns={6}/>
                    : <VictoryChart
                        domainPadding={5}
                        width={1000}
                        height={255}
                    >
                        <VictoryAxis
                            tickValues={[1, 5, 10, 15, 20, 25, 30]}
                            tickFormat={["1 Oct", "5 Oct", "10 Oct", "15 Oct", '20 Oct', '25 Oct', '30 Oct']}
                            style={styles.axisStyley}
                        />
                        <VictoryAxis
                            dependentAxis
                            tickFormat={['$ 200', '$ 400', '$ 800', '$ 1600', '$ 3200', '$ 4000']}
                            tickValues={[200, 1000, 1750, 2500, 3200, 4000]}
                            style={styles.axisStylex}
                        />
                        <VictoryLine
                            style={{
                                data: {stroke: '#4ad991', strokeWidth: 2},
                            }}
                            data={dataChart}
                            x="date"
                            y="earnings"
                        />
                    </VictoryChart>}
            </div>
        );
    };

export default SalesComponent;

const styles = {
    axisStylex: {
        axis: {stroke: "transparent"},
        tickLabels: {
            fontSize: 11,
            padding: 10,
            fill: 'white',
            fontFamily: 'CircularStd',
            fontWeight: 500,
            lineHeight: 0.75
        }
    },
    axisStyley: {
        axis: {stroke: "transparent"},
        tickLabels: {
            fontSize: 11,
            padding: 17,
            fill: 'white',
            fontFamily: 'CircularStd',
            fontWeight: 500,
            lineHeight: 0.75
        }
    }
};