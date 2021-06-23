import React, {FunctionComponent, useEffect, useState} from 'react';
import {NavigationMenu} from "../../constants/data";
import {useHistory} from 'react-router-dom';
import logo from '../../Assets/login/PANZEN_LOGO.svg';
import './navigation.css'
import ListItem from "./ListItem";

type  navigationProps = {
    activeRoute?: string
};


const Navigation: FunctionComponent<navigationProps> = ({activeRoute}) => {
    let history = useHistory();
    const [active, toggleActive] = useState(activeRoute);
    // useEffect(() => console.log(history.location),[]);
    return (
        <div className={'navigation_parent'}>
            <img src={logo} className={'logo_navigation'} alt={'PANZEN_LOGO'}/>
            <div className={'navigation_list'}>
                {NavigationMenu.map(element => <ListItem activeRoute={active ? active : history.location.pathname}
                                                         toggleRoute={(path: string) => {
                                                             if(path == '/'){
                                                                 localStorage.clear()
                                                             }
                                                             toggleActive(path);
                                                             history.replace(path);
                                                         }}
                                                         key={element.id} branch={element.branch}
                                                         routes={element.routes}/>)}
            </div>
        </div>
    );
};

export default Navigation;