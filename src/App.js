import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import { useDispatch, useSelector } from 'react-redux';
import SignIn from './components/Login/SignIn';
import Gallery from './components/Gallery/Gallery'
import Home from './components/Home/Home';
import SignUp from './components/SignUp/SignUp';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import PhotoList from './components/Photos/PhotoList';
import { createTheme ,ThemeProvider} from '@mui/material/styles';


function App() {
  const theme = createTheme({
    palette: {
      primary: {
        light: '#5b6d7f',
        main: '#334960',
        dark: '#233343',
        contrastText: '#fff',
      },
      secondary: {
        light: '#f73378',
        main: '#f50057',
        dark: '#ab003c',
        contrastText: '#000',
      },
      background: {
        default: "#334960",
        text : "#fff"
      },
    },
  });

  const userSession = localStorage.getItem('userSession');

  const navigate = useNavigate()

  const userLogedIn = useSelector(state => state.userLogedIn)


  const dispatch = useDispatch()

  useEffect(() => {
    if (userSession == null && !userLogedIn) {
      navigate("/login")
    }
    dispatch({ type: "LOGIN_USER" })
  }, [])

  const renderHeader = () => {

    return userSession != null && userLogedIn && <Header />

  }

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        {renderHeader()}
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
          <Route path="/galleries/:id" element={<Gallery />} />
          <Route path="/photos" element={<PhotoList />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
