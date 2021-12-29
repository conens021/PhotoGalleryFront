import './user-profile.css'

import { useSelector } from 'react-redux'

function UserProfile() {

    const user = JSON.parse(localStorage.getItem("userSession"))

    return (
        <div className='header-profile'>
            <h3>@{user.username}</h3>
            
        </div>
    );
}

export default UserProfile;