import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

/*----------- MEDIA -----------*/
import WebsiteLogo from '../media/main_logo.png'; 
import DashboardIcon from '../media/svgs/dashboard_icon.svg';
import MedicalRecordIcon from '../media/svgs/medical_record.svg';
import NeutronIcon from '../media/svgs/neutron.svg';
import QuarkReflectionIcon from '../media/svgs/quark_reflectio.svg';
import GluonIcon from '../media/svgs/gluon.svg';
import RewardsIcon from '../media/svgs/rewards.svg';
import StatisticsIcon from '../media/svgs/statistics.svg';
import HadronConnectIcon from '../media/svgs/user.svg';
import MonetisationIcon from '../media/svgs/monetisation.svg';
import ResearcherRequestsIcon from '../media/svgs/researcher_requests.svg';
import SettingsIconIcon from '../media/svgs/settings_icon.svg';
import LogoutIcon from '../media/svgs/right_arrow.svg';
import LinkedIn from '../media/svgs/social/linkedin.svg';
import Twitter from '../media/svgs/social/x_twitter.svg';
import Facebook from '../media/svgs/social/facebook.svg';
import Message from '../media/svgs/social/message_icon.svg';
import { useAuth } from '../../hooks/use-auth';
// import { useWeb3Modal } from '@web3modal/wagmi/react';
// import { useAccount, useDisconnect } from 'wagmi';

export default function SideBar() {

    const auth = useAuth()
    // const {disconnect, disconnectAsync} = useDisconnect()
    useEffect(() => {
        const menu_links = document.querySelectorAll('.main_sidebar a');
        menu_links.forEach(single_link => {
            single_link.addEventListener('click', () => {
                const menu_controls = document.querySelectorAll('.main_sidebar .menu_control')
                menu_links.forEach(will_remove_current => { will_remove_current.classList.remove('current'); });
                menu_controls.forEach(will_remove_current => { will_remove_current.classList.remove('current'); });

                single_link.classList.add('current')

                const from_dropdown = single_link.closest('.dropdown_container');
                if (from_dropdown) {
                    from_dropdown.querySelector('.menu_control').classList.add('current')
                }
            })
        });
    }, []);
    function OpenSideBar() {
        document.querySelector('.main_sidebar').classList.toggle('open')
        document.querySelector('#root').classList.toggle('no_scroll')
    }
    return (
        <div className='main_sidebar'>
            <div className="logo_container" onClick={() => { OpenSideBar() }}>
                <Image src={WebsiteLogo} alt='Quanmed Logo' />
                <span>My DeMed</span>
            </div>
            {/* <Link className="dashboard_tab" to="/mydemed" onClick={() => { OpenSideBar() }}>
                <DashboardIcon /> <span>Dashboard</span>
            </Link> */}
            <div className="menu_content" onClick={() => { OpenSideBar() }}>
                <div className="links_container" >
                    <div className="dropdown_container menu_item">
                        <div className="menu_control">
                            <MedicalRecordIcon /> <span>Medical Record</span>
                        </div>
                        <div className="dropdown_content">
                            {/* Add current class to the current page */}
                            <Link href="/mydemed/medical-record/clinician">Clinician</Link>
                            <Link href="/mydemed/medical-record/third-party">3rd Party</Link>
                            <Link href="/mydemed/medical-record/self-reported-data">Self Reported</Link>
                        </div>
                    </div>
                    <div className="menu_item">
                        <Link href="/mydemed/neutron" className="menu_control">
                            <NeutronIcon /> <span>Neutron</span>
                        </Link>
                    </div>
                    <div className="menu_item">
                        <Link href="/mydemed/quark-reflection" className="menu_control">
                            <QuarkReflectionIcon /> <span>Quark Reflection</span>
                        </Link>
                    </div>
                    <div className="menu_item">
                        <Link href="/mydemed/gluon" className="menu_control">
                            <GluonIcon /> <span>Gluon</span>
                        </Link>
                    </div>
                    <div className="menu_item">
                        <Link href="/mydemed/rewards" className="menu_control">
                            <RewardsIcon /> <span>Rewards</span>
                        </Link>
                    </div>
                    <div className="menu_item current">
                        <Link href="/mydemed/statistics" className="menu_control">
                            <StatisticsIcon /> <span>Statistics</span>
                        </Link>
                    </div>
                    <div className="menu_item">
                        <Link href="/mydemed/headeron-connect" className="menu_control">
                            <HadronConnectIcon /> <span>Hadron Connect</span>
                        </Link>
                    </div>
                    <div className="menu_item">
                        <Link href="/mydemed/monetisation" className="menu_control">
                            <MonetisationIcon /> <span>Monetisation</span>
                        </Link>
                    </div>
                    <div className="menu_item">
                        <Link href="/mydemed/researcher-requests" className="menu_control">
                            <ResearcherRequestsIcon /> <span>Researcher Requests</span>
                        </Link>
                    </div>
                </div>
                <div className="links_container" >
                    <div className="menu_heading">Support</div>
                    <div className="menu_item">
                        <Link href="/mydemed/settings" className="menu_control">
                            <SettingsIconIcon /> <span>Settings</span>
                        </Link>
                    </div>
                </div>
                <div className="menu_bottom">
                    <Link href="#" className='logout' onClick={async () => {
                        auth.signOut()
                        // open()
                        await disconnectAsync()
                        navigate("/logout")
                    }}>
                        <LogoutIcon /> <strong>Logout</strong>
                    </Link>
                    <div className="social_icons">
                        <Link href="#"> <LinkedIn /> </Link>
                        <Link href="#"> <Twitter /> </Link>
                        <Link href="#"> <Facebook /> </Link>
                        <Link href="#"> <Message /> </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}