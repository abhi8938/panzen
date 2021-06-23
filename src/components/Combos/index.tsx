import React, {FunctionComponent, useEffect, useState} from 'react';
import TopTabBar from "../common/TopTabBar";
import {CombosTopTabBars as toplist} from "../../constants/data";
import './combos.css'
import CategoryFrame from "../common/frames/CategoryFrame";
import AddNewCombo from "./AddNewCombo";
import ComboComponent from "./ComboComponent";
import comboService from './services';
import AlertBox, {alertProps} from "../common/AlertBox";

const service = new comboService();


export type combo = {
    branchID?: string,
    status?: "ACTIVE" | "INACTIVE",
    price: number,
    createdAt?: Date,
    name: string,
    description: string,
    rating: number,
    comboImage?:string
    items: Array<{ name: string, id: string }>
}

type Props = {
    tab: string,
    loading: boolean,
    list: Array<{ data: combo, id: string }>,
    itemTypeSelected?: {
        id: number,
        name: string,
        logo: any
    },
    searchInput?: string,
    alertData: alertProps
};

const Combos: FunctionComponent<Props> =
    ({
         tab = 'Active Combos',
         list = [],
         loading = true,
         searchInput = 'Search Combos',
         alertData = {
             showAlert: false,
             message: '',
             title: '',
             success: false
         }
     }) => {
        const [selectedTab, toggleTab] = useState(tab);
        const [load, toggleLoad] = useState(loading);
        const [combos, setCombos] = useState(list);
        const [search, setSearch] = useState(searchInput);
        const [aler, setaler] = useState(alertData);

        const fetchCombos = async () => {
            toggleLoad(true);
            const response = await service.getCombos('IEFDIKzIJHVmQJ6yHhuw', selectedTab === 'Active Combos' ? 'ACTIVE' : 'DELETED');
            toggleLoad(false);
            if (response.status == 200) {
                setCombos(response.data);
            } else {
                return setaler({
                    message: response.data,
                    success: false,
                    showAlert: !aler.showAlert
                })
            }
        };

        useEffect(() => {
            fetchCombos()
        }, [selectedTab]);

        const deleteCombo = async (
            comboID: string,
            index: number
        ) => {
            toggleLoad(!load);
            const response = await service.updateCombo(comboID, undefined, undefined, undefined, undefined, undefined, 'DELETED');
            if (response.status === 200) {
                setaler({
                    message: 'Combo Deleted from menu successfully',
                    success: true,
                    showAlert: !aler.showAlert
                })
                fetchCombos()
            } else {
                return setaler({
                    message: response.data,
                    success: false,
                    showAlert: !aler.showAlert
                })
            }
        };

        const searchCombo = async (search: string) => {
            toggleLoad(true);
            const response = await service.search('IEFDIKzIJHVmQJ6yHhuw', search);
            toggleLoad(false);
            if (response.status == 200) {
                setCombos(response.data);
            } else {
                return setaler({
                    message: JSON.stringify(response.data),
                    success: false,
                    showAlert: !aler.showAlert
                })
            }
        };

        const updateCombo = async (data: combo, comboID: string) => {
            toggleLoad(!load);
            const response = await service.updateCombo(
                comboID,
                data.name,
                data.items,
                data.description,
                data.rating,
                data.price,
                undefined
            );
            console.log(response, 'upadte');
            if (response.status === 200) {
                setaler({
                    message: 'Combo updated Successfully',
                    success: true,
                    showAlert: !aler.showAlert
                })
                return fetchCombos()
            } else {
                return setaler({
                    message: response.data,
                    success: false,
                    showAlert: !aler.showAlert
                })
            }
        };

        function renderItems() {
            const searchData = {
                searchBlur: () => {
                    setSearch("Search Combos");
                    fetchCombos()
                    return;
                },
                searchFocus: () => {
                    if (search !== 'Search Combos') return;
                    setSearch('')
                },
                searchChange: (value: string) => {
                    if (search !== 'Search Combos' && search.length !== 0) {
                        searchCombo(value);
                    }
                    setSearch(value)
                },
                searchText: search
            };
            return <div>
                <CategoryFrame
                    title={combos.length > 0 ? `${combos[0].data.name}` : combos.length === 0 && !load ? 'No Combos' : 'loading...'}
                    search={searchData}/>
                {combos.map((el, index) => <div>
                    {index === 0 ? null : <CategoryFrame
                        title={el.data.name}/>}
                    <ComboComponent
                        comboImage={el.data.comboImage}
                        onUpdate={data => updateCombo(data, el.id)}
                        onDelete={() => deleteCombo(el.id, index)}
                        loading={load}
                        items={el.data.items}
                        name={el.data.name}
                        rating={el.data.rating}
                        description={el.data.description}
                        price={el.data.price}/>
                </div>)}
            </div>
        }


        return (
            <div className={'combos'}>
                <text className={'main_heading'}>Combos / Hot Deals</text>
                <div>
                    <div>
                        <TopTabBar
                            list={toplist}
                            selectedTab={selectedTab}
                            onToggle={(selected: string) => {
                                toggleTab(selected)
                            }}/>
                    </div>
                    {selectedTab === 'Active Combos' || selectedTab === 'Deleted Combos' ? renderItems() : null}
                    {selectedTab === 'Add New Combos' ? <AddNewCombo buttonTitle={'Create'} inModal={false}/> : null}
                </div>
                <AlertBox message={aler.message}
                          success={aler.success}
                          handleClose={() => setaler({
                              message: aler.message,
                              success: aler.success,
                              showAlert: !aler.showAlert,
                          })}
                          show={aler.showAlert}/>
            </div>
        );
    };

export default Combos;

