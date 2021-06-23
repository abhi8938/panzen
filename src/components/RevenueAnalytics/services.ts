import {ENDPOINT, ROLE} from '../../constants/credential';
import axios from 'axios';


export default class RevenueAnalyticsService {
    token = localStorage.getItem('TOKEN');

    async createExpense(
        data: {
            items:Array<{
                name:string,
                quantity:string,
                price:number
            }>,
            period:string,
            type:string,
            comments:string,
            paymentStatus:string,
            billAmount:number,
            employeeIncharge:{
                id:string,name:string
            },
            category:string
        }
    ) {
        const body: any = data;
        body.branchID = 'IEFDIKzIJHVmQJ6yHhuw';
        return axios.post(ENDPOINT + `createExpense`, body, {
            headers: {
                "Content-Type": "application/json",
                'auth-token': this.token
            }
        }).then(response => {
            return response
        }).catch(error => {
            return error
        });
    }

    async getExpense(branchID: string) {
        const headers: any = {
            "Content-Type": "application/json",
            'branchid': branchID,
            'auth-token': this.token,
        };
        return axios.get(ENDPOINT + `getEmployees`,
            {
                headers
            }).then(response => {
            return response
        }).catch(error => {
            return error
        });
    }

    async createExpenseCategory(
        name: string,
    ) {
        const body: any = {};
        body.branchID = 'IEFDIKzIJHVmQJ6yHhuw';
        body.name = name;
        return axios.post(ENDPOINT + `createExpenseCategory`, body, {
            headers: {
                "Content-Type": "application/json",
                'auth-token': this.token
            }
        }).then(response => {
            return response
        }).catch(error => {
            return error
        });
    }
    async getExpenseCategory() {
        const headers: any = {
            "Content-Type": "application/json",
            'branchid': 'IEFDIKzIJHVmQJ6yHhuw',
            'auth-token': this.token,
        };
        return axios.get(ENDPOINT + `getExpenseCategory`,
            {
                headers
            }).then(response => {
            return response
        }).catch(error => {
            return error
        });
    }


}