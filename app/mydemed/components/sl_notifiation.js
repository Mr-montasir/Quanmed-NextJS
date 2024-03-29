import React from 'react';
import Link from 'next/link';

//------// Media //------//
import UserCircle from '../media/svgs/user_circle.svg';


export default function SlNotification(props) {
    return (
        <div className="sl_notification">
            <div className="user_img_container">
                <UserCircle />
            </div>
            <div className="notification_content">
                <span className="notification_name">{props.username}</span>
                <span className="notification_action">{props.notification_text}</span>
                <Link className="notification_click_details" href="">Click for detail</Link>
            </div>
            <div className="notification_time">{props.notification_time}</div>
        </div> 
    )
}