import {ENDPOINT, ROLE} from '../../constants/credential';
import axios from 'axios';

export default class EmployeeAnalyticsService {
    token = localStorage.getItem('TOKEN');

    async createEmployee(
        data: {
            fullName:string,
            email: string,
            contactNumber: string,
            profilePic: string,
            accountDetails: {
                name: string,
                bankName: string,
                number: string,
                ifsc: string,
                gst: string
            },
            payScale: { price: number, scale: string },
            address: string,
            designation: string,
            gender:string,
            rating:number,
            workingHours:number,
            employementType:string
        }
    ) {
        const body: any = data;
        body.branchID = 'IEFDIKzIJHVmQJ6yHhuw';
        return axios.post(ENDPOINT + `createEmployee`, body, {
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
    async getEmployees(branchID: string) {
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