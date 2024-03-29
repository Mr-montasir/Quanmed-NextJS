import React from 'react';

import AppIcon from '../media/svgs/app_icon.svg';
import StarIcon from '../media/svgs/star.svg';
import StarRatings from 'react-star-ratings';

export default function AppCard(props) {
    return (
        <div className="app_card">
            <div className="card_top">
                <div className="person_info">
                    <div className="app_icon">
                        <AppIcon />
                    </div>
                    <div className="name_role">
                        <div className="name">{props.appname}</div>
                        <div className="role">{props.app_role}</div>
                    </div>
                </div>
                <div className="app_status">{props.app_status}</div>
            </div>
            {props.appDescription && (
                <p className="app_description">
                    {props.appDescription.length > 10 ? `${props.appDescription.substring(0, 60)}...` : props.appDescription}
                </p>
            )}
            <div className="card_bottom">
                <div className="icon_txt">
                    {/* <StarIcon /><StarIcon /><StarIcon /><StarIcon /><StarIcon /> */}
                    <StarRatings
                        rating={props.rating_from_five}
                        starRatedColor="#C292EB" s
                        starEmptyColor="#FFFFFF" 
                        numberOfStars={5} 
                        starDimension="30px" 
                        starSpacing="5px"
                    />
                </div>
                <div className="icon_txt">
                    <span>{props.rating_from_five} ({props.reviews_total} Reviews)</span>
                </div>
            </div>
        </div>
    )
}