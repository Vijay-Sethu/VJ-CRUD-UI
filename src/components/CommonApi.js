import axios from "axios";


const  headers = { 'Content-Type': 'application/json'}

function getData() {
    return axios.get(`${process.env.REACT_APP_API}`,headers);
};

function createUser(data) {
    return axios.post(`${process.env.REACT_APP_API}`, data, headers);
}

function deleteById(id) {
    return axios.delete(`${process.env.REACT_APP_API}/${id}`, headers);
}

function getDataById(id) {
    return axios.get(`${process.env.REACT_APP_API}/${id}`, headers);
}

function updateById(id, data) {
    return axios.put(`${process.env.REACT_APP_API}/${id}`, data, headers);
}


const CRUDservice = {
    getData, deleteById, createUser, getDataById, updateById
}

export default CRUDservice;