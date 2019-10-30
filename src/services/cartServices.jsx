import axios from 'axios';
require('dotenv').config();
const baseURL ="http://fundoonotes.incubation.bridgelabz.com/api"
export function myCart() {
    return axios.get(baseURL + `/productcarts/getCartDetails/${localStorage.getItem('cart')}`,
        {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        })
}
export function placeOrder(data) {
    return axios.post(baseURL + '/productcarts/placeOrder/', data,
        {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        })
}