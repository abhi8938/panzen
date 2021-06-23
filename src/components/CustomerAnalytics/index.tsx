import React, {FunctionComponent, useState, useEffect} from 'react';
import OverviewChild from "../common/OverviewChild";
import './customerAnalytics.css'
import {Dropdown2} from "../Overview/common/Dropdown2";
import {dataChart, dataChart2, overviewList as list, Months as months} from "../../constants/data";
import HillGraphCompo from "../common/HillGraphCompo";
import SearchBar from "../common/SearchBar";
import {DropDown} from "../Dinein/DropDown";
import {TABLE} from "../../Assets/DineIn";
import PagingList from "../common/PagingList";
import ProductRatingComponent from "../Overview/ProductRatingComponent";
import TotalRatingsComponent from "../common/TotalRatingComponent";
import CustomerRatingComponent from "../Overview/CustomerFeedbackComponent";

type Props = {
    selectedMonth: {
        id: number,
        name: string,
    },
    selectedMultiple: { previous: { id: number, name: string }, current: { id: number, name: string } },
    searchText?: string,
    sortByCustomer?: {
        id: number,
        title: string,
        logo: any
    },
    sortByRating?: {
        id: number,
        title: string,
        logo: any
    },
    sortByProduct?: {
        id: number,
        title: string,
        logo: any
    }
    monthsName?: {
        previous: string,
        current: string
    }
};

const CustomerAnalytics: FunctionComponent<Props> =
    ({
         selectedMonth = {
             id: 0,
             name: "January",
         },
         selectedMultiple = {previous: months[0], current: months[1]},
         searchText = 'Search Id',
         sortByCustomer = {
             id: 0, title: 'Order Id', logo: TABLE
         },
         sortByRating = {
             id: 0, title: 'Captain', logo: TABLE
         },
         monthsName = {
             previous: selectedMultiple['current'].name,
             current: selectedMultiple['previous'].name
         },
         sortByProduct = {
            id: 0, title: 'Order Id', logo: TABLE
        },
     }) => {
        const [selected, setMonth] = useState(selectedMonth);
        const [selectedDual, setMonthDual] = useState(selectedMultiple);
        const [search, changeSearch] = useState(searchText);
        const [sortByC, setSortByC] = useState(sortByCustomer);
        const [sortByR, setSortByR] = useState(sortByRating);
        const [nameMonths, setNameMonths] = useState(monthsName);
        const [sortP, setSortP] = useState(sortByProduct);


        return (
            <div className={'customer_analytics'}>
                <div>
                    <text className={'main_heading'}>Customer Analytics</text>
                </div>
                <div className={'headerClass'}>
                    <text>Overview</text>
                </div>
                <div>
                    {list.map(el => <OverviewChild logo={el.logo} id={el.id} month={el.month} trend={el.trend}
                                                   totalData={el.totalData} previousMonth={el.previousMonth}/>)}
                </div>
                <div className={'headerClass'}>
                    <text>Total Customers</text>
                </div>
                <HillGraphCompo
                    data={dataChart}
                    heading={'Total Customers'}
                    tickFormatY={["1 Oct", "5 Oct", "10 Oct", "15 Oct", '20 Oct', '25 Oct', '30 Oct']}
                    tickFormatX={['200', '400', '800', '1600', '3200', '4000']}
                    tickValuesX={[200, 1000, 1750, 2500, 3200, 4000]}
                    tickValuesY={[1, 5, 10, 15, 20, 25, 30]}
                    xLabel={'date'}
                    yLabel={'earnings'}
                />
                <div className={'headerClass'}>
                    <text>Total Customers (Data Compare)</text>
                    <div>
                        <text>Select</text>
                        <DropDown SizeProp={'xs'} style={'multipleDropDown'} multipleList={months}
                                  multipleSelect={selectedDual}
                                  onSelectMultiple={(selectedMul) => {
                                      setMonthDual(selectedMul);
                                      setNameMonths({
                                          previous: selectedMul.current.name,
                                          current: selectedMul.previous.name
                                      });
                                  }}/>
                    </div>
                </div>
                <HillGraphCompo
                    data={dataChart}
                    heading={'Total Customers'}
                    tickFormatY={["1", "5 ", "10 ", "15 ", '20 ', '25 ', '30 ']}
                    tickFormatX={['200', '400', '800', '1600', '3200', '4000']}
                    tickValuesX={[200, 1000, 1750, 2500, 3200, 4000]}
                    tickValuesY={[1, 5, 10, 15, 20, 25, 30]}
                    xLabel={'date'}
                    yLabel={'earnings'}
                    compare={{
                        data2: dataChart2,
                        x2Label: 'date',
                        y2Label: 'earnings',
                        tickValuesX2: [200, 1000, 1750, 2500, 3200, 4000],
                        tickValuesY2: [1, 5, 10, 15, 20, 25, 30],
                        tickFormatY2: ["1", "5", "10", "15", '20 ', '25 ', '30 '],
                        tickFormatX2: ['200', '400', '800', '1600', '3200', '4000'],
                    }}
                    months={nameMonths}
                />
                <div className={'headerClass'}>
                    <div>
                        <text>Customer Details</text>
                        <SearchBar
                            width={'25vmin'}
                            value={search}
                            onChange={(value) => changeSearch(value)}
                            onblur={() => {
                                if (search === "" || search === " ") {
                                    changeSearch("Search Id");
                                }
                                return;
                            }}
                            onfocus={() => changeSearch('')}/>
                    </div>
                    <div>
                        <text>Sort by</text>
                        <DropDown SizeProp={'xs'} style={'customer_details_dropdown'} selected={sortByC}
                                  onSelectItem={setSortByC}/>
                    </div>
                </div>
                <PagingList/>
                <div className={'headerClass'}>
                    <div>
                        <text>Customer Rating</text>
                    </div>
                    <div>
                        <text>Select</text>
                        <DropDown SizeProp={'xs'} style={'customer_details_dropdown'} selected={sortByR}
                                  onSelectItem={setSortByR}/>
                    </div>
                </div>
                <HillGraphCompo
                    data={dataChart}
                    heading={'Captain Rating'}
                    tickFormatY={["1 Oct", "5 Oct", "10 Oct", "15 Oct", '20 Oct', '25 Oct', '30 Oct']}
                    tickFormatX={['200', '400', '800', '1600', '3200', '4000']}
                    tickValuesX={[200, 1000, 1750, 2500, 3200, 4000]}
                    tickValuesY={[1, 5, 10, 15, 20, 25, 30]}
                    xLabel={'date'}
                    yLabel={'earnings'}
                />
                <div className={'headerClass'}>
                    <div>
                        <text>Product Rating</text>
                    </div>
                    <div>
                        <text>Sort By</text>
                        <DropDown SizeProp={'xs'} style={'customer_details_dropdown'} selected={sortP}
                                  onSelectItem={setSortP}/>
                    </div>
                </div>
                <div>
                    <ProductRatingComponent columns={5} darkTheme={'darkTheme'}/>
                    <TotalRatingsComponent ratingsTotal={4873} darkTheme={'darkTheme'}/>
                </div>
                <div className={'headerClass'}>
                        <text>Customer Feedback</text>
                </div>
                <CustomerRatingComponent darkTheme={'darkTheme'} columns={3}/>
            </div>
        )
            ;
    };

export default CustomerAnalytics;
