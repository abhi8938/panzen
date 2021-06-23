import React, {FunctionComponent, useState} from 'react';
import './listItem.css';

type ListItemChildProps = {
    path: string,
    title: string,
    icon: any,
    style: string,
    style2:string,
    onPress: (path: string) => void
}

const ListItemChild: FunctionComponent<ListItemChildProps> =
    ({
         path,
         title,
         icon,
         onPress,
         style,
         style2
     }) => {
        return (
            <div className={style} onClick={() => onPress(path)}>
                <div className={style2}/>
                <img src={icon} className={'list_icon'} alt={title}/>
                <text className={'list_title'}>{title}</text>
            </div>
        )
    };

type ListItemProps = {
    branch: string,
    routes: Array<{
        id: string,
        path: string,
        title: string,
        icon: any
    }>,
    activeRoute: string
    toggleRoute: (path: string) => void
};

const ListItem: FunctionComponent<ListItemProps> =
    ({
         branch,
         routes,
         toggleRoute,
         activeRoute
     }) => {
        return (
            <li className={"list_parent"}>
                {branch !== 'PARENT' ? <text className={'list_branch'}>{branch}</text> : null}
                {routes.map(element => {
                    const style = activeRoute === element.path ? 'listItem_parent active' : 'listItem_parent';
                    const style2 = activeRoute === element.path ? 'listItem_parent_leftDiv leftDiv_active' : 'listItem_parent_leftDiv';
                    return (<ListItemChild key={element.id} path={element.path} title={element.title}
                                           icon={element.icon} style={style}
                                           onPress={(path: string) => toggleRoute(path)} style2={style2}/>)
                })}
            </li>
        );
    };

export default ListItem;
