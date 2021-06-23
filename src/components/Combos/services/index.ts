import {ENDPOINT, ROLE} from '../../../constants/credential';
import axios from 'axios';


export default class comboService {
    token = localStorage.getItem('TOKEN');

    async createCombo(
        branchID: string,
        name: string,
        items: Array<{ name: string, id: string }>,
        description: string,
        rating: number,
        price: number,
        comboImage: string
    ) {
        const body:any = {
            branchID,
            name,
            price,
            description,
            items,
            rating,
        };
        if (comboImage !== undefined){
            body.comboImage = comboImage;
        }
            return axios.post(ENDPOINT + 'createCombo', body, {
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

    async getCombos(branchID: string, status: string) {
        return axios.get(ENDPOINT + 'getCombos', {
            headers: {
                "Content-Type": "application/json",
                branchid: branchID,
                'auth-token': this.token,
                status
            }
        }).then(response => {
            return response
        }).catch(error => {
            return error
        });
    }

    async getSingleItem(id: string) {
        return axios.get(ENDPOINT + 'getSingleItem', {
            headers: {
                "Content-Type": "application/json",
                id: id,
                'auth-token': this.token
            }
        }).then(response => {
            return response
        }).catch(error => {
            return error
        });
    }

    async updateCombo(
        comboID: string,
        name: string | undefined,
        items: Array<{ name: string, id: string }> | undefined,
        description: string | undefined,
        rating: number | undefined,
        price: number | undefined,
        status: string | undefined
    ) {
        const body: any = {};
        body.comboID = comboID;
        if (name !== undefined) {
            body.name = name;
        }
        if (description !== undefined) {
            body.description = description;
        }
        if (rating !== undefined) {
            body.rating = rating;
        }
        if (price !== undefined) {
            body.price = price;
        }
        if (status !== undefined) {
            body.status = status;
        }

        return axios.put(ENDPOINT + 'updateCombo', body, {
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
        return axios.get(ENDPOINT + 'searchCombos', {
            headers: {
                "Content-Type": "application/json",
                'auth-token': this.token,
                branchid: branchId,
                keystring: keystring.toLowerCase()
            }
        }).then(response => response).catch(error => error);
    }
}