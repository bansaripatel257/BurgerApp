import React from 'react';
import classes from './BuildControl.css'
const buildControl =(props) => (
    <div>
        <div className={classes.Label}>{props.label}</div>
        <button className={classes.Less} onClick = {props.remove} disabled = {props.disable}>Less</button>
        <button className = {classes.More} onClick = {props.added}>More</button>
    </div>   
);

export default buildControl;