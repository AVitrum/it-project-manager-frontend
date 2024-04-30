import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { selectActive } from '../../features/popup/popupSlice';

type PopupProps = {
    children: ReactNode;
};

export default function Popup({ children }: PopupProps) {
    const isActive: boolean = useSelector(selectActive);

    return (
        <div className={`wrapper ${isActive ? 'active' : ''} active-popup`}>
            {children}
        </div>
    );
};
