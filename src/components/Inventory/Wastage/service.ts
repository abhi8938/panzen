import {ENDPOINT, ROLE} from '../../../constants/credential';
import axios from 'axios';


export default class WastageService {
    token = localStorage.getItem('TOKEN');

    async createWastage(
        branchID: string,
        UOM: { id: string, name: string } ,
        item: { id: string, name: string },
        reason:string,
        employeeInCharge:{ id: string, name: string },
        units:number,
        type:'INGREDIENT' | 'ITEM'
    ) {
        const body: any = {
            branchID,
            UOM,
            item,
            reason,
            employeeInCharge,
            units,
            type
        };
        return axios.post(ENDPOINT + `createWastage`, body, {
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

    async getWastages(branchID: string) {
        const headers: any = {
            "Content-Type": "application/json",
            'branchid': branchID,
            'auth-token': this.token,
        };
        return axios.get(ENDPOINT + `getWastages`,
            {
                headers
            }).then(response => {
            return response
        }).catch(error => {
            return error
        });
    }


    // async updateSuppliers(
    //     supplierID: string,
    //     fullName: string | undefined,
    //     contactNumber: string | undefined,
    //     email: string | undefined,
    //     rawItems: Array<{ id: string, name: string }> | undefined,
    //     method: 'CASH' | 'BANKING' | undefined,
    //     accountDetails: DetailsType | undefined,
    //     status: 'DELETED'
    // ) {
    //     const body: any = {};
    //     body.supplierID = supplierID;
    //     if (fullName !== undefined) {
    //         body.fullName = fullName;
    //     }
    //     if (contactNumber !== undefined) {
    //         body.contactNumber = contactNumber;
    //     }
    //     if (email !== undefined) {
    //         body.email = email;
    //     }
    //     if (rawItems !== undefined) {
    //         body.rawItems = rawItems;
    //     }
    //     if (method !== undefined) {
    //         body.method = method;
    //     }
    //     if (accountDetails !== undefined) {
    //         body.accountDetails = accountDetails;
    //     }
    //
    //     return axios.put(ENDPOINT + 'updateSuppliers', body, {
    //         headers: {
    //             "Content-Type": "application/json",
    //             'auth-token': token
    //         }
    //     }).then(response => response).catch(error => error);
    // }

    // async search(
    //     branchId: string,
    //     keystring: string,
    // ) {
    //     return axios.get(ENDPOINT + 'searchSuppliers', {
    //         headers: {
    //             "Content-Type": "application/json",
    //             'auth-token': token,
    //             branchid: branchId,
    //             keystring: keystring.toLowerCase()
    //         }
    //     }).then(response => response).catch(error => error);
    // }

}