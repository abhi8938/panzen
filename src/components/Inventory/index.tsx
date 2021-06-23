import React, {FunctionComponent, useState, useEffect} from 'react';
import './inventory.css'
import InventoryNav from "./InventoryNav";
import {Route, BrowserRouter as Router, useHistory} from 'react-router-dom';
import {inventoryList} from "../../constants/data";
import * as ROUTES from "../../constants/routes";
import IDashboard from "./Dashboard";
import Wastage from "./Wastage";
import IOrders from "./Orders";
import Surplus from "./Surplus";
import F_BCost from "./F&B_Cost";
import Supplier from "./Supplier";
import StorageArea from "./StorageArea";
import MenuItems from "./MenuItems";
import InventoryItems from "./InventoryItems";

type Props = {
    selectedTab?: {
        id: number, title: string, logo: any, path:string
    }
};

const Inventory: FunctionComponent<Props> =
    ({
         selectedTab = inventoryList[0]
     }) => {
        let history = useHistory();
        const [tab, toggleTab] = useState(selectedTab);
        useEffect(() => console.log(history.location),[]);
        return (
            <div className={'inventory_parent'}>
                <div>
                <text className={'main_heading'}>Inventory management</text>
                <InventoryNav selectedTab={tab} onToggle={(selected) => toggleTab(selected)}/>
                </div>
                <div>
                    <Route exact path={ROUTES.INVENTORY} component={IDashboard}/>
                    <Route path={ROUTES.SUPPLIER} component={Supplier}/>
                    <Route path={ROUTES.IORDERS} component={IOrders}/>
                    <Route path={ROUTES.STORAGEAREA} component={StorageArea}/>
                    <Route path={ROUTES.INVENTORYITEMS} component={InventoryItems}/>
                    <Route path={ROUTES.MENUITEMS} component={MenuItems}/>
                    <Route path={ROUTES.WASTAGE} component={Wastage}/>
                    <Route path={ROUTES.SURPLUS} component={Surplus}/>
                    <Route path={ROUTES.FBCOST} component={F_BCost}/>
                </div>
            </div>
        );
    };

export default Inventory;
