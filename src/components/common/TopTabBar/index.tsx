import React, {FunctionComponent} from 'react';
import './topTabBar.css';

type Props = {
    list: Array<string>,
    selectedTab: string,
    onToggle: (selected: string) => void;
    style?: string
};

const TopTabBar: FunctionComponent<Props> =
    ({
         list,
         selectedTab,
         onToggle,
         style
     }) => {
        return <ul className={'top_tab_bar ' + style}>
            {list.map((e: string) => <li onClick={() => onToggle(e)}>
                    {e}
                    {e == selectedTab ? <span/> : null}
                </li>
            )}
        </ul>;
    };

export default TopTabBar;
