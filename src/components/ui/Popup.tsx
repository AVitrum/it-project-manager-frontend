import { ReactNode } from 'react';
import { CloseOutline } from 'react-ionicons';

interface PopupProps {
    active: boolean;
    openModal: boolean;
    handleCloseClick: () => void;
    children: ReactNode;
}

export default function Popup({ active, openModal, handleCloseClick, children }: PopupProps) {
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
}
