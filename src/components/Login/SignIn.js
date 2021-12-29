import './signin.css'

import { useDispatch } from 'react-redux'
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';


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


export default function SignIn() {

    const [usernameOrEmail, setUsernameOrEmail] = useState()
    const [password, setPassword] = useState()
    const [usernameIsValid, setUsernameIsValid] = useState(false)
    const [passwordIsValid, setPasswordIsValid] = useState(false)
    const [formIsValid, setFormIsValid] = useState(false)
    const navigate = useNavigate()

    const dispatch = useDispatch()

    const usernameOrEmailChange = (event) => {
        const username = event.target.value
        if (username.length > 3) setUsernameIsValid(true)
        else setUsernameIsValid(false)
        setUsernameOrEmail(username)
    }

    const passwordChangeHandler = (event) => {
        const pass = event.target.value
        if (pass.length >= 3) setPasswordIsValid(true)
        else setPasswordIsValid(false)
        setPassword(pass)
    }

    useEffect(() => {
        if (usernameIsValid && passwordIsValid)
            setFormIsValid(true)
        else setFormIsValid(false)

    }, [usernameOrEmail, password])


    const handleSubmit = (event) => {

        event.preventDefault();

        if (!formIsValid) return

        const formData = {
            usernameOrEmail: usernameOrEmail,
            password: password
        }

        // POST request using axios with set headers
        const headers = {
            'Content-Type': 'application/json',
        };

        axios.post('http://localhost:5297/auth', formData, { headers })

            .then(response => {
                const data = response.data
                localStorage.setItem('userSession', JSON.stringify(data.user));
                localStorage.setItem('jwt', data.jwt);
                dispatch({ type: "LOGIN_USER" })
                navigate("/")

            }).catch(e => {

                console.log(e)

            });

    };
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
                        Sign in
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Username/Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onChange={usernameOrEmailChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={passwordChangeHandler}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            disabled={!formIsValid}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link variant="body2">
                                    <RouterLink to="/signup">
                                        {"Don't have an account? Sign Up"}
                                    </RouterLink>
                                </Link>
                            </Grid>
                        </Grid>
                        <Copyright sx={{ mt: 5 }} />
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
}