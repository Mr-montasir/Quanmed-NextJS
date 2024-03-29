import React, { useContext } from 'react';
import Link from 'next/link';
import Logo from '../media/logo.svg';
import Menu from '../media/menu.svg';
import { SwiperContext } from './SwiperContext';
import useFetch from '../hooks/useFetch';
import Image from 'next/image'
import { useAuth } from '../../hooks/use-auth';

// Import Popups from the dashboard files
import { usePopupFunctions } from '../../mydemed/hooks/popups';


const Navigation = ()=> {

    const { openPopup, renderPopup } = usePopupFunctions();
    const auth = useAuth(); 

    const toggleMenu = () => {
        const main_nav = document.querySelector('.main_nav');
        main_nav.classList.toggle('open_menu');
    };
    const closeMenu = () => {
        const main_nav = document.querySelector('.main_nav');
        main_nav.classList.remove('open_menu');
    }; 
    const { swiperRef } = useContext(SwiperContext);

    const goToDashboard = () => {
        console.log('auth status: ', auth.isAuthenticated);
        if(auth.isAuthenticated){ 
            window.location.href = '/mydemed'
        } else{
            openPopup('SignIn') 
        }
    }
    return (
        <header className='main_nav'>
            <div className="left_side">
                <Link href="/" onClick={closeMenu}> 
                    <Image src={Logo} alt='MyDemed Logo' />
                </Link>
                <nav> 
                    <div className="dropdown_container">
                        <Link href="#" onClick={closeMenu} >Labs</Link>
                        <div className="dropdown_links">
                            <Link href="/lepton-lab">Lepton</Link>
                            <Link href="/proton-lab">Proton</Link>
                            <Link href="/fermion-lab">Fermion</Link>
                            <Link href="/boson-lab">Boson</Link>
                        </div>
                    </div> 
                    <div className="dropdown_container">
                        <Link href="#" onClick={closeMenu} >Interface</Link>
                        <div className="dropdown_links">
                            <Link href="/photon">Photon</Link>
                            <Link href="/bluon">Gluon</Link>
                        </div>
                    </div> 
                    <div className="dropdown_container">
                        <Link href="#" onClick={closeMenu} >Models</Link>
                        <div className="dropdown_links">
                            <Link href="/nucelus">Nucelus</Link>
                            <Link href="/atom">Atom</Link>
                        </div>
                    </div>
                    <div className="dropdown_container">
                        <Link href="#" onClick={closeMenu} >Partners</Link>
                        <div className="dropdown_links">
                            <Link href="/clinician">Clinician</Link>
                            <Link href="/healthcare-provider">Healthcare provider</Link>
                            <Link href="/general-partners">General partners</Link> 
                        </div>
                    </div>
                </nav>
            </div>
            <div className="menu" onClick={toggleMenu} >
                <Menu />
                <span>Menu</span>
            </div>
            <div className="main_menu">
                <div className="list_menu">
                    <Link onClick={closeMenu} href="/vision">Vision</Link>
                    <Link onClick={closeMenu} href="/tokenomics">Tokenomics</Link>
                    {/* onClick={() => goToDashboard()} */}
                    <Link onClick={closeMenu} href="/mydemed" id='mydemed'>My DeMed</Link>
                    {/* <Link onClick={closeMenu} href="/mydemed">My DeMed</Link> */}
                    <Link onClick={closeMenu} href="/blog">Blog</Link>
                    <Link onClick={closeMenu} href="https://quanmedai.gitbook.io/quanmed-ai-docs">White Paper</Link>
                </div>
            </div>
            {renderPopup()}
        </header> 
    )
}
export default Navigation;