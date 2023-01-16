import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function DatabaseErrorDialog(props) {

    return (
        <>
            <Dialog open={props.isOpen} onClose={() => props.handleClose()}>
                <DialogTitle>Błąd</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Wystąpił błąd połączenia z bazą danych
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => props.handleClose()}>Zamknij dialog</Button>
                    <Button color='secondary' component={NavLink} to={`/`} onClick={() => props.handleClose()}>Strona główna</Button>
                </DialogActions>
            </Dialog>
        </>
  )};