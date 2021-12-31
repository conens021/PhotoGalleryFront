import './modalHeader.css'
import ShareIcon from '@mui/icons-material/Share';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';

function ModalHeader({ children }) {
    return (
        <div className="modal-header">
            {children}
            <div class="options">
                <ShareIcon sx={{ color: 'primary.contrastText' }} fontSize="medium" />
                <ZoomInIcon sx={{ color: 'primary.contrastText' }} fontSize="medium" />
                <StarBorderIcon sx={{ color: 'primary.contrastText' }} fontSize="medium" />
                <DeleteOutlineIcon sx={{ color: 'primary.contrastText' }} fontSize="medium" />
                <DriveFileMoveIcon sx={{ color: 'primary.contrastText' }} fontSize="medium" />
            </div>
        </div>
    );
}

export default ModalHeader;