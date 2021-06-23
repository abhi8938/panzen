import React, {FunctionComponent, useState} from 'react';
import {EmployeeColumns, EMPLOYEEOVERALLLISTFRAME, overviewList as list} from "../../constants/data";
import OverviewChild from "../common/OverviewChild";
import SearchBar from "../common/SearchBar";
import {DropDown} from "../Dinein/DropDown";
import PagingList from "../common/PagingList";
import ProductRatingComponent from "../Overview/ProductRatingComponent";
import TotalRatingsComponent from "../common/TotalRatingComponent";
import {TABLE} from "../../Assets/DineIn";
import './employeeAnalytics.css'
import OverallCompo from "../common/OverallCompo";
import EmployeeAnalyticsServices from "./services";

let service = new EmployeeAnalyticsServices();

type Props = {
    searchText?: string,
    sortByRating?: {
        id: number,
        title: string,
        logo: any
    },
    sortByEmployee?: {
        id: number,
        title: string,
        logo: any
    },
    OLoading: boolean,

};

//TODO:Create Employee

const EmployeeAnalytics: FunctionComponent<Props> =
    ({
         searchText = 'Search Employee',
         sortByRating = {
             id: 0, title: 'Captain', logo: TABLE
         },
         sortByEmployee = {
             id: 0, title: 'Name', logo: TABLE
         },
         OLoading = true,

     }) => {
        const [search, changeSearch] = useState(searchText);
        const [sortByC, setSortByC] = useState(sortByEmployee);
        const [sortByR, setSortByR] = useState(sortByRating);

        const postEmployee = async (data: any) => {
            const response = await service.createEmployee(data);
            alert(response.data);
        };

        return (
            <div className={'employee_analytics'}>
                <div>
                    <text className={'main_heading'}>Employee Analytics</text>
                </div>
                <div className={'headerClass'}>
                    <text>Overview</text>
                </div>
                <div>
                    {list.map(el => <OverviewChild logo={el.logo} id={el.id} month={el.month} trend={el.trend}
                                                   totalData={el.totalData} previousMonth={el.previousMonth}/>)}
                </div>
                <div className={'headerClass'}>
                    <div>
                        <text>Employee Details</text>
                        <SearchBar
                            width={'25vmin'}
                            value={search}
                            onChange={(value) => changeSearch(value)}
                            onblur={() => {
                                if (search === "" || search === " ") {
                                    changeSearch("Search Employee");
                                }
                                return;
                            }}
                            onfocus={() => changeSearch('')}/>
                    </div>
                    <div>
                        <text>Sort by</text>
                        <DropDown SizeProp={'xs'} style={'employee_details_dropdown'} selected={sortByC}
                                  onSelectItem={setSortByC}/>
                    </div>
                </div>
                <PagingList headerList={EmployeeColumns} style={'employeeList'} postData={data => postEmployee(data)}/>
                <div className={'headerClass'}>
                    <div>
                        <text>Employee Rating</text>
                    </div>
                    <div>
                        <text>Select</text>
                        <DropDown SizeProp={'xs'} style={'employee_details_dropdown'} selected={sortByR}
                                  onSelectItem={setSortByR}/>
                    </div>
                </div>
                <div>
                    <ProductRatingComponent columns={5} darkTheme={'darkTheme'}/>
                    <TotalRatingsComponent ratingsTotal={4873} darkTheme={'darkTheme'}/>
                </div>
                <OverallCompo
                    loading={OLoading}
                    HeaderRowList={EMPLOYEEOVERALLLISTFRAME}
                    Heading={'Overall Labour Cost'}
                    SideItem={true}
                    theme={'employee_overAll'}
                />
            </div>
        );
    };

export default EmployeeAnalytics;
