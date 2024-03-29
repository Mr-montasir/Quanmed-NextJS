import React from 'react';
import ArrowDownIcon from '../media/svgs/down.svg';
import UserSharpIcon from '../media/svgs/user_sharp.svg';

export default function RecentOrdersRow( props ) {
    return (
        <div className="recent_orders_row">
            <div className="orders"> 
                <div className="icon_container">
                    <UserSharpIcon />
                </div>
                <div className="orders_content">
                    <div className="name">{props.name}</div>
                    <div className="duration">{props.time}</div>
                </div>
            </div>
            <div className="amount">  
                {props.amount}
            </div>
        </div>
    )
}