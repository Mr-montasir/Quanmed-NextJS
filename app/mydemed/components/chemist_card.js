import React from 'react';

import UserCircleIcon from '../media/svgs/user_circle.svg';
import TasksCards from '../media/svgs/user_cards.svg';
import StarIcon from '../media/svgs/star.svg';

export default function ChemistCard(props) {
    return (
        <div className="chemist_card">
            <div className="card_top">
                <div className="person_info">
                    <div className="user_icon">
                        <UserCircleIcon />
                    </div>
                    <div className="name_role">
                        <div className="name">{props.username}</div>
                        <div className="role">{props.user_role}</div>
                    </div>
                </div>
                <div className="user_status">{props.user_status}</div>
            </div>
            {props.userDescription && (
                <p className="user_description">
                    {props.userDescription.length > 10 ? `${props.userDescription.substring(0, 60)}...` : props.userDescription}
                </p>
            )}
            <div className="card_bottom">
                <div className="icon_txt">
                    <TasksCards /> <span>{props.tasks_number} {props.task_name}</span>
                </div>
                <div className="icon_txt">
                    <StarIcon /> <span>{props.rating_from_five}  ({props.reviews_total} Reviews)</span>
                </div>
            </div>
        </div>
    )
}