import app from 'firebase/app';
import 'firebase/firestore';
import axios from "axios";
import {ENDPOINT} from "../../../constants/credential";

export default class DineInService {
    token = localStorage.getItem('TOKEN');

    async createTable(
        number: number,
        capacity:number
    ) {
        const body: any = {};
        body.branchID = 'IEFDIKzIJHVmQJ6yHhuw';
        body.status = 'INACTIVE';
        body.number = number;
        body.capacity = capacity;
        body.maintenance = false;
        return axios.post(ENDPOINT + `createTable`, body, {
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

}