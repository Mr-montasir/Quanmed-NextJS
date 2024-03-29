'use client';
import React, { useState } from 'react';

//------// Components //------//
import AnimatedTitle from '../components/titleAnimation';
import RewardsAmount from '../components/rewardAmount';
import SlNotification from '../components/sl_notifiation';
import SplineChart from '../components/charts/spline_chart';

//------// Media //------//
import ArrowUpRight from '../media/svgs/arrow_top_right.svg';
import ArrowDownRight from '../media/svgs/arrow_down_right.svg';
import UserCircle from '../media/svgs/user_circle.svg';
import PlusOutline from '../media/svgs/PlusOutline.svg';
import SettingsIcon from '../media/svgs/setting-2.svg';
import DownloadIcon from '../media/svgs/download.svg';
import UploadButton from '../media/svgs/upload.svg';

//------// Hooks //------//
import useFetch from '../hooks/useFetch';
import useDropdown from '../hooks/useDropdown';


export default function Rewards() { 
    useDropdown();  
    const { loading, error, data } = useFetch(`https://quanmed.ai/wordpress/wp-json/wp/v2/dashboard-pages?slug=your-rewards`);
    const chart_variations = {
        qmd: {
            weekly: {
                x_labels: ['3 July', '4 July', '5 July', '6 July', '7 July', '8 July', '9 July'],
                data: [23.8, 70.1, 28.5, 61.4, 33.2, 52.6, 41],
            },
            yearly: {
                x_labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                data: [5, 10, 28.5, 61.4, 33.2, 52.6, 41, 70.1, 28.5, 61.4, 33.2, 61.4],
            },
            monthly: {
                x_labels: ["Jan 2", "Jan 4", "Jan 6", "Jan 8", "Jan 10", "Jan 12", "Jan 14", "Jan 16", "Jan 18", "Jan 20", "Jan 22", "Jan 24", "Jan 26", "Jan 28", "Jan 30"],
                data: [57, 21, 64, 42, 35, 72, 23, 50, 66, 30, 58, 70, 24, 48, 68],
            }
        },
        ab: {
            weekly: {
                x_labels: ['3 July', '4 July', '5 July', '6 July', '7 July', '8 July', '9 July'],
                data: [23.8, 70.1, 28.5, 61.4, 33.2, 52.6, 41],
            },
            yearly: {
                x_labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                data: [5, 10, 28.5, 61.4, 33.2, 52.6, 41, 70.1, 28.5, 61.4, 33.2, 61.4],
            },
            monthly: {
                x_labels: ["Jan 2", "Jan 4", "Jan 6", "Jan 8", "Jan 10", "Jan 12", "Jan 14", "Jan 16", "Jan 18", "Jan 20", "Jan 22", "Jan 24", "Jan 26", "Jan 28", "Jan 30"],
                data: [57, 21, 64, 42, 35, 72, 23, 50, 66, 30, 58, 70, 24, 48, 68],
            }
        },
    } 
    const [chartData, setChartData] = useState(chart_variations.qmd.weekly);  
    if (loading) return;
    if (error) return; 

    const handleToggleClick = (data, ev) => {
        setChartData(data);

        // Set current class to 
        const targetElm = ev.target;
        const navClass = targetElm.classList[0];
        const clickedElementSiblings = document.querySelectorAll(`.${navClass}`);
        clickedElementSiblings.forEach( willRemoveCurrent => {
            willRemoveCurrent.classList.remove('current');
        });
        targetElm.classList.add('current');
    };
    function toggleNav(data_open, ev) { 
        if (data_open == 'qmd') {
            setChartData(chart_variations.qmd.weekly);
        } else if (data_open == 'ab') {
            setChartData(chart_variations.ab.weekly);
        }
        const firedTabs = document.querySelectorAll(`.toggle_nav`);
        firedTabs.forEach( willRemoveShow => {
            willRemoveShow.classList.remove('show');
        });
        firedTabs.forEach(single_tab => {
            const thisTab = (single_tab.getAttribute('data-nav-for') == data_open) ? true : false;
            if (thisTab) {
                single_tab.classList.add('show');
            }
        });

        // Set current class to 
        const targetElm = ev.target;
        const navClass = targetElm.classList[0];
        const clickedElementSiblings = document.querySelectorAll(`.${navClass}`);
        clickedElementSiblings.forEach( willRemoveCurrent => {
            willRemoveCurrent.classList.remove('current');
        });
        targetElm.classList.add('current');
    }
    return (
        <div className="rewards">
            {/* <AnimatedTitle title="Your Rewards" /> */}
            <AnimatedTitle title={data[0].title.rendered} />
            {data[0].acf.page_paragraph && (
                <p className="page_paragraph">
                {data[0].acf.page_paragraph}
                </p>
            )}
            <div className="two_columns">
                <div className="left_column">
                    <div className="rewards_amounts">
                        <RewardsAmount 
                            title="Spending on QMD"
                            arrow={<ArrowUpRight />}
                            direction="up"
                            price="$21.,500.00"
                            percent="12%"
                        />
                        <RewardsAmount 
                            title="Spending on QMD"
                            arrow={<ArrowDownRight />}
                            direction="down"
                            price="$5,392.00"
                            percent="8%"
                        />
                    </div>
                    <div className="wallet_report">
                        <div className="wr_top">
                            <h2>Wallet report</h2>
                            <div className="toggle_bar">
                                <div 
                                    onClick={(ev)=> { toggleNav('ab', ev) }} 
                                    className="toggle_option current" >
                                    QMD TOKEN
                                </div>
                                <div 
                                    onClick={(ev)=> { toggleNav('qmd', ev) }} 
                                    className="toggle_option" >
                                    Actual Balance
                                </div>
                            </div>
                        </div>
                        <nav className='toggle_nav show' data-nav-for="qmd">
                            <div 
                                onClick={(ev) => handleToggleClick(chart_variations.qmd.weekly, ev)} 
                                className="nav_option current">
                                Weekly
                            </div>
                            <div 
                                onClick={(ev) => handleToggleClick(chart_variations.qmd.monthly, ev)}
                                className="nav_option">
                                Monthly
                            </div>
                            <div 
                                onClick={(ev) => handleToggleClick(chart_variations.qmd.yearly, ev)}
                                className="nav_option">
                                Last year
                            </div>
                        </nav>
                        <nav className='toggle_nav' data-nav-for="ab">
                            <div 
                                onClick={(ev) => handleToggleClick(chart_variations.ab.weekly, ev)} 
                                className="nav_option current">
                                Weekly
                            </div>
                            <div 
                                onClick={(ev) => handleToggleClick(chart_variations.ab.monthly, ev)}
                                className="nav_option">
                                Monthly
                            </div>
                            <div 
                                onClick={(ev) => handleToggleClick(chart_variations.ab.yearly, ev)}
                                className="nav_option">
                                Last year
                            </div>
                        </nav>
                        <div className="charts_container">
                            <div className='toggle_container' >
                                <SplineChart 
                                    horizontal_labels={chartData.x_labels} 
                                    chart_data={chartData.data}
                                /> 
                            </div> 
                        </div>
                    </div>
                </div> 
                <div className="right_column">
                    <div className="total_balence">
                        <h4>Total balance</h4>
                        <span className="balence_total">$81,910.00</span>
                        <div className="earning_value">
                            <ArrowUpRight />
                            <span>12.81%</span>
                        </div>
                        <div className="send_receive">
                            <div className="transfer_button send">
                                <span>Send</span> <UploadButton />
                            </div>
                            <div className="transfer_button receive">
                                <span>Receive</span> <DownloadIcon />
                            </div>
                        </div>
                        <div className="quick_transfer">
                            <h4>Quick transfer</h4>
                            <div className="users_icons">
                                <UserCircle className='user_svg' />
                                <UserCircle className='user_svg' />
                                <UserCircle className='user_svg' />
                                <UserCircle className='user_svg' />
                                <PlusOutline className='add_user' />
                            </div>
                        </div>
                        <div className="notifications_con">
                            <div className="notifications_top">
                                <h4>Notifications</h4> 
                                <div className="button_dropdown">
                                    <div className="button_trigger">
                                        <SettingsIcon />
                                    </div>
                                    <div className="button_dropdown_content">
                                        <div className="dropdown_option choosen_option">All Activity</div>
                                        <div className="dropdown_option">Applying</div>
                                        <div className="dropdown_option">Completed</div>
                                    </div>
                                </div> 
                            </div>
                            <div className="notifications_wrapper"> 
                                <SlNotification 
                                    username="Josep akbar"
                                    notification_text="Just sent you $10,000"
                                    notification_time="Just now" 
                                /> 
                                <SlNotification 
                                    username="Josep akbar"
                                    notification_text="Just sent you $10,000"
                                    notification_time="Just now" 
                                />  
                                <SlNotification 
                                    username="Josep akbar"
                                    notification_text="Just sent you $10,000"
                                    notification_time="Just now" 
                                />  
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}