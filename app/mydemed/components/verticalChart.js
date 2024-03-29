import React from 'react';

export default function VerticalChart(props) {
    return (
        <div data-chart-num={props.chartNum} className={`vertical_chart ${props.customClass ? props.customClass : ''}`}>
                {props.chartText}
        </div>
    )
}