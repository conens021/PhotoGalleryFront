import GalleryList from './GalleryList/GalleryList';
import './header.css'
import UserProfile from './Profile/UserProfile';

import { useEffect } from 'react';
import { Box } from '@mui/material';

function Header(props) {
    return (
        <Box sx={{backgroundColor : 'primary.dark',color: 'primary.contrastText'}}>
            <header className="App-header">
                <UserProfile />
                <GalleryList galleryChangeHandler={props.galleryChangeHandler} />
            </header>
        </Box>
    );
}
export default Header;