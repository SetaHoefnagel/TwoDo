import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import {FormControl, InputLabel, FormHelperText, Input, Button, FormGroup} from '@material-ui/core';
import '../scss/Homepage.scss';
// import {} from '@material-ui/core'

export function Login() {
 
    const submitForm = (event) => {
        event.preventDefault();
    }

    return (
        <form onSubmit={submitForm} style={{maxWidth: '500px', margin: 'auto'}}>
            <FormGroup>
                <FormControl>
                    <InputLabel htmlFor="my-input">Email address</InputLabel>
                    <Input id="my-input" aria-describedby="my-helper-text" />
                    <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
                </FormControl>
            </FormGroup>
            <FormGroup>
                <Button variant={"contained"} color="primary">Register!</Button>
            </FormGroup>
        </form>
    );
}
