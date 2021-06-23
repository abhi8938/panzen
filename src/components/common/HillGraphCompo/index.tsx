import React, {FunctionComponent, useEffect, useState} from 'react';
import './hillgraph.css';
import {VictoryLine, VictoryChart, VictoryTheme, VictoryAxis, VictoryContainer} from 'victory';
import Loader from './Loader';

type Props = {
    selectedMonth?: {
        id: number,
        name: string
    },
    loading?: boolean,
    heading: string,
    data: any,
    xLabel: string,
    yLabel: string,
    tickValuesX: Array<number>,
    tickValuesY: Array<number>,
    tickFormatY: Array<string>,
    tickFormatX: Array<string>,
    compare?: {
        data2: any
        x2Label: string,
        y2Label: string,
        tickValuesX2: Array<number>,
        tickValuesY2: Array<number>,
        tickFormatY2: Array<string>,
        tickFormatX2: Array<string>,
    },
    months?: {
        previous:string,
        current:string
    }

};
const HillGraphCompo: FunctionComponent<Props> =
    ({
         selectedMonth = {
             id: 0,
             name: 'January',
         },
         loading = true,
         heading,
         data,
         xLabel,
         yLabel,
         tickValuesX,
         tickValuesY,
         tickFormatX,
         tickFormatY,
         compare,
         months
     }) => {
        const [selected, toggleSelected] = useState(selectedMonth);
        const [loader, setLoading] = useState(loading);
        useEffect(() => {
            setTimeout(() => setLoading(false), 1000);
        }, []);
        // useEffect(() => {
        //     console.log('com', months);
        // }, months);
        return (
            <div className={'hillgraph'}>
                <div>
                    <text className={'section_heading'}>{heading}</text>
                </div>
                {loader ?
                    <Loader howManyColumns={6}/>
                    : <VictoryChart
                        domainPadding={5}
                        width={1000}
                        height={255}
                    >
                        <VictoryAxis
                            tickValues={tickValuesY}
                            tickFormat={tickFormatY}
                            style={styles.axisStyley}
                        />
                        <VictoryAxis
                            dependentAxis
                            tickFormat={tickFormatX}
                            tickValues={tickValuesX}
                            style={styles.axisStylex}
                        />
                        <VictoryLine
                            style={{
                                data: {stroke: '#4ad991', strokeWidth: 2},
                            }}
                            data={data}
                            x={xLabel}
                            y={yLabel}
                        />
                        {compare == undefined ? null : <VictoryLine
                            style={{
                                data: {stroke: '#904ad9', strokeWidth: 2},
                            }}
                            data={compare?.data2}
                            x={compare?.x2Label}
                            y={compare?.y2Label}
                        />}
                    </VictoryChart>}
                {compare === undefined  ? null : <div style={{paddingLeft: '7.5vmin'}}>
                    <div>
                        <div className={'colored_div'} style={{backgroundColor: '#43bc82'}}/>
                        <text>{months !== undefined ? months['previous'] : ''}</text>
                    </div>
                    <div>
                        <div className={'colored_div'} style={{backgroundColor: '#904ad9'}}/>
                        <text>{months !== undefined ? months['current'] : ''}</text>
                    </div>
                </div>}

            </div>
        );
    };

export default HillGraphCompo;

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