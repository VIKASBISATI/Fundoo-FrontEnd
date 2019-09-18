import axios from 'axios';
const baseURL = "http://fundoonotes.incubation.bridgelabz.com/api"
export function service() {
    return axios.get(baseURL + '/user/service')
}
export function addToCart(data) {
    return axios.post(baseURL + '/productcarts/addToCart', data)
}
export function addNotes(data) {
    return axios.post(baseURL + '/notes/addNotes', data,
        {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        })
}
export function getAllNotes() {
    return axios.get(baseURL + '/notes/getNotesList',        {
        headers: {
            Authorization: localStorage.getItem('token')
        }
    })   
}