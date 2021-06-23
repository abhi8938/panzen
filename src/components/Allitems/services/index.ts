import {ENDPOINT, ROLE} from '../../../constants/credential';
import axios from 'axios';


export default class ItemService {
    token = localStorage.getItem('TOKEN');

    async createItem(
        branchID: string,
        name: string,
        category: {
            name: string,
            icon: string
        },
        ratings: number,
        availability: boolean,
        price: number,
        description: string,
        favorite: boolean,
        itemImage: string
    ) {
        const body = {
            branchID,
            name,
            category,
            ratings,
            availability,
            price,
            description,
            favorite,
            itemImage
        };
        return axios.post(ENDPOINT + 'createItem', body, {
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


    async createMenuCategory(
        name: string,
        icon: string
    ) {
        const body = {
            branchID: 'IEFDIKzIJHVmQJ6yHhuw',
            name,
            icon
        };
        console.log(body);
        return axios.post(ENDPOINT + 'createMenuCategory', body, {
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

    async getCategories() {
        const headers: any = {
            "Content-Type": "application/json",
            'branchid': 'IEFDIKzIJHVmQJ6yHhuw',
            'auth-token': this.token,
        };
        return axios.get(ENDPOINT + 'getMenuCategories',
            {
                headers
            }).then(response => {
            return response
        }).catch(error => {
            return error
        });
    }


    async getItems(branchID: string, status: string, category: { name: string, icon: string } | undefined, favorite: boolean | undefined) {
        const headers: any = {
            "Content-Type": "application/json",
            'branchid': branchID,
            'auth-token': this.token,
            status: status,
        };
        if (category !== undefined) {
            headers.category = JSON.stringify(category)
        }
        if (favorite !== undefined) {
            headers.favorite = favorite
        }
        return axios.get(ENDPOINT + 'getItems',
            {
                headers
            }).then(response => {
            return response
        }).catch(error => {
            return error
        });
    }

    async updateItem(
        itemID: string,
        name: string | undefined,
        description: string | undefined,
        ratings: number | undefined,
        price: number | undefined,
        itemImage: string | undefined,
        favorite: boolean | undefined,
        availability: boolean | undefined,
        status: string | undefined
    ) {
        const body: any = {};
        body.itemID = itemID;
        if (name !== undefined) {
            body.name = name;
        }
        if (description !== undefined) {
            body.description = description;
        }
        if (ratings !== undefined) {
            body.ratings = ratings;
        }
        if (price !== undefined) {
            body.price = price;
        }
        if (itemImage !== undefined) {
            body.itemImage = itemImage;
        }
        if (favorite !== undefined) {
            body.favorite = favorite;
        }
        if (availability !== undefined) {
            body.availability = availability;
        }
        if (status !== undefined) {
            body.status = status;
        }

        return axios.put(ENDPOINT + 'updateItem', body, {
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
        return axios.get(ENDPOINT + 'searchMenuItems', {
            headers: {
                "Content-Type": "application/json",
                'auth-token': this.token,
                branchid: branchId,
                keystring: keystring.toLowerCase()
            }
        }).then(response => response).catch(error => error);
    }

}