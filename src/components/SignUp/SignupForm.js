import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom'

function SignupForm({ submitForm, userAlreadyExists }) {

    useEffect(() => {

        console.log(userAlreadyExists)

    }, [userAlreadyExists])

    const [firstNameInput, setFirstnameInput] = useState({
        value: '',
        isValid: false,
        touched: false,
        errorMsg: 'This field is required'
    })
    const [lastNameInput, setLastnameInput] = useState({
        value: '',
        isValid: false,
        touched: false,
        errorMsg: 'This field is required'
    })
    const [usernameInput, setUsernameInput] = useState({
        value: '',
        isValid: false,
        touched: false,
        errorMsg: 'Username must contain at least 6 characters and 1 number'
    })
    const [emailInput, setEmailInput] = useState({
        value: '',
        isValid: false,
        touched: false,
        errorMsg: 'Not a valid email address.'
    })
    const [passwordInput, setPasswordInput] = useState({
        value: '',
        isValid: false,
        touched: false,
        errorMsg: 'Password must containt: At least 6 characters, 1 number and 1 uppercase letter.'
    })

    const [formIsValid, setFormIsValid] = useState(false)

    useEffect(() => {
        const firstName = firstNameInput.isValid
        const lastName = lastNameInput.isValid
        const username = usernameInput.isValid
        const email = emailInput.isValid
        const password = passwordInput.isValid

        if (firstName && lastName && username && email && password) setFormIsValid(true)
        else setFormIsValid(false)

    }, [firstNameInput, lastNameInput, usernameInput, emailInput, passwordInput])

    const dispatch = useDispatch()

    const closeSignUp = (event) => {
        event.preventDefault()
        dispatch({ type: "CLOSE_SIGNUP" })

    }

    const submitBtnHandler = () => {
        const user = {
            username: usernameInput.value,
            password: passwordInput.value,
            email: emailInput.value,
            firstname: firstNameInput.value,
            lastname: lastNameInput.value
        }

        submitForm(user)
    }

    const firstNameChangedHandler = (event) => {
        const firstname = event.target.value
        var firstNameValid = false
        if (firstname.length >= 2) firstNameValid = true
        setFirstnameInput(prev => ({
            ...prev,
            touched: true,
            value: firstname,
            isValid: firstNameValid
        }))

    }

    const lastNameChangedHandler = (event) => {
        const lastname = event.target.value
        var lastnameIsValid = false
        if (lastname.length >= 2) lastnameIsValid = true
        setLastnameInput(prev => ({
            ...prev,
            touched: true,
            value: lastname,
            isValid: lastnameIsValid
        }))

    }

    const userNameChangedHandler = (event) => {
        const username = event.target.value
        var usernameIsValid = false
        if (username.length >= 6 && hasNumber(username)) usernameIsValid = true
        setUsernameInput(prev => ({
            ...prev,
            touched: true,
            value: username,
            isValid: usernameIsValid
        }))

    }

    const emailChangedHandler = (event) => {
        const email = event.target.value
        var emailIsValid = false
        if (valideEmail(email)) emailIsValid = true
        setEmailInput(prev => ({
            ...prev,
            touched: true,
            value: email,
            isValid: emailIsValid
        }))

    }

    const passwordChangeHandler = (event) => {
        const password = event.target.value
        var passwordIsValid = false
        if (password.length >= 6 && validatePassword(password)) passwordIsValid = true
        setPasswordInput(prev => ({
            ...prev,
            touched: true,
            value: password,
            isValid: passwordIsValid
        }))

    }

    function hasNumber(myString) {
        return /\d/.test(myString);
    }

    function validatePassword(password) {
        //1 Upper letter
        //1 lower case latter
        //1 number
        var regex = new RegExp(
            "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$"
        );
        return regex.test(password)
    }

    function valideEmail(email) {
        var regex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
        return regex.test(email)
    }


    return (
        <React.Fragment>
            <Grid item xs={12} sm={6}>
                <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    error={!firstNameInput.isValid && firstNameInput.touched}
                    helperText=
                    {!firstNameInput.isValid && firstNameInput.touched ?
                        firstNameInput.errorMsg : ""
                    }
                    onChange={firstNameChangedHandler}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                    error={!lastNameInput.isValid && lastNameInput.touched}
                    helperText=
                    {!lastNameInput.isValid && lastNameInput.touched ?
                        lastNameInput.errorMsg : ""
                    }
                    onChange={lastNameChangedHandler}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    error={!usernameInput.isValid && usernameInput.touched}
                    helperText=
                    {!usernameInput.isValid && usernameInput.touched ?
                        usernameInput.errorMsg : ""
                    }
                    onChange={userNameChangedHandler}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    error={!emailInput.isValid && emailInput.touched}
                    helperText=
                    {!emailInput.isValid && emailInput.touched ?
                        emailInput.errorMsg : ""
                    }
                    onChange={emailChangedHandler}
                />
            </Grid>

            <Grid item xs={12}>
                <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    error={!passwordInput.isValid && passwordInput.touched}
                    helperText=
                    {!passwordInput.isValid && passwordInput.touched ?
                        passwordInput.errorMsg : ""
                    }
                    onChange={passwordChangeHandler}
                />
            </Grid>

            {userAlreadyExists &&
                <Grid item xs={12}>
                    <Alert severity="error">User with given username or email already exists!</Alert>
                </Grid>
            }

            <Grid item xs={12}>
                <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    disabled={!formIsValid}
                    onClick={submitBtnHandler}
                >
                    Sign Up
                </Button>
            </Grid>
            <Grid container justifyContent="flex-end">
                <Grid item>
                    <Link variant="body2">
                        <RouterLink to="/login">
                            Already have an account? Sign in
                        </RouterLink>
                    </Link>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default SignupForm;