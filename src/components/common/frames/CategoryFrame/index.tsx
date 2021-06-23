import React, {FunctionComponent} from 'react';
import SearchBar from "../../SearchBar";
import './categoryFrame.css'

type Props = {
    logo?: any,
    search?: {
        searchText?: string,
        searchFocus?: () => void,
        searchBlur?: () => void,
        searchChange?: (value: string) => void;
    },
    title: string,

};

const CategoryFrame: FunctionComponent<Props> =
    ({
         title,
         logo,
         search
     }) => {

        return <div className={'categoryFrame'}>
            <div>
                {logo!== undefined?<img src={logo} alt={'logo'}/>:<div/>}
                <text>{title}</text>
            </div>
            {search !== undefined ?
                <SearchBar value={search.searchText} onfocus={search.searchFocus} onblur={search.searchBlur}
                           onChange={search.searchChange}/> : <div/>}
        </div>;
    }
;

export default CategoryFrame;
