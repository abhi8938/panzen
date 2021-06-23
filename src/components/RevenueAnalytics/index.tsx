import React, {FunctionComponent, useState} from 'react';
import './revenueAnalytics.css';
import {
    dataChart,
    dataChart2,
    EMPLOYEEOVERALLLISTFRAME, ExpenseColumns,
    Months as months,
    overviewList as list
} from "../../constants/data";
import OverviewChild from "../common/OverviewChild";
import HillGraphCompo from "../common/HillGraphCompo";
import {DropDown} from "../Dinein/DropDown";
import SearchBar from "../common/SearchBar";
import PagingList from "../common/PagingList";
import {TABLE} from "../../Assets/DineIn";
import OverallCompo from "../common/OverallCompo";
import {add_icon} from "../../Assets/Inventory";
import RevenueAnalyticsService from "./services";
let service = new RevenueAnalyticsService();

type Props = {
    selectedMultiple: { previous: { id: number, name: string }, current: { id: number, name: string } },
    monthsName?: {
        previous: string,
        current: string
    },
    searchText?: string,
    sortByCustomer?: {
        id: number,
        title: string,
        logo: any
    },
    OLoading?: boolean,
};

const RevenueAnalytics: FunctionComponent<Props> =
    ({
         selectedMultiple = {previous: months[0], current: months[1]},
         monthsName = {
             previous: selectedMultiple['current'].name,
             current: selectedMultiple['previous'].name
         },
         searchText = 'Search Name',
         sortByCustomer = {
             id: 0, title: 'Order Id', logo: TABLE
         },
         OLoading = true,
     }) => {
        const [selectedDual, setMonthDual] = useState(selectedMultiple);
        const [nameMonths, setNameMonths] = useState(monthsName);
        const [search, changeSearch] = useState(searchText);
        const [sortByC, setSortByC] = useState(sortByCustomer);
        const postExpense = async (data: any) => {
            const response = await service.createExpense(data);
            alert(response.data);
        };
        return (
            <div className={'revenue_analytics'}>
                <div>
                    <text className={'main_heading'}>Revenue Analytics</text>
                </div>
                <div className={'headerClass'}>
                    <text>Overview</text>
                </div>
                <div>
                    {list.map(el => <OverviewChild logo={el.logo} id={el.id} month={el.month} trend={el.trend}
                                                   totalData={el.totalData} previousMonth={el.previousMonth}/>)}
                </div>
                <div className={'headerClass'}>
                    <text>Total Sales</text>
                </div>
                <HillGraphCompo
                    data={dataChart}
                    heading={'Total Sales'}
                    tickFormatY={["1 Oct", "5 Oct", "10 Oct", "15 Oct", '20 Oct', '25 Oct', '30 Oct']}
                    tickFormatX={['200', '400', '800', '1600', '3200', '4000']}
                    tickValuesX={[200, 1000, 1750, 2500, 3200, 4000]}
                    tickValuesY={[1, 5, 10, 15, 20, 25, 30]}
                    xLabel={'date'}
                    yLabel={'earnings'}
                />
                <div className={'headerClass'}>
                    <text>Total Sales (Data Compare)</text>
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
                    heading={'Total Sales'}
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
                        <text>Expenses</text>
                        <SearchBar
                            width={'25vmin'}
                            value={search}
                            onChange={(value) => changeSearch(value)}
                            onblur={() => {
                                if (search === "" || search === " ") {
                                    changeSearch("Search Name");
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
                <PagingList
                    type={'EXPENSE'}
                    headerList={ExpenseColumns}
                    style={'expenseList'}
                    bottom={{icon: add_icon, text: 'Add Expense'}}
                    postData={data => postExpense(data)}
                />
                <OverallCompo
                    loading={OLoading}
                    HeaderRowList={EMPLOYEEOVERALLLISTFRAME}
                    Heading={'Overall Expenses'}
                    SideItem={true}
                    theme={'employee_overAll'}
                />
            </div>
        );
    };

export default RevenueAnalytics;
