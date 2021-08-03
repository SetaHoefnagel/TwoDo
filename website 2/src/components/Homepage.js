import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import '../scss/Homepage.scss';
// import {} from '@material-ui/core'

export function Homepage() {
 
    return (
        <div>
            <h2>Sharing lists made simple</h2>
            <div className="grid row-2">
                <p>[image of sharing list]</p>
                <p>Never have problems with sharing lists with family and friends. </p>
                <p>Clear overview of people you've shared your list with, you can even see who's editing as you view the list!</p>
                <p>[image of sharing list]</p>
                <p>[image of creating list]</p>
                <p>Add checklists with images, text, locations and much more!</p>
            </div>
        </div>
    );
}
