import React from 'react';
import Link from 'next/link';
import Image from 'next/image'

/*--------- Hooks ---------*/
import { usePopupFunctions } from '../hooks/popups';

/*--------- Media ---------*/
import user_img from '../media/user_img.png';
import main_logo from '../media/main_logo.png';
import NotificationIcon from '../media/svgs/Notification.svg';
import InterrogationIcon from '../media/svgs/interrogation.svg';
import ScannerIcon from '../media/svgs/Scan.svg';

export default function Header() {
    const { openPopup, renderPopup } = usePopupFunctions(); 
    
    function OpenSideBar() {
        document.querySelector('.main_sidebar').classList.toggle('open')
        document.querySelector('#root').classList.toggle('no_scroll')
    }
    return (
        <header className='main_nav'>
            {renderPopup()} 
            {/* <Image /> */}
            <Image src={main_logo} className="main_logo" onClick={() => { OpenSideBar() }} />
            <Link href=""> <ScannerIcon /> </Link>
            <Link href=""> <NotificationIcon /> </Link>
            <Link href=""> <InterrogationIcon /> </Link>
            <Image src={user_img} className="user_img" onClick={() => openPopup('SignUp')} />
        </header>
    )
}