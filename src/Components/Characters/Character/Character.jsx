import React from "react";
import { ReactDOM } from "react";
import { Component } from "react";
import { useState } from "react";
import { useEffect } from "react";
import jQuery from "jquery";
import $ from "jquery"
import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import Button from '@mui/material/Button';


const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function Character(props){
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    return(
        <div style={{display: 'flex'}, {justifyContent: 'center'}, {alignItems: 'center'}}>
        <Grid onClick={handleClickOpen} style={{display: 'flex', justifyContent: 'center'}} item xs={6}>
            <div className="divBlockCh" id={`person${props.id}`}>
                <div className="blockImage" style={{ backgroundImage: `url(${props.image})` }}></div>
                <div className="blockText">
                    <div className="hoverElement">
                        <p className="h4">{props.name}</p>
                        <div className="secondary">Gender: {props.gender}</div>
                        <div className="secondary">Species: {props.species}</div>
                        <div className="secondary">Status: {props.status}</div>
                        <div className="secondary">Location: {props.locationname}</div>
                    </div>
                </div>
            </div>
        </Grid>
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
            className="popup-hero"
        >
            <DialogTitle>{props.name}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    <div className="left_popup">
                        <img src={props.image} alt={`${props.name}'s photo`} className="image-popup" />
                    </div>
                    <div className="right_popup">
                        <p className="h4">{props.name}</p>
                        <div className="secondary">Gender: {props.gender}</div>
                        <div className="secondary">Species: {props.species}</div>
                        <div className="secondary">Status: {props.status}</div>
                        <div className="secondary">Location: {props.locationname}</div>
                        <div className="secondary">Origin: {props.origin}</div>
                    </div>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Close</Button>
            </DialogActions>
        </Dialog>
        </div>
    )
}

export default Character;