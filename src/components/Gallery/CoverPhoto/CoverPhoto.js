
import {Container} from '@mui/material/';

import './gallery-cover.css'

function CoverPhoto({ galleryName }) {
    return (

        <div className="gallery-cover">
            <div className='gallery-cover-backdrop'>
                <Container maxWidth="lg" style={{ 'textAlign': 'center' }}>
                    <h2>{galleryName}</h2>
                </Container>
            </div>
        </div>
    );
}

export default CoverPhoto;