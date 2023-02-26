import React, { useState } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import CRUDservice from "./CommonApi";

const Create = () => {

    const [name, setName] = useState("");
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [website, setWebsite] = useState("");

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const fields = { name: name, userName: userName, email: email, phone: phone, website: website };
        const headers = { 'content-type': 'application/json' };
        CRUDservice.createUser(fields)
            .then((response) => {
                toast.success("User Added Successfully",
                    {
                        theme: "colored", autoClose: 2000,
                        hideProgressBar: true,
                    });
                navigate('/');
            }).catch((err) => {
                console.log("err", err)
            })
    }


    return (
        <div className="form">
            <h1 className="text-center mt-4">Create</h1>
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
                    <Button sm="sm" color="success" type="submit" className="btn-space">Create</Button>
                    <Link to="/"><Button sm="sm" color="secondary">Back</Button></Link>
                </Form>
            </div>
        </div>
    )
}

export default Create;