import {ENDPOINT} from '../../../constants/credential';
import axios from 'axios';


export default class ReservationService {
    token = localStorage.getItem('TOKEN');

    async getReservations(branchID: string, date: Date) {
        console.log('reservation Token Check',this.token);
        return axios.get(ENDPOINT + 'getReservations',
            {
                headers: {
                    "Content-Type": "application/json",
                    branchid: branchID,
                    'auth-token': this.token,
                    filterdate: `${date.getDate()}:${date.getMonth()}:${date.getFullYear()}`
                }
            }).then(response => {
            return response
        }).catch(error => {
            return error
        });
    }

    async createReservation(
        branchID: string,
        customerName: string,
        customerContact: string,
        reservationDate: Date,
        reservationTime: Date | null,
        totalGuests: string
    ) {
        const body = {
            branchID,
            customerName,
            customerContact,
            reservationDate: `${reservationDate.getDate()}:${reservationDate.getMonth()}:${reservationDate.getFullYear()}`,
            reservationTime,
            totalGuests
        };

        return axios.post(ENDPOINT + 'createReservation', body, {
            headers: {
                "Content-Type": "application/json",
                'auth-token': this.token
            }
        }).then(response => response).catch(error => error);
    }

    async updateReservation(
        reservationID: string,
        newTime?: Date | null,
        status?: string
    ) {
        const body = status !== undefined ? {
            reservationID,
            status
        } : {
            reservationID,
            newTime
        };

        return axios.put(ENDPOINT + 'updateReservation', body, {
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
        return axios.get(ENDPOINT + 'searchReservations', {
            headers: {
                "Content-Type": "application/json",
                'auth-token': this.token,
                branchid: branchId,
                keystring:keystring.toLowerCase()
            }
        }).then(response => response).catch(error => error);
    }

}