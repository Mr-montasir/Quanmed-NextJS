import React from 'react';

export default function ActivityFeed(props) {
    return (
        <div className="activity_feed">
            <div className={`left_icon ${props.status}`}> {props.icon} </div>
            <div className="feed_content">
                <div className="feed_title">
                    {props.feed_title}
                </div>
                <div className="feed_time">{props.feed_time}</div>
            </div>
            <div className={`status ${props.status}`}>{props.status}</div>
        </div>
    )
}