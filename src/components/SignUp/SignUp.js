import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';

import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { useDispatch } from 'react-redux';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react'

import SignupForm from './SignupForm';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default function SignUp() {

    const [userAlreadyExists, setUserAlreadyExists] = useState(false)

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const handleSubmit = (user) => {
        const headers = {
            'Content-Type': 'application/json',
        };
        axios.post('http://localhost:5297/signup', user, { headers })

            .then(response => {

                setUserAlreadyExists(false)
                const data = response.data
                localStorage.setItem('userSession', JSON.stringify(data.user));
                localStorage.setItem('jwt', data.jwt);

                dispatch({ type: "LOGIN_USER" })

                navigate("/")

            }).catch(e => {
                setUserAlreadyExists(true)
            });

    }

    return (
       
            <Grid container component="main" sx={{
                justifyContent: 'center',
                alignItems: 'center', height: '100vh'
            }}>
                <CssBaseline />
                <Grid item xs={10} sm={8} md={4} xl={2.5}
                    component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign up
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <SignupForm userAlreadyExists={userAlreadyExists} submitForm={handleSubmit} />
                            </Grid>
                        </Box>
                    </Box>
                    <Copyright sx={{ mt: 5 }} />
                </Grid>
            </Grid>
    
    );
}