import React from 'react';

export default function AppointmentRow(props) {
    return (
        <div className="appointment_row">
            <div className="date">
                <div className="day">{props.day}</div>
                <div className="day_number">{props.day_number}</div>
            </div>
            <div className="appointment_content">
                <div className="appointment_title">
                    {props.apn_title}
                </div>
                <div className="appointment_time">{props.appointment_start_time} - {props.appointment_end_time}</div>
            </div>
            <div className="appointment_dots">
                <div className="apn_circle"></div>
                <div className="apn_circle"></div>
                <div className="apn_circle"></div>
            </div>
        </div>
    )
}