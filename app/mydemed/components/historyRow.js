import React from 'react';
import ArrowDownIcon from '../media/svgs/down.svg';

export default function HistoryRow( props ) {
    return (
        <div className="history_row">
            <div className={`col_1 hs_icon ${props.iconStatus}`}><ArrowDownIcon /></div>
            <div className="col_1 hs_name">{props.name}</div>
            <div className="col_1 hs_amount">{props.amount}</div>
            <div className="col_1 hs_time">{props.time}</div>
            <div className="col_1 hs_status"> 
                <div className={`status ${props.status}`}>{props.status}</div>
            </div>
        </div>
    )
}