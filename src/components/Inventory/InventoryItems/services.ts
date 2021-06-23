import {ENDPOINT, ROLE} from '../../../constants/credential';
import axios from 'axios';

const token = localStorage.getItem('TOKEN');

export default class InventoryItemServices {
    async createCategory_unit(
        branchID: string,
        name: string,
        defaultBool: boolean,
        request: 'Categories' | 'Unit'
    ) {
        const body: any = {
            branchID,
            name,
            defaultBool
        };
        return axios.post(ENDPOINT + `create${request}`, body, {
            headers: {
                "Content-Type": "application/json",
                'auth-token': token
            }
        }).then(response => {
            return response
        }).catch(error => {
            return error
        });
    }

    async getCategories_unit(branchID: string, request: 'Categories' | 'Units') {
        const headers: any = {
            "Content-Type": "application/json",
            'branchid': branchID,
            'auth-token': token,
        };
        return axios.get(ENDPOINT + `get${request}`,
            {
                headers
            }).then(response => {
            return response
        }).catch(error => {
            return error
        });
    }

    async createInventoryItem(
        branchID: string,
        name: string,
        life: number,
        category: {
            id: string,
            name: string
        },
        pricePerUnit: number,
        UOM: {
            id: string,
            name: string
        },
        storage: {
            id: string,
            name: string
        },
        UIH: number,
    ) {
        const totalCost = pricePerUnit * UIH;
        const body: any = {
            branchID,
            name,
            life,
            category,
            pricePerUnit,
            UOM,
            storage,
            UIH,
            totalCost
        };
        return axios.post(ENDPOINT + `createInventoryItem`, body, {
            headers: {
                "Content-Type": "application/json",
                'auth-token': token
            }
        }).then(response => {
            return response
        }).catch(error => {
            return error
        });
    }

    async getInventoryItems() {
        const headers: any = {
            "Content-Type": "application/json",
            'branchid': 'IEFDIKzIJHVmQJ6yHhuw',
            'auth-token': token,
        };
        return axios.get(ENDPOINT + `getInventoryItems`,
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