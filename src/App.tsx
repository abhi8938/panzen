import React, {FunctionComponent} from "react";

import Login from './components/Login';
import OverView from "./components/Overview";
import Reservation from "./components/Reservation";
import AllItems from "./components/Allitems";
import Combos from "./components/Combos";
import CustomerAnalytics from "./components/CustomerAnalytics";
import DineIn from "./components/Dinein";
import EmployeeAnalytics from "./components/EmployeeAnalytics";
import Favorites from "./components/Favorites";
import Inventory from "./components/Inventory";
import OnlineOrders from "./components/Onlineorders";
import RevenueAnalytics from "./components/RevenueAnalytics";

import {BrowserRouter as Router, Route} from 'react-router-dom';
import Firebase, {FirebaseContext} from './services/firebase';
import * as ROUTES from './constants/routes';
import Navigation from "./components/Navigation";
import Header from "./components/Header";
import './App.css';
import "react-datepicker/dist/react-datepicker.css";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
type props ={};
const MainRoutes = () => {
    return(
                <div className={"parent"}>
                    <Navigation/>
                    <div className={"first_child"}>
                        <Header/>
                        <Route exact path={ROUTES.OVERVIEW} component={OverView}/>
                        <Route path={ROUTES.RESERVATION} component={Reservation}/>
                        <Route path={ROUTES.ALLITEMS} component={AllItems}/>
                        <Route path={ROUTES.COMBOS} component={Combos}/>
                        <Route path={ROUTES.CUSTOMERANALYTICS} component={CustomerAnalytics}/>
                        <Route path={ROUTES.DINEIN} component={DineIn}/>
                        <Route path={ROUTES.EMPLOYEEANALYTICS} component={EmployeeAnalytics}/>
                        <Route path={ROUTES.FAVORITES} component={Favorites}/>
                        <Route path={ROUTES.INVENTORY} component={Inventory}/>
                        <Route path={ROUTES.ONLINEORDER} component={OnlineOrders}/>
                        <Route path={ROUTES.REVENUEANALYTICS} component={RevenueAnalytics}/>
                    </div>
                </div>
    )
};
const App: FunctionComponent<props> = ({}) => {
        return (
            <FirebaseContext.Consumer>
                {(firebase: any) => {
                    return (
                        <Router>
                            <Route exact path={ROUTES.LANDING} component={Login}/>
                            <Route path={ROUTES.MAIN} component={MainRoutes}/>
                        </Router>
                    )
                }}
            </FirebaseContext.Consumer>
        );
};

export default App;

