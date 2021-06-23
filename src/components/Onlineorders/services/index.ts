import {ENDPOINT, ROLE} from '../../../constants/credential';
import axios from 'axios';
export default class OnlineOrderSrvice {

    token = localStorage.getItem('TOKEN');

    async getOnlineOrders(branchID: string,date:Date, status:string) {
        return axios.get(ENDPOINT + 'getOnlineOrder',{
            headers: {
                "Content-Type": "application/json",
                branchid: branchID,
                'auth-token': this.token,
                status,
                filterdate: `${date.getDate()}:${date.getMonth()}:${date.getFullYear()}`
            }
        }).then(response => {
            return response
        }).catch(error => {
            return error
        });
    }


    async cancel(
        onlineorderID: string,
        status?: string
    ) {
        const body =  {
            onlineorderID,
            status
        };

        return axios.put(ENDPOINT + 'updateOnlineOrder', body, {
            headers: {
                "Content-Type": "application/json",
                'auth-token': this.token,
            }
        }).then(response => response).catch(error => error);
    }

}