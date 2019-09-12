import axios from 'axios';
const baseURL="http://fundoonotes.incubation.bridgelabz.com/api"
export function service(){
    return axios.get(baseURL+'/user/service')
}
export function addToCart(){
    return axios.post(baseURL+'/user/a')
}