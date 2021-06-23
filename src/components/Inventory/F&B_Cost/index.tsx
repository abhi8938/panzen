import React, {FunctionComponent, useState} from 'react';
import {
    COGSFOODLISTFRAME,
    COGSFoodDropDown,
    COGSOVERALLLISTFRAME
} from '../../../constants/data'
import {DropDown, selectedType} from "../../Dinein/DropDown";
import ListFrame from "../../common/frames/ListFrame";
import Loader from "../../Reservation/ListItem/Loader";
import ListItem from "./ListItem";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleDown} from "@fortawesome/free-solid-svg-icons";
import {handBurger_icon} from "../../../Assets/Inventory";
import './f&bCost.css'
import OverallCompo from "../../common/OverallCompo";

type COG = {
    category: string,
    unitsSold: string,
    Date: Date,
    COGS: number,
    sellingPrice: number,
    Profit: number
}
type FBCommonProps = {
    title: string,
    dropDownList: Array<selectedType>,
    headerRowList: Array<string>,
    list: Array<COG>,
    sortBy: selectedType,
    setSort: (selected: selectedType) => void
    loading: boolean,
}
type Props = {
    FLoading: boolean,
    BLoading: boolean,
    OLoading: boolean,
    FSort: selectedType,
    BSort: selectedType,
    FList: Array<COG>,
    BList: Array<COG>
};


const F_BCost: FunctionComponent<Props> =
    ({
         FLoading = true,
         BLoading = true,
         OLoading = true,
         FList,
         BList,
         BSort = COGSFoodDropDown[0],
         FSort = COGSFoodDropDown[0]

     }) => {

        const [fLoad, setfLoad] = useState(FLoading);
        const [bLoad, setbLoad] = useState(BLoading);
        const [sortB, setSortB] = useState(BSort);
        const [sortF, setSortF] = useState(FSort);
        const [listF, setListF] = useState(FList);
        const [listB, setListB] = useState(BList);


        return <div className={'fb_parent'}>
            <img src={handBurger_icon} alt={'menu'}/>
            <FBCommon
                title={'Cost Of Goods Sold ( COGS ) - Food'}
                dropDownList={COGSFoodDropDown}
                headerRowList={COGSFOODLISTFRAME}
                list={[]}
                loading={fLoad}
                sortBy={sortF}
                setSort={selected => setSortF(selected)}
            />
            <FBCommon
                title={'Cost Of Goods Sold ( COGS ) - Beverages'}
                dropDownList={COGSFoodDropDown}
                headerRowList={COGSFOODLISTFRAME}
                list={[]}
                loading={bLoad}
                sortBy={sortB}
                setSort={selected => setSortB(selected)}
            />
            <OverallCompo
              loading={OLoading}
              HeaderRowList={COGSOVERALLLISTFRAME}
              Heading={'Over Food & Beverages Cost'}
            />

        </div>;
    };

export default F_BCost


export const FBCommon: FunctionComponent<FBCommonProps> =
    ({
         title,
         list,
         dropDownList,
         headerRowList,
         sortBy,
         loading,
         setSort
     }) => {

        return <div className={'fb_common'}>
            <div>
                <text>{title}</text>
                <div>
                    <text>Sort By</text>
                    <DropDown SizeProp={'xs'} style={'cogs_dropdown'} selected={sortBy}
                              onSelectItem={(selected => setSort(selected))} list={dropDownList}/>
                </div>
            </div>
            <div>
                <ListFrame style={'Cog_list_frame'} list={headerRowList}/>
                {loading ?
                    <div>
                        <Loader logo={true}/>
                        <Loader logo={true}/>
                    </div> : <ListItem/>}
                {/*: list.map(supplier => {*/}
                {/*    return (<ListItem/>)*/}
                {/*})}*/}
            </div>
            {list.length >= 10 ? <FontAwesomeIcon
                icon={faAngleDown}
                className="reservation_arrow_icon"
                color={'#fff'}
                size={'2x'}
                onClick={() => console.log('More')}
            /> : null}
        </div>

    };
