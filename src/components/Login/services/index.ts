import {ENDPOINT,ROLE} from '../../../constants/credential';
import axios from 'axios';
export default class LoginService{
   async loginUser(email:string,password:string){
     const body = {
         email:email,
         password:password,
         role:ROLE
     };
    return  axios.post(ENDPOINT + 'authenticate',body,{headers:{"Content-Type":"application/json"}}).then(response => {
        console.log('login-response', response);
        return response}).catch(error => {
        console.log('error-login',JSON.stringify(error));
        return error
    });
    }
    async resetPassword(email:string){
        const body = {
            email:email,
            role:ROLE
        };
        return  axios.post(ENDPOINT + 'passwordReset',body,{headers:{"Content-Type":"application/json"}}).then(response => {
            console.log('reset-response', response);
            return response}).catch(error => {
            console.log('error-reset',JSON.stringify(error));
            return error
        });
    }
}