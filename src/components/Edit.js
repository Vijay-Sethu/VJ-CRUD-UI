import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { toast } from 'react-toastify';
import CRUDservice from "./CommonApi";


const Edit = () => {

    const [name, setName] = useState("");
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [website, setWebsite] = useState("");
    const [editId, setEditId] = useState("");

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        let editId = location.state.id;
        CRUDservice.getDataById(editId)
            .then((response) => {
                let data = response.data
                setEditId(editId);
                setName(data.name);
                setUserName(data.userName);
                setEmail(data.email);
                setPhone(data.phone);
                setWebsite(data.website);
            }).catch((err) => {
                console.log(err)
            })

        // axios.get('http://localhost:8000/user/' + editId)
        //     .then((response) => {
        //         let data = response.data
        //         setEditId(editId);
        //         setName(data.name);
        //         setUserName(data.userName);
        //         setEmail(data.email);
        //         setPhone(data.phone);
        //         setWebsite(data.website);
        //         console.log("sssss", response.data)
        //     }).catch((err) => {
        //         console.log(err)
        //     })
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        const updateData = { name: name, userName: userName, email: email, phone: phone, website: website };
        CRUDservice.updateById(editId, updateData)
        .then((response) => {
            toast.info("User Updated Successfully",
            {
                theme: "colored", autoClose: 2000,
                hideProgressBar: true,
            });
        navigate('/');
        }).catch((err) => {
            console.log(err)
        })

        // axios.put('http://localhost:8000/user/' + editId, updateData, { headers })
        //     .then((response) => {
        //         toast.info("User Updated Successfully",
        //             {
        //                 theme: "colored", autoClose: 2000,
        //                 hideProgressBar: true,
        //             });
        //         navigate('/');
        //     }).catch((err) => {
        //         console.log(err)
        //     })
    }

    return (
        <div className="form">
            <h1 className="text-center mt-4">Edit</h1>
            <div className="custom-form border">
                <Form onSubmit={e => handleSubmit(e)}>
                    <div className="d-flex justify-content-between">
                        <FormGroup className="w-50 text-left">
                            <Label className="d-flex">Name</Label>
                            <Input name="name" placeholder="Enter name" value={name} onChange={e => setName(e.target.value)} type="text" />
                        </FormGroup>&nbsp;&nbsp;
                        <FormGroup className="w-50 text-left">
                            <Label className="d-flex">User Name</Label>
                            <Input name="name" placeholder="Enter name" value={userName} onChange={e => setUserName(e.target.value)} type="text" />
                        </FormGroup>
                    </div>
                    <FormGroup className="text-left">
                        <Label className="d-flex">Email</Label>
                        <Input name="name" placeholder="Enter name" value={email} onChange={e => setEmail(e.target.value)} type="email" />
                    </FormGroup>
                    <FormGroup className="text-left">
                        <Label className="d-flex">Phone</Label>
                        <Input name="name" placeholder="Enter name" value={phone} onChange={e => setPhone(e.target.value)} type="number" />
                    </FormGroup>
                    <FormGroup className="text-left">
                        <Label className="d-flex">Website</Label>
                        <Input name="name" placeholder="Enter name" value={website} onChange={e => setWebsite(e.target.value)} type="text" />
                    </FormGroup>
                    <Button sm="sm" color="success" type="submit" className="btn-space">Update</Button>
                    <Link to="/"><Button sm="sm" color="secondary">Back</Button></Link>
                </Form>
            </div>
        </div>
    )
}

export default Edit;