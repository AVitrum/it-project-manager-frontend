import { useState } from 'react';
import Login from '../components/form/login/Login';
import Registration from '../components/form/registration/Registration';
import Popup from '../components/ui/Popup';

export default function Header() {

    const [active, setActive] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    const handleOpenClick = () => {
        setOpenModal(true);
    };

    const handleCloseClick = () => {
        setOpenModal(false);
    };

    const handleRegisterClick = () => {
        setActive(true);
    };

    const handleLoginClick = () => {
        setActive(false);
    };

    return (
        <>
            <header>
                <h2 className="logo">PRMS Beta</h2>
                <nav className="navigation">
                    <a href="">Home</a>
                    <a href="">About</a>
                    <a href="">Services</a>
                    <a href="">Contact</a>
                    <button className="btnLogin-popup" onClick={handleOpenClick}>Login</button>
                </nav>
            </header>

            <Popup active={active} openModal={openModal} handleCloseClick={handleCloseClick}>
                <Login onRegisterClick={handleRegisterClick} />
                <Registration onLoginClick={handleLoginClick} />
            </Popup>
        </>
    );
}
