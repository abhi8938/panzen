import React, {FunctionComponent, useEffect} from 'react';
import './inventoryNav.css';
import {inventoryList as list} from '../../../constants/data';
import {useHistory} from "react-router-dom";

const Item: FunctionComponent<{
    id: number, title: string, logo: any, click: any, active: boolean
}> =
    ({
         id, title, logo, click, active
     }) => <li className={active ? 'inventory_active' : ''} onClick={() => click()}>
        <img src={logo} alt={title}/>
        <text>{title}</text>
    </li>;

type Props = {
    selectedTab: { id: number, title: string, logo: any },
    onToggle: (selected: { id: number, title: string, logo: any, path: string }) => void;
};

const InventoryNav: FunctionComponent<Props> =
    ({
         selectedTab, onToggle
     }) => {
        let history = useHistory();
        return <ul className={'inventoryNav'}>
            <div><Item id={list[0].id} title={list[0].title} logo={list[0].logo}
                       click={() => {
                           history.replace(list[0].path);
                           onToggle(list[0])
                       }} active={selectedTab.id === list[0].id}/>
            </div>
            <div>{
                list.map(comp => (comp.id === 1 || comp.id === 2) ?
                    <Item id={comp.id} title={comp.title} logo={comp.logo}
                          click={() => {
                              history.replace(comp.path);
                              onToggle(comp)
                          }}
                          active={selectedTab.id === comp.id}/>
                    : null)
            }</div>
            <div>
                {list.map(comp => (comp.id !== 0 && comp.id !== 1 && comp.id !== 2 && comp.id !== list.length - 1) ?
                    <Item id={comp.id} title={comp.title} logo={comp.logo}
                          click={() => {
                              history.replace(comp.path);
                              onToggle(comp)
                          }}
                          active={selectedTab.id === comp.id}/>
                    : null)}
            </div>
            <div><Item id={list[list.length - 1].id} title={list[list.length - 1].title}
                       logo={list[list.length - 1].logo}
                       click={() => {
                           history.replace(list[list.length - 1].path);
                           onToggle(list[list.length - 1])
                       }}
                       active={selectedTab.id === list[list.length - 1].id}/>
            </div>
        </ul>;
    };

export default InventoryNav;
