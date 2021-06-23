import {ENDPOINT, ROLE} from '../../../constants/credential';
import axios from 'axios';
import {DetailsType} from "./ACDetails";


export default class SupplierService {
    token = localStorage.getItem('TOKEN');

    async createSupplier(
        branchID: string,
        fullName: string,
        contactNumber: string,
        email: string,
        rawItems: Array<{id:string,name:string}>,
        method: 'CASH' | 'BANKING',
        accountDetails: DetailsType | undefined,
    ) {
        const body: any = {
            branchID,
            fullName,
            contactNumber,
            email,
            rawItems,
            method
        };
        if (accountDetails !== undefined && method === 'BANKING') {
            body.accountDetails = accountDetails;
        }else{
            body.accountDetails = {}
        }
        return axios.post(ENDPOINT + 'createSupplier', body, {
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

    async getSuppliers() {
        const headers: any = {
            "Content-Type": "application/json",
            'branchid': 'IEFDIKzIJHVmQJ6yHhuw',
            'auth-token': this.token,
        };
        return axios.get(ENDPOINT + 'getSuppliers',
            {
                headers
            }).then(response => {
            return response
        }).catch(error => {
            return error
        });
    }

    async updateSuppliers(
        supplierID: string,
        fullName: string | undefined,
        contactNumber: string | undefined,
        email: string | undefined,
        rawItems: Array<{ id: string, name: string }> | undefined,
        method: 'CASH' | 'BANKING' | undefined,
        accountDetails: DetailsType | undefined,
        status:'DELETED'
    ) {
        const body: any = {};
        body.supplierID = supplierID;
        if (fullName !== undefined) {
            body.fullName = fullName;
        }
        if (contactNumber !== undefined) {
            body.contactNumber = contactNumber;
        }
        if (email !== undefined) {
            body.email = email;
        }
        if (rawItems !== undefined) {
            body.rawItems = rawItems;
        }
        if (method !== undefined) {
            body.method = method;
        }
        if (accountDetails !== undefined) {
            body.accountDetails = accountDetails;
        }

        return axios.put(ENDPOINT + 'updateSuppliers', body, {
            headers: {
                "Content-Type": "application/json",
                'auth-token': this.token
            }
        }).then(response => response).catch(error => error);
    }

    async search(
        branchId: string,
        keystring: string,
    ) {
        return axios.get(ENDPOINT + 'searchSuppliers', {
            headers: {
                "Content-Type": "application/json",
                'auth-token': this.token,
                branchid: branchId,
                keystring: keystring.toLowerCase()
            }
        }).then(response => response).catch(error => error);
    }

}