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
    return axios.get(baseURL + '/notes/getNotesList', {
        headers: {
            Authorization: localStorage.getItem('token')
        }
    })
}
export function colorChange(data) {

    return axios.post(baseURL + '/notes/changesColorNotes', data, {
        headers: {
            Authorization: localStorage.getItem('token')
        }
    })
}
export function updateNotes(data) {
    console.log('data in update notes is', data);

    return axios.post(baseURL + '/notes/updateNotes', data, {
        headers: {
            Authorization: localStorage.getItem('token')
        }
    })
}
export function archive(data) {
    console.log('data in archive notes is', data);
    return axios.post(baseURL + '/notes/archiveNotes', data, {
        headers: {
            Authorization: localStorage.getItem('token')
        }
    })
}
export function trash(data){
    console.log('data in trash notes is',data);
    return axios.post(baseURL+'/notes/trashNotes',data,{
        headers:{
            Authorization:localStorage.getItem('token')
        }
    })
}