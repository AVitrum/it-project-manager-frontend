import { ReactNode } from 'react';
import { CloseOutline } from 'react-ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { selectActive, selectOpenModal, setOpenModal } from '../../features/popup/popupSlice';

interface PopupProps {
    children: ReactNode;
}

const Popup = ({ children }: PopupProps) => {
    const active = useSelector(selectActive);
    const openModal = useSelector(selectOpenModal);

    const dispatch = useDispatch();

    const handleCloseClick = () => {
        dispatch(setOpenModal(false));
    };

    return (
        <div className={`wrapper ${active ? 'active' : ''} ${openModal ? 'active-popup' : ''}`}>
            <span className="icon-close" onClick={handleCloseClick}>
                <CloseOutline
                    color={'#00000'}
                    height="25px"
                    width="25px"
                />
            </span>
            {children}
        </div>
    );
};

export default Popup;