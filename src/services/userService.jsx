import axios from 'axios';
require('dotenv').config();

const baseURL = "http://fundoonotes.incubation.bridgelabz.com/api"
export function service() {
    return axios.get(baseURL + '/user/service')
}
export function addToCart(data) {
    return axios.post(baseURL + '/productcarts/addToCart', data)
}
export function addNotes(data) {
    console.log("data in add notes is", data);
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
export function trash(data) {
    console.log('data in trash notes is', data);
    return axios.post(baseURL + '/notes/trashNotes', data, {
        headers: {
            Authorization: localStorage.getItem('token')
        }
    })
}
export function forever(data) {
    console.log('data in forever notes is', data);
    return axios.post(baseURL + '/notes/deleteForeverNotes', data, {
        headers: {
            Authorization: localStorage.getItem('token')
        }
    })
}
export function label(data) {
    console.log('data in label notes is', data);
    return axios.post(baseURL + '/noteLabels', data, {
        headers: {
            Authorization: localStorage.getItem('token')
        }
    })
}
export function getLabel() {
    return axios.get(baseURL + '/noteLabels/getNoteLabelList', {
        headers: {
            Authorization: localStorage.getItem('token')
        }
    })
}
export function noteLabel(data) {
    const noteId = data.noteId;
    const labelId = data.labelId;
    return axios.post(baseURL + `/notes/${noteId}/addLabelToNotes/${labelId}/add`, data, {
        headers: {
            Authorization: localStorage.getItem('token')
        }
    })
}
export function removeNoteLabel(data) {
    const noteId = data.noteId;
    const labelId = data.labelId;
    return axios.post(baseURL + `/notes/${noteId}/addLabelToNotes/${labelId}/remove`, data, {
        headers: {
            Authorization: localStorage.getItem('token')
        }
    })
}
export function addReminder(data) {
    return axios.post(baseURL + '/notes/addUpdateReminderNotes', data, {
        headers: {
            Authorization: localStorage.getItem('token')
        }
    })
}
export function deleteReminder(data) {
    return axios.post(baseURL + '/notes/removeReminderNotes', data, {
        headers: {
            Authorization: localStorage.getItem('token')
        }
    })
}

export function uploadProfile(upload) {
    console.log("upload image in services");
    return axios.post(baseURL + '/user/uploadProfileImage', upload, {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: localStorage.getItem('token')
        }
    })
}
export function editNoteLabel(data) {
    const labelId = data.labelId;
    var data1 = {
        "label": data.label
    }
    return axios.post(baseURL + `/noteLabels/${labelId}/updateNoteLabel`, data1, {
        headers: {
            Authorization: localStorage.getItem('token')
        }
    })
}
export function deleteNoteLabel(data) {
    const labelId = data.labelId;
    console.log("label id in services", labelId);
    return axios.delete(baseURL + `/noteLabels/${labelId}/deleteNoteLabel`, {
        headers: {
            Authorization: localStorage.getItem('token')
        }
    })
}
export function getUserEmails() {
    return axios.get(baseURL + '/user', {
        headers: {
            Authorization: localStorage.getItem('token')
        }
    })
}
export function addCollaboratorNotes(data, id) {
    console.log("data1/n id", data, id);
    return axios.post(baseURL + `/notes/${id}/AddcollaboratorsNotes`, data, {
        headers: {
            Authorization: localStorage.getItem('token')
        }
    })
}
export function searchUserList(data) {
    return axios.post(baseURL + '/user/searchUserList', data, {
        headers: {
            Authorization: localStorage.getItem('token')
        }
    })
}
export function removeCollabNotes(data) {
    let id = data.id;
    let collaboratorUserId = data.collaboratorUserId;
    console.log("collab id in service", id, collaboratorUserId, data);
    console.log("data in services-->", data);
    return axios.delete(baseURL + `/notes/${id}/removeCollaboratorsNotes/${collaboratorUserId}`, {
        headers: {
            Authorization: localStorage.getItem('token')
        }
    })
}
export function questionAndAnswer(data) {
    return axios.post(baseURL + '/questionAndAnswerNotes/addQuestionAndAnswer', data, {
        headers: {
            Authorization: localStorage.getItem('token')
        }
    })
}
export function getQuesAns(id) {
    return axios.get(baseURL + `/notes/${id}/questionAndAnswerNotes`, {
        headers: {
            Authorization: localStorage.getItem('token')
        }
    })
}
export function like(data) {
    let count = data.count
    let data1 = {
        "like": count
    }
    return axios.post(baseURL + `/questionAndAnswerNotes/like/${data.id}`, data1, {
        headers: {
            Authorization: localStorage.getItem('token')
        }
    })
}
export function rate(data) {
    let data1 = {
        'rate': data.rate
    }
    console.log("data.rate", data1);
    return axios.post(baseURL + `/questionAndAnswerNotes/rate/${data.id}`, data1, {
        headers: {
            Authorization: localStorage.getItem('token')
        }
    })
}
export function reply(data) {
    console.log("data befor reply", data);
    let data1 = {
        'message': data.message
    }
    console.log("data.rate", data1);
    return axios.post(baseURL + `/questionAndAnswerNotes/reply/${data.id}`, data1, {
        headers: {
            Authorization: localStorage.getItem('token')
        }
    })
}
export function getNotesByLabel(data,labelName) {
    console.log("data label in services", labelName);
    let label=labelName
    console.log("label",label);
    return axios.post(baseURL + `/notes/getNotesListByLabel/${label}`,data ,{
        headers: {
            Authorization: localStorage.getItem('token')
        }
    })
}