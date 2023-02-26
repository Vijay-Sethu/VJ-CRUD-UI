import React, { useEffect, useState } from "react";
import { Card, Table, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import CRUDservice from "./CommonApi";

const Home = () => {

    const [data, setData] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalDetete, setModalDelete] = useState(false);
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [website, setWebsite] = useState("");

    useEffect(() => {
        getUserData();
    }, []);

    const getUserData = () => {
        CRUDservice.getData()
            .then((response) => {
                let dataList = response.data;
                setData(dataList)
            }).catch((err) => {
                console.log(err)
            })
    }

    const confirmDelete = () => {
        setModalDelete(!modalDetete);
    }

    const handleDelete = (id) => {
        CRUDservice.deleteById(id)
            .then((response) => {
                toast.error("User Deleted Successfully",
                    {
                        theme: "colored", autoClose: 2000,
                        hideProgressBar: true,
                    });
                getUserData();
                confirmDelete();
            }).catch((err) => {
                console.log(err)
            })
    }

    const handlePreview = (id) => {
        togglePreview();
        setModalOpen(true)
        console.log("idddd", id)
        CRUDservice.getDataById(id)
            .then((response) => {
                let data = response.data
                setId(id);
                setName(data.name);
                setUserName(data.userName);
                setEmail(data.email);
                setPhone(data.phone);
                setWebsite(data.website);
            }).catch((err) => {
                console.log(err)
            })
    }

    const togglePreview = () => {
        setModalOpen(!modalOpen);
    }

    return (
        <div className="home">
            <h1 className="text-center m-4">HOME</h1>
            <div className="w-75 m-auto">
                <Link to="/create"><Button sm="sm" color="primary" className="mb-2 d-flex">Add User</Button></Link>
                <Card className="border-bottom-0">
                    <Table hover responsive className="m-0">
                        <thead className="bg-dark text-white">
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>UserName</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Website</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data !== null && data !== undefined && data.map((item, i) => (
                                <tr key={i}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.userName}</td>
                                    <td>{item.email}</td>
                                    <td>{item.phone}</td>
                                    <td>{item.website}</td>
                                    <td>
                                        <Button size="sm" color="secondary" className="mr-5 btn-space" onClick={e => handlePreview(item.id)}>Preview</Button>
                                        <Link to="/edit" state={{ id: item.id }}><Button size="sm" color="warning" className="mr-5 btn-space">Edit</Button></Link>
                                        <Button size="sm" color="danger" className="ml-5" onClick={e => confirmDelete(item.id)}>Delete</Button>
                                    </td>
                                    <Modal className="delete-modal" isOpen={modalDetete} toggle={confirmDelete}>
                                        <ModalHeader toggle={confirmDelete}>
                                            Delete
                                        </ModalHeader>
                                        <ModalBody>
                                            <p>Are you Confirm to delete id : {item.id} ?</p>
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button sm="sm" color="danger" onClick={e => handleDelete(item.id)}>
                                                Delete
                                            </Button>
                                            <Button sm="sm" color="secondary" onClick={confirmDelete}>
                                                Cancel
                                            </Button>
                                        </ModalFooter>
                                    </Modal>
                                        <Modal className="home-modal" isOpen={modalOpen} toggle={togglePreview}>
                                        <ModalHeader toggle={togglePreview}>
                                            Id: {id}
                                        </ModalHeader>
                                        <ModalBody>
                                            <div className="d-flex">
                                                <div className="label">
                                                    <p><b>Name</b></p>
                                                    <p><b>UserName</b></p>
                                                    <p><b>Email</b></p>
                                                    <p><b>Phone</b></p>
                                                    <p><b>Website</b></p>
                                                </div>
                                                <div className="value">
                                                    <p><b>:</b>{name}</p>
                                                    <p><b>:</b>{userName}</p>
                                                    <p><b>:</b>{email}</p>
                                                    <p><b>:</b>{phone}</p>
                                                    <p><b>:</b>{website}</p>
                                                </div>
                                            </div>
                                        </ModalBody>
                                    </Modal>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                </Card>
            </div>
        </div>
    )
}

export default Home;