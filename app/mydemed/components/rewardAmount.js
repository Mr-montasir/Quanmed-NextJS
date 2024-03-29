import React from 'react';

export default function RewardAmount( props ) { 
    return (
        <div className={`reward_analyse_panel ${props.direction}`}>
            <div className="reward_top"> 
                <h3 className="reward_heading"> {props.title} </h3> 
                <div className="button_dropdown">
                    <div className="button_trigger">
                        <div className="three_dots">
                            <div className='sl_dot'></div>
                            <div className='sl_dot'></div>
                            <div className='sl_dot'></div>
                        </div>
                    </div>
                    <div className="button_dropdown_content">
                        <div className="dropdown_option choosen_option">All Activity</div>
                        <div className="dropdown_option">Applying</div>
                        <div className="dropdown_option">Completed</div>
                    </div>
                </div> 
            </div>
            <div className="reward_content">
                <div className="reward_analyse rewards_up">
                    {props.price}
                </div> 
                <div className="rewards_bottom">
                    {props.arrow} <span>{props.percent}</span>
                </div>
            </div>
        </div>
    )
}